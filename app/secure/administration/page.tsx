import Link from "next/link";
import { ArrowLeft, Building2, Landmark, ShieldCheck, UsersRound } from "lucide-react";
import { requireSecurePage } from "@/lib/business/page-auth";

export default async function AdministrationPage() {
  const access = await requireSecurePage(true);
  const areas = [
    { title: "User management", description: "Create accounts, reset passwords, assign administrator roles and remove access.", href: "/secure/users", action: "Manage users", icon: UsersRound },
    { title: "Company settings", description: "Maintain company identity, document terms, tax configuration and protected banking details.", href: "/secure/settings/company", action: "Open settings", icon: Building2 },
    { title: "Bank accounts", description: "Add payment accounts and control which banking details can be selected on financial documents.", href: "/secure/settings/banking", action: "Manage bank accounts", icon: Landmark },
  ];
  return <main className="min-h-screen bg-slate-100 px-4 py-16 sm:px-6"><div className="mx-auto max-w-6xl">
    <Link href="/secure/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={17}/> Workspace</Link>
    <header className="mt-6 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-950 p-8 text-white shadow-xl sm:p-11"><ShieldCheck size={36}/><p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Administrator access</p><h1 className="mt-3 text-4xl font-bold">Administration</h1><p className="mt-4 max-w-2xl leading-7 text-slate-300">Control who can access CustoNexus systems and maintain the protected company settings used by financial documents.</p><p className="mt-5 text-sm text-slate-400">Administrator: {access.session.user.email}</p></header>
    <section className="mt-8 grid gap-6 md:grid-cols-2">{areas.map(({ title, description, href, action, icon: Icon }) => <Link key={href} href={href} className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-800"><Icon size={27}/></div><h2 className="mt-8 text-2xl font-bold text-slate-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{description}</p><p className="mt-8 border-t border-slate-100 pt-5 text-sm font-bold text-blue-700">{action} →</p></Link>)}</section>
  </div></main>;
}
