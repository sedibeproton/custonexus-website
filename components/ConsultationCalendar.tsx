"use client";

import {useEffect,useMemo,useState} from "react";
import {ChevronLeft,ChevronRight,LoaderCircle} from "lucide-react";
import {monthGrid,monthIntersectsRange,shiftMonth} from "@/lib/consultation-calendar";

type MonthAvailability={month:string;today:string;maximumDate:string;durationMinutes:number;days:Record<string,number>};
const monthLabel=new Intl.DateTimeFormat("en-ZA",{month:"long",year:"numeric",timeZone:"UTC"});
const fullDateLabel=new Intl.DateTimeFormat("en-ZA",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});

function currentMonth(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Africa/Johannesburg",year:"numeric",month:"2-digit"}).format(new Date())}
function utcDate(value:string){return new Date(`${value}T00:00:00Z`)}

export default function ConsultationCalendar({selectedDate,onSelect}:{selectedDate:string;onSelect:(date:string)=>void}){
  const[month,setMonth]=useState(currentMonth());
  const[data,setData]=useState<MonthAvailability|null>(null);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState("");
  const cells=useMemo(()=>monthGrid(month),[month]);

  useEffect(()=>{const controller=new AbortController();fetch(`/api/consultations/availability/month?month=${encodeURIComponent(month)}`,{signal:controller.signal,cache:"no-store"}).then(async response=>{const result=await response.json();if(!response.ok)throw new Error(result.error||"Unable to load the calendar.");setData(result);setError("")}).catch(reason=>{if(reason.name!=="AbortError")setError(reason.message)}).finally(()=>setLoading(false));return()=>controller.abort()},[month]);
  function navigate(offset:number){onSelect("");setLoading(true);setData(null);setError("");setMonth(value=>shiftMonth(value,offset))}
  const previous=shiftMonth(month,-1),next=shiftMonth(month,1),canPrevious=data?monthIntersectsRange(previous,data.today,data.maximumDate):false,canNext=data?monthIntersectsRange(next,data.today,data.maximumDate):false;

  return <section aria-labelledby="calendar-heading" className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-5">
    <div className="flex items-center justify-between gap-3">
      <button type="button" onClick={()=>navigate(-1)} disabled={!canPrevious||loading} aria-label="Show previous month" className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-800 transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft aria-hidden size={20}/></button>
      <h2 id="calendar-heading" aria-live="polite" className="text-center text-lg font-bold text-slate-950 sm:text-xl">{monthLabel.format(utcDate(`${month}-01`))}</h2>
      <button type="button" onClick={()=>navigate(1)} disabled={!canNext||loading} aria-label="Show next month" className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-800 transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight aria-hidden size={20}/></button>
    </div>
    <div className="mt-4 grid min-w-0 grid-cols-7 text-center text-[9px] font-bold uppercase tracking-normal text-slate-500 sm:text-xs sm:tracking-wider" aria-hidden="true">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=><span key={day} className="min-w-0 py-2">{day}</span>)}</div>
    {loading?<div role="status" className="flex min-h-72 items-center justify-center gap-2 text-slate-600"><LoaderCircle className="animate-spin motion-reduce:animate-none" size={20}/>Loading calendar…</div>:error?<p role="alert" className="my-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center font-semibold text-red-800">{error}</p>:<div role="grid" aria-labelledby="calendar-heading" className="grid min-w-0 grid-cols-7 gap-1 sm:gap-2">{cells.map(cell=>{const count=cell.inMonth?(data?.days[cell.date]||0):0,available=cell.inMonth&&count>0&&Boolean(data)&&cell.date>=data!.today&&cell.date<=data!.maximumDate,selected=selectedDate===cell.date,label=`${fullDateLabel.format(utcDate(cell.date))}: ${available?`${count} appointment ${count===1?"time":"times"} available`:"unavailable"}`;return <button role="gridcell" key={cell.date} type="button" disabled={!available} aria-label={label} aria-selected={selected} onClick={()=>onSelect(cell.date)} className={`relative aspect-square min-h-9 min-w-0 rounded-lg border p-0 text-xs font-bold transition focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:min-h-12 sm:rounded-xl sm:text-sm ${!cell.inMonth?"invisible":""} ${selected?"border-blue-700 bg-blue-700 text-white shadow-md":available?"border-blue-100 bg-white text-blue-950 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 motion-reduce:transform-none":"cursor-not-allowed border-transparent bg-slate-100 text-slate-400"}`}><span>{cell.day}</span>{available&&!selected&&<span aria-hidden className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-500 sm:bottom-1.5"/>}</button>})}</div>}
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Available</span><span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-slate-200"/>Unavailable</span></div>
  </section>
}
