import Link from "next/link";
import { pricingLabel, type PricingEntry } from "@/lib/pricing";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export default function PricingCards({ entries, preview = false }: { entries: PricingEntry[]; preview?: boolean }) {
  return <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {entries.filter(({ active }) => active).map((entry) => (
      <article key={entry.id} className={`flex flex-col rounded-2xl border bg-white p-5 shadow-sm ${entry.featured ? "border-emerald-600" : "border-slate-200"}`}>
        {entry.featured && <p className="mb-2 text-sm font-bold text-emerald-800">Most Popular</p>}
        <h3 className="font-bold text-blue-950">{entry.name}</h3>
        <p className="mt-2 text-lg font-bold text-blue-800">{pricingLabel(entry)}</p>
        {entry.description && <p className="mt-2 text-sm text-slate-700">{entry.description}</p>}
        {entry.exclusions && entry.exclusions !== entry.description && <p className="mt-2 text-sm text-slate-600">{entry.exclusions}</p>}
        {entry.inclusions.length > 0 && <ul className="my-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {entry.inclusions.map((item) => <li key={item}>{item}</li>)}
        </ul>}
        {!preview && <div className="mt-auto flex flex-wrap gap-3 pt-4 text-sm font-semibold">
          <Link className="rounded-lg bg-blue-800 px-3 py-2 text-white" href={`/contact?package=${entry.id}`}>Request a Quote<span className="sr-only"> for {entry.name}</span></Link>
          <a className="rounded-lg px-2 py-2 text-emerald-800 underline" href={createWhatsAppUrl(`Hello CustoNexus, I'd like to enquire about ${entry.name} (${pricingLabel(entry)}).`)} target="_blank" rel="noopener noreferrer">WhatsApp<span className="sr-only"> about {entry.name}</span></a>
        </div>}
      </article>
    ))}
  </div>;
}
