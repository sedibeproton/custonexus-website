import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircuitBoard,
  Code2,
  ChevronRight,
  Lightbulb,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";

const siteUrl = "https://custonexus.com";

export const metadata: Metadata = {
  title: "Side Projects Beyond Healthcare",
  description:
    "Explore CustoNexus side projects for custom websites and apps, electrical appliances, electronics, consulting and project management in South Africa.",
  alternates: { canonical: "/services/side-projects" },
  openGraph: {
    title: "Side Projects Beyond Healthcare | CustoNexus Technologies",
    description:
      "Custom digital solutions, electrical and electronics repairs, consulting and project support delivered with accountable CustoNexus standards.",
    url: "/services/side-projects",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Side Projects Beyond Healthcare from CustoNexus Technologies" }],
  },
  twitter: { card: "summary_large_image", title: "Side Projects Beyond Healthcare", description: "Custom digital solutions, electrical and electronics repairs, consulting and project support from CustoNexus Technologies.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const capabilities = [
  {
    icon: Code2,
    title: "Custom Websites & Applications",
    text: "Purpose-built websites, booking systems, availability calendars, forms, dashboards and applications for organisations in any sector. We do not use WordPress, purchased themes or generic templates.",
  },
  {
    icon: Wrench,
    title: "Electrical Appliances",
    text: "Assessment, fault-finding and repair of suitable electrical appliances, subject to condition, safety, technical feasibility and replacement-part availability.",
  },
  {
    icon: CircuitBoard,
    title: "Electronics",
    text: "Diagnostics and repairs for suitable electronic equipment, devices, boards and related systems where the required expertise and components are available.",
  },
  {
    icon: Lightbulb,
    title: "Consulting & Project Support",
    text: "Technology consultation, operational guidance, project planning, project management, implementation coordination and practical problem-solving support.",
  },
] as const;

const process = [
  { number: "01", title: "Tell Us What You Need", text: "Share the item, idea or business challenge, the outcome you want, your preferred timeline and any useful photographs, specifications or background information." },
  { number: "02", title: "Feasibility & Safety Review", text: "We assess whether the request fits our capabilities, whether it can be delivered safely and whether the required time, parts, information and specialist resources are available." },
  { number: "03", title: "Scope & Quotation", text: "For suitable work, we define the deliverables, assumptions, exclusions, indicative schedule and payment terms. Diagnostic work or a scope-based deposit may be required before delivery begins." },
  { number: "04", title: "Planning & Delivery", text: "We allocate resources and complete the approved digital, technical, consulting or project work. We communicate progress and request approval before material changes to the agreed scope." },
  { number: "05", title: "Review & Approval", text: "You review the completed work against the agreed outcome. We resolve applicable in-scope items, confirm acceptance and collect the remaining balance where required." },
  { number: "06", title: "Handover & Support", text: "We hand over the completed solution or repaired item with relevant guidance. Hosting, maintenance, ongoing consulting or managed support can continue under a separate agreement." },
] as const;

const faqs = [
  { question: "What qualifies as a CustoNexus side project?", answer: "A side project is suitable non-healthcare work that aligns with our available technology, technical, consulting or project-delivery capability. Examples include custom websites and applications, selected electrical or electronic repairs, consulting and project management." },
  { question: "Is every side-project request accepted?", answer: "No. We review safety, feasibility, condition, parts availability, required expertise, scope, schedule and delivery fit before accepting work or issuing a final quotation." },
  { question: "Are side-project websites also custom-built?", answer: "Yes. Websites and applications for non-healthcare clients follow the same custom approach. We do not rely on WordPress, purchased themes or generic page-builder templates." },
] as const;

export default function SideProjectsPage() {
  const pageUrl = `${siteUrl}/services/side-projects`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: "Side Projects", item: pageUrl },
      ] },
      { "@type": "Service", "@id": `${pageUrl}#service`, name: "Side Projects Beyond Healthcare", description: metadata.description, url: pageUrl, provider: { "@id": `${siteUrl}/#organization` }, areaServed: { "@type": "Country", name: "South Africa" } },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: "Side Projects Beyond Healthcare", description: metadata.description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${pageUrl}#service` }, inLanguage: "en-ZA" },
      { "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow="Services Beyond Healthcare"
        title="Your Side Project, Delivered With Professional Care"
        subtitle="We extend selected CustoNexus capabilities to individuals, businesses and organisations outside healthcare—from fully custom digital platforms to technical repairs, consulting and project delivery."
      />

      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <Container className="flex flex-wrap items-center gap-2 py-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-700">Home</Link><ChevronRight size={15} aria-hidden />
          <Link href="/services" className="hover:text-blue-700">Services</Link><ChevronRight size={15} aria-hidden />
          <span aria-current="page" className="font-semibold text-slate-900">Side Projects</span>
        </Container>
      </nav>

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="What We Can Help With" title="Practical Capability Beyond Our Core Sector" subtitle="Healthcare remains our primary focus. We accept suitable non-healthcare work when it aligns with our expertise, standards and available capacity." />
            <div className="relative mb-8 aspect-[16/7] min-h-56 overflow-hidden rounded-3xl bg-slate-100 shadow-xl sm:mb-10 sm:rounded-[2rem]">
              <Image src="/images/professional-services.jpg" alt="Professionals planning a custom technology or consulting side project" fill sizes="(max-width: 1440px) 100vw, 1400px" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-blue-950/45 to-transparent" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl sm:p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white"><Icon aria-hidden size={27} /></span>
                  <h2 className="mt-6 text-2xl font-bold text-slate-950">{title}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
              <div className="flex items-start gap-4"><ShieldCheck className="mt-1 shrink-0 text-blue-300" aria-hidden /><div><h2 className="text-2xl font-bold">Every request is reviewed before acceptance</h2><p className="mt-3 leading-8 text-slate-300">Acceptance depends on safety, feasibility, equipment condition, parts availability, required expertise, schedule, scope and delivery fit. We will explain the next practical step before asking you to commit.</p></div></div>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Side-Project FAQs" title="What to Know Before You Enquire" subtitle="We assess each request individually and explain feasibility, scope and commercial terms before approved work begins." />
            <div className="mx-auto max-w-4xl space-y-4">
              {faqs.map((item) => <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 open:border-blue-200 open:bg-white open:shadow-lg"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold text-slate-950 marker:hidden sm:px-7"><span>{item.question}</span><span aria-hidden className="text-2xl font-normal text-blue-700 transition group-open:rotate-45">+</span></summary><p className="px-5 pb-6 leading-8 text-slate-600 sm:px-7">{item.answer}</p></details>)}
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section id="process" className="scroll-mt-32 bg-slate-950 py-16 text-white sm:py-24">
          <Container>
            <SectionHeader eyebrow="How It Works" title="From Enquiry to Accountable Handover" subtitle="A clear process keeps expectations, responsibilities, approvals and payments transparent." variant="inverted" />
            <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {process.map((step) => (
                <li key={step.number} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                  <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold tracking-[0.15em]">{step.number}</span>
                  <h2 className="mt-6 text-2xl font-bold">{step.title}</h2>
                  <p className="mt-4 leading-8 text-slate-300">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section id="pricing" className="scroll-mt-32 border-y border-blue-100 bg-blue-50 py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Scoped Quotations" title="Every Suitable Side Project Is Assessed Individually" subtitle="We confirm feasibility, safety, scope, responsibilities and price in writing before approved work begins." />
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-blue-100 bg-white p-7 text-center shadow-lg shadow-blue-950/5 sm:p-10"><h2 className="text-2xl font-bold text-blue-950">Share the item, problem or intended outcome.</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">Parts, materials, travel, specialist services and third-party costs are identified during assessment where relevant.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white">Request an assessment <ArrowRight size={18} aria-hidden /></Link></div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-white py-14 sm:py-20">
          <Container className="flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-7 text-center sm:p-10 lg:flex-row lg:text-left">
            <div><h2 className="text-2xl font-bold text-slate-950">Need to compare our core services?</h2><p className="mt-2 text-slate-600">Explore websites, website support, business systems and specialist capabilities.</p></div>
            <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">Explore all services <ArrowRight size={18} aria-hidden /></Link>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <CTASection title="Let’s Discuss Your Side Project" subtitle="Tell us what you need, what success looks like and when you would like to begin. We will review the request and recommend the next practical step." buttonText="Start a Side-Project Enquiry" buttonLink="/contact" />
      </FadeSection>
    </PageWrapper>
  );
}
