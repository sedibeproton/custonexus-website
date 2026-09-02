import PageWrapper from "@/components/PageWrapper";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";

import HealthcareChallenges from "@/sections/solutions/HealthcareChallenges";
import OurSolutions from "@/sections/solutions/OurSolutions";
import HowWeWork from "@/sections/solutions/HowWeWork";
import Industries from "@/sections/solutions/Industries";
import WhyCustoNexus from "@/sections/solutions/WhyCustoNexus";
import FutureInnovation from "@/sections/solutions/FutureInnovation";

export const metadata = {
  title: "Healthcare Solutions",
  description:
    "Explore custom websites and apps, medical equipment supply and servicing, consulting, project delivery, side projects and healthcare partnerships from CustoNexus.",
  alternates: { canonical: "/solutions" },
  openGraph: { title: "Healthcare Solutions from CustoNexus Technologies", description: "Explore custom technology, medical equipment services, consulting, side projects and healthcare partnerships.", url: "/solutions", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus healthcare solutions" }] },
  twitter: { card: "summary_large_image", title: "Healthcare Solutions from CustoNexus", description: "Custom technology, medical equipment services, consulting and healthcare partnerships.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export default function SolutionsPage() {
  return (
    <PageWrapper>

      <PageHero
        eyebrow="Solutions"
        title="Purpose-Built for Healthcare."
        subtitle="Custom technology, dependable medical solutions, professional expertise and trusted partnerships designed around real organisational needs."
      />

      <FadeSection>
        <HealthcareChallenges />
      </FadeSection>

      <FadeSection>
        <OurSolutions />
      </FadeSection>

      <FadeSection>
        <HowWeWork />
      </FadeSection>

      <FadeSection>
        <Industries />
      </FadeSection>

      <FadeSection>
        <WhyCustoNexus />
      </FadeSection>

      <FadeSection>
        <FutureInnovation />
      </FadeSection>

      <FadeSection>
        <CTASection
          title="Let's Build Better Healthcare Together"
          subtitle="Partner with CustoNexus Technologies to strengthen healthcare through meaningful connections."
          buttonText="Let's Talk"
          buttonLink="/contact"
        />
      </FadeSection>

    </PageWrapper>
  );
}
