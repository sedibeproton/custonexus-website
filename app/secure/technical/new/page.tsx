import TechnicalJobForm from "@/components/secure/TechnicalJobForm";
import SecurePageHeader from "@/components/secure/SecurePageHeader";
import { requireSecurePage } from "@/lib/business/page-auth";
import { listClients } from "@/lib/business/service";
export default async function NewTechnicalJobPage(){await requireSecurePage();const clients=await listClients();return <main className="min-h-screen bg-slate-100 px-4 py-12 sm:px-6 sm:py-16"><div className="mx-auto max-w-5xl"><SecurePageHeader eyebrow="Technical operations" title="New job card" description="Capture the client, equipment, scope and technician responsible for the work."/>{clients.length?<div className="mt-7"><TechnicalJobForm clients={clients}/></div>:<div className="mt-7 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900">Create an active client in Financial Management before opening a job card.</div>}</div></main>}
