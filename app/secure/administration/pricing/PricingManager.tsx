"use client";

import { useState, type FormEvent } from "react";
import PricingCards from "@/components/PricingCards";
import { pricingGroups, type PricingEntry } from "@/lib/pricing";

const blank: PricingEntry = {
  id: "", name: "", service: "business-websites", description: "", exclusions: "",
  inclusions: [], price: null, type: "starting", billing: "Once-off",
  active: true, featured: false, serviceUrl: "",
};
const field = "block w-full rounded-lg border border-slate-300 bg-white p-2";

export default function PricingManager({ initial }: { initial: { revision: number; entries: PricingEntry[] } }) {
  const [catalogue, setCatalogue] = useState(initial);
  const [id, setId] = useState("");
  const [preview, setPreview] = useState<PricingEntry | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const entry = catalogue.entries.find((item) => item.id === id) ?? blank;

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const type = value("type") as PricingEntry["type"];
    setStatus("");
    setPreview({
      ...entry, name: value("name"), description: value("description"), exclusions: value("exclusions"),
      service: value("service"), type, billing: value("billing"), price: type === "quotation" ? null : Number(value("price")),
      inclusions: value("inclusions").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
      active: data.has("active"), featured: data.has("featured"),
    });
  }

  async function publish() {
    setBusy(true);
    try {
      const response = await fetch("/api/admin/pricing", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry: preview, revision: catalogue.revision }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Publishing failed.");
      setCatalogue(result);
      if (!id) setId(result.entries.at(-1).id);
      setPreview(null);
      setStatus("Pricing published.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Publishing failed.");
    } finally { setBusy(false); }
  }

  return <>
    <label>Catalogue entry<select className={field} value={id} disabled={busy} onChange={(event) => {
      setId(event.target.value); setPreview(null); setStatus("");
    }}><option value="">Add a new entry</option>{catalogue.entries.map((item) =>
      <option key={item.id} value={item.id}>{item.name}{item.active ? "" : " (disabled)"}</option>)}</select></label>
    <form key={`${id}-${catalogue.revision}`} className="my-6 grid gap-4 rounded-2xl bg-white p-5 sm:grid-cols-2" onSubmit={prepare} onChange={() => setPreview(null)}>
      <label>Name<input className={field} name="name" required maxLength={120} defaultValue={entry.name} /></label>
      <label>Service<select className={field} name="service" defaultValue={entry.service}>
        {[...new Set(pricingGroups.map(({ service }) => service))].map((service) => <option key={service}>{service}</option>)}
      </select></label>
      <label>Pricing type<select className={field} name="type" defaultValue={entry.type}>
        <option value="starting">Starting price</option><option value="fixed">Fixed</option><option value="quotation">Quotation only</option>
      </select></label>
      <label>Price in ZAR<input className={field} name="price" type="number" min="1" max="100000000" step="1" defaultValue={entry.price ?? ""} /></label>
      <label>Billing interval or quotation label<input className={field} name="billing" required maxLength={80} defaultValue={entry.billing} /></label>
      <label>Description<textarea className={field} name="description" maxLength={2000} defaultValue={entry.description} /></label>
      <label>Inclusions, one per line<textarea className={field} name="inclusions" rows={5} defaultValue={entry.inclusions.join("\n")} /></label>
      <label>Exclusions<textarea className={field} name="exclusions" rows={5} maxLength={2000} defaultValue={entry.exclusions} /></label>
      <label><input type="checkbox" name="active" defaultChecked={entry.active} /> Publicly visible</label>
      <label><input type="checkbox" name="featured" defaultChecked={entry.featured} /> Featured</label>
      <button disabled={busy} className="rounded-lg bg-blue-800 p-3 font-bold text-white">Preview changes</button>
    </form>
    {preview && <section aria-label="Unpublished pricing preview" className="rounded-2xl border p-5">
      <h2 className="font-bold">Unpublished preview</h2>
      {!preview.active && <p>This entry will be hidden after publishing.</p>}
      <PricingCards entries={[{ ...preview, active: true }]} preview />
      <button type="button" disabled={busy} onClick={() => void publish()} className="mt-5 rounded-lg bg-emerald-800 p-3 font-bold text-white">{busy ? "Publishing…" : "Publish pricing"}</button>
    </section>}
    {status && <p role="status" className="mt-4">{status}</p>}
  </>;
}
