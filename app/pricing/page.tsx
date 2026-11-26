import { getPersistenceBackend } from "@/lib/persistence-mode";
import { getCompanySettings } from "@/lib/business/service";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import PageWrapper from "@/components/PageWrapper";
import PricingCards from "@/components/PricingCards";
import { getPublicPricingGroups } from "@/lib/pricing-store";

const description = "Discover affordable, scalable technology and healthcare solutions designed around your business needs. From professional websites to custom software and healthcare systems, CustoNexus provides flexible solutions with clear pricing and dependable support.";

export const metadata: Metadata = {
  title: "Website & Software Pricing",
  description: "Compare South African Rand prices for websites, managed hosting, maintenance, custom software and healthcare technology from CustoNexus.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "CustoNexus Pricing", description, url: "/pricing", images: ["/opengraph-image"] },
};

export default async function PricingPage() {
  const pricingGroups = await getPublicPricingGroups();
  const registered = getPersistenceBackend() === 'postgres' && (await getCompanySettings()).vatRegistered;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": pricingGroups.filter(({ entries }) => entries.some(({ active }) => active)).map(({ title, note, service, entries }) => ({
      "@type": "Service",
      name: title,
      description: note,
      url: `https://custonexus.com/services/${service}`,
      offers: entries.filter(({ price }) => price !== null).map((entry) => ({
        "@type": "Offer", name: entry.name,
        url: `https://custonexus.com/contact?package=${entry.id}`,
        priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "ZAR", unitText: entry.billing,
          ...(entry.type === "starting" ? { minPrice: entry.price } : { price: entry.price }) },
      })),
      areaServed: { "@type": "Country", name: "South Africa" },
      provider: { "@type": "Organization", name: "CustoNexus Technologies (Pty) Ltd", url: "https://custonexus.com" },
    })),
  };
  return <PageWrapper>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <header className="bg-[#071a3d] pb-8 pt-28 text-white sm:pb-10 sm:pt-32">
      <Container>
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-200">South African Rand pricing</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">Professional Solutions. Transparent Pricing.</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">{description}</p>
      </Container>
    </header>
    <Container className="py-6 sm:py-10">
      {!registered && <p className="mb-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-950">CustoNexus Technologies (Pty) Ltd is currently not registered for VAT. No VAT is charged on our services or products.</p>}
      <div className="flex flex-wrap gap-4 font-bold text-blue-800">
        <Link href="/contact" className="rounded-xl bg-blue-800 px-5 py-3 text-white">Request a Quote</Link>
        <Link href="/book-consultation" className="rounded-xl border border-blue-200 px-5 py-3">Book a Consultation</Link>
      </div>
      {pricingGroups.map(({ service, title, note, entries }) => <section key={title} className="mt-8 sm:mt-12">
        <h2 className="text-2xl font-bold text-blue-950">{title}</h2>
        <p className="mt-2 max-w-3xl text-slate-700">{note}</p>
        <Link href={`/services/${service}`} className="mt-2 inline-block text-sm font-semibold text-blue-800 underline">Explore {title.toLowerCase()}</Link>
        <PricingCards entries={entries} />
      </section>)}
      <section className="mt-12 rounded-2xl bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-950">Pricing questions</h2>
        <h3 className="mt-5 font-bold">What does a starting price include?</h3>
        <p>It applies to the listed base scope. We confirm the full scope, applicable charges and total in writing before work starts. Additional work requires your approval.</p>
        <h3 className="mt-5 font-bold">Are ongoing costs included?</h3>
        <p>Hosting, domains, subscriptions and ongoing maintenance are charged separately unless explicitly included. We list agreed costs in your quote so you can review them upfront.</p>
        <h3 className="mt-5 font-bold">How long does a project take?</h3>
        <p>Timing depends on the scope, content availability and feedback. We confirm the schedule with your quote.</p>
      </section>
    </Container>
  </PageWrapper>;
}
