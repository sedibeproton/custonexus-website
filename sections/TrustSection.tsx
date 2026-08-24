import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import AnimatedCard from "@/components/AnimatedCard";
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  Sparkles,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Healthcare First",
    description:
      "Every decision begins with improving healthcare experiences.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Partnerships",
    description:
      "Building lasting relationships through integrity and collaboration.",
  },
  {
    icon: Users,
    title: "People Centred",
    description:
      "Technology exists to empower people, not replace them.",
  },
  {
    icon: Sparkles,
    title: "Constitution Driven",
    description:
      "Guided by enduring principles that shape every decision we make.",
  },
];

export default function TrustSection() {
  return (
    <Section className="bg-white border-y border-slate-200">

      <div className="text-center">
        <SectionHeader
          eyebrow="Why CustoNexus"
          title="Built on Trust. Committed to Better Healthcare."
          subtitle="Everything we do is guided by a commitment to people, partnerships, innovation and excellence in healthcare."
        />
      </div>

      <div className="mt-20 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-4">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <AnimatedCard key={item.title} className="flex h-full flex-col p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-300 group-hover:scale-110">

                <Icon className="h-8 w-8 text-blue-700" />

              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {item.description}
              </p>

            </AnimatedCard>
          );
        })}

      </div>

    </Section>
  );
}