import FeatureCard from "@/components/FeatureCard";
import {
  Users,
  MonitorSmartphone,
  HeartPulse,
  Handshake,
} from "lucide-react";

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
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.35em] text-blue-700">
            Healthcare Today
          </p>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Understanding Today&apos;s Challenges
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600">
            Modern healthcare demands innovative solutions that strengthen
            people, improve efficiency and create meaningful experiences.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {challenges.map((challenge) => (
            <FeatureCard
              key={challenge.title}
              icon={challenge.icon}
              title={challenge.title}
              description={challenge.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}