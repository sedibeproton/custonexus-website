import FadeSection from "@/components/FadeSection";
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

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      {sections.map((SectionComponent, index) => <FadeSection key={index}><SectionComponent /></FadeSection>)}
    </PageWrapper>
  );
}
