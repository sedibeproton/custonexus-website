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

      <div className="mt-20 grid gap-8 lg:grid-cols-2">
        <FeatureCard
          icon={<Eye size={32} />}
          title="Our Vision"
          description="To shape a future where meaningful connections improve healthcare experiences for everyone."
        />

        <FeatureCard
          icon={<Target size={32} />}
          title="Our Mission"
          description="To empower healthcare through trusted partnerships, innovative solutions and people-centred technology."
        />
      </div>
    </Section>
  );
}