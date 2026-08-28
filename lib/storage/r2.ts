import {
  DeleteObjectCommand,
  CopyObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type R2Config = { endpoint:string; region:string; bucket:string; accessKeyId:string; secretAccessKey:string };
let client: S3Client | undefined;

function getConfig(): R2Config {
  const config = {
    endpoint: process.env.R2_ENDPOINT?.trim() ?? "",
    region: process.env.R2_REGION?.trim() || "auto",
    bucket: process.env.R2_BUCKET_NAME?.trim() ?? "",
    accessKeyId: process.env.R2_ACCESS_KEY_ID?.trim() ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY?.trim() ?? "",
  };
  const missing = Object.entries(config).filter(([,value])=>!value).map(([key])=>key);
  if (missing.length) throw new Error(`R2 configuration is incomplete (${missing.join(", ")}).`);
  return config;
}

function getClient() {
  const config = getConfig();
  client ??= new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });
  return { client, bucket: config.bucket };
}

export function buildDocumentObjectKey(id:string, originalName:string, createdAt=new Date()) {
  const safeName = originalName.normalize("NFKC").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(-120) || "file";
  return `documents/${createdAt.getUTCFullYear()}/${id}/${safeName}`;
}

export async function uploadR2Object(input:{ key:string; body:Uint8Array|Buffer; contentType:string; metadata?:Record<string,string> }) {
  const {client,bucket}=getClient();
  await client.send(new PutObjectCommand({Bucket:bucket,Key:input.key,Body:input.body,ContentType:input.contentType,Metadata:input.metadata}));
}

export async function readR2Object(key:string) {
  const {client,bucket}=getClient();
  const response=await client.send(new GetObjectCommand({Bucket:bucket,Key:key}));
  if(!response.Body) throw new Error("R2 object returned an empty body.");
  return { bytes:await response.Body.transformToByteArray(),contentType:response.ContentType,contentLength:response.ContentLength };
}

export async function r2ObjectExists(key:string) {
  const {client,bucket}=getClient();
  try { await client.send(new HeadObjectCommand({Bucket:bucket,Key:key})); return true; }
  catch(error){ const status=(error as {$metadata?:{httpStatusCode?:number}}).$metadata?.httpStatusCode;if(status===404)return false;throw error; }
}

export async function deleteR2Object(key:string) {
  const {client,bucket}=getClient();
  await client.send(new DeleteObjectCommand({Bucket:bucket,Key:key}));
}

export async function copyR2Object(sourceKey:string,destinationKey:string){const{client,bucket}=getClient();await client.send(new CopyObjectCommand({Bucket:bucket,Key:destinationKey,CopySource:`${bucket}/${sourceKey}`}));}

export async function createR2DownloadUrl(key:string, expiresInSeconds=60) {
  const {client,bucket}=getClient();
  return getSignedUrl(client,new GetObjectCommand({Bucket:bucket,Key:key}),{expiresIn:Math.min(Math.max(expiresInSeconds,1),300)});
}
