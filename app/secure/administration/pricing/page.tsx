import { requireSecurePage } from "@/lib/business/page-auth";
import { getCatalogue } from "@/lib/pricing-store";
import PricingManager from "./PricingManager";

export default async function PricingAdministration() {
  await requireSecurePage(true);
  const catalogue = await getCatalogue();
  return <main className="mx-auto max-w-5xl px-4 py-12">
    <h1 className="text-3xl font-bold text-blue-950">Pricing Management</h1>
    <p className="my-4">Review each change before publishing it to the website. Confirm VAT treatment before publishing customer-facing prices.</p>
    {catalogue.revision ? <PricingManager initial={catalogue} /> : <p>Pricing management requires PostgreSQL and migration 010.</p>}
  </main>;
}
