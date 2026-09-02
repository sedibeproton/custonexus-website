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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus frequently asked questions" }],
  },
  twitter: { card: "summary_large_image", title: "Frequently Asked Questions", description: "Answers about CustoNexus technology, equipment, consulting, side projects and partnerships.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
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
      {
        question: "Are the prices on the services pages final?",
        answer:
          "No. They are indicative South African rand ranges intended to help with early budgeting. The final quotation depends on scope, complexity, content, quantities, travel, parts, integrations, timelines and any specialist or third-party requirements. Work begins only after the written scope and price are agreed.",
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
          "Yes. Website and app development is one of our core specialities. Every website is custom-designed and developed for the client; we do not use WordPress, purchased themes or generic page-builder templates. We build corporate and healthcare websites, booking systems, availability calendars, contact and enquiry forms, portals, custom applications, dashboards, payments and integrations.",
      },
      {
        question: "How much does a custom website cost?",
        answer:
          "A focused custom website generally ranges from R3,000 to R8,000. Larger business websites with more pages, content, booking requests, availability calendars, advanced forms or tailored workflows generally range from R8,000 to R35,000. Advanced platforms with accounts, dashboards, payments, databases or integrations commonly start around R35,000 and may exceed R150,000. Custom mobile or multi-platform applications generally range from R30,000 to R100,000 or more. We confirm the exact price after understanding the page count, content, features and processes involved.",
      },
      {
        question: "Can you redesign or improve an existing website?",
        answer:
          "Yes. We can review an existing website’s structure, usability, responsiveness, content presentation, performance and search foundations, then recommend either focused improvements or a complete rebuild.",
      },
      {
        question: "Do you provide support after a website or application launches?",
        answer:
          "Yes. Website hosting and maintenance plans generally range from R120 to R600 or more per month and can include professional company email accounts. The final monthly fee depends on website scale, traffic, storage, update frequency, support requirements, mailbox quantity and email storage. Support can also include issue resolution, performance reviews, security improvements and ongoing optimisation.",
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
      {
        question: "How does the website and app development process work?",
        answer:
          "We begin with discovery and a written scope, timeline, price and scope-based deposit. Once the deposit is received, we plan the project, allocate resources and collect your content, company information, logo, images and preferences. We then custom-design and develop the solution collaboratively, complete agreed revisions, obtain your approval and collect the remaining balance. The final stage is launch, production checking, handover and training, followed by hosting and maintenance where selected.",
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
      {
        question: "Do you service, calibrate or repair medical equipment?",
        answer:
          "Yes. We consider servicing, preventive maintenance, calibration and repair enquiries for various medical devices. Please provide the equipment type, manufacturer, model, serial number, condition, known fault and location. We confirm capability, parts availability and any applicable safety or compliance requirements before accepting the work.",
      },
      {
        question: "How does an equipment supply, service or repair request work?",
        answer:
          "We collect the equipment or product details, assess suitability and feasibility, then issue a written quotation. A deposit may be required to secure stock, order parts, book specialists or activate the work. We complete the approved procurement or technical service, perform the relevant quality review, collect the remaining balance according to the quotation, and coordinate delivery or handover with available documentation and guidance.",
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
      {
        question: "Do you accept work outside the healthcare sector?",
        answer:
          "Yes, as selected side projects. Healthcare remains our main focus, but we may assist other customers with websites, applications, consultations, project management, electrical appliances and electronic devices. Every request is assessed individually for feasibility, safety, scope, parts availability and fit before it is accepted.",
      },
      {
        question: "How are professional services and side projects delivered?",
        answer:
          "We begin by defining the challenge and assessing feasibility. We then provide the scope, deliverables, schedule, price and any required deposit or first milestone payment. During delivery we communicate progress and document material changes. The work is reviewed against agreed acceptance criteria, the outstanding balance is settled, and we complete the handover with any recommended follow-up support.",
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
      {
        question: "How does a strategic partnership progress?",
        answer:
          "We move from an initial opportunity discussion through alignment assessment, due diligence and a documented commercial framework. Approved opportunities may proceed to a paid planning stage, pilot or proof of concept. The parties then evaluate results and decide whether to conclude, refine or scale the relationship under clear governance, responsibilities and commercial terms.",
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
        <section className="border-b border-slate-200 bg-slate-50 py-8 sm:py-10">
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

            <div className="mx-auto max-w-4xl space-y-12 sm:space-y-14">
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
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
