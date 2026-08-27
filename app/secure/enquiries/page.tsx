import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";

import Container from "@/components/Container";
import { auth } from "@/lib/auth";
import { getEnquiries } from "@/lib/enquiries";

export default async function EnquiriesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/secure/login");
  const enquiries = await getEnquiries();

  return <main className="min-h-screen bg-slate-50 py-10"><Container><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Link href="/secure/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={17} /> Dashboard</Link><h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Website enquiries</h1><p className="mt-2 text-slate-600">Quote, callback and service requests submitted through the public contact form.</p></div><div className="rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white">{enquiries.length} total</div></div>
    <div className="mt-8 space-y-5">{enquiries.length === 0 ? <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">No enquiries have been submitted yet.</div> : enquiries.map((enquiry) => { const details = JSON.parse(enquiry.details) as Record<string,string>; const digits = enquiry.phone.replace(/\D/g, ""); const whatsappNumber = digits.startsWith("0") ? `27${digits.slice(1)}` : digits; return <article key={enquiry.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-blue-700">{enquiry.intent}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700">{enquiry.service.replaceAll("-", " ")}</span></div><h2 className="mt-4 text-xl font-bold text-slate-950">{enquiry.fullName} · {enquiry.company}</h2><p className="mt-1 text-sm text-slate-500">{new Date(enquiry.createdAt).toLocaleString("en-ZA")}</p></div><div className="flex gap-2"><a href={`tel:${enquiry.phone}`} aria-label={`Call ${enquiry.fullName}`} className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-blue-700"><Phone size={19} /></a><a href={`mailto:${enquiry.email}`} aria-label={`Email ${enquiry.fullName}`} className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-blue-700"><Mail size={19} /></a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${enquiry.fullName}`} className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><MessageCircle size={19} /></a></div></div><dl className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3"><Detail label="Email" value={enquiry.email} /><Detail label="Phone" value={enquiry.phone} /><Detail label="Preferred contact" value={enquiry.preferredContact} />{Object.entries(details).map(([key,value]) => <Detail key={key} label={key.replace(/([A-Z])/g, " $1")} value={value} />)}</dl></article>; })}</div></Container></main>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 whitespace-pre-wrap leading-7 text-slate-800">{value}</dd></div>; }
