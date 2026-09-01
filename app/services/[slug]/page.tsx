import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { getServicePage, servicePages } from "@/lib/service-pages";

const siteUrl = "https://custonexus.com";

const serviceRoadmaps = {
  "healthcare-technology": {
    title: "From Your First Enquiry to a Confident Launch",
    subtitle: "A structured, collaborative process keeps expectations, responsibilities, payments and progress clear throughout your custom website or application project.",
    note: "The exact deposit percentage, milestones, revision allowance, third-party costs and launch conditions are confirmed in the written proposal for each project.",
    steps: [
      { number: "01", title: "Discovery & Requirements", text: "You explain the website or application you need, its users, pages, functions, content, integrations and intended outcomes. We use discovery to define the scope and recommend a suitable delivery approach." },
      { number: "02", title: "Proposal, Deposit & Activation", text: "We provide a written scope, estimated timeline, price and deposit requirement. The scope-based deposit covers approved initial costs such as planning, setup, domain purchasing or configuration, and resources needed to begin." },
      { number: "03", title: "Planning & Resource Allocation", text: "After receiving the deposit, we create the delivery plan, allocate resources and collect your company information, content, service details, brand guidelines, logo, images and preferences." },
      { number: "04", title: "Custom Design & Development", text: "We design and build the solution from the ground up, share progress and incorporate reasonable revisions within scope. Significant new functionality is assessed and approved separately." },
      { number: "05", title: "Review, Approval & Final Payment", text: "You review the completed solution. We finish agreed refinements, record formal approval and issue the remaining project balance for payment." },
      { number: "06", title: "Launch, Handover & Training", text: "After approval and final payment, we launch, complete production checks and provide training or handover guidance. Selected hosting, maintenance, company email and support then continue under the agreed plan." },
    ],
  },
  "medical-equipment-consumables": {
    title: "From Equipment Requirement to Reliable Delivery",
    subtitle: "A controlled process helps us confirm suitability, technical capability, commercial terms and safe delivery for equipment, consumables, servicing, calibration or repairs.",
    note: "Deposits, supplier lead times, travel, replacement parts, third-party certification, warranties and final-payment terms are confirmed in the written quotation.",
    steps: [
      { number: "01", title: "Requirement & Equipment Details", text: "You provide the product or service required, quantity, manufacturer, model, serial number, condition, known fault, location, timeline and any applicable clinical or technical specifications." },
      { number: "02", title: "Assessment & Feasibility", text: "We review product availability or assess the equipment-service request. Where necessary, we arrange inspection, diagnostics, supplier confirmation or clarification of safety and compliance requirements." },
      { number: "03", title: "Quotation, Deposit & Approval", text: "We issue a quotation covering scope, products or labour, expected parts, delivery, exclusions and timing. A scope-appropriate deposit may be required to secure stock, order parts, book specialists or activate the work." },
      { number: "04", title: "Procurement or Technical Work", text: "After approval and deposit, we source the agreed products or perform the approved servicing, calibration or repair work. We communicate material findings and obtain approval before undertaking significant additional work." },
      { number: "05", title: "Quality Review & Final Payment", text: "We check the supplied product or completed technical work against the agreed requirement and provide available service records or supporting information. The remaining balance is settled before release or delivery unless otherwise agreed." },
      { number: "06", title: "Delivery, Handover & Follow-Up", text: "We coordinate delivery, collection or equipment handover and provide relevant orientation, documentation or maintenance guidance. Recurring consumable supply or future service support can then be arranged." },
    ],
  },
  "professional-services": {
    title: "From the Initial Challenge to a Measurable Outcome",
    subtitle: "Consulting, project delivery and selected side projects follow a clear process that aligns scope, resources, collaboration, payments and handover.",
    note: "The proposal confirms whether fees are hourly, fixed-scope, milestone-based or monthly, as well as deposits, expenses, revision limits, deliverables and acceptance criteria.",
    steps: [
      { number: "01", title: "Discovery & Problem Definition", text: "You explain the challenge, current environment, desired outcome, stakeholders, timeline and constraints. For repair work, we also collect device, condition and fault information." },
      { number: "02", title: "Assessment & Recommended Approach", text: "We assess feasibility, risk, required expertise and the most practical delivery method. Where useful, this includes a diagnostic session, preliminary review or clarification workshop." },
      { number: "03", title: "Proposal, Deposit & Scheduling", text: "We provide the proposed scope, deliverables, responsibilities, timing and commercial terms. A suitable deposit or first scheduled payment activates the engagement and secures the required resources." },
      { number: "04", title: "Delivery & Collaboration", text: "We perform the agreed consultation, planning, management, technical or repair work. Progress is communicated clearly, and decisions or material changes are documented and approved." },
      { number: "05", title: "Review, Acceptance & Balance", text: "We present the outputs or completed work for review against the agreed acceptance criteria, resolve in-scope items and collect the remaining balance or milestone payment." },
      { number: "06", title: "Handover & Continued Support", text: "We hand over deliverables, recommendations, records or repaired items and explain the next steps. Follow-up consulting, project support or managed services can continue under a separate agreement." },
    ],
  },
  "strategic-partnerships": {
    title: "From Shared Opportunity to Sustainable Partnership",
    subtitle: "Our partnership process creates clarity around alignment, due diligence, responsibilities, investment, delivery and the value each party expects to create.",
    note: "Discovery or planning work may require a deposit or professional fee. Long-term commercial terms, intellectual property, confidentiality, revenue sharing and risk allocation are documented separately where applicable.",
    steps: [
      { number: "01", title: "Introduction & Opportunity", text: "The parties share their organisations, capabilities, proposed opportunity, target market, expected contribution and the healthcare need or commercial objective being addressed." },
      { number: "02", title: "Alignment & Initial Assessment", text: "We assess strategic fit, expected value, delivery feasibility, reputation, responsibilities, risks and whether the opportunity supports CustoNexus standards and long-term direction." },
      { number: "03", title: "Due Diligence & Commercial Framework", text: "Relevant product, supplier, technical and organisational information is reviewed. We define the proposed model, scope, responsibilities, costs, deposit or planning fee, governance and decision-making process." },
      { number: "04", title: "Planning & Pilot Delivery", text: "The parties allocate resources and execute an approved pilot, proof of concept, sourcing initiative or go-to-market plan with defined milestones and communication channels." },
      { number: "05", title: "Evaluation & Commercial Approval", text: "Results, quality, risks, customer value and commercial performance are reviewed. Outstanding agreed fees are settled, and both parties decide whether to refine, conclude or expand the collaboration." },
      { number: "06", title: "Scale, Governance & Growth", text: "Successful partnerships move into a documented long-term arrangement with clear governance, reporting, service expectations, financial terms and a shared improvement or growth plan." },
    ],
  },
} as const;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getServicePage((await params).slug);

  if (!service) return {};

  const path = `/services/${service.slug}`;
  return {
    title: service.pageTitle,
    description: service.description,
    alternates: { canonical: path },
    openGraph: {
      title: service.pageTitle,
      description: service.description,
      url: path,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getServicePage((await params).slug);
  if (!service) notFound();

  const pageUrl = `${siteUrl}/services/${service.slug}`;
  const roadmap = serviceRoadmaps[service.slug];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: pageUrl,
        provider: { "@type": "Organization", name: "CustoNexus Technologies", url: siteUrl },
        areaServed: { "@type": "Country", name: "South Africa" },
      },
    ],
  };

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PageHero eyebrow="CustoNexus Services" title={service.pageTitle} subtitle={service.introduction} />

      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <Container className="flex flex-wrap items-center gap-2 py-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-700">Home</Link><ChevronRight size={15} aria-hidden />
          <Link href="/services" className="hover:text-blue-700">Services</Link><ChevronRight size={15} aria-hidden />
          <span aria-current="page" className="font-semibold text-slate-900">{service.title}</span>
        </Container>
      </nav>

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="What We Provide" title={`Explore ${service.title}`} subtitle={service.description} />
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[2rem] bg-gradient-to-br from-blue-950 to-blue-700 p-8 text-white shadow-xl sm:p-10">
                <h2 className="text-2xl font-bold">Key capabilities</h2>
                <ul className="mt-7 space-y-4">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-7 text-blue-50"><CheckCircle2 className="mt-1 shrink-0 text-blue-300" size={19} aria-hidden />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-5">
                {service.sections.map((section) => (
                  <article key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:border-blue-200 hover:bg-white hover:shadow-lg sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-950">{section.title}</h2>
                    <p className="mt-4 leading-8 text-slate-600">{section.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-800">Explore all service categories <ArrowRight size={18} aria-hidden /></Link>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.28),transparent_38%)]" />
          <Container className="relative">
            <SectionHeader eyebrow="Our Delivery Roadmap" title={roadmap.title} subtitle={roadmap.subtitle} variant="inverted" />
            <ol className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {roadmap.steps.map((step) => (
                <li key={step.number} className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold tracking-[0.15em] text-white">{step.number}</span>
                  <h2 className="mt-6 text-2xl font-bold">{step.title}</h2>
                  <p className="mt-4 leading-8 text-slate-300">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-7 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5 text-sm leading-7 text-blue-100">{roadmap.note}</p>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="border-y border-blue-100 bg-blue-50 py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Indicative Pricing" title={`Plan Your ${service.title} Budget`} subtitle="These ranges help with early planning. Your written quotation will confirm the exact scope, deliverables, assumptions and price before work begins." />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {service.pricing.map((item) => (
                <article key={item.title} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5 sm:p-7">
                  <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-700 text-lg font-black text-blue-700">R</span>
                  <h2 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-lg font-bold text-blue-700">{item.range}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-blue-200 bg-white p-5 text-sm leading-7 text-slate-700 sm:p-6">
              <strong className="text-slate-950">Important:</strong> {service.pricingNote} All amounts are indicative South African rand ranges and may change when requirements are confirmed.
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <CTASection title={`Let’s Discuss ${service.title}`} subtitle="Tell us what your organisation needs and we will help identify a practical next step." buttonText="Contact CustoNexus" buttonLink="/contact" />
      </FadeSection>
    </PageWrapper>
  );
}
