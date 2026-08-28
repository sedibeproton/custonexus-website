import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import EnquiriesManager from "@/components/secure/EnquiriesManager";
import { requireSecurePage } from "@/lib/business/page-auth";
import { getEnquiries } from "@/lib/enquiries";

export default async function EnquiriesPage(){const access=await requireSecurePage();const enquiries=await getEnquiries();return <main className="min-h-screen bg-slate-50 py-10"><Container><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Link href="/secure/archive" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={17}/> Company Archive</Link><h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Website enquiries</h1><p className="mt-2 text-slate-600">Quote, callback and service requests submitted through the public contact form.</p></div><div className="rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white">{enquiries.length} total</div></div><EnquiriesManager initialEnquiries={enquiries} isAdmin={access.isAdmin}/></Container></main>}
