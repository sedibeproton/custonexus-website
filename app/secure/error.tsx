"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function SecureError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Secure workspace error", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center bg-slate-50 px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <AlertTriangle aria-hidden="true" size={30} />
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Secure workspace</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">We could not load this area.</h1>
        <p className="mt-4 leading-7 text-slate-600">Your data has not been changed. Try loading the workspace again, or return to the dashboard.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
            <RefreshCw aria-hidden="true" size={18} />
            Try again
          </button>
          <Link href="/secure/dashboard" className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
            Return to dashboard
          </Link>
        </div>
        {error.digest && <p className="mt-6 text-xs text-slate-400">Reference: {error.digest}</p>}
      </div>
    </main>
  );
}
