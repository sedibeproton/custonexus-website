import { requireBusinessAccess } from "@/lib/business/api";
import { getTechnicalCertificatePdf } from "@/lib/business/technical-service";
import { readR2Object } from "@/lib/storage/r2";
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){const auth=await requireBusinessAccess();if("error" in auth)return auth.error;try{const pdf=await getTechnicalCertificatePdf((await params).id),object=await readR2Object(pdf.objectKey);return new Response(Buffer.from(object.bytes),{headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${pdf.number}.pdf"`,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});}catch{return Response.json({error:"Certificate PDF not found."},{status:404});}}
