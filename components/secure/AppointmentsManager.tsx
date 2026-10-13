"use client";

import {useState} from "react";
import type {BookingRecord,BookingStatus} from "@/lib/consultations";

const statuses:BookingStatus[]=["PENDING","CONFIRMED","RESCHEDULE_PROPOSED","DECLINED","COMPLETED","NO_SHOW","CANCELLED"];
const labels:Record<BookingStatus,string>={PENDING:"Awaiting approval",CONFIRMED:"Approved",RESCHEDULE_PROPOSED:"Reschedule proposed",DECLINED:"Declined",COMPLETED:"Completed",NO_SHOW:"No show",CANCELLED:"Cancelled"};
const formatter=new Intl.DateTimeFormat("en-ZA",{timeZone:"Africa/Johannesburg",dateStyle:"full",timeStyle:"short"});

export default function AppointmentsManager({initialBookings}:{initialBookings:BookingRecord[]}){
  const[bookings,setBookings]=useState(initialBookings);
  const[filter,setFilter]=useState("");
  const[busy,setBusy]=useState("");
  const[error,setError]=useState("");
  const[notes,setNotes]=useState<Record<string,string>>({});
  const[proposedTimes,setProposedTimes]=useState<Record<string,string>>({});

  async function patch(id:string,payload:Record<string,string>){
    setBusy(id);setError("");
    try{
      const response=await fetch("/api/business/appointments",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,...payload})});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||"Unable to update this consultation request.");
      const updated=(result.booking??result) as BookingRecord;
      setBookings(rows=>rows.map(row=>row.id===id?updated:row));
    }catch(reason){setError(reason instanceof Error?reason.message:"Unable to update this consultation request.")}
    finally{setBusy("")}
  }

  function review(id:string,decision:"APPROVE"|"DECLINE"|"PROPOSE_RESCHEDULE"){
    const localTime=proposedTimes[id];
    if(decision==="PROPOSE_RESCHEDULE"&&!localTime){setError("Choose a proposed date and time first.");return}
    const newStartsAt=localTime?new Date(`${localTime}:00+02:00`).toISOString():"";
    void patch(id,{action:decision,note:notes[id]||"",proposedStartsAt:newStartsAt});
  }

  const rows=bookings.filter(row=>!filter||row.status===filter);
  return <>
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-slate-600">Approve requests, propose a different time or decline with a clear note.</p><select aria-label="Filter appointments by status" value={filter} onChange={event=>setFilter(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3"><option value="">All statuses</option>{statuses.map(status=><option key={status} value={status}>{labels[status]}</option>)}</select></div>
    {error&&<p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-800">{error}</p>}
    <div className="grid gap-4">{rows.length?rows.map(row=><article key={row.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-bold text-slate-950">{row.customerName}</h2><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">{labels[row.status]}</span></div><p className="mt-2 font-semibold text-blue-800">{row.consultationType}</p><p className="mt-1 text-sm text-slate-600">{formatter.format(new Date(row.startsAt))}</p><p className="mt-3 text-sm text-slate-700">{row.businessName||"No business supplied"} · <a className="underline" href={`mailto:${row.email}`}>{row.email}</a> · <a className="underline" href={`tel:${row.phone}`}>{row.phone}</a></p>{row.projectDescription&&<p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{row.projectDescription}</p>}{row.reviewNote&&<p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700"><strong>Review note:</strong> {row.reviewNote}</p>}<p className="mt-3 text-xs font-semibold text-slate-400">Reference {row.reference}</p></div>
      {row.status==="CONFIRMED"&&<select aria-label={`Update status for ${row.customerName}`} disabled={busy===row.id} value={row.status} onChange={event=>void patch(row.id,{status:event.target.value})} className="rounded-xl border border-slate-300 px-3 py-2 font-semibold"><option value={row.status}>{labels[row.status]}</option><option value="COMPLETED">Completed</option><option value="NO_SHOW">No show</option><option value="CANCELLED">Cancelled</option></select>}</div>
      {(row.status==="PENDING"||row.status==="RESCHEDULE_PROPOSED")&&<div className="mt-5 border-t border-slate-100 pt-5"><label className="block text-sm font-semibold text-slate-800">Review note <span className="font-normal text-slate-500">(included in the customer email)</span><textarea rows={2} value={notes[row.id]||""} onChange={event=>setNotes(current=>({...current,[row.id]:event.target.value}))} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2"/></label><div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]"><label className="text-sm font-semibold text-slate-800">Proposed Johannesburg date and time<input type="datetime-local" value={proposedTimes[row.id]||""} onChange={event=>setProposedTimes(current=>({...current,[row.id]:event.target.value}))} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2"/></label><button disabled={busy===row.id} onClick={()=>review(row.id,"PROPOSE_RESCHEDULE")} className="self-end rounded-xl border border-blue-700 px-4 py-3 font-bold text-blue-800 disabled:opacity-50">Propose new time</button><div className="flex gap-2 self-end"><button disabled={busy===row.id} onClick={()=>review(row.id,"DECLINE")} className="rounded-xl border border-red-300 px-4 py-3 font-bold text-red-700 disabled:opacity-50">Decline</button><button disabled={busy===row.id} onClick={()=>review(row.id,"APPROVE")} className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white disabled:opacity-50">Approve</button></div></div></div>}
    </article>):<p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">No appointments match this filter.</p>}</div>
  </>;
}
