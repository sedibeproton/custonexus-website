import { Building2, BriefcaseBusiness, HeartPulse, Rocket, Store, UsersRound } from "lucide-react";

import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const audiences = [
  { icon: Store, title: "Small & Growing Businesses", text: "A credible website and digital tools that can grow with the organisation." },
  { icon: BriefcaseBusiness, title: "Professional Practices", text: "Clear service information, enquiries, bookings and dependable online presentation." },
  { icon: HeartPulse, title: "Healthcare Organisations", text: "Technology shaped by the responsibilities and workflows of healthcare environments." },
  { icon: Rocket, title: "Startups", text: "Focused first versions that turn a validated idea into something people can use and test." },
  { icon: UsersRound, title: "Consultants & Service Businesses", text: "Websites, forms, portals and workflows that support customer relationships." },
  { icon: Building2, title: "Organisations With Custom Needs", text: "Purpose-built systems where generic software does not fit the way the team works." },
] as const;

export default function AboutPreview() {
  return (
    <Section className="bg-slate-50">
      <SectionHeader eyebrow="Who We Help" title="Technology is not only for large organisations." subtitle="CustoNexus works with legitimate South African businesses and healthcare organisations that need a clearer website, a better process or specialised digital capability." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><Icon className="text-blue-700" size={26} aria-hidden /><h3 className="mt-5 text-xl font-bold text-blue-950">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
      </div>
    </Section>
  );
}
