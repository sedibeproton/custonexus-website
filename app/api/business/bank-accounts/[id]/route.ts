import { body, businessError, requireBusinessAccess } from "@/lib/business/api";
import { removeBankAccount, saveBankAccount } from "@/lib/business/service";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireBusinessAccess(true);
  if ("error" in auth) return auth.error;
  try { return Response.json({ account: await saveBankAccount(await body(request), auth.access.session.user.id, (await params).id) }); }
  catch (error) { return businessError(error); }
}
export async function DELETE(_request:Request,{params}:{params:Promise<{id:string}>}){const auth=await requireBusinessAccess(true);if("error" in auth)return auth.error;try{return Response.json(await removeBankAccount((await params).id,auth.access.session.user.id));}catch(error){return businessError(error);}}
