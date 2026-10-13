import Link from "next/link";
import { ArrowUpRight, Code2, ExternalLink, FolderKanban, Globe2, HeartPulse, MonitorSmartphone } from "lucide-react";

import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const featuredProject = {
  title: "Sedibe Mbhele Physiotherapy",
  category: "Website Design & Development",
  industry: "Healthcare / Physiotherapy",
  description:
    "A professional website created for a physiotherapy practice, designed to present its services clearly and help visitors find useful information and contact options with ease.",
  technologies: ["Professional Website", "Responsive Design", "Healthcare Experience"],
  href: "https://sedibembhelephysio.co.za",
  attribution: "Designed by the CustoNexus founder",
} as const;

const publishedWork = [
  {
    title: "CustoNexus Digital Platform",
    category: "Internal product",
    description:
      "A responsive public website and secure operational workspace supporting enquiries, document management, quotations, invoices and administrative workflows.",
    technologies: ["Next.js", "PostgreSQL", "Cloudflare R2"],
    href: "/services/business-systems",
    icon: FolderKanban,
    attribution: "Designed and developed by CustoNexus Technologies",
  },
  {
    title: "CustoNexus Website Experience",
    category: "Internal product",
    description:
      "A custom-designed, mobile-first business website demonstrating structured service journeys, accessible enquiry forms, technical SEO and analytics integration.",
    technologies: ["Next.js", "TypeScript", "Responsive UI"],
    href: "/services/business-websites",
    icon: Globe2,
    attribution: "Designed and developed by CustoNexus Technologies",
  },
] as const;

export default function SelectedWork() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Selected Work"
          title="Practical technology, designed and built with purpose."
          subtitle="A selection of client work and CustoNexus products that demonstrates how we turn real requirements into clear, usable digital experiences."
        />

        <article className="group relative mb-5 overflow-hidden rounded-[2rem] border border-blue-200 bg-white shadow-[0_24px_70px_-36px_rgba(15,56,130,0.45)]">
          <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-700 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  Featured client project
                </span>
                <span className="text-sm font-bold text-emerald-700">{featuredProject.industry}</span>
              </div>
              <h3 className="mt-7 max-w-xl text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
                {featuredProject.title}
              </h3>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
                {featuredProject.category}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {featuredProject.description}
              </p>
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Code2 size={17} aria-hidden className="text-blue-600" />
                {featuredProject.attribution}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featuredProject.technologies.map((item) => (
                  <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href={featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
                aria-label="View the Sedibe Mbhele Physiotherapy live website (opens in a new tab)"
              >
                View live website <ExternalLink size={17} aria-hidden />
              </Link>
            </div>

            <div className="relative min-h-80 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 p-5 sm:p-8 lg:min-h-[34rem] lg:p-10">
              <div aria-hidden className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="relative mx-auto flex h-full max-w-xl items-center">
                <div className="w-full overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-blue-950/40 transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[0.3deg]">
                  <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1.5 text-center text-[11px] font-semibold text-slate-500">
                      sedibembhelephysio.co.za
                    </span>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-7 sm:p-10">
                    <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-200/50 blur-2xl" />
                    <div className="relative flex items-center gap-3 text-blue-900">
                      <span className="rounded-2xl bg-blue-700 p-3 text-white shadow-lg shadow-blue-700/20">
                        <HeartPulse size={28} aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Project profile</p>
                        <p className="mt-1 text-lg font-black">Sedibe Mbhele Physiotherapy</p>
                      </div>
                    </div>
                    <div className="relative mt-10 rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-xl shadow-blue-950/10">
                      <MonitorSmartphone size={32} aria-hidden className="text-blue-700" />
                      <p className="mt-5 text-2xl font-black leading-tight text-blue-950">Clear healthcare information, presented professionally.</p>
                      <div aria-hidden className="mt-6 space-y-2.5">
                        <span className="block h-2.5 w-full rounded-full bg-slate-200" />
                        <span className="block h-2.5 w-5/6 rounded-full bg-slate-200" />
                        <span className="block h-2.5 w-2/3 rounded-full bg-slate-200" />
                      </div>
                      <span className="mt-7 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white">Healthcare website</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-5 lg:grid-cols-2">
          {publishedWork.map(
            ({ title, category, description, technologies, href, icon: Icon, attribution }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 p-8">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:34px_34px]"
                  />
                  <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 text-white shadow-2xl backdrop-blur">
                    <Icon size={42} aria-hidden />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">{category}</p>
                    <p className="mt-2 text-2xl font-bold">{title}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="leading-8 text-slate-600">{description}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-500">{attribution}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {technologies.map((item) => (
                      <span key={item} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full text-sm font-bold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                    aria-label={`View the ${title} capability`}
                  >
                    View capability <ArrowUpRight size={17} aria-hidden />
                  </Link>
                </div>
              </article>
            ),
          )}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-slate-500">
          <Code2 size={16} aria-hidden className="mr-2 inline text-blue-600" />
          Every project is presented with clear attribution and without invented results or claims.
        </p>
      </Container>
    </section>
  );
}
