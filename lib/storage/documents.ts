import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { getDocumentStorageBackend } from "@/lib/persistence-mode";
import { buildDocumentObjectKey, copyR2Object, deleteR2Object, readR2Object, uploadR2Object } from "@/lib/storage/r2";

const localRoot=join(process.cwd(),"data","documents");

export async function storeDocument(input:{id:string;originalName:string;bytes:Buffer;mimeType:string;createdAt:Date}) {
  if(getDocumentStorageBackend()==="r2"){
    const objectKey=buildDocumentObjectKey(input.id,input.originalName,input.createdAt);
    await uploadR2Object({key:objectKey,body:input.bytes,contentType:input.mimeType,metadata:{documentId:input.id}});
    return {objectKey,filePath:null};
  }
  await mkdir(localRoot,{recursive:true});
  const extension=input.originalName.match(/\.[a-zA-Z0-9]{1,20}$/)?.[0]?.toLowerCase()??"";
  const filePath=join(localRoot,`${input.id}${extension}`);
  await writeFile(filePath,input.bytes);
  return {objectKey:null,filePath};
}

export async function loadDocument(input:{objectKey:string|null;filePath:string|null}) {
  if(input.objectKey){const result=await readR2Object(input.objectKey);return Buffer.from(result.bytes);}
  if(!input.filePath)throw new Error("Document has no storage location.");
  return readFile(input.filePath);
}

export async function removeLegacyLocalDocument(filePath:string|null) {
  if(filePath) await unlink(filePath);
}

export async function discardStoredDocument(input:{objectKey:string|null;filePath:string|null}) {
  if(input.objectKey)await deleteR2Object(input.objectKey);
  else if(input.filePath)await unlink(input.filePath);
}

export async function copyStoredDocument(sourceKey:string,destinationKey:string){await copyR2Object(sourceKey,destinationKey);}
