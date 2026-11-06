import { businessError, requireBusinessAccess } from "@/lib/business/api";
import { voidPayment } from "@/lib/business/service";
export async function POST(_request:Request,{params}:{params:Promise<{id:string;paymentId:string}>}){const auth=await requireBusinessAccess(true);if("error" in auth)return auth.error;try{const{id,paymentId}=await params;return Response.json(await voidPayment(id,paymentId,auth.access.session.user.id));}catch(error){return businessError(error);}}
