import Link from "next/link";
import { ArrowRight, CalendarDays, FilePlus2, Files, ReceiptText, Upload, Wrench } from "lucide-react";
import { requireSecurePage } from "@/lib/business/page-auth";
import { getPersistenceBackend } from "@/lib/persistence-mode";
import { workspaceSections } from "@/components/secure/workspace-sections";

const descriptions = {
  Archive: "Files, folders and website enquiries.",
  Finance: "Clients, quotes, invoices and payments.",
  Technical: "Job cards, service records and certificates.",
  Appointments: "Consultation requests and booking availability.",
  Administration: "Team accounts, company settings, banking and pricing.",
};

const actions = [
  { label: "Browse files", href: "/secure/documents", icon: Files },
  { label: "Upload file", href: "/secure/upload", icon: Upload },
  { label: "New quote", href: "/secure/quotes/new", icon: FilePlus2, postgres: true },
  { label: "New invoice", href: "/secure/invoices/new", icon: ReceiptText, postgres: true },
  { label: "New job card", href: "/secure/technical/new", icon: Wrench, postgres: true },
  { label: "Appointments", href: "/secure/appointments", icon: CalendarDays, admin: true },
];

export default async function SecureDashboardPage() {
  const access = await requireSecurePage();
  const postgres = getPersistenceBackend() === "postgres";
  const sections = workspaceSections.filter(({ adminOnly }) => !adminOnly || access.isAdmin);
  return <main className="min-h-screen bg-slate-100 px-3 py-6 sm:px-6 sm:py-10">
    <div className="mx-auto max-w-6xl">
      <header className="rounded-2xl bg-slate-950 p-5 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-200">CustoNexus</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Workspace</h1>
        <p className="mt-2 break-words text-sm text-slate-200">Signed in as {access.session.user.email} · {access.isAdmin ? "Administrator" : "User"}</p>
      </header>
      <section aria-labelledby="quick-actions" className="mt-6">
        <h2 id="quick-actions" className="text-lg font-bold text-slate-950">Quick actions</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {actions.filter((item) => (!item.admin || access.isAdmin) && (!item.postgres || postgres)).map(({ label, href, icon: Icon }) =>
            <Link key={href} href={href} className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-blue-900 shadow-sm hover:border-blue-300 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600">
              <Icon size={17} aria-hidden className="shrink-0" />{label}
            </Link>)}
        </div>
      </section>
      <section aria-labelledby="work-areas" className="mt-7">
        <h2 id="work-areas" className="text-lg font-bold text-slate-950">Work areas</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {sections.map(({ label, href, links }) => <article key={href} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h3><Link href={href} className="flex min-h-10 items-center justify-between gap-2 rounded-lg text-lg font-bold text-blue-950 focus-visible:ring-2 focus-visible:ring-blue-600">{label}<ArrowRight size={18} aria-hidden /></Link></h3>
            <p className="text-sm text-slate-600">{descriptions[label]}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {links.filter(({ href }) => postgres || !["/secure/clients", "/secure/quotes", "/secure/invoices", "/secure/technical/new", "/secure/settings/company", "/secure/settings/banking"].includes(href)).map(({ label, href }) => <Link key={href} href={href} className="inline-flex min-h-11 items-center rounded-lg bg-slate-50 px-3 text-sm font-semibold text-blue-900 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600">{label}</Link>)}
            </div>
          </article>)}
        </div>
      </section>
    </div>
  </main>;
}
