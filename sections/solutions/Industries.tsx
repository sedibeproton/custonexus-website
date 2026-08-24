import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

import {
  Building2,
  Stethoscope,
  HeartHandshake,
  Package,
  Cpu,
} from "lucide-react";

const industries = [
  {
    icon: <Building2 size={30} />,
    title: "Hospitals",
    description:
      "Supporting hospitals with technology, partnerships and strategic solutions.",
  },
  {
    icon: <Stethoscope size={30} />,
    title: "Medical Practices",
    description:
      "Helping practices improve efficiency and patient experiences.",
  },
  {
    icon: <HeartHandshake size={30} />,
    title: "Allied Health",
    description:
      "Supporting physiotherapists and other allied healthcare professionals.",
  },
  {
    icon: <Package size={30} />,
    title: "Healthcare Suppliers",
    description:
      "Connecting suppliers with opportunities that strengthen healthcare delivery.",
  },
  {
    icon: <Cpu size={30} />,
    title: "Technology Partners",
    description:
      "Collaborating with innovators to shape the future of healthcare.",
  },
];

export default function Industries() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="Who We Serve"
        title="Supporting the Healthcare Ecosystem"
        subtitle="Our solutions are designed to support organisations across the healthcare landscape."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <FeatureCard
            key={industry.title}
            icon={industry.icon}
            title={industry.title}
            description={industry.description}
          />
        ))}
      </div>
    </Section>
  );
}