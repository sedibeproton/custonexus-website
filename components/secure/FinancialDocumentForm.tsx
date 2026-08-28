"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { calculateFinancialTotals, formatZar, parseMoneyToCents, parseQuantityToMilli } from "@/lib/business/finance";
import type { BankAccountRecord, ClientRecord, CompanySettings, InvoiceRecord, QuoteRecord } from "@/lib/business/types";

type DraftLine = { description:string; quantity:string; unit:string; unitPrice:string; discount:string; discountType:"CASH"|"PERCENT" };
const emptyLine=():DraftLine=>({description:"",quantity:"1",unit:"each",unitPrice:"0.00",discount:"0",discountType:"CASH"});

export default function FinancialDocumentForm({kind,clients,settings,bankAccounts:initialBankAccounts=[],initial}:{kind:"quote"|"invoice";clients:ClientRecord[];settings:CompanySettings;bankAccounts?:BankAccountRecord[];initial?:QuoteRecord|InvoiceRecord}) {
  const router=useRouter();
  const [lines,setLines]=useState<DraftLine[]>(initial?.lines.map(line=>({description:line.description,quantity:String(line.quantityMilli/1000),unit:line.unit,unitPrice:(line.unitPriceCents/100).toFixed(2),discount:line.discountType==="PERCENT"?(line.discountBasisPoints/100).toFixed(2):(line.discountCents/100).toFixed(2),discountType:line.discountType}))||[emptyLine()]);
  const [taxType,setTaxType]=useState(initial?.taxType||"STANDARD");
  const [customTaxPercent,setCustomTaxPercent]=useState(initial?.taxType==="CUSTOM"?(initial.taxBasisPoints/100).toFixed(2):"15.00");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [bankAccounts,setBankAccounts]=useState(initialBankAccounts);
  const taxBps=taxType==="STANDARD"?settings.vatBasisPoints:taxType==="CUSTOM"?safeMoney(customTaxPercent):0;
  const totals=useMemo(()=>{try{return calculateFinancialTotals(lines.map(line=>{const quantityMilli=parseQuantityToMilli(line.quantity),unitPriceCents=parseMoneyToCents(line.unitPrice);let discountCents=parseMoneyToCents(line.discount||"0");if(line.discountType==="PERCENT"){const bps=parseMoneyToCents(line.discount||"0");if(bps>10000)throw new Error("Discount exceeds 100%.");const gross=(BigInt(quantityMilli)*BigInt(unitPriceCents)+BigInt(500))/BigInt(1000);discountCents=Number((gross*BigInt(bps)+BigInt(5000))/BigInt(10000));}return{description:line.description||"Item",quantityMilli,unit:line.unit||"each",unitPriceCents,discountCents};}),taxBps);}catch{return null;}},[lines,taxBps]);
  const field="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
  const issue=kind==="quote"?(initial as QuoteRecord|undefined)?.issueDate:(initial as InvoiceRecord|undefined)?.invoiceDate;
  const secondary=kind==="quote"?(initial as QuoteRecord|undefined)?.expiryDate:(initial as InvoiceRecord|undefined)?.dueDate;

  useEffect(()=>{if(initialBankAccounts.length)return;void fetch("/api/business/bank-accounts").then(response=>response.ok?response.json():Promise.reject()).then(data=>setBankAccounts(data.accounts||[])).catch(()=>setBankAccounts([]));},[initialBankAccounts.length]);

  function update(index:number,key:keyof DraftLine,value:string){setLines(current=>current.map((line,i)=>i===index?{...line,[key]:value}:line));}
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setBusy(true);setError("");
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),30000);
    try{
      const form=Object.fromEntries(new FormData(event.currentTarget));
      const payload={...form,taxType,customTaxPercent,lines};
      const endpoint=initial?`/api/business/${kind==="quote"?"quotes":"invoices"}/${initial.id}`:`/api/business/${kind==="quote"?"quotes":"invoices"}`;
      const response=await fetch(endpoint,{method:initial?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),signal:controller.signal});
      const data=await response.json().catch(()=>({error:"The server returned an invalid response."}));
      if(!response.ok)throw new Error(data.error||"Unable to save draft.");
      setBusy(false);
      router.push(`/secure/${kind==="quote"?"quotes":"invoices"}/${initial?.id||data.id}`);
      router.refresh();
    }catch(cause){setError(cause instanceof DOMException&&cause.name==="AbortError"?"Saving took too long. Please check your connection and try again.":cause instanceof Error?cause.message:"Unable to save draft.");setBusy(false);}finally{clearTimeout(timeout);}
  }

  return <form onSubmit={submit} className="space-y-6">
    <section className="grid gap-5 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-bold">Client<select name="clientId" defaultValue={initial?.clientId} required className={field}><option value="">Select client</option>{clients.map(client=><option key={client.id} value={client.id}>{client.companyName}</option>)}</select></label>
      <label className="text-sm font-bold">Reference<input name="reference" defaultValue={initial?.reference||""} className={field}/></label>
      <label className="text-sm font-bold">{kind==="quote"?"Issue date":"Invoice date"}<input name="issueDate" type="date" defaultValue={issue||new Date().toISOString().slice(0,10)} required className={field}/></label>
      <label className="text-sm font-bold">{kind==="quote"?"Valid until":"Due date"}<input name="secondaryDate" type="date" defaultValue={secondary} required className={field}/></label>
      <label className="text-sm font-bold">Tax treatment<select value={taxType} onChange={event=>setTaxType(event.target.value)} className={field}><option value="STANDARD">Standard VAT ({(settings.vatBasisPoints/100).toFixed(2)}%)</option><option value="ZERO">VAT zero-rated (0%)</option><option value="EXEMPT">Tax exempt</option><option value="NONE">No tax</option><option value="CUSTOM">Custom tax rate</option></select></label>
      {taxType==="CUSTOM"&&<div className="grid grid-cols-2 gap-3"><label className="text-sm font-bold">Tax label<input name="customTaxLabel" defaultValue="Tax" className={field}/></label><label className="text-sm font-bold">Rate (%)<input value={customTaxPercent} onChange={event=>setCustomTaxPercent(event.target.value)} inputMode="decimal" className={field}/></label></div>}
      <label className="text-sm font-bold">Payment bank account<select name="bankAccountId" defaultValue={initial?.bankAccountId||""} className={field}><option value="">Do not show banking details</option>{bankAccounts.map(account=><option key={account.id} value={account.id}>{account.label} — {account.bankName}</option>)}</select></label>
      <label className="text-sm font-bold sm:col-span-2">Description<textarea name="description" defaultValue={initial?.description||""} rows={2} className={field}/></label>
    </section>

    <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-8"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Line items</h2><button type="button" onClick={()=>setLines(value=>[...value,emptyLine()])} className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">+ Add line</button></div><div className="mt-5 space-y-4">{lines.map((line,index)=><div key={index} className="grid gap-3 rounded-2xl border border-slate-200 p-4 xl:grid-cols-[2fr_.55fr_.65fr_.85fr_.65fr_.8fr_auto]">
      <label className="text-xs font-bold">Description<input value={line.description} onChange={event=>update(index,"description",event.target.value)} className={field} required/></label>
      <label className="text-xs font-bold">Quantity<input value={line.quantity} onChange={event=>update(index,"quantity",event.target.value)} inputMode="decimal" className={field} required/></label>
      <label className="text-xs font-bold">Unit<input value={line.unit} onChange={event=>update(index,"unit",event.target.value)} className={field} required/></label>
      <label className="text-xs font-bold">Unit price<input value={line.unitPrice} onChange={event=>update(index,"unitPrice",event.target.value)} inputMode="decimal" className={field} required/></label>
      <label className="text-xs font-bold">Discount<input value={line.discount} onChange={event=>update(index,"discount",event.target.value)} inputMode="decimal" className={field}/></label>
      <label className="text-xs font-bold">Discount type<select value={line.discountType} onChange={event=>update(index,"discountType",event.target.value)} className={field}><option value="CASH">Cash (R)</option><option value="PERCENT">Percentage (%)</option></select></label>
      <button type="button" disabled={lines.length===1} onClick={()=>setLines(value=>value.filter((_,i)=>i!==index))} className="self-end rounded-xl px-3 py-2.5 text-red-700 disabled:opacity-30">Remove</button>
    </div>)}</div></section>

    <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-[1fr_320px] sm:p-8"><div className="space-y-5"><label className="text-sm font-bold">Notes<textarea name="notes" defaultValue={initial?.notes||""} rows={4} className={field}/></label><label className="text-sm font-bold">{kind==="quote"?"Terms and conditions":"Payment terms"}<textarea name="terms" defaultValue={(kind==="quote"?(initial as QuoteRecord|undefined)?.terms:(initial as InvoiceRecord|undefined)?.paymentTerms)||(kind==="quote"?settings.quoteTerms:settings.invoiceTerms)||""} rows={5} className={field}/></label></div><div className="rounded-2xl bg-slate-950 p-6 text-white"><h3 className="font-bold">Financial summary</h3><dl className="mt-5 space-y-3 text-sm"><Summary label="Subtotal" value={totals?.subtotalCents}/><Summary label="Discount" value={totals?.discountCents}/><Summary label="Tax" value={totals?.taxCents}/><div className="flex justify-between border-t border-white/20 pt-4 text-lg font-bold"><dt>Total</dt><dd>{totals?formatZar(totals.totalCents):"—"}</dd></div></dl><p className="mt-5 text-xs text-slate-300">{taxType==="STANDARD"?`Standard VAT at ${(settings.vatBasisPoints/100).toFixed(2)}%`:taxType==="CUSTOM"?`Custom tax at ${customTaxPercent}%`:taxType==="ZERO"?"VAT zero-rated":taxType==="EXEMPT"?"Tax exempt":"No tax"}</p></div></section>
    {error&&<p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    <button disabled={busy||!totals} className="rounded-xl bg-blue-700 px-7 py-3 font-bold text-white disabled:opacity-50">{busy?"Saving draft…":initial?"Save draft":`Create ${kind} draft`}</button>
  </form>;
}

function safeMoney(value:string){try{return parseMoneyToCents(value);}catch{return 0;}}
function Summary({label,value}:{label:string;value:number|undefined}){return <div className="flex justify-between"><dt>{label}</dt><dd>{value===undefined?"—":formatZar(value)}</dd></div>;}
