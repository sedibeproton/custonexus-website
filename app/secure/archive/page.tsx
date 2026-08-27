import Link from "next/link";
import { ArrowLeft, FilePlus2, Files, Inbox } from "lucide-react";
import { requireSecurePage } from "@/lib/business/page-auth";
import { getDocuments } from "@/lib/documents";

export default async function ArchiveWorkspacePage() {
  await requireSecurePage();
  const documents = await getDocuments();
  const areas = [
    { title: "Browse files", description: `${documents.length} file${documents.length === 1 ? "" : "s"} currently stored in the company vault.`, href: "/secure/documents", action: "View archive", icon: Files },
    { title: "Upload a file", description: "Add a new company record to secure private storage.", href: "/secure/upload", action: "Upload file", icon: FilePlus2 },
    { title: "Customer enquiries", description: "Review enquiries submitted through the public website.", href: "/secure/enquiries", action: "View enquiries", icon: Inbox },
  ];
  return <main className="min-h-screen bg-slate-100 px-4 py-16 sm:px-6"><div className="mx-auto max-w-7xl">
    <Link href="/secure/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={17}/> Workspace</Link>
    <header className="mt-6 rounded-[2rem] bg-gradient-to-br from-blue-700 to-blue-950 p-8 text-white shadow-xl sm:p-11"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Company records</p><h1 className="mt-3 text-4xl font-bold">Company Archive</h1><p className="mt-4 max-w-2xl leading-7 text-blue-100">A secure home for internal documents, organisational records and incoming customer enquiries.</p></header>
    <section className="mt-8 grid gap-5 md:grid-cols-3">{areas.map(({ title, description, href, action, icon: Icon }) => <Link key={href} href={href} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon size={25}/></div><h2 className="mt-7 text-xl font-bold text-slate-950">{title}</h2><p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">{description}</p><p className="mt-6 border-t border-slate-100 pt-4 text-sm font-bold text-blue-700">{action} →</p></Link>)}</section>
  </div></main>;
}
