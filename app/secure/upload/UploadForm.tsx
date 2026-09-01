"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FileUp, ShieldCheck } from "lucide-react";

type UploadFormProps = {
  isAdmin: boolean;
  standardLimit: string;
  adminLimit: string;
};

export default function UploadForm({ isAdmin, standardLimit, adminLimit }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [adminSizeException, setAdminSizeException] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return setMessage("Please select a file.");

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      const folderId = new URLSearchParams(window.location.search).get("folder");
      formData.append("file", file);
      if (folderId) formData.append("folderId", folderId);
      if (isAdmin && adminSizeException) formData.append("adminSizeException", "true");

      const response = await fetch("/api/documents/upload", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");

      window.location.assign(folderId ? `/secure/documents?folder=${encodeURIComponent(folderId)}` : "/secure/documents");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload file.");
      setUploading(false);
    }
  }

  const activeLimit = adminSizeException ? adminLimit : standardLimit;

  return <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><FileUp aria-hidden="true" size={27}/></div>
    <h1 className="mt-6 text-3xl font-bold text-slate-900">Upload file</h1>
    <p className="mt-2 text-slate-600">Choose any file to add it to the current folder.</p>

    <form onSubmit={handleSubmit} className="mt-8">
      <label htmlFor="archive-file" className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <FileUp aria-hidden="true" size={38} className="text-blue-600"/>
        <span className="mt-4 break-all font-semibold text-slate-900">{file ? file.name : "Select a file"}</span>
        <span className="mt-2 text-sm text-slate-500">Any format, up to {activeLimit}</span>
        <input id="archive-file" type="file" required className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)}/>
      </label>

      {isAdmin && <div className={`mt-5 rounded-2xl border p-4 transition ${adminSizeException ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-slate-50"}`}>
        <button type="button" role="switch" aria-checked={adminSizeException} onClick={() => setAdminSizeException((enabled) => !enabled)} className="flex w-full items-center justify-between gap-4 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
          <span className="flex items-start gap-3">
            <ShieldCheck aria-hidden="true" className={adminSizeException ? "text-amber-700" : "text-blue-700"} size={22}/>
            <span><span className="block font-bold text-slate-900">Administrator size exception</span><span className="mt-1 block text-sm leading-6 text-slate-600">Temporarily allow this upload to exceed {standardLimit}, up to {adminLimit}.</span></span>
          </span>
          <span aria-hidden="true" className={`relative h-7 w-12 shrink-0 rounded-full transition ${adminSizeException ? "bg-amber-600" : "bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${adminSizeException ? "left-6" : "left-1"}`}/></span>
        </button>
      </div>}

      {message && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}

      <div className="mt-6 flex justify-end gap-3">
        <Link href="/secure/documents" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">Cancel</Link>
        <button type="submit" disabled={!file || uploading} className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">{uploading ? "Uploading..." : "Upload file"}</button>
      </div>
    </form>
  </div>;
}
