import { businessError, requireBusinessAccess } from "@/lib/business/api";
import { archiveFinancialDocument } from "@/lib/business/service";
export async function POST(_request:Request,{params}:{params:Promise<{id:string}>}){const auth=await requireBusinessAccess(true);if("error"in auth)return auth.error;try{return Response.json(await archiveFinancialDocument("invoice",(await params).id,auth.access.session.user.id));}catch(error){return businessError(error);}}
