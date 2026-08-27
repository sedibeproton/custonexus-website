"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientRecord } from "@/lib/business/types";

export default function ClientForm({ client }: { client?: ClientRecord }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const field = "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form);
    payload.active = form.get("active") === "on";
    try {
      const response = await fetch(client ? `/api/business/clients/${client.id}` : "/api/business/clients", { method: client ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      router.push(`/secure/clients/${data.client.id}`); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to save client."); setBusy(false); }
  }
  return <form onSubmit={submit} className="grid gap-5 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-9">
    <label className="text-sm font-bold">Company name<input name="companyName" defaultValue={client?.companyName} required className={field}/></label>
    <label className="text-sm font-bold">Contact person<input name="contactPerson" defaultValue={client?.contactPerson} required className={field}/></label>
    <label className="text-sm font-bold">Email<input name="email" type="email" defaultValue={client?.email} required className={field}/></label>
    <label className="text-sm font-bold">Phone<input name="phone" defaultValue={client?.phone} required className={field}/></label>
    <label className="text-sm font-bold">Registration number<input name="registrationNumber" defaultValue={client?.registrationNumber || ""} className={field}/></label>
    <label className="text-sm font-bold">VAT number<input name="vatNumber" defaultValue={client?.vatNumber || ""} className={field}/></label>
    <label className="text-sm font-bold sm:col-span-2">Billing address<textarea name="billingAddress" defaultValue={client?.billingAddress} required rows={3} className={field}/></label>
    <label className="text-sm font-bold sm:col-span-2">Physical address<textarea name="physicalAddress" defaultValue={client?.physicalAddress || ""} rows={3} className={field}/></label>
    <label className="text-sm font-bold sm:col-span-2">Notes<textarea name="notes" defaultValue={client?.notes || ""} rows={4} className={field}/></label>
    <label className="flex items-center gap-3 text-sm font-bold"><input name="active" type="checkbox" defaultChecked={client?.active ?? true} className="h-5 w-5"/> Active client</label>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</p>}
    <button disabled={busy} className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white disabled:opacity-50 sm:col-span-2 sm:w-fit">{busy ? "Saving…" : client ? "Save changes" : "Create client"}</button>
  </form>;
}
