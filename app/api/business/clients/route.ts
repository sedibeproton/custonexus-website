import { body,businessError,requireBusinessAccess } from "@/lib/business/api";
import { listClients,saveClient } from "@/lib/business/service";
export async function GET(request:Request){const auth=await requireBusinessAccess();if("error" in auth)return auth.error;const url=new URL(request.url);return Response.json({clients:await listClients(url.searchParams.get("q")||"",url.searchParams.get("all")==="true")});}
export async function POST(request:Request){const auth=await requireBusinessAccess();if("error" in auth)return auth.error;try{return Response.json({client:await saveClient(await body(request),auth.access.session.user.id)},{status:201});}catch(error){return businessError(error);}}
