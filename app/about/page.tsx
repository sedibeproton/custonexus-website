import FadeSection from "@/components/FadeSection";
import PageWrapper from "@/components/PageWrapper";

import AboutHero from "@/sections/about/AboutHero";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About",
  description:
    "Learn about CustoNexus Technologies, our purpose, vision and commitment to improving healthcare through meaningful connections.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
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
    title="Let's Build Better Healthcare Together"
    subtitle="Whether you're a healthcare practice, technology partner or organisation, we'd love to hear from you."
    buttonText="Let's Talk"
    buttonLink="/contact"
  />
</FadeSection>

    </PageWrapper>
  );
}
