"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, MessageCircle } from "lucide-react";

type FormState = Record<string, string | boolean>;

const services = [
  ["healthcare-technology", "Healthcare Technology", "Websites, apps, portals, integrations and digital systems"],
  ["medical-equipment", "Medical Equipment & Consumables", "Equipment, monitoring devices, PPE and clinical supplies"],
  ["professional-services", "Professional Services", "Consulting, implementation, security and support"],
  ["strategic-partnerships", "Strategic Partnerships", "Technology, supply, distribution and growth partnerships"],
] as const;

const inputClass = "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelClass = "block text-sm font-bold text-slate-800";

export default function EnquiryForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({ intent: "quote", service: "healthcare-technology", projectType: "website", preferredContact: "whatsapp", consent: false, website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  const set = (name: string, value: string | boolean) => setForm((current) => ({ ...current, [name]: value }));
  const text = (name: string) => String(form[name] ?? "");
  const serviceName = services.find(([value]) => value === form.service)?.[1] ?? "Service enquiry";

  const canContinue = step === 1
    ? Boolean(form.intent && form.service && (form.service !== "healthcare-technology" || form.projectType))
    : step === 2
      ? Boolean(text("requirements") && text("timeline"))
      : Boolean(text("fullName") && text("company") && text("email") && text("phone") && form.preferredContact);

  async function submit() {
    setStatus("sending"); setMessage("");
    const detailKeys = ["websiteType", "pageCount", "audience", "features", "contentStatus", "appType", "platform", "users", "integrations", "productNames", "specifications", "quantity", "deliveryLocation", "supportType", "challenge", "partnershipType", "proposal", "requirements", "timeline", "budget"];
    const details = Object.fromEntries(detailKeys.map((key) => [key, text(key)]).filter(([, value]) => value));
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, details }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit enquiry.");
      setReference(result.reference); setStatus("success"); setStep(4);
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to submit enquiry."); }
  }

  if (status === "success") {
    const whatsappText = encodeURIComponent(`Hello CustoNexus, I submitted a ${serviceName} enquiry. My reference is ${reference}. My name is ${text("fullName")} from ${text("company")}.`);
    return <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-7 text-center sm:p-12"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white"><Check size={30} /></div><h2 className="mt-6 text-3xl font-semibold text-blue-950">Your enquiry has been received.</h2><p className="mx-auto mt-4 max-w-xl leading-8 text-slate-600">Thank you, {text("fullName")}. Your reference is <strong>{reference}</strong>. We will contact you using your preferred method: {text("preferredContact")}.</p><a href={`https://wa.me/27722701087?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5"><MessageCircle size={20} /> Continue on WhatsApp</a></div>;
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_28px_80px_rgba(15,48,105,.12)]">
      <div className="border-b border-slate-100 bg-slate-50 px-5 py-5 sm:px-8"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Guided enquiry</p><p className="mt-1 text-sm text-slate-500">Step {step} of 4</p></div><div className="flex gap-2">{[1,2,3,4].map((number) => <span key={number} className={`h-2 rounded-full transition-all ${number <= step ? "w-8 bg-blue-700" : "w-4 bg-slate-200"}`} />)}</div></div></div>
      <div className="p-5 sm:p-8 lg:p-10">
        {step === 1 && <div><h2 className="text-2xl font-semibold text-blue-950 sm:text-3xl">What would you like help with?</h2><p className="mt-3 text-slate-600">Your answers determine the next questions.</p>
          <fieldset className="mt-7"><legend className={labelClass}>What would you like us to do?</legend><div className="mt-3 grid gap-3 sm:grid-cols-3">{[["quote","Prepare a quote"],["callback","Request a callback"],["general","Discuss an idea"]].map(([value,label]) => <Choice key={value} name="intent" value={value} label={label} selected={form.intent === value} onChange={() => set("intent", value)} />)}</div></fieldset>
          <fieldset className="mt-7"><legend className={labelClass}>Choose a service</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{services.map(([value,label,description]) => <Choice key={value} name="service" value={value} label={label} description={description} selected={form.service === value} onChange={() => { set("service", value); if (value !== "healthcare-technology") set("projectType", ""); }} />)}</div></fieldset>
          {form.service === "healthcare-technology" && <fieldset className="mt-7"><legend className={labelClass}>What are you planning?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["website","Website"],["app","App"],["portal","Portal or dashboard"],["integration","Integration or other"]].map(([value,label]) => <Choice key={value} name="projectType" value={value} label={label} selected={form.projectType === value} onChange={() => set("projectType", value)} />)}</div></fieldset>}
        </div>}

        {step === 2 && <div><h2 className="text-2xl font-semibold text-blue-950 sm:text-3xl">Tell us what you need.</h2><p className="mt-3 text-slate-600">More detail helps us prepare a useful first response.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">
          {form.service === "healthcare-technology" && form.projectType === "website" && <><Field label="What kind of website?" name="websiteType" value={text("websiteType")} onChange={set} placeholder="Healthcare practice, corporate, ecommerce…" /><Field label="Approximately how many pages?" name="pageCount" value={text("pageCount")} onChange={set} placeholder="For example: 5–10 pages" /><Field label="Who is the website for?" name="audience" value={text("audience")} onChange={set} placeholder="Patients, professionals, customers…" /><Field label="What should it contain or do?" name="features" value={text("features")} onChange={set} placeholder="Bookings, forms, payments, profiles…" /><SelectField label="Content and branding status" name="contentStatus" value={text("contentStatus")} onChange={set} options={["Ready","Partially ready","Need help with content and design"]} /></>}
          {form.service === "healthcare-technology" && form.projectType === "app" && <><Field label="What kind of app?" name="appType" value={text("appType")} onChange={set} placeholder="Patient, staff, monitoring, business…" /><SelectField label="Preferred platform" name="platform" value={text("platform")} onChange={set} options={["Web app","Android","iPhone / iPad","Android and iOS","Not sure"]} /><Field label="Who will use it?" name="users" value={text("users")} onChange={set} placeholder="Users and estimated number" /><Field label="What must the app do?" name="features" value={text("features")} onChange={set} placeholder="Main functions and user journey" /><Field label="Systems it must connect to" name="integrations" value={text("integrations")} onChange={set} placeholder="Payments, records, APIs…" /></>}
          {form.service === "healthcare-technology" && !["website","app"].includes(text("projectType")) && <><Field label="Who will use the solution?" name="users" value={text("users")} onChange={set} /><Field label="Systems or platforms involved" name="integrations" value={text("integrations")} onChange={set} /></>}
          {form.service === "medical-equipment" && <><Field label="Equipment or consumable required" name="productNames" value={text("productNames")} onChange={set} placeholder="Product names or categories" /><Field label="Quantity required" name="quantity" value={text("quantity")} onChange={set} /><Field label="Specifications, brand or model" name="specifications" value={text("specifications")} onChange={set} placeholder="Include sizes or standards if known" /><Field label="Delivery location" name="deliveryLocation" value={text("deliveryLocation")} onChange={set} /></>}
          {form.service === "professional-services" && <><SelectField label="Support required" name="supportType" value={text("supportType")} onChange={set} options={["Consulting and strategy","Project implementation","Security review","Training and adoption","Managed support","Not sure"]} /><Field label="Current challenge" name="challenge" value={text("challenge")} onChange={set} placeholder="What needs to improve?" /></>}
          {form.service === "strategic-partnerships" && <><SelectField label="Partnership type" name="partnershipType" value={text("partnershipType")} onChange={set} options={["Technology partnership","Supplier or distribution","Implementation partnership","Pilot or proof of concept","Other"]} /><Field label="Your proposed contribution" name="proposal" value={text("proposal")} onChange={set} placeholder="Products, technology, market access…" /></>}
          <label className={`${labelClass} sm:col-span-2`}>Describe the requirement in your own words *<textarea required value={text("requirements")} onChange={(event) => set("requirements", event.target.value)} rows={5} className={inputClass} placeholder="What are you trying to achieve, and what would a successful outcome look like?" /></label>
          <SelectField label="Preferred timeline *" name="timeline" value={text("timeline")} onChange={set} options={["As soon as possible","Within 1 month","1–3 months","3–6 months","Flexible / planning stage"]} />
          <SelectField label="Estimated budget" name="budget" value={text("budget")} onChange={set} options={["Still exploring","Under R10,000","R10,000–R50,000","R50,000–R150,000","R150,000+","Prefer to discuss"]} />
        </div></div>}

        {step === 3 && <div><h2 className="text-2xl font-semibold text-blue-950 sm:text-3xl">How should we contact you?</h2><p className="mt-3 text-slate-600">Please provide the person and organisation responsible for this enquiry.</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field required label="Full name" name="fullName" value={text("fullName")} onChange={set} /><Field required label="Company or organisation" name="company" value={text("company")} onChange={set} /><Field label="Your role" name="role" value={text("role")} onChange={set} /><Field label="City / location" name="location" value={text("location")} onChange={set} /><Field required type="email" label="Email address" name="email" value={text("email")} onChange={set} /><Field required type="tel" label="Phone / WhatsApp number" name="phone" value={text("phone")} onChange={set} /></div><fieldset className="mt-7"><legend className={labelClass}>Preferred communication method</legend><div className="mt-3 grid gap-3 sm:grid-cols-3">{[["call","Phone call"],["email","Email"],["whatsapp","WhatsApp"]].map(([value,label]) => <Choice key={value} name="preferredContact" value={value} label={label} selected={form.preferredContact === value} onChange={() => set("preferredContact", value)} />)}</div></fieldset></div>}

        {step === 4 && <div><h2 className="text-2xl font-semibold text-blue-950 sm:text-3xl">Review and submit.</h2><div className="mt-7 grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm sm:grid-cols-2 sm:p-7"><Summary label="Request" value={text("intent")} /><Summary label="Service" value={serviceName} /><Summary label="Name" value={text("fullName")} /><Summary label="Organisation" value={text("company")} /><Summary label="Preferred contact" value={text("preferredContact")} /><Summary label="Timeline" value={text("timeline")} /></div><label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm leading-6 text-slate-600"><input type="checkbox" checked={Boolean(form.consent)} onChange={(event) => set("consent", event.target.checked)} className="mt-1 h-5 w-5 accent-blue-700" /><span>I confirm that the information is accurate and allow CustoNexus Technologies to contact me about this enquiry. *</span></label>{status === "error" && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</p>}</div>}

        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">{step > 1 ? <button type="button" onClick={() => { setStep((value) => value - 1); setStatus("idle"); }} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"><ArrowLeft size={18} /> Back</button> : <span />}{step < 4 ? <button type="button" disabled={!canContinue} onClick={() => setStep((value) => value + 1)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-3.5 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40">Continue <ArrowRight size={18} /></button> : <button type="button" disabled={!form.consent || status === "sending"} onClick={submit} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-7 py-3.5 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40">{status === "sending" ? <><LoaderCircle className="animate-spin" size={19} /> Sending…</> : <>Submit enquiry <ArrowRight size={18} /></>}</button>}</div>
      </div>
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={text("website")} onChange={(event) => set("website", event.target.value)} />
    </div>
  );
}

function Choice({ name, value, label, description, selected, onChange }: { name: string; value: string; label: string; description?: string; selected: boolean; onChange: () => void }) { return <label className={`cursor-pointer rounded-2xl border p-4 transition ${selected ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"}`}><input type="radio" name={name} value={value} checked={selected} onChange={onChange} className="sr-only" /><span className="font-bold text-slate-950">{label}</span>{description && <span className="mt-1 block text-sm leading-6 text-slate-500">{description}</span>}</label>; }
function Field({ label, name, value, onChange, placeholder, required, type = "text" }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; placeholder?: string; required?: boolean; type?: string }) { return <label className={labelClass}>{label}{required && " *"}<input type={type} required={required} value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} className={inputClass} /></label>; }
function SelectField({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; options: string[] }) { return <label className={labelClass}>{label}<select value={value} onChange={(event) => onChange(name, event.target.value)} className={inputClass}><option value="">Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function Summary({ label, value }: { label: string; value: string }) { return <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 font-semibold capitalize text-slate-900">{value || "Not provided"}</p></div>; }
