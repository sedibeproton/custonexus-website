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
    "Explore CustoNexus healthcare technology, medical solutions and professional services built to improve care and operational outcomes.",
  alternates: { canonical: "/solutions" },
  openGraph: { url: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <PageWrapper>

      <PageHero
        eyebrow="Solutions"
        title="Purpose-Built for Healthcare."
        subtitle="Innovative technology, trusted partnerships and professional services designed to improve healthcare experiences."
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
