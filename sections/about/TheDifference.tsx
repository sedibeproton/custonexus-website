import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

import {
  HeartHandshake,
  ShieldCheck,
  Lightbulb,
  Users,
} from "lucide-react";

const items = [
  {
    icon: <HeartHandshake className="h-7 w-7" />,
    title: "Meaningful Partnerships",
    description:
      "We build long-term relationships founded on trust, collaboration and shared success.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: "Constitution Driven",
    description:
      "Every decision is guided by enduring principles that remain constant as we grow.",
  },
  {
    icon: <Lightbulb className="h-7 w-7" />,
    title: "Innovation With Purpose",
    description:
      "Technology is valuable only when it improves healthcare experiences for people.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "People First",
    description:
      "Healthcare professionals, patients and partners remain at the centre of everything we create.",
  },
];

export default function TheDifference() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="Why CustoNexus"
        title="What Makes Us Different"
        subtitle="Our competitive advantage isn't simply what we build—it's how we think, how we serve and the principles that guide every decision."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {items.map((item) => (
          <FeatureCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Section>
  );
}