import Link from "next/link";
import { FileCheck2, FileText, Users } from "lucide-react";
import SecurePageHeader from "@/components/secure/SecurePageHeader";
import { requireSecurePage } from "@/lib/business/page-auth";
import { dashboardFinancialSummary } from "@/lib/business/service";
import { formatZar } from "@/lib/business/finance";
import { getPersistenceBackend } from "@/lib/persistence-mode";

export default async function FinancialWorkspacePage() {
  await requireSecurePage();
  const postgresEnabled = getPersistenceBackend() === "postgres";
  const summary = postgresEnabled
    ? await dashboardFinancialSummary()
    : { draftQuotes: 0, outstandingQuotes: 0, acceptedQuotes: 0, unpaidInvoices: 0, overdueInvoices: 0, outstandingInvoiceCents: 0, paidThisMonthCents: 0 };
  const areas = [
    { title: "Clients", description: "Maintain reusable customer and billing profiles.", href: "/secure/clients", createHref: "/secure/clients/new", createLabel: "+ New client", icon: Users },
    { title: "Quotes", description: "Prepare, finalize and track professional quotations.", href: "/secure/quotes", createHref: "/secure/quotes/new", createLabel: "+ New quote", icon: FileText },
    { title: "Invoices", description: "Issue invoices, record payments and monitor balances.", href: "/secure/invoices", createHref: "/secure/invoices/new", createLabel: "+ New invoice", icon: FileCheck2 },
  ];
  const metrics = [["Draft quotes", summary.draftQuotes], ["Accepted quotes", summary.acceptedQuotes], ["Unpaid invoices", summary.unpaidInvoices], ["Overdue invoices", summary.overdueInvoices], ["Outstanding", formatZar(summary.outstandingInvoiceCents)], ["Paid this month", formatZar(summary.paidThisMonthCents)]];
  return <main className="min-h-screen bg-slate-100 px-3 py-5 sm:px-6 sm:py-10"><div className="mx-auto max-w-7xl">
    <SecurePageHeader eyebrow="Commercial operations" title="Finance" description="Manage clients, quotations, invoices and payments." />
    {!postgresEnabled && <div role="status" className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900"><strong>Financial data is unavailable in local SQLite mode.</strong> Configure a development PostgreSQL database and set <code className="rounded bg-amber-100 px-1.5 py-0.5">DATABASE_URL</code> before creating clients, quotes or invoices. Production data has not been accessed.</div>}
    <section className="mt-4 grid gap-3 md:grid-cols-3">{areas.map(({ title, description, href, createHref, createLabel, icon: Icon }) => <article key={href} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon size={25}/></div><h2 className="mt-3 text-xl font-bold text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><div className="mt-4 flex flex-wrap gap-2">{postgresEnabled ? <><Link href={href} className="rounded-xl bg-blue-700 inline-flex min-h-11 items-center px-3 py-2 text-sm font-bold text-white">Open {title.toLowerCase()}</Link><Link href={createHref} className="rounded-xl border border-blue-200 inline-flex min-h-11 items-center px-3 py-2 text-sm font-bold text-blue-700">{createLabel}</Link></> : <span className="rounded-xl bg-slate-100 inline-flex min-h-11 items-center px-3 py-2 text-sm font-bold text-slate-500">PostgreSQL required</span>}</div></article>)}</section>
    <section aria-label="Financial overview" className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-6">{metrics.map(([label, value]) => <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-xl font-bold text-slate-950">{value}</p></div>)}</section>
  </div></main>;
}
