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
    title: "Manual Administration",
    description:
      "Spreadsheets, paperwork and repeated data entry can consume time and make information difficult to control.",
  },
  {
    icon: <MonitorSmartphone size={30} />,
    title: "Outdated Digital Presence",
    description:
      "A slow, unclear or mobile-unfriendly website can weaken confidence before a conversation begins.",
  },
  {
    icon: <HeartPulse size={30} />,
    title: "Customer Experience",
    description:
      "Customers expect clear information, simple contact options and useful online processes.",
  },
  {
    icon: <Handshake size={30} />,
    title: "Disconnected Systems",
    description:
      "Information scattered across tools, files and messages makes consistent work harder.",
  },
];

export default function HealthcareChallenges() {
  return (
    <Section className="bg-white">
        <SectionHeader
          eyebrow="Common Business Friction"
          title="Understanding Today’s Challenges"
          subtitle="We start with the practical problem: what customers cannot do, what staff repeat, and where information or responsibility becomes unclear."
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
