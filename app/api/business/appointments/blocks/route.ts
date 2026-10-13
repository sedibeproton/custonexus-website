import { body,businessError,requireBusinessAccess } from "@/lib/business/api";
import { addBlockedPeriod,consultationSchemaReady,deleteBlockedPeriod } from "@/lib/consultations";

async function setupGuard(){
  const guard=await requireBusinessAccess(true);
  if("error" in guard)return guard;
  if(!await consultationSchemaReady())return {error:Response.json({error:"Consultation setup is not available until the database migration is complete."},{status:503})};
  return guard;
}

export async function POST(request:Request){const guard=await setupGuard();if("error" in guard)return guard.error;try{const data=await body(request);return Response.json(await addBlockedPeriod({startsAt:String(data.startsAt||""),endsAt:String(data.endsAt||""),reason:String(data.reason||"")},guard.access.session.user.id),{status:201})}catch(error){return businessError(error)}}
export async function DELETE(request:Request){const guard=await setupGuard();if("error" in guard)return guard.error;try{await deleteBlockedPeriod(new URL(request.url).searchParams.get("id")||"");return Response.json({ok:true})}catch(error){return businessError(error)}}
