import FeatureCard from "@/components/FeatureCard";
import {
  Users,
  MonitorSmartphone,
  HeartPulse,
  Handshake,
} from "lucide-react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const challenges = [
  {
    icon: <Users size={30} />,
    title: "Workforce Pressure",
    description:
      "Healthcare professionals work in demanding environments that require dependable support.",
  },
  {
    icon: <MonitorSmartphone size={30} />,
    title: "Digital Transformation",
    description:
      "Technology should simplify healthcare rather than create unnecessary complexity.",
  },
  {
    icon: <HeartPulse size={30} />,
    title: "Patient Experience",
    description:
      "Exceptional care depends on meaningful experiences for patients and professionals alike.",
  },
  {
    icon: <Handshake size={30} />,
    title: "Trusted Partnerships",
    description:
      "Long-term collaboration creates sustainable improvements across healthcare.",
  },
];

export default function HealthcareChallenges() {
  return (
    <Section className="bg-white">
        <SectionHeader
          eyebrow="Healthcare Today"
          title="Understanding Today’s Challenges"
          subtitle="Modern healthcare demands innovative solutions that strengthen people, improve efficiency and create meaningful experiences."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {challenges.map((challenge) => (
            <FeatureCard
              key={challenge.title}
              icon={challenge.icon}
              title={challenge.title}
              description={challenge.description}
            />
          ))}
        </div>
    </Section>
  );
}
