import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import Container from "@/components/Container";

export type CaseStudy = {
  client: string;
  project: string;
  industry: string;
  overview: string;
  challenge: string;
  requirements: readonly string[];
  technicalApproach: string;
  deliveredSolution: readonly string[];
  verifiedOutcomes?: readonly string[];
  technologies?: readonly string[];
  referenceUrl?: string;
  mediaApproved: boolean;
};

export default function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  return <article className="bg-white py-16 sm:py-24">
    <Container className="max-w-5xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">{study.industry} · Case study</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-blue-950 sm:text-5xl">{study.project}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{study.overview}</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <CaseSection title="Original challenge"><p>{study.challenge}</p></CaseSection>
        <CaseSection title="Technical approach"><p>{study.technicalApproach}</p></CaseSection>
        <CaseList title="Requirements" items={study.requirements}/>
        <CaseList title="Delivered solution" items={study.deliveredSolution}/>
        {study.verifiedOutcomes?.length ? <CaseList title="Verified outcomes" items={study.verifiedOutcomes}/> : null}
        {study.technologies?.length ? <CaseList title="Technologies actually used" items={study.technologies}/> : null}
      </div>
      {!study.mediaApproved && <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">Client branding, screenshots and references must remain unpublished until portfolio permission is confirmed.</p>}
      {study.referenceUrl && <Link href={study.referenceUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-bold text-blue-700">View approved public reference <ArrowUpRight size={17} aria-hidden/></Link>}
    </Container>
  </article>;
}

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6"><h2 className="text-xl font-bold text-blue-950">{title}</h2><div className="mt-4 leading-7 text-slate-600">{children}</div></section>;
}

function CaseList({ title, items }: { title: string; items: readonly string[] }) {
  return <CaseSection title={title}><ul className="space-y-3">{items.map(item=><li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={18} aria-hidden/>{item}</li>)}</ul></CaseSection>;
}
