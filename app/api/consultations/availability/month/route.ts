import {monthlyAvailability} from "@/lib/consultations";
import {parseMonth} from "@/lib/consultation-calendar";
import {consultationDisabledMessage,isConsultationBookingEnabled} from "@/lib/consultation-feature";

export async function GET(request:Request){
  if(!isConsultationBookingEnabled())return Response.json({error:consultationDisabledMessage,code:"BOOKING_DISABLED"},{status:503});
  const month=new URL(request.url).searchParams.get("month")||"";
  try{parseMonth(month)}catch{return Response.json({error:"Enter a valid month."},{status:400})}
  try{return Response.json(await monthlyAvailability(month),{headers:{"Cache-Control":"no-store"}})}catch{return Response.json({error:"Monthly availability is temporarily unavailable."},{status:503})}
}
