import Link from "next/link";
import { ArrowRight, CalendarCheck, Database, FileCheck2, LayoutDashboard, RefreshCw, UsersRound } from "lucide-react";

import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const examples = [
  { icon: CalendarCheck, title: "Booking systems" },
  { icon: UsersRound, title: "Client portals" },
  { icon: LayoutDashboard, title: "Internal dashboards" },
  { icon: FileCheck2, title: "Digital forms & approvals" },
  { icon: Database, title: "Database applications" },
  { icon: RefreshCw, title: "Workflow automation" },
] as const;

export default function Purpose() {
  return (
    <Section className="relative bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader eyebrow="Business Systems" title="Move beyond spreadsheets, paperwork and repetitive admin." subtitle="If a manual process is slowing your business down, we can explore a secure digital system built around the way your team actually works." align="left" />
          <p className="max-w-2xl leading-8 text-slate-600">We begin by understanding the users, information, decisions and risks in the process. Then we define the smallest useful system that can create practical value.</p>
          <Link href="/services/business-systems" className="group mt-7 inline-flex items-center gap-2 font-bold text-blue-700">Explore custom business systems <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {examples.map(({ icon: Icon, title }) => <div key={title} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"><Icon size={23} aria-hidden /></span><h3 className="font-bold text-blue-950">{title}</h3></div>)}
        </div>
      </div>
    </Section>
  );
}
