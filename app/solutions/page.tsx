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
  title: "Business Technology Solutions",
  description:
    "Explore business websites, custom applications, dashboards, portals, workflow systems and healthcare technology solutions from CustoNexus.",
  alternates: { canonical: "/solutions" },
  openGraph: { title: "Business Technology Solutions from CustoNexus", description: "Websites, custom systems, workflow tools and healthcare technology for South African organisations.", url: "/solutions", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus business technology solutions" }] },
  twitter: { card: "summary_large_image", title: "Business Technology Solutions from CustoNexus", description: "Websites, custom systems and practical digital solutions.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export default function SolutionsPage() {
  return (
    <PageWrapper>

      <PageHero
        eyebrow="Solutions"
        title="Digital Solutions Built Around Real Work."
        subtitle="Websites, portals, dashboards, business applications and workflow tools for organisations that need technology to solve a specific problem."
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
          title="What Is Slowing Your Business Down?"
          subtitle="Tell us what you want customers or staff to do more easily. We will help explore the right digital approach."
          buttonText="Start a Project"
          buttonLink="/contact"
        />
      </FadeSection>

    </PageWrapper>
  );
}
