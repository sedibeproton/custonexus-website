"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban } from "lucide-react";
import type { PaymentRecord } from "@/lib/business/types";
import { formatZar } from "@/lib/business/finance";

export default function PaymentHistory({invoiceId,payments,isAdmin}:{invoiceId:string;payments:PaymentRecord[];isAdmin:boolean}){
  const router=useRouter(),[busy,setBusy]=useState(""),[error,setError]=useState("");
  async function voidRecord(payment:PaymentRecord){if(!window.confirm(`Void the ${formatZar(payment.amountCents)} payment recorded on ${payment.paymentDate}?`))return;setBusy(payment.id);setError("");try{const response=await fetch(`/api/business/invoices/${invoiceId}/payments/${payment.id}/void`,{method:"POST"}),data=await response.json();if(!response.ok)throw new Error(data.error||"Unable to void payment.");router.refresh();}catch(cause){setError(cause instanceof Error?cause.message:"Unable to void payment.");}finally{setBusy("");}}
  return <section className="mt-7 rounded-3xl bg-white p-7 shadow-sm"><h2 className="text-xl font-bold">Payment history</h2>{payments.length?payments.map(payment=><div key={payment.id} className="grid items-center gap-2 border-b py-4 sm:grid-cols-[150px_1fr_150px_auto]"><span>{payment.paymentDate}</span><span>{payment.paymentMethod}{payment.reference?` • ${payment.reference}`:""}</span><span className="font-bold sm:text-right">{formatZar(payment.amountCents)}</span>{isAdmin&&<button type="button" disabled={busy===payment.id} onClick={()=>void voidRecord(payment)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"><Ban size={14}/>Void</button>}</div>):<p className="mt-4 text-slate-500">No payments recorded.</p>}{error&&<p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}</section>;
}
