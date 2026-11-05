import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FolderKanban, Globe2 } from "lucide-react";

import CTASection from "@/components/CTASection";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { publishedPortfolioProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio & Selected Technology Work",
  description:
    "Explore verified CustoNexus website and business application work, including custom digital experiences and operational systems.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "CustoNexus Portfolio & Selected Work",
    description: "Verified website and business application work designed and developed by CustoNexus Technologies.",
    url: "/portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus Technologies portfolio and selected work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CustoNexus Portfolio & Selected Work",
    description: "Verified website and business application work from CustoNexus Technologies.",
    images: ["/opengraph-image"],
  },
};

const icons = [FolderKanban, Globe2] as const;

export default function PortfolioPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Portfolio"
        title="Selected Work, Presented With Clear Attribution"
        subtitle="A growing collection of verified CustoNexus-owned work that demonstrates our approach to websites, applications and practical digital systems."
      />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Published Work"
            title="Technology Built Around Real Requirements"
            subtitle="Each entry identifies what CustoNexus actually designed or developed. We do not publish invented results, testimonials or performance claims."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {publishedPortfolioProjects.map((project, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article key={project.slug} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
                  <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 p-8 text-white sm:p-10">
                    <div aria-hidden className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
                    <div className="relative">
                      <span className="inline-flex rounded-2xl border border-white/20 bg-white/10 p-4"><Icon size={34} aria-hidden /></span>
                      <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-blue-200">{project.category}</p>
                      <h2 className="mt-3 text-3xl font-black tracking-tight">{project.title}</h2>
                      <p className="mt-3 font-semibold text-blue-100">{project.industry}</p>
                    </div>
                  </div>
                  <div className="p-7 sm:p-9">
                    <p className="leading-8 text-slate-600">{project.description}</p>
                    <p className="mt-4 text-sm font-semibold text-slate-500">{project.attribution}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project capabilities">
                      {project.capabilities.map((capability) => <li key={capability} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">{capability}</li>)}
                    </ul>
                    <Link
                      href={project.href}
                      target={project.external ? "_blank" : undefined}
                      rel={project.external ? "noopener noreferrer" : undefined}
                      aria-label={project.external ? `View the ${project.title} live website (opens in a new tab)` : undefined}
                      className="mt-7 inline-flex items-center gap-2 rounded-full font-bold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                    >
                      {project.external ? "View live website" : "Explore related capability"} <ArrowRight size={17} aria-hidden />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="mt-10 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 shrink-0 text-emerald-700" aria-hidden />
              <div>
                <h2 className="text-xl font-bold text-slate-950">A permission-conscious portfolio</h2>
                <p className="mt-3 max-w-4xl leading-7 text-slate-700">Client names, branding, screenshots and outcome claims are added only when the information is verified and publication permission is confirmed.</p>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <CTASection
        title="Have a Project We Can Build With You?"
        subtitle="Tell us what your organisation needs and we will help define a practical, clearly scoped next step."
        buttonText="Start a Project"
        buttonLink="/contact"
      />
    </PageWrapper>
  );
}
