import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Handshake, HeartPulse, Stethoscope } from "lucide-react";

import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const services = [
  { number: "01", icon: Code2, title: "Healthcare Technology", description: "Fully custom websites, applications, portals, booking experiences, dashboards and connected digital systems.", image: "/images/healthcare-technology.jpg", alt: "Healthcare professional using connected digital technology", href: "/services/healthcare-technology" },
  { number: "02", icon: Stethoscope, title: "Medical Equipment & Consumables", description: "Equipment supply, servicing, calibration, repairs, PPE and essential healthcare consumables.", image: "/images/solutions-healthcare.jpg", alt: "Healthcare professionals working with medical equipment and monitoring systems", href: "/services/medical-equipment-consumables" },
  { number: "03", icon: HeartPulse, title: "Professional Services", description: "Healthcare consulting, project planning, implementation, operational guidance and managed support.", image: "/images/professional-services.jpg", alt: "Professional team collaborating on healthcare project delivery", href: "/services/professional-services" },
  { number: "04", icon: Handshake, title: "Strategic Partnerships", description: "Responsible technology, supplier, distribution, implementation and growth collaboration.", image: "/images/strategic-partnerships.jpg", alt: "Healthcare and business leaders forming a strategic partnership", href: "/services/strategic-partnerships" },
] as const;

export default function SolutionsPreview() {
  return (
    <Section id="solutions" className="scroll-mt-28 relative isolate overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      <div aria-hidden className="absolute -right-24 top-16 -z-10 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader eyebrow="Explore Our Services" title="One Partner. Four Connected Capabilities." subtitle="Start with the service that best matches your need. We can combine capabilities when the work requires a more complete solution." align="left" />
        <Link href="/services" className="group mb-10 inline-flex items-center gap-2 self-start rounded-2xl border border-blue-200 bg-white px-5 py-3 font-bold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md lg:mb-14 lg:self-auto">View all services <ArrowRight size={17} aria-hidden className="transition group-hover:translate-x-1" /></Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {services.map(({ number, icon: Icon, title, description, image, alt, href }) => (
          <article key={title} className="group relative isolate min-h-[430px] overflow-hidden rounded-[2rem] border border-white/70 bg-slate-900 shadow-[0_20px_70px_rgba(15,48,105,.13)] sm:min-h-[480px]">
            <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#061631] via-[#071a3d]/65 to-transparent" />
            <div aria-hidden className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_78%_18%,rgba(59,130,246,.34),transparent_38%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur"><Icon size={24} aria-hidden /></span><span className="text-xs font-bold tracking-[0.25em] text-blue-200">{number}</span></div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-200 sm:text-lg sm:leading-8">{description}</p>
              <Link href={href} className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-blue-50 focus-visible:ring-4 focus-visible:ring-blue-300">Explore {title} <ArrowRight size={17} aria-hidden className="transition group-hover:translate-x-1" /></Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-5 overflow-hidden rounded-[2rem] border border-blue-100 bg-[linear-gradient(120deg,#eff6ff,#ffffff_55%,#ecfeff)] p-6 shadow-lg shadow-blue-950/5 sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Services Beyond Healthcare</p><h2 className="mt-2 text-2xl font-semibold text-blue-950">Have a different kind of project?</h2><p className="mt-2 max-w-3xl leading-7 text-slate-600">We also consider custom digital work, selected appliance and electronics repairs, consulting and project support outside healthcare.</p></div>
        <Link href="/services/side-projects" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-800">Explore Side Projects <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></Link>
      </div>
    </Section>
  );
}
