import FadeSection from "@/components/FadeSection";
import PricingCards from "@/components/PricingCards";
import Container from "@/components/Container";
import Link from "next/link";
import { pricingLabel } from "@/lib/pricing";
import PageWrapper from "@/components/PageWrapper";
import AboutPreview from "@/sections/AboutPreview";
import CallToAction from "@/sections/CallToAction";
import DigitalCraftsmanship from "@/sections/DigitalCraftsmanship";
import Foundation from "@/sections/Foundation";
import Hero from "@/sections/Hero";
import Purpose from "@/sections/Purpose";
import SelectedWork from "@/sections/SelectedWork";
import SolutionsPreview from "@/sections/SolutionsPreview";
import TrustSection from "@/sections/TrustSection";
import WhyChooseUs from "@/sections/WhyChooseUs";

export const metadata = {
  title: { absolute: "Website & Application Development | CustoNexus" },
  description: "CustoNexus designs, develops and modernises websites and custom applications for South African businesses, with software integration and technical support.",
  alternates: { canonical: "/" },
  openGraph: { title: "Website & Application Development", description: "Custom websites, web and desktop applications, software modernisation and integration for South African businesses.", url: "/", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus Technologies — websites, applications and digital solutions" }] },
  twitter: { card: "summary_large_image", title: "Website & Application Development", description: "Custom websites, applications, software modernisation and integration for South African businesses.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const sections = [SolutionsPreview, DigitalCraftsmanship, Purpose, AboutPreview, SelectedWork, TrustSection, WhyChooseUs, Foundation, CallToAction];

import { getPublicPricing } from "@/lib/pricing-store";
export default async function Home() {
  const prices = await getPublicPricing();
  return (
    <PageWrapper>
      <Hero />
      <Container className="py-8 sm:py-12">
        <Link href="/pricing" className="font-bold text-blue-800 underline">Explore Our Pricing</Link>
        <h2 className="mt-3 text-3xl font-bold text-blue-950">Website packages</h2>
        <PricingCards entries={prices.filter(({ id }) => ["starter-website", "business-website", "professional-website", "e-commerce-website"].includes(id))} />
        {prices.filter(({ id }) => ["basic-website-hosting", "essential"].includes(id)).map((entry) => <p key={entry.id} className="mt-3">{entry.name} · {pricingLabel(entry)}</p>)}
        <Link href="/pricing" className="mt-4 inline-block rounded-xl bg-blue-800 px-5 py-3 font-bold text-white">View All Pricing</Link>
      </Container>
      {sections.map((SectionComponent, index) => <FadeSection key={index}><SectionComponent /></FadeSection>)}
    </PageWrapper>
  );
}
