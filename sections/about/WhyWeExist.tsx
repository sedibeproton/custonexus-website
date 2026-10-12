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
          description="Useful technology begins with people. We design around the customers, teams and stakeholders who need to understand, use and trust each solution."
        />

        <FeatureCard
          icon={<Handshake size={32} />}
          title="Trusted Partnerships"
          description="Clear communication and shared responsibility create better outcomes. We work to build relationships based on trust, realistic expectations and accountable delivery."
        />

        <FeatureCard
          icon={<Lightbulb size={32} />}
          title="Purposeful Innovation"
          description="Innovation should solve a real customer or operational problem, simplify avoidable complexity and create practical value for the organisation."
        />
      </div>
    </Section>
  );
}
