"use client";
import { FormEvent, useState } from "react";
import type { CompanySettings } from "@/lib/business/types";

export default function CompanySettingsForm({ settings }: { settings: CompanySettings }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const input = "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3";
  const field = (name: string, label: string, value: string | null, type = "text") => <label className="text-sm font-bold">{label}<input name={name} type={type} defaultValue={value || ""} className={input}/></label>;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form);
    for (const name of ["vatEnabled", "showBankOnQuotes", "showBankOnInvoices"]) payload[name] = form.get(name) === "on";
    try {
      const response = await fetch("/api/business/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error); setMessage("Company settings saved.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to save settings."); }
  }
  return <form onSubmit={submit} className="space-y-7">
    <section className="grid gap-5 rounded-3xl bg-white p-7 shadow-sm sm:grid-cols-2">
      <h2 className="text-xl font-bold sm:col-span-2">Company identity</h2>
      {field("legalName", "Legal name", settings.legalName)}{field("tradingName", "Trading name", settings.tradingName)}
      {field("registrationNumber", "Registration number", settings.registrationNumber)}{field("vatNumber", "VAT number", settings.vatNumber)}
      {field("email", "Email", settings.email, "email")}{field("phone", "Telephone", settings.phone)}{field("website", "Website", settings.website, "url")}{field("logoPath", "Logo path", settings.logoPath)}
      <label className="text-sm font-bold sm:col-span-2">Business address<textarea name="address" defaultValue={settings.address || ""} rows={3} className={input}/></label>
      <label className="flex items-center gap-3 text-sm font-bold"><input name="vatEnabled" type="checkbox" defaultChecked={settings.vatEnabled}/> VAT registered/enabled</label>
      {field("vatPercent", "VAT percentage", (settings.vatBasisPoints / 100).toFixed(2))}{field("quoteValidityDays", "Default quote validity days", String(settings.quoteValidityDays), "number")}{field("invoicePaymentDays", "Default invoice payment days", String(settings.invoicePaymentDays), "number")}
    </section>
    <section className="grid gap-5 rounded-3xl bg-white p-7 shadow-sm sm:grid-cols-2">
      <h2 className="text-xl font-bold sm:col-span-2">Document terms</h2>
      <label className="text-sm font-bold sm:col-span-2">Quote terms<textarea name="quoteTerms" defaultValue={settings.quoteTerms || ""} rows={5} className={input}/></label>
      <label className="text-sm font-bold sm:col-span-2">Invoice terms<textarea name="invoiceTerms" defaultValue={settings.invoiceTerms || ""} rows={5} className={input}/></label>
      <label className="text-sm font-bold sm:col-span-2">Payment instructions<textarea name="paymentInstructions" defaultValue={settings.paymentInstructions || ""} rows={3} className={input}/></label>
      <label className="text-sm font-bold sm:col-span-2">Document footer<textarea name="documentFooter" defaultValue={settings.documentFooter || ""} rows={3} className={input}/></label>
    </section>
    <section className="grid gap-5 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:grid-cols-2">
      <h2 className="text-xl font-bold sm:col-span-2">Secure banking details</h2><p className="text-sm text-slate-600 sm:col-span-2">Stored only in PostgreSQL and included in finalized snapshots when enabled.</p>
      {field("bankName", "Bank name", settings.bankName)}{field("bankAccountName", "Account holder", settings.bankAccountName)}{field("bankAccountNumber", "Account number", settings.bankAccountNumber)}{field("bankBranchCode", "Branch code", settings.bankBranchCode)}{field("bankAccountType", "Account type", settings.bankAccountType)}{field("bankSwiftBic", "SWIFT / BIC", settings.bankSwiftBic)}
      <label className="text-sm font-bold sm:col-span-2">Reference instructions<textarea name="paymentReferenceInstructions" defaultValue={settings.paymentReferenceInstructions || ""} rows={3} className={input}/></label>
      <label className="flex gap-3 text-sm font-bold"><input name="showBankOnQuotes" type="checkbox" defaultChecked={settings.showBankOnQuotes}/> Show on quotes</label>
      <label className="flex gap-3 text-sm font-bold"><input name="showBankOnInvoices" type="checkbox" defaultChecked={settings.showBankOnInvoices}/> Show on invoices</label>
    </section>
    {(message || error) && <p role="status" className={`rounded-xl p-4 ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{error || message}</p>}
    <button className="rounded-xl bg-blue-700 px-7 py-3 font-bold text-white">Save settings</button>
  </form>;
}
