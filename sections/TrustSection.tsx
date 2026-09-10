import { CheckCircle2 } from "lucide-react";

import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  ["01", "Tell us what you need", "Share the business, problem, current situation and outcome you want."],
  ["02", "We understand the problem", "We ask focused questions and identify the most practical starting point."],
  ["03", "Receive a clear proposal", "Scope, responsibilities, timeline, assumptions and price are documented."],
  ["04", "We build and test", "Approved work is delivered collaboratively and checked against the scope."],
  ["05", "Launch and support", "We complete the handover and agree on maintenance or future improvements."],
] as const;

export default function TrustSection() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader eyebrow="How It Works" title="A practical path from idea to delivery." subtitle="You should know what happens next, what each party is responsible for and what the approved work will include." />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {steps.map(([number, title, text]) => <li key={number} className="relative rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-white hover:shadow-lg"><span className="text-sm font-black tracking-[0.2em] text-blue-600">{number}</span><CheckCircle2 size={20} aria-hidden className="absolute right-5 top-5 text-emerald-500" /><h3 className="mt-5 text-xl font-bold text-blue-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></li>)}
        </ol>
      </Container>
    </section>
  );
}
