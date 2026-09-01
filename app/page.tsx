import FadeSection from "../components/FadeSection";
import PageWrapper from "../components/PageWrapper";
import AboutPreview from "../sections/AboutPreview";
import CallToAction from "../sections/CallToAction";
import ConstitutionPreview from "../sections/ConstitutionPreview";
import Foundation from "../sections/Foundation";
import Hero from "../sections/Hero";
import Purpose from "../sections/Purpose";
import SolutionsPreview from "../sections/SolutionsPreview";
import TrustSection from "../sections/TrustSection";
import WhyChooseUs from "../sections/WhyChooseUs";


export const metadata = {
  title: "Custom Technology, Medical Equipment & Services",
  description:
    "Discover CustoNexus custom websites and apps, hosting, medical equipment supply and servicing, professional services, side projects and trusted healthcare partnerships.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <PageWrapper>

      <Hero />

      <FadeSection>
        <TrustSection />
      </FadeSection>

      <FadeSection>
        <AboutPreview />
      </FadeSection>

      <FadeSection>
        <Foundation />
      </FadeSection>

      <FadeSection>
        <SolutionsPreview />
      </FadeSection>

      <FadeSection>
        <Purpose />
      </FadeSection>

      <FadeSection>
        <WhyChooseUs />
      </FadeSection>

      <FadeSection>
        <ConstitutionPreview />
      </FadeSection>

      <FadeSection>
        <CallToAction />
      </FadeSection>

    </PageWrapper>
  );
}
