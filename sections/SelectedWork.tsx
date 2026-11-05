import Link from "next/link";
import { ArrowRight, FolderKanban, Globe2 } from "lucide-react";

import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import { publishedPortfolioProjects } from "@/lib/portfolio";

const icons = [FolderKanban, Globe2] as const;

export default function SelectedWork() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Selected Work"
          title="Practical technology, designed and built with purpose."
          subtitle="Verified CustoNexus-owned work showing how clear requirements become useful digital experiences and operational systems."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {publishedPortfolioProjects.map((project, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={project.slug} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 p-8">
                  <div aria-hidden className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:34px_34px]" />
                  <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 text-white shadow-2xl backdrop-blur">
                    <Icon size={42} aria-hidden />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="leading-8 text-slate-600">{project.description}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-500">{project.attribution}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.capabilities.map((capability) => <span key={capability} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">{capability}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-9 flex justify-center">
          <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
            Explore our portfolio <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
