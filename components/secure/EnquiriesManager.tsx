"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import type { EnquiryRecord } from "@/lib/enquiries";

export default function EnquiriesManager({ initialEnquiries, isAdmin }: { initialEnquiries: EnquiryRecord[]; isAdmin: boolean }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [error, setError] = useState("");

  async function remove(enquiry: EnquiryRecord) {
    if (!window.confirm(`Permanently delete the enquiry from ${enquiry.fullName}?`)) return;
    setError("");
    const response = await fetch("/api/enquiries", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: enquiry.id }) });
    const data = await response.json();
    if (!response.ok) return setError(data.error || "Unable to delete enquiry.");
    setEnquiries((current) => current.filter((item) => item.id !== enquiry.id));
  }

  return <>
    <div className="mt-8 space-y-5">
      {enquiries.length === 0 ? <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">No enquiries have been submitted yet.</div> : enquiries.map((enquiry) => {
        let details: Record<string, string> = {};
        try { details = JSON.parse(enquiry.details) as Record<string, string>; } catch { /* Keep malformed legacy enquiries accessible. */ }
        const digits = enquiry.phone.replace(/\D/g, "");
        const whatsappNumber = digits.startsWith("0") ? `27${digits.slice(1)}` : digits;
        return <article key={enquiry.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <div className="flex flex-wrap gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-blue-700">{enquiry.intent}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700">{enquiry.service.replaceAll("-", " ")}</span></div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">{enquiry.fullName} - {enquiry.company}</h2>
              <p className="mt-1 text-sm text-slate-500">{new Date(enquiry.createdAt).toLocaleString("en-ZA")}</p>
            </div>
            <div className="flex gap-2">
              {enquiry.phone && <IconLink href={`tel:${enquiry.phone}`} label={`Call ${enquiry.fullName}`} icon={<Phone size={19} />} />}
              <IconLink href={`mailto:${enquiry.email}`} label={`Email ${enquiry.fullName}`} icon={<Mail size={19} />} />
              {whatsappNumber && <IconLink href={`https://wa.me/${whatsappNumber}`} label={`WhatsApp ${enquiry.fullName}`} icon={<MessageCircle size={19} />} external />}
              {isAdmin && <button type="button" onClick={() => void remove(enquiry)} aria-label={`Delete enquiry from ${enquiry.fullName}`} className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"><Trash2 size={19} /></button>}
            </div>
          </div>
          <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Email" value={enquiry.email} /><Detail label="Phone" value={enquiry.phone} /><Detail label="Preferred contact" value={enquiry.preferredContact} />
            {Object.entries(details).map(([key, value]) => <Detail key={key} label={key.replace(/([A-Z])/g, " $1")} value={value} />)}
          </dl>
        </article>;
      })}
    </div>
    {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
  </>;
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{value}</dd></div>;
}

function IconLink({ href, label, icon, external = false }: { href: string; label: string; icon: React.ReactNode; external?: boolean }) {
  return <a href={href} aria-label={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">{icon}</a>;
}
