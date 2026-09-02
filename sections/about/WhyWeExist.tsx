import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import {
  HeartHandshake,
  Handshake,
  Lightbulb,
} from "lucide-react";

export default function WhyWeExist() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="About"
        title="Why We Exist"
        subtitle="The conviction behind everything we build."
        align="center"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        <FeatureCard
          icon={<HeartHandshake size={32} />}
          title="People First"
          description="Healthcare begins and ends with people. Every solution we create is designed to support healthcare professionals and improve patient experiences."
        />

        <FeatureCard
          icon={<Handshake size={32} />}
          title="Trusted Partnerships"
          description="Meaningful collaboration creates better outcomes. We believe long-term partnerships are the foundation of sustainable healthcare innovation."
        />

        <FeatureCard
          icon={<Lightbulb size={32} />}
          title="Purposeful Innovation"
          description="Innovation should solve real healthcare challenges, simplify complexity and create lasting value for those we serve."
        />
      </div>
    </Section>
  );
}
