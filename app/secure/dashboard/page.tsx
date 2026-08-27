import Link from "next/link";
import { Archive, ArrowRight, Landmark, ShieldCheck } from "lucide-react";
import { requireSecurePage } from "@/lib/business/page-auth";

const workspaceCards = [
  {
    title: "Company Archive",
    description: "Store, organise and retrieve company files, records and enquiries.",
    href: "/secure/archive",
    action: "Open archive",
    icon: Archive,
    accent: "from-blue-700 to-blue-950",
    adminOnly: false,
  },
  {
    title: "Financial Management",
    description: "Manage clients, prepare quotes, issue invoices and record payments.",
    href: "/secure/finance",
    action: "Open financial workspace",
    icon: Landmark,
    accent: "from-cyan-600 to-blue-800",
    adminOnly: false,
  },
  {
    title: "Administration",
    description: "Create users, manage roles and maintain protected company settings.",
    href: "/secure/administration",
    action: "Open administration",
    icon: ShieldCheck,
    accent: "from-slate-800 to-slate-950",
    adminOnly: true,
  },
] as const;

export default async function SecureDashboardPage() {
  const access = await requireSecurePage();
  const cards = workspaceCards.filter((card) => !card.adminOnly || access.isAdmin);

  return <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe_0,_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-4 py-16 sm:px-6 sm:py-24">
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-6 border-b border-slate-200 pb-9 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">CustoNexus secure workspace</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Choose where you want to work.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Your company records, commercial documents and administrative controls are organised into dedicated work areas.</p>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Signed in as</p>
          <p className="mt-1 break-all font-semibold text-slate-900">{access.session.user.email}</p>
          <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{access.isAdmin ? "Administrator" : "User"}</span>
        </div>
      </header>

      <section aria-label="Workspace areas" className={`mt-10 grid gap-6 ${cards.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {cards.map(({ title, description, href, action, icon: Icon, accent }) => <Link key={href} href={href} className="group relative isolate min-h-80 overflow-hidden rounded-[2rem] border border-white/80 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_75px_rgba(15,23,42,0.16)] sm:p-9">
          <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${accent}`} />
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}><Icon aria-hidden="true" size={30}/></div>
          <h2 className="mt-10 text-2xl font-bold text-slate-950">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          <span className="absolute bottom-8 left-7 right-7 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold text-blue-700 sm:left-9 sm:right-9"><span>{action}</span><ArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" size={19}/></span>
        </Link>)}
      </section>

      {!access.isAdmin && <p className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600">Administration is only available to authorised administrators.</p>}
    </div>
  </main>;
}
