import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, MessageCircle, Plus } from "lucide-react";

import Container from "@/components/Container";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about CustoNexus services, project delivery, healthcare technology, security, partnerships and support.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Frequently Asked Questions | CustoNexus Technologies",
    description: "Learn how we work, what we provide and how to begin an engagement with CustoNexus.",
    url: "/faqs",
  },
};

const faqGroups = [
  {
    title: "Working With CustoNexus",
    questions: [
      { question: "What does CustoNexus Technologies do?", answer: "CustoNexus helps healthcare organisations improve their technology, operations and digital experiences. Our work spans technology consulting, transformation, systems integration, implementation, operational resilience, managed support and strategic partnerships." },
      { question: "Who do you work with?", answer: "We work with healthcare practices, providers, organisations, technology companies, suppliers and strategic partners. Engagements can support both established organisations and teams beginning a focused improvement initiative." },
      { question: "How do we start working together?", answer: "It begins with a discovery conversation. We discuss your goals, current environment, constraints and desired outcomes. We then recommend a suitable next step, which may be an assessment, workshop, defined project or ongoing support engagement." },
      { question: "Do you offer customised engagements?", answer: "Yes. Healthcare environments differ, so we shape the scope, delivery model and level of support around the organisation’s actual needs instead of forcing every client into a fixed package." },
    ],
  },
  {
    title: "Services & Delivery",
    questions: [
      { question: "Can you support an entire project from strategy through implementation?", answer: "Yes. We can support discovery, planning, solution design, vendor coordination, implementation, testing, training, launch and ongoing optimisation. We can also provide one focused part of that journey when an internal team already owns the rest." },
      { question: "Do you replace our internal technology team?", answer: "Not necessarily. We commonly work alongside internal technology, clinical, operational and leadership teams. Our role can be advisory, delivery-focused or supportive, depending on the capability and capacity already available." },
      { question: "How long does a typical engagement take?", answer: "Timing depends on complexity, readiness and scope. A focused assessment may take a few weeks, while a transformation or implementation programme may run over several months. We establish milestones and expectations before delivery begins." },
      { question: "How do you measure success?", answer: "We agree on useful outcomes at the start. These may include reduced process friction, better user adoption, improved reliability, stronger information flow, clearer governance or measurable operational gains." },
    ],
  },
  {
    title: "Security, Support & Partnerships",
    questions: [
      { question: "How do you approach privacy and security?", answer: "Security and responsible information handling are considered throughout discovery, solution design and delivery. Specific controls and compliance requirements are confirmed for each client environment and reflected in the agreed scope." },
      { question: "Do you provide support after launch?", answer: "Yes. We can provide transition support, documentation, training, performance reviews, issue coordination and ongoing optimisation. The support model is agreed according to the solution and the client’s operating needs." },
      { question: "Can technology vendors or suppliers partner with CustoNexus?", answer: "Yes. We welcome partnerships that create genuine value for healthcare organisations and align with our standards for integrity, quality and people-first service. Contact us with an overview of your offering and intended collaboration." },
      { question: "Where does CustoNexus operate?", answer: "CustoNexus is based in South Africa and is built with a global mindset. Delivery options depend on the engagement, location, regulatory context and whether the work can be performed remotely, on site or through a hybrid approach." },
    ],
  },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Clear Answers Before We Begin."
        subtitle="Learn more about our services, delivery approach, support and the practical steps involved in working with CustoNexus."
      />

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader
              eyebrow="Helpful Information"
              title="What Would You Like to Know?"
              subtitle="Browse the questions below. If your question is not covered, our team will be happy to help."
            />

            <div className="mx-auto max-w-4xl space-y-14">
              {faqGroups.map((group) => (
                <section key={group.title} aria-labelledby={`faq-${group.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><HelpCircle size={23} aria-hidden /></div>
                    <h2 id={`faq-${group.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className="text-2xl font-bold text-slate-950">{group.title}</h2>
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
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Tell us what you need to know. We will respond clearly and help you decide whether CustoNexus is the right partner for your goals.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <PrimaryButton href="/contact">Contact Our Team <ArrowRight size={18} /></PrimaryButton>
                <Link href="/services" className="inline-flex items-center rounded-full border border-blue-200 px-6 py-3 font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-50">Explore Services</Link>
              </div>
            </div>
          </Container>
        </section>
      </FadeSection>
    </PageWrapper>
  );
}
