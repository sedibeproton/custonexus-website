import{businessError,requireBusinessAccess}from"@/lib/business/api";import{cancelInvoice}from"@/lib/business/service";
export async function POST(_request:Request,{params}:{params:Promise<{id:string}>}){const auth=await requireBusinessAccess();if("error"in auth)return auth.error;try{return Response.json(await cancelInvoice((await params).id));}catch(error){return businessError(error);}}
