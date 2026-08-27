import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import UploadForm from "./UploadForm";
import { auth } from "@/lib/auth";

export default async function UploadFilePage() {
  const session=await auth.api.getSession({headers:await headers()});
  if(!session)redirect("/secure/login");
  return <main className="min-h-screen bg-slate-100 px-4 py-20 sm:px-6"><div className="mx-auto max-w-2xl"><Link href="/secure/documents" className="text-sm font-semibold text-blue-700 hover:text-blue-900">Back to files</Link><UploadForm/></div></main>;
}
