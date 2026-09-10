import { Headphones, Layers3, MessageSquareText, Scale, Settings2, Waypoints } from "lucide-react";

import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const reasons = [
  { icon: MessageSquareText, title: "Direct communication", text: "Speak clearly about the problem, decisions and progress without unnecessary layers." },
  { icon: Settings2, title: "Built around the real need", text: "We define the work around your users and operations rather than forcing a generic package." },
  { icon: Layers3, title: "Room to grow", text: "Solutions are planned with maintainability and future requirements in mind." },
  { icon: Scale, title: "Transparent scope", text: "Deliverables, responsibilities, assumptions and exclusions are agreed before delivery begins." },
  { icon: Waypoints, title: "Practical problem solving", text: "Recommendations focus on what is useful, feasible and appropriate for the current stage." },
  { icon: Headphones, title: "Support after launch", text: "Hosting, maintenance, troubleshooting and future improvements can continue where agreed." },
] as const;

export default function WhyChooseUs() {
  return (
    <Section className="relative bg-slate-50">
      <SectionHeader eyebrow="Why CustoNexus" title="Serious delivery without unnecessary complexity." subtitle="We build trust through clear work, honest expectations and technology that has a practical reason to exist." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon size={23} aria-hidden /></span><h3 className="mt-5 text-xl font-bold text-blue-950">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
      </div>
    </Section>
  );
}
