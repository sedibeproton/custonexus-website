import FadeSection from "@/components/FadeSection";
import PageWrapper from "@/components/PageWrapper";

import AboutHero from "@/sections/about/AboutHero";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About CustoNexus Technologies",
  description:
    "Learn about CustoNexus Technologies, a South African technology company building websites, business systems and healthcare technology with practical purpose.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About CustoNexus Technologies", description: "Learn about our purpose, vision and commitment to meaningful healthcare technology, services and partnerships.", url: "/about", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About CustoNexus Technologies" }] },
  twitter: { card: "summary_large_image", title: "About CustoNexus Technologies", description: "Our purpose, vision and commitment to better healthcare through technology and trusted partnerships.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

import OurStory from "@/sections/about/OurStory";
import WhyWeExist from "@/sections/about/WhyWeExist";
import FoundationSection from "@/sections/about/FoundationSection";
import VisionMission from "@/sections/about/VisionMission";
import CoreValues from "@/sections/about/CoreValues";
import LeadershipPhilosophy from "@/sections/about/LeadershipPhilosophy";
import TheDifference from "@/sections/about/TheDifference";

export default function AboutPage() {
  return (
    <PageWrapper>

      <AboutHero />

<FadeSection>
  <OurStory />
</FadeSection>

<FadeSection>
  <WhyWeExist />
</FadeSection>

<FadeSection>
  <FoundationSection />
</FadeSection>

<FadeSection>
  <VisionMission />
</FadeSection>

<FadeSection>
  <CoreValues />
</FadeSection>

<FadeSection>
  <LeadershipPhilosophy />
</FadeSection>

<FadeSection>
  <TheDifference />
</FadeSection>

<FadeSection>
  <CTASection
    title="Let’s Build Something Useful Together"
    subtitle="Tell us about the website, system or technology challenge your organisation is ready to improve."
    buttonText="Start a Project"
    buttonLink="/contact"
  />
</FadeSection>

    </PageWrapper>
  );
}
