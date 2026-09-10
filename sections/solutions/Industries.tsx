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
    title: "Small & Growing Businesses",
    description:
      "Professional websites and practical systems that can grow with the organisation.",
  },
  {
    icon: <Stethoscope size={30} />,
    title: "Professional Practices",
    description:
      "Clear service journeys, enquiries, bookings and dependable digital presentation.",
  },
  {
    icon: <HeartHandshake size={30} />,
    title: "Healthcare Organisations",
    description:
      "Sector-aware websites, workflows, portals and specialised technology projects.",
  },
  {
    icon: <Package size={30} />,
    title: "Service Businesses",
    description:
      "Customer-facing forms, portals and systems that support consistent service delivery.",
  },
  {
    icon: <Cpu size={30} />,
    title: "Startups & Custom Projects",
    description:
      "Focused digital builds for validated ideas and specialised organisational requirements.",
  },
];

export default function Industries() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="Who We Serve"
        title="Supporting Organisations at Different Stages"
        subtitle="The right solution depends on the business, its users and the process or opportunity it needs to improve."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
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
