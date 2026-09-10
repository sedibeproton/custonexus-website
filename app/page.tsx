import FadeSection from "@/components/FadeSection";
import PageWrapper from "@/components/PageWrapper";
import AboutPreview from "@/sections/AboutPreview";
import CallToAction from "@/sections/CallToAction";
import DigitalCraftsmanship from "@/sections/DigitalCraftsmanship";
import Foundation from "@/sections/Foundation";
import Hero from "@/sections/Hero";
import Purpose from "@/sections/Purpose";
import SolutionsPreview from "@/sections/SolutionsPreview";
import TrustSection from "@/sections/TrustSection";
import WhyChooseUs from "@/sections/WhyChooseUs";

export const metadata = {
  title: "Website Design & Custom Business Systems South Africa",
  description: "Business website design, website redesign, maintenance, WordPress support, custom web applications and business systems from CustoNexus Technologies in South Africa.",
  alternates: { canonical: "/" },
  openGraph: { title: "Website Design & Custom Business Systems South Africa", description: "Professional websites, website support and custom digital systems for South African businesses and healthcare organisations.", url: "/", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus Technologies — business websites and custom systems" }] },
  twitter: { card: "summary_large_image", title: "Website Design & Custom Business Systems South Africa", description: "Professional websites, website support and custom digital systems for South African organisations.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const sections = [SolutionsPreview, DigitalCraftsmanship, Purpose, AboutPreview, TrustSection, WhyChooseUs, Foundation, CallToAction];

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      {sections.map((SectionComponent, index) => <FadeSection key={index}><SectionComponent /></FadeSection>)}
    </PageWrapper>
  );
}
