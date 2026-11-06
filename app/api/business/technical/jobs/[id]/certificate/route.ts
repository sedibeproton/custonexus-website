import { body, businessError, requireBusinessAccess } from "@/lib/business/api";
import { issueTechnicalCertificate } from "@/lib/business/technical-service";
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){const auth=await requireBusinessAccess();if("error" in auth)return auth.error;try{return Response.json(await issueTechnicalCertificate((await params).id,await body(request),auth.access.session.user.id),{status:201});}catch(error){return businessError(error);}}
