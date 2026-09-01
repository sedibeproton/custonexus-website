import Link from "next/link";

import UploadForm from "./UploadForm";
import { requireSecurePage } from "@/lib/business/page-auth";
import { DEFAULT_MAX_UPLOAD_SIZE, formatUploadLimit, getAdminMaxUploadSize } from "@/lib/uploads";

export default async function UploadFilePage() {
  const access = await requireSecurePage();
  return <main className="min-h-screen bg-slate-100 px-4 py-20 sm:px-6"><div className="mx-auto max-w-2xl"><Link href="/secure/documents" className="text-sm font-semibold text-blue-700 hover:text-blue-900">Back to files</Link><UploadForm isAdmin={access.isAdmin} standardLimit={formatUploadLimit(DEFAULT_MAX_UPLOAD_SIZE)} adminLimit={formatUploadLimit(getAdminMaxUploadSize())}/></div></main>;
}
