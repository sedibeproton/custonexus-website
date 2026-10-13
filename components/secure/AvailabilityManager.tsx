"use client";

import {FormEvent,useState} from "react";
import type {AvailabilityRule,BlockedPeriod,ConsultationSettings} from "@/lib/consultations";

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function AvailabilityManager({initialSettings,initialRules,initialBlocks}:{initialSettings:ConsultationSettings;initialRules:AvailabilityRule[];initialBlocks:BlockedPeriod[]}){
  const[settings,setSettings]=useState(initialSettings);
  const[rules,setRules]=useState(initialRules);
  const[blocks,setBlocks]=useState(initialBlocks);
  const[message,setMessage]=useState("");

  async function save(){
    setMessage("Saving…");
    const response=await fetch("/api/business/appointments/availability",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({...settings,rules:rules.map(({weekday,startTime,endTime,enabled})=>({weekday,startTime:startTime.slice(0,5),endTime:endTime.slice(0,5),enabled}))})});
    const result=await response.json().catch(()=>({error:"Unable to save availability."}));
    setMessage(response.ok?"Availability saved.":String(result.error||"Unable to save availability."));
  }

  async function addBlock(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget),startsAt=new Date(String(data.get("startsAt"))).toISOString(),endsAt=new Date(String(data.get("endsAt"))).toISOString(),reason=String(data.get("reason")||"");
    const response=await fetch("/api/business/appointments/blocks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({startsAt,endsAt,reason})});
    if(response.ok){const result=await response.json();setBlocks(rows=>[...rows,{id:result.id,startsAt,endsAt,reason}]);event.currentTarget.reset()}
  }

  async function remove(id:string){if((await fetch(`/api/business/appointments/blocks?id=${encodeURIComponent(id)}`,{method:"DELETE"})).ok)setBlocks(rows=>rows.filter(row=>row.id!==id))}
  function ruleFor(day:number){return rules.find(rule=>rule.weekday===day)}
  function change(day:number,field:"enabled"|"startTime"|"endTime",value:boolean|string){setRules(current=>{const existing=current.find(rule=>rule.weekday===day);if(existing)return current.map(rule=>rule.weekday===day?{...rule,[field]:value}:rule);return[...current,{id:`new-${day}`,weekday:day,startTime:"09:00",endTime:"16:00",enabled:field==="enabled"?Boolean(value):true,[field]:value}]})}

  return <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
    <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-2xl font-bold">Working hours</h2><div className="mt-5 grid gap-3">{days.map((day,index)=>{const rule=ruleFor(index);return <div key={day} className="grid items-center gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_auto_auto]"><label className="flex items-center gap-3 font-semibold"><input type="checkbox" checked={rule?.enabled||false} onChange={event=>change(index,"enabled",event.target.checked)}/>{day}</label><input aria-label={`${day} start time`} type="time" value={rule?.startTime.slice(0,5)||"09:00"} onChange={event=>change(index,"startTime",event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/><input aria-label={`${day} end time`} type="time" value={rule?.endTime.slice(0,5)||"16:00"} onChange={event=>change(index,"endTime",event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/></div>})}</div><h3 className="mt-7 font-bold">Booking rules</h3><div className="mt-3 grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold">Duration (minutes)<input type="number" min="5" max="240" value={settings.durationMinutes} onChange={event=>setSettings({...settings,durationMinutes:Number(event.target.value)})} className="mt-2 w-full rounded-lg border p-2"/></label><label className="text-sm font-semibold">Minimum notice (minutes)<input type="number" min="0" value={settings.minimumNoticeMinutes} onChange={event=>setSettings({...settings,minimumNoticeMinutes:Number(event.target.value)})} className="mt-2 w-full rounded-lg border p-2"/></label><label className="text-sm font-semibold">Book ahead (days)<input type="number" min="1" max="365" value={settings.maximumAdvanceDays} onChange={event=>setSettings({...settings,maximumAdvanceDays:Number(event.target.value)})} className="mt-2 w-full rounded-lg border p-2"/></label></div><button onClick={()=>void save()} className="mt-6 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">Save availability</button>{message&&<span role="status" className="ml-4 text-sm font-semibold text-slate-600">{message}</span>}</section>
    <section><form onSubmit={addBlock} className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-2xl font-bold">Block time</h2><label className="mt-4 block text-sm font-semibold">From<input required name="startsAt" type="datetime-local" className="mt-2 w-full rounded-lg border p-3"/></label><label className="mt-4 block text-sm font-semibold">Until<input required name="endsAt" type="datetime-local" className="mt-2 w-full rounded-lg border p-3"/></label><label className="mt-4 block text-sm font-semibold">Reason<input name="reason" maxLength={300} className="mt-2 w-full rounded-lg border p-3"/></label><button className="mt-5 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white">Add blocked period</button></form><div className="mt-5 grid gap-3">{blocks.map(block=><div key={block.id} className="rounded-xl border border-slate-200 bg-white p-4 text-sm"><p className="font-semibold">{new Date(block.startsAt).toLocaleString("en-ZA")} – {new Date(block.endsAt).toLocaleString("en-ZA")}</p>{block.reason&&<p className="mt-1 text-slate-500">{block.reason}</p>}<button onClick={()=>void remove(block.id)} className="mt-3 font-bold text-red-700">Remove</button></div>)}</div></section>
  </div>;
}
