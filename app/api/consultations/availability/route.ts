import {availableSlots} from "@/lib/consultations";
import {consultationDisabledMessage,isConsultationBookingEnabled} from "@/lib/consultation-feature";

export async function GET(request:Request){
  if(!isConsultationBookingEnabled())return Response.json({error:consultationDisabledMessage,code:"BOOKING_DISABLED"},{status:503});
  const date=new URL(request.url).searchParams.get("date")||"";
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return Response.json({error:"Enter a valid date."},{status:400});
  try{return Response.json(await availableSlots(date),{headers:{"Cache-Control":"no-store"}})}catch{return Response.json({error:"Availability is temporarily unavailable."},{status:503})}
}
