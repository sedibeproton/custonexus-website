import { headers } from "next/headers";
import { getAccountAccess } from "@/lib/admin-access";

export async function requireBusinessAccess(admin=false){const access=await getAccountAccess(await headers());if(!access)return{error:Response.json({error:"Unauthorized"},{status:401})};if(admin&&!access.isAdmin)return{error:Response.json({error:"Administrator access is required."},{status:403})};return{access};}
export function businessError(error:unknown){const message=error instanceof Error?error.message:"Unable to complete the request.";return Response.json({error:message},{status:/not found/i.test(message)?404:400});}
export async function body(request:Request){return await request.json() as Record<string,unknown>;}
