import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { Eye, Target } from "lucide-react";

export default function VisionMission() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="About"
        title="Vision & Mission"
        subtitle="The direction that shapes our work and our impact."
        align="center"
      />

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
        <FeatureCard
          icon={<Eye size={32} />}
          title="Our Vision"
          description="To help organisations use thoughtful technology to build stronger customer experiences, clearer operations and sustainable digital capability."
        />

        <FeatureCard
          icon={<Target size={32} />}
          title="Our Mission"
          description="To design useful websites, business applications and technical solutions through clear scope, trusted collaboration and responsible delivery."
        />
      </div>
    </Section>
  );
}
