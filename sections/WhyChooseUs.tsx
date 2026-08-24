import Section from "@/components/Section";
import AccentDots from "@/components/AccentDots";
import SectionHeader from "@/components/SectionHeader";
import {
  HeartPulse,
  Handshake,
  Cpu,
} from "lucide-react";

const pillars = [
  {
    icon: HeartPulse,
    title: "Healthcare Excellence",
    description:
      "Every solution begins with a commitment to improving healthcare experiences, supporting professionals, and creating better outcomes for patients and communities.",
  },
  {
    icon: Handshake,
    title: "Meaningful Partnerships",
    description:
      "We work alongside healthcare organisations, technology providers, and industry leaders to build relationships founded on trust, collaboration, and shared success.",
  },
  {
    icon: Cpu,
    title: "Purposeful Innovation",
    description:
      "Technology should empower people. We design and deliver innovative solutions that strengthen healthcare without losing the human connection.",
  },
];

export default function WhyChooseUs() {
  return (
    <Section className="relative bg-slate-50">
      <div className="pointer-events-none absolute top-10 right-16 h-44 w-44 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 left-10 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

      <div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            eyebrow="The CustoNexus Difference"
            title="Built for healthcare. Driven by purpose."
            subtitle="We combine healthcare expertise, meaningful partnerships, and responsible innovation to create solutions that deliver lasting value."
            align="left"
          />
          <AccentDots className="hidden lg:block" />
        </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

                  <Icon className="h-8 w-8 text-blue-700" />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {pillar.title}
                </h3>

                <p className="mt-6 leading-8 text-slate-600">
                  {pillar.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </Section>
  );
}