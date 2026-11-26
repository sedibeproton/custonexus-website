import FinancialDocumentForm from "@/components/secure/FinancialDocumentForm";
import SecurePageHeader from "@/components/secure/SecurePageHeader";
import { requireSecurePage } from "@/lib/business/page-auth";
import { getCompanySettings, listClients } from "@/lib/business/service";
import { getPublicPricing } from "@/lib/pricing-store";

export default async function NewQuotePage() {
  const access = await requireSecurePage();
  const [clients, settings, catalogue] = await Promise.all([
    listClients(), getCompanySettings(), access.isAdmin ? getPublicPricing() : [],
  ]);
  return <main className="min-h-screen bg-slate-100 px-3 py-5 sm:px-6 sm:py-10">
    <div className="mx-auto max-w-7xl">
      <SecurePageHeader eyebrow="Quotes" title="New quote" description="Build an itemized customer quotation with an exact live financial summary." />
      <div className="mt-7"><FinancialDocumentForm kind="quote" clients={clients} settings={settings} catalogue={catalogue} /></div>
    </div>
  </main>;
}
