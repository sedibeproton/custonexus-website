import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

import {
  Ear,
  Search,
  PencilRuler,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: <Ear size={30} />,
    title: "Listen",
    description:
      "We begin by understanding your goals, challenges and vision.",
  },
  {
    icon: <Search size={30} />,
    title: "Understand",
    description:
      "We analyse your environment to identify meaningful opportunities for improvement.",
  },
  {
    icon: <PencilRuler size={30} />,
    title: "Design",
    description:
      "Together we create practical, people-centred healthcare solutions.",
  },
  {
    icon: <Rocket size={30} />,
    title: "Deliver",
    description:
      "We implement, support and continuously improve every solution.",
  },
];

export default function HowWeWork() {
  return (
    <Section spacing="lg" className="bg-white">
      <SectionHeader
        eyebrow="Our Process"
        title="How We Work"
        subtitle="Every partnership follows a structured process designed to deliver lasting value."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="
              group
              relative
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-lg
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-blue-200
              hover:shadow-2xl
            "
          >
            <div
              className="
                mb-6
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-blue-700
                transition-all
                duration-500
                group-hover:bg-blue-700
                group-hover:text-white
              "
            >
              {step.icon}
            </div>

            <span className="text-sm font-bold tracking-widest text-blue-700">
              0{index + 1}
            </span>

            <h3 className="mt-3 text-2xl font-bold text-slate-900">
              {step.title}
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}