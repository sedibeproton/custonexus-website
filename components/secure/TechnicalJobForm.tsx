"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientRecord } from "@/lib/business/types";
import type { TechnicalJobCard } from "@/lib/business/technical-types";

export default function TechnicalJobForm({clients,job}:{clients:ClientRecord[];job?:TechnicalJobCard}){const router=useRouter(),[busy,setBusy]=useState(false),[error,setError]=useState("");const field="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setBusy(true);setError("");const payload=Object.fromEntries(new FormData(event.currentTarget));try{const response=await fetch(job?`/api/business/technical/jobs/${job.id}`:"/api/business/technical/jobs",{method:job?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}),data=await response.json();if(!response.ok)throw new Error(data.error||"Unable to save job card.");router.push(`/secure/technical/jobs/${data.job.id}`);router.refresh();}catch(cause){setError(cause instanceof Error?cause.message:"Unable to save job card.");setBusy(false);}}return <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-9">
  <label className="text-sm font-bold">Client<select name="clientId" defaultValue={job?.clientId||""} required className={field}><option value="" disabled>Select a client</option>{clients.map(client=><option key={client.id} value={client.id}>{client.companyName}</option>)}</select></label>
  <label className="text-sm font-bold">Job title<input name="title" defaultValue={job?.title||""} required maxLength={200} placeholder="e.g. Patient monitor inspection" className={field}/></label>
  <label className="text-sm font-bold">Job type<select name="jobType" defaultValue={job?.jobType||"INSPECTION"} className={field}>{["INSPECTION","SERVICE","CALIBRATION","REPAIR","INSTALLATION","OTHER"].map(value=><option key={value}>{value.replaceAll("_"," ")}</option>)}</select></label>
  <label className="text-sm font-bold">Status<select name="status" defaultValue={job?.status||"DRAFT"} className={field}>{["DRAFT","SCHEDULED","IN_PROGRESS","COMPLETED","CANCELLED"].map(value=><option key={value}>{value.replaceAll("_"," ")}</option>)}</select></label>
  <label className="text-sm font-bold">Received date<input name="receivedDate" type="date" defaultValue={job?.receivedDate||new Date().toISOString().slice(0,10)} required className={field}/></label>
  <label className="text-sm font-bold">Service date<input name="serviceDate" type="date" defaultValue={job?.serviceDate||""} className={field}/></label>
  <label className="text-sm font-bold">Technician name<input name="technicianName" defaultValue={job?.technicianName||""} required maxLength={200} className={field}/></label>
  <label className="text-sm font-bold">Service location<input name="serviceLocation" defaultValue={job?.serviceLocation||""} maxLength={500} className={field}/></label>
  <label className="text-sm font-bold">Equipment / item<input name="equipmentName" defaultValue={job?.equipmentName||""} maxLength={200} className={field}/></label>
  <label className="text-sm font-bold">Manufacturer<input name="manufacturer" defaultValue={job?.manufacturer||""} maxLength={200} className={field}/></label>
  <label className="text-sm font-bold">Model number<input name="modelNumber" defaultValue={job?.modelNumber||""} maxLength={200} className={field}/></label>
  <label className="text-sm font-bold">Serial number<input name="serialNumber" defaultValue={job?.serialNumber||""} maxLength={200} className={field}/></label>
  <label className="text-sm font-bold sm:col-span-2">Asset number<input name="assetNumber" defaultValue={job?.assetNumber||""} maxLength={200} className={field}/></label>
  {[{name:'reportedIssue',label:'Reported issue / customer request',value:job?.reportedIssue},{name:'workPerformed',label:'Work performed',value:job?.workPerformed},{name:'findings',label:'Findings',value:job?.findings},{name:'recommendations',label:'Recommendations',value:job?.recommendations}].map(({name,label,value})=><label key={name} className="text-sm font-bold sm:col-span-2">{label}<textarea name={name} defaultValue={value||""} rows={4} className={field}/></label>)}
  {job&&<p className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900 sm:col-span-2">Mark the job <strong>Completed</strong> only after the technical work and findings are fully recorded. Certificate generation becomes available after completion.</p>}
  {error&&<p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 sm:col-span-2">{error}</p>}
  <button disabled={busy} className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white disabled:opacity-50 sm:col-span-2 sm:w-fit">{busy?"Saving...":job?"Save job card":"Create job card"}</button>
</form>}
