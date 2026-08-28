import { randomUUID } from "crypto";
import { insertEnquiry } from "@/lib/enquiries";
import { deleteEnquiry } from "@/lib/enquiries";
import { requireBusinessAccess } from "@/lib/business/api";

const allowedServices = new Set(["healthcare-technology", "medical-equipment", "professional-services", "strategic-partnerships"]);
const allowedIntents = new Set(["quote", "callback", "general"]);
const allowedContact = new Set(["call", "email", "whatsapp"]);

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }

  if (clean(body.website, 100)) return Response.json({ success: true });

  const intent = clean(body.intent, 30);
  const service = clean(body.service, 50);
  const preferredContact = clean(body.preferredContact, 30);
  const fullName = clean(body.fullName, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 40);
  const consent = body.consent === true;
  const details: Record<string, unknown> = body.details && typeof body.details === "object"
    ? body.details as Record<string, unknown>
    : {};

  if (!allowedIntents.has(intent) || !allowedServices.has(service) || !allowedContact.has(preferredContact)) return Response.json({ error: "Choose valid enquiry options." }, { status: 400 });
  if (!fullName || !company || !phone || !/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: "Provide your name, company, email and phone number." }, { status: 400 });
  if (!consent) return Response.json({ error: "Please confirm that we may contact you about this enquiry." }, { status: 400 });

  try {
    const id = randomUUID();
    const reference = id.slice(0, 8).toUpperCase();
    const projectType = clean(body.projectType, 80) || null;
    const role = clean(body.role, 120) || null;
    const location = clean(body.location, 160) || null;
    await insertEnquiry({ id, createdAt: new Date().toISOString(), intent, service, projectType, fullName, company, role, email, phone, location, preferredContact, details: JSON.stringify(details).slice(0, 20000) });
    console.info("New website enquiry stored", { id, service, intent, preferredContact });
    return Response.json({ success: true, reference });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return Response.json({ error: "We could not save your enquiry. Please contact us by WhatsApp or phone." }, { status: 500 });
  }
}

export async function DELETE(request:Request){const auth=await requireBusinessAccess(true);if("error"in auth)return auth.error;let id="";try{id=clean((await request.json()).id,100);}catch{return Response.json({error:"Invalid request."},{status:400});}if(!id)return Response.json({error:"Enquiry ID is required."},{status:400});await deleteEnquiry(id);return Response.json({success:true});}
