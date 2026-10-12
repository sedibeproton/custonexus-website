import FadeSection from "@/components/FadeSection";
import PageWrapper from "@/components/PageWrapper";

import AboutHero from "@/sections/about/AboutHero";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Our Technology Company",
  description:
    "Learn about CustoNexus Technologies, a South African company building professional websites, custom business systems and practical digital solutions.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About CustoNexus Technologies", description: "Our purpose, principles and approach to custom websites, business software and specialist technology services.", url: "/about", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About CustoNexus Technologies" }] },
  twitter: { card: "summary_large_image", title: "About CustoNexus Technologies", description: "A South African technology company building useful websites, systems and digital solutions.", images: ["/opengraph-image"] },
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
