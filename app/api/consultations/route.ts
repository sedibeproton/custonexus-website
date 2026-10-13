import {after} from "next/server";
import {createBooking,getBooking} from "@/lib/consultations";
import {consultationTypes} from "@/lib/consultation-options";
import {sendBookingEmails} from "@/lib/consultation-email";
import {consultationDisabledMessage,isConsultationBookingEnabled} from "@/lib/consultation-feature";
import {consumeBookingAttempt,requestIp} from "@/lib/rate-limit";

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern=/^[+\d][\d\s()-]{7,24}$/;
const text=(value:unknown,max:number)=>typeof value==="string"?value.trim().slice(0,max):"";

export async function POST(request:Request){
  if(!isConsultationBookingEnabled())return Response.json({error:consultationDisabledMessage,code:"BOOKING_DISABLED"},{status:503});
  if(!consumeBookingAttempt(requestIp(request)))return Response.json({error:"Too many booking attempts. Please try again later."},{status:429});
  let data:Record<string,unknown>;
  try{data=await request.json()}catch{return Response.json({error:"Invalid request."},{status:400})}
  if(text(data.website,200))return Response.json({ok:true});
  const customerName=text(data.customerName,100),email=text(data.email,200).toLowerCase(),phone=text(data.phone,30),businessName=text(data.businessName,150),projectDescription=text(data.projectDescription,3000),consultationType=text(data.consultationType,100),startsAt=text(data.startsAt,50);
  if(customerName.length<2||!emailPattern.test(email)||!phonePattern.test(phone)||!consultationTypes.includes(consultationType as typeof consultationTypes[number])||!startsAt)return Response.json({error:"Please check your name, email, phone number, consultation type and appointment time."},{status:400});
  try{const created=await createBooking({customerName,email,phone,businessName,projectDescription,consultationType,startsAt}),booking=await getBooking(created.id);if(booking)after(()=>sendBookingEmails(booking));return Response.json({ok:true,booking:created},{status:201})}catch(error){const message=error instanceof Error?error.message:"Unable to create the consultation request.";return Response.json({error:message},{status:/no longer available/i.test(message)?409:400})}
}
