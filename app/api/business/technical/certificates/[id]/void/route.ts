import { body, businessError, requireBusinessAccess } from "@/lib/business/api";
import { voidTechnicalCertificate } from "@/lib/business/technical-service";
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){const auth=await requireBusinessAccess(true);if("error" in auth)return auth.error;try{return Response.json(await voidTechnicalCertificate((await params).id,(await body(request)).reason,auth.access.session.user.id));}catch(error){return businessError(error);}}
