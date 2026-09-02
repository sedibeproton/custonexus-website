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
import DigitalCraftsmanship from "../sections/DigitalCraftsmanship";


export const metadata = {
  title: "Custom Technology, Medical Equipment & Services",
  description:
    "Discover CustoNexus custom websites and apps, hosting, medical equipment supply and servicing, professional services, side projects and trusted healthcare partnerships.",
  alternates: { canonical: "/" },
  openGraph: { title: "Custom Technology, Medical Equipment & Services", description: "Discover CustoNexus custom websites and apps, hosting, medical equipment supply and servicing, professional services, side projects and trusted healthcare partnerships.", url: "/", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus Technologies — Together, Better Healthcare" }] },
  twitter: { card: "summary_large_image", title: "Custom Technology, Medical Equipment & Services", description: "Custom websites and apps, medical equipment services, consulting and healthcare partnerships from CustoNexus Technologies.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <PageWrapper>

      <Hero />

      <FadeSection>
        <TrustSection />
      </FadeSection>

      <FadeSection>
        <DigitalCraftsmanship />
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
