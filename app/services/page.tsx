import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";
import ServiceCategoryExplorer from "@/components/ServiceCategoryExplorer";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore CustoNexus healthcare technology, website and app development, medical equipment and consumables, professional services and strategic partnerships.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Healthcare Technology, Equipment and Professional Services",
    description:
      "Explore four connected service categories designed to help healthcare organisations operate, grow and serve people better.",
    url: "/services",
  },
};

const process = [
  {
    number: "01",
    title: "Discover",
    text: "We listen, define the need and understand the people, environment and outcomes involved.",
  },
  {
    number: "02",
    title: "Recommend",
    text: "We identify the right service, product or partnership approach and present a clear path forward.",
  },
  {
    number: "03",
    title: "Deliver",
    text: "We coordinate delivery with clear communication, quality controls and accountable ownership.",
  },
  {
    number: "04",
    title: "Support",
    text: "We help with adoption, continuity and ongoing improvement where the engagement requires it.",
  },
];

export default function ServicesPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Services"
        title="Four Capabilities. One Healthcare Partner."
        subtitle="Explore our technology, medical supply, professional service and partnership capabilities—organised so you can quickly find the support your organisation needs."
      />

      <FadeSection>
        <section id="service-categories" className="scroll-mt-28 bg-slate-50 py-12 sm:py-24">
          <Container>
            <SectionHeader
              eyebrow="Explore Our Services"
              title="Choose a Category to See What We Provide"
              subtitle="Select any category below to explore its services, products and areas of expertise."
            />
            <ServiceCategoryExplorer />
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(37,99,235,0.28),transparent_35%)]"
          />
          <Container className="relative">
            <SectionHeader
              eyebrow="How We Work"
              title="A Clear Path From Need to Outcome"
              subtitle="Whether you need a digital platform, medical supplies, specialist guidance or a strategic partner, our approach stays practical and transparent."
              variant="inverted"
            />
            <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {process.map((step) => (
                <li
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:rounded-3xl sm:p-7"
                >
                  <span className="text-sm font-bold tracking-[0.2em] text-blue-300">
                    {step.number}
                  </span>
                  <h2 className="mt-5 text-2xl font-bold">{step.title}</h2>
                  <p className="mt-4 leading-7 text-slate-300">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-blue-50 py-16 sm:py-24">
          <Container>
            <div className="grid items-center gap-7 rounded-3xl border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/5 sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10 lg:rounded-[2rem] lg:p-12">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-blue-700 text-white shadow-xl shadow-blue-700/20">
                <HeartPulse size={45} aria-hidden />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">
                  Built Around Your Needs
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Need services from more than one category?
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  We can combine technology, equipment sourcing, professional
                  expertise and partner capabilities into one coordinated
                  engagement.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <PrimaryButton href="/contact">
                    Discuss your needs <ArrowRight size={18} />
                  </PrimaryButton>
                  <Link
                    href="/faqs"
                    className="inline-flex items-center rounded-full border border-blue-200 px-6 py-3 font-semibold text-blue-700 transition hover:border-blue-700 hover:bg-blue-50"
                  >
                    Read FAQs
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <CTASection
          title="Let’s Build the Right Solution Together"
          subtitle="Tell us what you need, and we will connect the right services, products and expertise around your goals."
          buttonText="Start a Conversation"
          buttonLink="/contact"
        />
      </FadeSection>
    </PageWrapper>
  );
}
