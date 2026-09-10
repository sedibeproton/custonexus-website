import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, CircleHelp, Target, Users } from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { getServicePage, servicePages } from "@/lib/service-pages";
import { serviceSeoDetails } from "@/lib/service-seo";

const siteUrl = "https://custonexus.com";

const serviceRoadmaps = {
  "business-websites": {
    title: "From First Conversation to a Confident Launch",
    subtitle: "A practical process keeps the website focused on your customers, business goals and approved scope.",
    note: "Your written proposal confirms deliverables, responsibilities, third-party costs, revisions, timeline and payment milestones before work begins.",
    steps: [
      { number: "01", title: "Tell Us About the Business", text: "Share what the business does, who it serves, what the website must achieve and any current brand, content, domain or hosting information." },
      { number: "02", title: "Discovery & Recommendation", text: "We clarify the pages, customer journey, functionality, content responsibilities and the most suitable delivery approach." },
      { number: "03", title: "Clear Proposal", text: "You receive a written scope with deliverables, assumptions, timeline, payment terms and what is not included." },
      { number: "04", title: "Design & Build", text: "We design and develop the approved website, share progress and incorporate agreed feedback within scope." },
      { number: "05", title: "Review & Test", text: "We check content, mobile behaviour, forms, links, performance foundations and agreed functionality before approval." },
      { number: "06", title: "Launch & Support", text: "We complete production checks and provide the agreed hosting, handover, maintenance or future support path." },
    ],
  },
  "website-support": {
    title: "A Responsible Path From Website Problem to Improvement",
    subtitle: "We assess the current website before deciding whether focused repairs, redesign or a clean rebuild is the right investment.",
    note: "Work on an existing website depends on suitable access, backups, platform condition and an agreed risk and responsibility boundary.",
    steps: [
      { number: "01", title: "Share the Website", text: "Tell us what is not working, what should improve and whether the request is urgent, ongoing or part of a larger redesign." },
      { number: "02", title: "Initial Assessment", text: "We review the visible experience and request the minimum technical information needed to assess feasibility." },
      { number: "03", title: "Recommended Approach", text: "We explain whether repair, maintenance, redesign or rebuild is the most practical option." },
      { number: "04", title: "Scope & Safeguards", text: "The proposal confirms access, backups, deliverables, limitations, responsibilities and expected results." },
      { number: "05", title: "Improve & Verify", text: "We complete approved work and test the affected pages, forms, content or technical functions." },
      { number: "06", title: "Handover or Ongoing Care", text: "We document the outcome and agree on future maintenance where ongoing support is useful." },
    ],
  },
  "business-systems": {
    title: "From Operational Friction to a Working Digital System",
    subtitle: "Custom systems begin with the process and its users—not with features chosen in isolation.",
    note: "Larger systems may be delivered in phases so that risk, cost and learning remain manageable.",
    steps: [
      { number: "01", title: "Define the Problem", text: "Show us the spreadsheet, paperwork, messages or repetitive process that is slowing the organisation down." },
      { number: "02", title: "Map Users & Workflow", text: "We clarify who uses the process, what information moves through it, where decisions happen and what must be protected." },
      { number: "03", title: "Scope the Right First Version", text: "We define a practical first release, responsibilities, acceptance criteria, integrations and future possibilities." },
      { number: "04", title: "Build Collaboratively", text: "We develop the approved system in clear stages and review progress with the people who will use it." },
      { number: "05", title: "Test With Real Scenarios", text: "The system is checked against agreed workflows, roles, data rules and operational scenarios before approval." },
      { number: "06", title: "Launch, Train & Improve", text: "We deploy the system, support handover or training and plan responsible improvements based on real use." },
    ],
  },
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${service.title} from CustoNexus Technologies` }],
    },
    twitter: { card: "summary_large_image", title: service.pageTitle, description: service.description, images: ["/opengraph-image"] },
    robots: { index: true, follow: true },
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
  const seo = serviceSeoDetails[service.slug];
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
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
        url: pageUrl,
        provider: { "@type": "Organization", name: "CustoNexus Technologies", url: siteUrl },
        areaServed: { "@type": "Country", name: "South Africa" },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.pageTitle,
        description: service.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "en-ZA",
      },
      {
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
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
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 shadow-xl sm:rounded-[2rem]">
                <Image src={seo.image} alt={seo.imageAlt} fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-blue-950/35 via-transparent to-transparent" />
              </div>
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Users aria-hidden size={24} /></span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">Who this service is for</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {seo.audiences.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"><CheckCircle2 aria-hidden size={18} className="mt-0.5 shrink-0 text-blue-700" />{item}</li>)}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Need & Value" title="The Challenges We Address" subtitle={`Our ${service.title.toLowerCase()} work begins with the real requirement—not a predetermined product or generic package.`} />
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-950"><CircleHelp aria-hidden className="text-blue-700" /> Common challenges</h2>
                <ul className="mt-6 space-y-4">{seo.challenges.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-slate-600"><span aria-hidden className="mt-3 h-2 w-2 shrink-0 rounded-full bg-blue-600" />{item}</li>)}</ul>
              </article>
              <article className="rounded-3xl bg-gradient-to-br from-blue-950 to-blue-700 p-6 text-white shadow-xl sm:p-8">
                <h2 className="flex items-center gap-3 text-2xl font-bold"><Target aria-hidden className="text-blue-200" /> Intended outcomes</h2>
                <ul className="mt-6 space-y-4">{seo.outcomes.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-blue-50"><CheckCircle2 aria-hidden size={18} className="mt-1 shrink-0 text-blue-200" />{item}</li>)}</ul>
              </article>
            </div>
          </Container>
        </section>
      </FadeSection>

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
            <SectionHeader eyebrow="Clear Project Scoping" title="Receive a Quote Built Around the Actual Work" subtitle="We are currently pricing each engagement according to its real scope rather than forcing different businesses into a fixed package." />
            <div className="mx-auto grid max-w-5xl gap-6 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Tell us what you are trying to improve.</h2>
                <p className="mt-4 max-w-3xl leading-8 text-slate-600">We will clarify the requirement and provide a written proposal covering deliverables, responsibilities, assumptions, timing and price before work begins.</p>
                <p className="mt-4 text-sm leading-7 text-slate-500">{service.pricingNote}</p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800">Request a quote <ArrowRight size={18} aria-hidden /></Link>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Service FAQs" title={`Questions About ${service.title}`} subtitle="Clear answers to common questions before you submit an enquiry." />
            <div className="mx-auto max-w-4xl space-y-4">
              {seo.faqs.map((item) => <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 open:border-blue-200 open:bg-white open:shadow-lg"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold text-slate-950 marker:hidden sm:px-7"><span>{item.question}</span><span aria-hidden className="text-2xl font-normal text-blue-700 transition group-open:rotate-45">+</span></summary><p className="px-5 pb-6 leading-8 text-slate-600 sm:px-7">{item.answer}</p></details>)}
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
          <Container>
            <SectionHeader eyebrow="Related Capabilities" title="Explore Connected CustoNexus Services" subtitle="Many requirements involve more than one capability. Explore related services or contact us for help choosing the right starting point." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicePages.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-6"><h2 className="text-lg font-bold text-slate-950">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Explore service <ArrowRight aria-hidden size={16} className="transition group-hover:translate-x-1" /></span></Link>)}
              {service.slug === "professional-services" && <Link href="/services/side-projects" className="group rounded-2xl border border-blue-200 bg-blue-50 p-5 transition hover:-translate-y-1 hover:shadow-lg sm:p-6"><h2 className="text-lg font-bold text-blue-950">Side Projects Beyond Healthcare</h2><p className="mt-2 text-sm leading-6 text-slate-600">Websites, applications, electrical and electronics work, consulting and project support for other sectors.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Explore side projects <ArrowRight aria-hidden size={16} /></span></Link>}
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
