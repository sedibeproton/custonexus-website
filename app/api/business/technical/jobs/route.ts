import { body, businessError, requireBusinessAccess } from "@/lib/business/api";
import { createTechnicalJob, listTechnicalJobs } from "@/lib/business/technical-service";
export async function GET(request:Request){const auth=await requireBusinessAccess();if("error" in auth)return auth.error;const url=new URL(request.url);try{return Response.json({jobs:await listTechnicalJobs(url.searchParams.get("q")||"",url.searchParams.get("status")||"")});}catch(error){return businessError(error);}}
export async function POST(request:Request){const auth=await requireBusinessAccess();if("error" in auth)return auth.error;try{return Response.json(await createTechnicalJob(await body(request),auth.access.session.user.id),{status:201});}catch(error){return businessError(error);}}
