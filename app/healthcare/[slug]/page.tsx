import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Users } from "lucide-react";

import Container from "@/components/Container";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";

const siteUrl = "https://custonexus.com";

const healthcarePages = [
  {
    slug: "medical-practice-websites",
    title: "Medical Practice Website Development",
    metaTitle: "Medical Practice Websites South Africa",
    description: "Professional medical practice websites for South African healthcare providers, with clear services, mobile usability and responsible enquiry journeys.",
    introduction: "Custom websites for physiotherapists, doctors, allied-health professionals, clinics and healthcare service providers that need to communicate clearly and make it easier for patients to take an appropriate next step.",
    audiences: ["Independent healthcare professionals", "Medical and allied-health practices", "Clinics and healthcare service providers", "Practices replacing an outdated or informal website"],
    problems: ["Patients cannot quickly understand the services offered", "The current website is difficult to use on a phone", "Contact, location or appointment information is unclear", "The practice depends on social profiles without an owned digital presence"],
    deliverables: ["Custom responsive website design", "Service and practitioner information", "Contact, location and appointment-enquiry journeys", "Accessible content structure and mobile navigation", "Technical SEO and analytics foundations", "Hosting, maintenance and company-email options"],
    safeguards: "A public practice website should collect only the information genuinely needed for its intended enquiry or appointment workflow. We define form fields, access, retention and responsibilities for each project and avoid presenting ordinary website forms as clinical or emergency communication channels.",
    faqs: [
      { question: "Do you use a generic medical website template?", answer: "No. CustoNexus plans the structure, content journey and interface around the practice, its services and intended visitors. Reusable engineering components may support quality, but the public experience is not forced into an off-the-shelf theme." },
      { question: "Can the website include appointment requests?", answer: "Yes. Depending on scope, it can include appointment enquiries, a booking workflow or a supported third-party booking connection. The project must clearly distinguish administrative requests from urgent or clinical communication." },
      { question: "Does a practice website guarantee POPIA compliance?", answer: "No. A website alone cannot guarantee legal compliance. We apply privacy-conscious design and agree appropriate technical controls, while the healthcare organisation remains responsible for its broader legal, operational and information-governance obligations." },
    ],
  },
  {
    slug: "software-portals",
    title: "Healthcare Software & Patient-Facing Portals",
    metaTitle: "Healthcare Software & Patient Portals",
    description: "Custom healthcare software, administrative systems and patient-facing portals designed around defined users, privacy needs and responsible access controls.",
    introduction: "Purpose-built web applications and portals for healthcare organisations that need a clearer way to manage approved administrative workflows, information, requests, documents or service interactions.",
    audiences: ["Healthcare practices with repetitive administrative work", "Service providers needing secure internal tools", "Organisations assessing a patient or client portal", "Teams replacing fragmented spreadsheets and messages"],
    problems: ["Information is scattered across files and communication channels", "Administrative work depends on repeated manual entry", "Users lack a clear, role-appropriate workflow", "Generic software does not fit the approved process"],
    deliverables: ["Requirements and workflow discovery", "Role-based application and portal design", "Secure authentication and access-control planning", "Administrative dashboards and structured records", "Document, request and reporting workflows", "Testing, deployment, training and support planning"],
    safeguards: "Healthcare applications require project-specific decisions about data minimisation, roles, authentication, audit needs, backups, retention, hosting and incident responsibilities. Clinical use, medical decision support and regulated functionality require additional specialist assessment before they can be accepted.",
    faqs: [
      { question: "Can you build a patient portal?", answer: "Potentially. Discovery must first define the users, information, permissions, workflows, integrations, hosting and support responsibilities. We do not treat every portal as a simple website feature." },
      { question: "Can the software store health information?", answer: "Only after the data, purpose, risks, access model and client responsibilities have been assessed and approved. The most responsible design may minimise sensitive information or keep it in an existing authorised system." },
      { question: "Do you claim that custom software is automatically POPIA compliant?", answer: "No. We can implement agreed privacy and security controls, but compliance depends on the organisation's complete legal, operational and technical environment." },
    ],
  },
  {
    slug: "system-integrations",
    title: "Healthcare System Integrations",
    metaTitle: "Healthcare System Integrations",
    description: "Healthcare software integration and automation planning for compatible APIs, databases, reporting workflows and documented device interfaces.",
    introduction: "Technical discovery and implementation support for healthcare organisations that need compatible software, data flows or equipment interfaces to work together more reliably.",
    audiences: ["Healthcare teams reducing duplicate data entry", "Providers connecting supported software platforms", "Organisations assessing reporting and workflow automation", "Technical teams evaluating documented equipment interfaces"],
    problems: ["Staff re-enter the same information across systems", "Reporting depends on manual exports and reconciliation", "A proposed connection has unclear technical ownership", "Legacy systems or devices may not provide a supported interface"],
    deliverables: ["Integration and interface discovery", "API, database and data-flow assessment", "Authentication and permission planning", "Mapping, validation and error-handling design", "Testing, monitoring and rollback planning", "Documentation and operational handover"],
    safeguards: "An integration is confirmed only after supported interfaces, permissions, data ownership, security, failure handling and vendor constraints are understood. We do not bypass manufacturer protections or promise connectivity where an API, documented protocol or authorised access is unavailable.",
    faqs: [
      { question: "Can you integrate any healthcare system or device?", answer: "No. Feasibility depends on supported APIs, documented protocols, database access, licensing, vendor approval, security requirements and the technical condition of each system or device." },
      { question: "How do you reduce integration risk?", answer: "We define data mappings, permissions, validation, error handling, testing, monitoring, rollback and ownership before production use. The level of control depends on the sensitivity and operational importance of the workflow." },
      { question: "Can an integration automate reports or administrative workflows?", answer: "Potentially. Where authorised data access and reliable interfaces exist, an integration can reduce manual transfer, generate structured outputs or coordinate approved workflow steps." },
    ],
  },
] as const;

type PageProps = { params: Promise<{ slug: string }> };

function getHealthcarePage(slug: string) {
  return healthcarePages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return healthcarePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getHealthcarePage((await params).slug);
  if (!page) return {};
  const path = `/healthcare/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { title: page.metaTitle, description: page.description, url: path, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${page.title} from CustoNexus Technologies` }] },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.description, images: ["/opengraph-image"] },
    robots: { index: true, follow: true },
  };
}

export default async function HealthcareDetailPage({ params }: PageProps) {
  const page = getHealthcarePage((await params).slug);
  if (!page) notFound();
  const pageUrl = `${siteUrl}/healthcare/${page.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Healthcare", item: `${siteUrl}/healthcare` },
        { "@type": "ListItem", position: 3, name: page.title, item: pageUrl },
      ] },
      { "@type": "Service", "@id": `${pageUrl}#service`, name: page.title, description: page.description, url: pageUrl, provider: { "@id": `${siteUrl}/#organization` }, areaServed: { "@type": "Country", name: "South Africa" } },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: page.metaTitle, description: page.description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${pageUrl}#service` }, inLanguage: "en-ZA" },
      { "@type": "FAQPage", mainEntity: page.faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };

  return <PageWrapper>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow="Healthcare Technology" title={page.title} subtitle={page.introduction} />
    <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white"><Container className="flex flex-wrap items-center gap-2 py-4 text-sm text-slate-600"><Link href="/">Home</Link><ChevronRight size={15} aria-hidden/><Link href="/healthcare">Healthcare</Link><ChevronRight size={15} aria-hidden/><span aria-current="page" className="font-semibold text-slate-900">{page.title}</span></Container></nav>

    <FadeSection><section className="bg-white py-16 sm:py-24"><Container><div className="grid gap-10 lg:grid-cols-2 lg:gap-14"><div><Users className="text-blue-700" size={32} aria-hidden/><h2 className="mt-5 text-3xl font-bold text-blue-950">Who this service is for</h2><ul className="mt-6 grid gap-3">{page.audiences.map(item=><li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={19} aria-hidden/>{item}</li>)}</ul></div><div><h2 className="text-3xl font-bold text-blue-950">Problems we help assess</h2><ul className="mt-6 grid gap-3">{page.problems.map(item=><li key={item} className="rounded-2xl border border-slate-200 p-4 text-slate-700">{item}</li>)}</ul></div></div></Container></section></FadeSection>

    <FadeSection><section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24"><Container><SectionHeader eyebrow="Capabilities" title="What an approved project may include" subtitle="The final scope is based on users, information, risk, integrations and the organisation's responsibilities."/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{page.deliverables.map(item=><div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800"><CheckCircle2 className="mb-4 text-blue-700" size={22} aria-hidden/>{item}</div>)}</div></Container></section></FadeSection>

    <FadeSection><section className="bg-amber-50 py-16 sm:py-20"><Container><div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-200 bg-white p-7 sm:p-10"><ShieldCheck className="text-amber-700" size={34} aria-hidden/><h2 className="mt-5 text-2xl font-bold text-slate-950">Privacy-conscious, project-specific design</h2><p className="mt-4 leading-8 text-slate-700">{page.safeguards}</p><p className="mt-4 text-sm leading-7 text-slate-600">CustoNexus does not claim automatic POPIA compliance, legal certification, medical-device approval or unsupported regulatory credentials.</p></div></Container></section></FadeSection>

    <FadeSection><section className="bg-white py-16 sm:py-24"><Container><SectionHeader eyebrow="Questions" title={`Questions about ${page.title}`} subtitle="Important considerations before technical discovery and quotation."/><div className="mx-auto grid max-w-5xl gap-4">{page.faqs.map(item=><details key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><summary className="cursor-pointer font-bold text-blue-950">{item.question}</summary><p className="mt-4 leading-7 text-slate-600">{item.answer}</p></details>)}</div></Container></section></FadeSection>

    <section className="bg-[#071a3d] py-16 text-white sm:py-20"><Container><div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">Discuss a responsible healthcare technology project.</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">Tell us about the users, workflow, information and intended outcome. We will identify the discovery and safeguards needed before proposing work.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-bold">Start an enquiry <ArrowRight size={18} aria-hidden/></Link><Link href="/book-consultation" className="rounded-2xl border border-white/30 px-7 py-4 font-bold">Book a consultation</Link></div></div></Container></section>
  </PageWrapper>;
}
