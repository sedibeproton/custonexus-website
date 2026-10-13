import { body,businessError,requireBusinessAccess } from "@/lib/business/api";
import { consultationSchemaReady,getAvailabilityRules,getBlockedPeriods,getConsultationSettings,saveAvailability } from "@/lib/consultations";

async function setupGuard(){
  const guard=await requireBusinessAccess(true);
  if("error" in guard)return guard;
  if(!await consultationSchemaReady())return {error:Response.json({error:"Consultation setup is not available until the database migration is complete."},{status:503})};
  return guard;
}

export async function GET(){const guard=await setupGuard();if("error" in guard)return guard.error;return Response.json({settings:await getConsultationSettings(),rules:await getAvailabilityRules(),blocks:await getBlockedPeriods(new Date())})}
export async function PUT(request:Request){const guard=await setupGuard();if("error" in guard)return guard.error;try{const data=await body(request);await saveAvailability({durationMinutes:Number(data.durationMinutes),minimumNoticeMinutes:Number(data.minimumNoticeMinutes),maximumAdvanceDays:Number(data.maximumAdvanceDays),rules:Array.isArray(data.rules)?data.rules as never:[]},guard.access.session.user.id);return Response.json({ok:true})}catch(error){return businessError(error)}}
