"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { isValidPhone, isValidWebsite } from "@/lib/enquiry-validation";
import { trackConversion } from "@/lib/analytics";

type Fields = { fullName:string; company:string; email:string; phone:string; currentWebsite:string; mainConcern:string; preferredContact:string; website:string };
const initial: Fields = { fullName:"", company:"", email:"", phone:"", currentWebsite:"", mainConcern:"", preferredContact:"email", website:"" };
const fieldClass = "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export default function WebsiteReviewForm() {
  const [form,setForm]=useState(initial);
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [message,setMessage]=useState("");
  const [reference,setReference]=useState("");
  const set=(name:keyof Fields,value:string)=>{setForm(current=>({...current,[name]:value}));setErrors(current=>{const next={...current};delete next[name];return next;});};

  function validate(){
    const next:Record<string,string>={};
    if(form.fullName.trim().length<2)next.fullName="Please enter your name.";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email.trim()))next.email="Enter a valid email address.";
    if(form.phone&&!isValidPhone(form.phone))next.phone="Enter a valid phone or WhatsApp number.";
    if(form.preferredContact==="whatsapp"&&!form.phone)next.phone="A number is required for WhatsApp contact.";
    if(!form.currentWebsite.trim())next.currentWebsite="Enter the website you would like us to review.";
    else if(!isValidWebsite(form.currentWebsite))next.currentWebsite="Enter a valid website address, such as example.co.za.";
    return next;
  }

  async function submit(event:FormEvent){
    event.preventDefault();
    const next=validate();setErrors(next);if(Object.keys(next).length)return;
    setStatus("sending");setMessage("");
    try{
      const response=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,intent:"review",service:"website-review",projectType:"website-review",consent:true,details:{currentWebsite:form.currentWebsite,mainConcern:form.mainConcern,requirements:`Website review requested${form.mainConcern.trim()?`: ${form.mainConcern.trim()}`:" for a business website."}`,timeline:"Initial review"}})});
      const result=await response.json();
      if(!response.ok){if(result.fields)setErrors(result.fields);throw new Error(result.error||"Unable to request the review.");}
      setReference(result.reference);setStatus("success");trackConversion("website_review_submitted",{form_name:"free_website_review"});
    }catch(error){setStatus("error");setMessage(error instanceof TypeError?"We could not connect. Please try again or use WhatsApp.":error instanceof Error?error.message:"Unable to request the review.");}
  }

  if(status==="success")return <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12"><CheckCircle2 className="mx-auto text-emerald-600" size={54}/><h2 className="mt-5 text-3xl font-bold text-blue-950">Your review request is in.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">We have saved your request under reference <strong>{reference}</strong>. We will use your preferred contact method to arrange the next step.</p></div>;

  return <form onSubmit={submit} noValidate className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,48,105,.12)] sm:p-9">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field required label="Your name" name="fullName" value={form.fullName} set={set} error={errors.fullName}/>
      <Field label="Business name (optional)" name="company" value={form.company} set={set}/>
      <Field required label="Email address" name="email" type="email" value={form.email} set={set} error={errors.email}/>
      <Field label="Phone or WhatsApp (optional)" name="phone" type="tel" value={form.phone} set={set} error={errors.phone}/>
      <div className="sm:col-span-2"><Field required label="Website to review" name="currentWebsite" value={form.currentWebsite} set={set} error={errors.currentWebsite} placeholder="example.co.za"/></div>
      <div className="sm:col-span-2"><label className="block text-sm font-bold text-slate-800">What would you most like to improve? (optional)<textarea value={form.mainConcern} onChange={e=>set("mainConcern",e.target.value)} maxLength={1000} rows={4} className={fieldClass} placeholder="For example: more enquiries, a clearer service journey, mobile usability or a complete redesign"/></label></div>
    </div>
    <fieldset className="mt-6"><legend className="text-sm font-bold text-slate-800">How should we contact you?</legend><div className="mt-3 flex flex-wrap gap-3">{[["email","Email"],["whatsapp","WhatsApp"]].map(([value,label])=><label key={value} className={`cursor-pointer rounded-xl border px-4 py-3 font-semibold ${form.preferredContact===value?"border-blue-600 bg-blue-50 text-blue-800":"border-slate-200 text-slate-600"}`}><input className="sr-only" type="radio" name="preferredContact" value={value} checked={form.preferredContact===value} onChange={()=>set("preferredContact",value)}/>{label}</label>)}</div></fieldset>
    <div className="absolute -left-[10000px]" aria-hidden><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>set("website",e.target.value)}/></label></div>
    {status==="error"&&<p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</p>}
    <button disabled={status==="sending"} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-blue-800 disabled:opacity-60 sm:w-auto">{status==="sending"?<><LoaderCircle className="animate-spin" size={19}/>Sending…</>:<>Request my free review <ArrowRight size={19}/></>}</button>
    <p className="mt-4 text-xs leading-5 text-slate-500">By submitting, you allow CustoNexus Technologies to contact you about this request. Do not include passwords or confidential information.</p>
  </form>;
}

function Field({label,name,value,set,error,required=false,type="text",placeholder=""}:{label:string;name:keyof Fields;value:string;set:(name:keyof Fields,value:string)=>void;error?:string;required?:boolean;type?:string;placeholder?:string}){return <label className="block text-sm font-bold text-slate-800">{label}{required&&<span className="text-blue-700"> *</span>}<input required={required} type={type} value={value} onChange={e=>set(name,e.target.value)} maxLength={200} placeholder={placeholder} aria-invalid={Boolean(error)} className={fieldClass}/>{error&&<span className="mt-2 block text-sm font-medium text-red-700">{error}</span>}</label>}
