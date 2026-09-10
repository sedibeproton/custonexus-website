import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import Container from "@/components/Container";

const capabilities = ["Practice and healthcare websites", "Healthcare software and portals", "Digital workflows and connected systems", "Technology projects for suppliers and care organisations"];

export default function Foundation() {
  return (
    <section className="relative overflow-hidden bg-[#071a3d] py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(37,99,235,.4),transparent_35%),radial-gradient(circle_at_10%_90%,rgba(16,185,129,.15),transparent_25%)]" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-blue-200"><span className="h-px w-8 bg-emerald-400" />Healthcare specialisation</p>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Built with healthcare in our DNA.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">We serve businesses across sectors, while healthcare remains an important long-term specialisation. That perspective strengthens how we think about trust, usability, responsible information handling and dependable operations.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">{capabilities.map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-blue-50"><CheckCircle2 size={18} aria-hidden className="mt-0.5 shrink-0 text-emerald-300" />{item}</div>)}</div>
          <Link href="/services/healthcare-technology" className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-blue-950 transition hover:-translate-y-0.5 hover:bg-blue-50">Explore healthcare technology <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl"><Image src="/images/solutions-healthcare.jpg" alt="Healthcare professionals using connected technology" fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-blue-950/45 via-transparent to-transparent" /></div>
      </Container>
    </section>
  );
}
