import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Handshake,
  HeartPulse,
  HelpCircle,
  Laptop,
  Mail,
  MessageCircle,
  Plus,
} from "lucide-react";

import Container from "@/components/Container";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Healthcare Services FAQs",
  description:
    "Answers about CustoNexus healthcare technology, website and app development, medical equipment, consumables, professional services and partnerships.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Healthcare Services FAQs | CustoNexus Technologies",
    description:
      "Learn what CustoNexus provides, how engagements work and how to discuss your healthcare technology, equipment or partnership needs.",
    url: "/faqs",
  },
};

const faqGroups = [
  {
    id: "general",
    title: "About CustoNexus",
    questions: [
      {
        question: "What does CustoNexus Technologies do?",
        answer:
          "CustoNexus provides services across four connected categories: Healthcare Technology, Medical Equipment and Consumables, Professional Services, and Strategic Partnerships. We help healthcare organisations access practical technology, products, expertise and trusted collaboration.",
      },
      {
        question: "Who does CustoNexus work with?",
        answer:
          "We work with healthcare practices, providers, organisations, technology companies, medical suppliers and strategic partners. Each engagement is shaped around the organisation’s requirements, operating environment and intended outcomes.",
      },
      {
        question: "Where does CustoNexus operate?",
        answer:
          "CustoNexus is based in South Africa and approaches healthcare with a global mindset. Delivery may be remote, on site or hybrid depending on the service, location, regulatory context and practical requirements.",
      },
      {
        question: "How do we begin an enquiry?",
        answer:
          "Contact us by WhatsApp or phone on 072 270 1087, or email info@custonexus.com. Tell us what you need, your organisation type and any important timeline so we can recommend a sensible next step.",
      },
    ],
  },
  {
    id: "technology",
    title: "Healthcare Technology",
    questions: [
      {
        question: "Do you build healthcare websites and applications?",
        answer:
          "Yes. Website and app development is one of our core specialities. We build healthcare and corporate websites, patient or client portals, custom web applications, progressive web apps, mobile experiences, secure dashboards and internal tools.",
      },
      {
        question: "Can you redesign or improve an existing website?",
        answer:
          "Yes. We can review an existing website’s structure, usability, responsiveness, content presentation, performance and search foundations, then recommend either focused improvements or a complete rebuild.",
      },
      {
        question: "Do you provide support after a website or application launches?",
        answer:
          "Yes. Support can include maintenance, issue resolution, content or feature updates, performance reviews, security improvements and ongoing optimisation. The support arrangement is agreed according to the solution and your needs.",
      },
      {
        question: "Can you integrate different systems or platforms?",
        answer:
          "Yes. We support integration discovery, API and data-flow planning, interoperability coordination, testing and deployment. Feasibility depends on the systems involved and the access provided by each platform.",
      },
      {
        question: "How long does a website or app project take?",
        answer:
          "Timing depends on scope, integrations, content readiness and review cycles. We define the deliverables, milestones and expected timeline after discovery rather than applying one timeline to every project.",
      },
    ],
  },
  {
    id: "equipment",
    title: "Medical Equipment & Consumables",
    questions: [
      {
        question: "Which medical equipment can you help source?",
        answer:
          "Our enquiries can include autoclaves, sterilisation equipment, stethoscopes, diagnostic instruments, defibrillators, emergency equipment, patient monitors and exercise-monitoring equipment. Availability and specifications are confirmed for each request.",
      },
      {
        question: "Which medical consumables do you provide?",
        answer:
          "We can assist with medical gloves, face masks, personal protective equipment, disinfectants, cleaning solutions, medical wipes and related day-to-day healthcare consumables, subject to availability and the required specifications.",
      },
      {
        question: "Can you help us select the correct product?",
        answer:
          "We can help clarify requirements, compare suitable options and coordinate with suppliers. Final product selection should reflect the intended clinical environment, applicable standards, manufacturer instructions and the organisation’s own procurement process.",
      },
      {
        question: "Do you accept bulk or recurring supply enquiries?",
        answer:
          "Yes. Send the product description, specification, quantity, delivery location and required date to info@custonexus.com. We will confirm whether the requirement can be supported and provide the appropriate next steps.",
      },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    questions: [
      {
        question: "Can you support a project from strategy through implementation?",
        answer:
          "Yes. We can support discovery, planning, solution design, vendor coordination, implementation, testing, training, launch and ongoing optimisation. We can also provide one focused part of the journey when your internal team owns the rest.",
      },
      {
        question: "Do you replace an internal technology team?",
        answer:
          "Not necessarily. We commonly work alongside internal technology, clinical, operational and leadership teams. Our role may be advisory, delivery-focused or supportive depending on the capability and capacity already available.",
      },
      {
        question: "How do you approach privacy and security?",
        answer:
          "Security and responsible information handling are considered throughout discovery, design and delivery. Applicable requirements, access controls and responsibilities are confirmed for each client environment and reflected in the agreed scope.",
      },
      {
        question: "How do you measure whether an engagement succeeded?",
        answer:
          "We agree on useful outcomes at the beginning. Measures may include reduced process friction, better user adoption, improved reliability, stronger information flow, clearer governance or defined operational improvements.",
      },
    ],
  },
  {
    id: "partnerships",
    title: "Strategic Partnerships",
    questions: [
      {
        question: "Can technology providers partner with CustoNexus?",
        answer:
          "Yes. We welcome technology partnerships that address genuine healthcare needs and align with our standards for integrity, quality and people-first service. Send an overview of your solution, capabilities and proposed collaboration.",
      },
      {
        question: "Can medical suppliers or distributors work with you?",
        answer:
          "Yes. We are open to supplier and distribution relationships involving suitable medical equipment and consumables. Proposals should include the product range, relevant specifications, supply capability and intended market arrangement.",
      },
      {
        question: "Do you support pilot projects or proofs of concept?",
        answer:
          "Potentially. We assess the healthcare need, expected value, delivery feasibility, responsibilities and risk before deciding whether a pilot or proof of concept is the right approach.",
      },
      {
        question: "Do you offer customised or combined engagements?",
        answer:
          "Yes. A requirement may combine technology, equipment sourcing, professional expertise and partner capabilities. We structure the engagement around the actual need rather than forcing every client into a fixed package.",
      },
    ],
  },
];

const categoryLinks = [
  { icon: Laptop, label: "Healthcare Technology", href: "#technology" },
  { icon: HeartPulse, label: "Equipment & Consumables", href: "#equipment" },
  { icon: BriefcaseBusiness, label: "Professional Services", href: "#professional-services" },
  { icon: Handshake, label: "Strategic Partnerships", href: "#partnerships" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  ),
};

export default function FAQsPage() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Helpful Answers. Clear Next Steps."
        subtitle="Explore common questions about our healthcare technology, medical equipment, professional services and strategic partnerships."
      />

      <FadeSection>
        <section className="border-b border-slate-200 bg-slate-50 py-10">
          <Container>
            <nav aria-label="FAQ categories" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categoryLinks.map(({ icon: Icon, label, href }) => (
                <a key={href} href={href} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon size={21} aria-hidden /></span>
                  {label}
                </a>
              ))}
            </nav>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Helpful Information" title="What Would You Like to Know?" subtitle="Choose a category above or browse the questions below. Every answer reflects our current services and engagement approach." />

            <div className="mx-auto max-w-4xl space-y-14">
              {faqGroups.map((group) => (
                <section key={group.id} id={group.id} className="scroll-mt-32" aria-labelledby={`${group.id}-title`}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><HelpCircle size={23} aria-hidden /></div>
                    <h2 id={`${group.id}-title`} className="text-2xl font-bold text-slate-950">{group.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {group.questions.map((item) => (
                      <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 open:border-blue-200 open:bg-white open:shadow-lg">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left font-semibold text-slate-900 marker:hidden sm:px-7">
                          <span>{item.question}</span>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition-transform duration-300 group-open:rotate-45"><Plus size={19} aria-hidden /></span>
                        </summary>
                        <div className="border-t border-slate-100 px-6 py-5 leading-8 text-slate-600 sm:px-7">{item.answer}</div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-blue-50 py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-blue-100 bg-white p-8 text-center shadow-xl shadow-blue-950/5 sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><MessageCircle size={30} aria-hidden /></div>
              <h2 className="mt-7 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Still have a question?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Speak with us directly on 072 270 1087 or email info@custonexus.com. We will help you identify the right service or next step.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href={createWhatsAppUrl(whatsappMessages.faqs)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-800"><MessageCircle size={19} aria-hidden /> WhatsApp Us</a>
                <a href="mailto:info@custonexus.com" className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-7 py-4 font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-50"><Mail size={19} aria-hidden /> Email Us</a>
              </div>
              <div className="mt-7">
                <PrimaryButton href="/contact">View All Contact Options <ArrowRight size={18} /></PrimaryButton>
              </div>
              <Link href="/services" className="mt-7 inline-flex items-center font-semibold text-blue-700 underline-offset-4 hover:underline">Explore all CustoNexus services</Link>
            </div>
          </Container>
        </section>
      </FadeSection>
    </PageWrapper>
  );
}
