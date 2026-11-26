import Link from "next/link";
import { Building2, Landmark, UsersRound } from "lucide-react";
import SecurePageHeader from "@/components/secure/SecurePageHeader";
import { requireSecurePage } from "@/lib/business/page-auth";

export default async function AdministrationPage() {
  await requireSecurePage(true);
  const areas = [
    { title: "Pricing Management", description: "Edit, preview and publish the public pricing catalogue.", href: "/secure/administration/pricing", action: "Manage pricing", icon: Landmark },
    { title: "User management", description: "Create accounts, reset passwords, assign administrator roles and remove access.", href: "/secure/users", action: "Manage users", icon: UsersRound },
    { title: "Company settings", description: "Maintain company identity, document terms, tax configuration and protected banking details.", href: "/secure/settings/company", action: "Open settings", icon: Building2 },
    { title: "Bank accounts", description: "Add payment accounts and control which banking details can be selected on financial documents.", href: "/secure/settings/banking", action: "Manage bank accounts", icon: Landmark },
  ];
  return <main className="min-h-screen bg-slate-100 px-3 py-5 sm:px-6 sm:py-10"><div className="mx-auto max-w-6xl">
    <SecurePageHeader eyebrow="Administrator access" title="Administration" description="Manage team accounts, company settings, banking and public prices." />
    <section className="mt-4 grid gap-3 sm:grid-cols-2">{areas.map(({ title, description, href, action, icon: Icon }) => <Link key={href} href={href} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-800"><Icon size={27}/></div><h2 className="mt-3 text-xl font-bold text-slate-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{description}</p><p className="mt-4 border-t border-slate-100 pt-5 text-sm font-bold text-blue-700">{action} →</p></Link>)}</section>
  </div></main>;
}
