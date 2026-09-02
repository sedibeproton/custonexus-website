import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import {
  ShieldCheck,
  Award,
  Lightbulb,
  Handshake,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function CoreValues() {
  return (
    <Section spacing="lg" className="bg-white">
      <SectionHeader
        eyebrow="About"
        title="Core Values"
        subtitle="The beliefs that guide how we lead and serve."
        align="center"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        <FeatureCard
          icon={<ShieldCheck size={32} />}
          title="Integrity"
          description="We act honestly, ethically and transparently in everything we do."
        />

        <FeatureCard
          icon={<Award size={32} />}
          title="Excellence"
          description="We pursue exceptional quality in every solution, service and partnership."
        />

        <FeatureCard
          icon={<Lightbulb size={32} />}
          title="Innovation"
          description="We embrace ideas that solve meaningful healthcare challenges."
        />

        <FeatureCard
          icon={<Handshake size={32} />}
          title="Partnership"
          description="Meaningful collaboration creates stronger healthcare outcomes."
        />

        <FeatureCard
          icon={<Heart size={32} />}
          title="Compassion"
          description="Every decision reflects our commitment to improving people's lives."
        />

        <FeatureCard
          icon={<TrendingUp size={32} />}
          title="Continuous Improvement"
          description="We never stop learning, evolving and striving to do better."
        />
      </div>
    </Section>
  );
}
