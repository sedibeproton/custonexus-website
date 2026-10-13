import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Blocks, BriefcaseBusiness, CheckCircle2, Handshake, HeartPulse, MonitorSmartphone, RefreshCw, Stethoscope } from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { projectCommercials } from "@/lib/commercial";

export const metadata: Metadata = {
  title: "Website & Application Services",
  description: "Explore website design, application development, software redesign, business systems, integration, automation and specialist technology services.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Website, Application & Software Services", description: "Website design, custom application development, modernisation, integration and specialist technology services from CustoNexus.", url: "/services", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus technology services" }] },
  twitter: { card: "summary_large_image", title: "Website, Application & Software Services", description: "Websites, custom applications, software modernisation and integration services.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const primary = [
  { icon: MonitorSmartphone, title: "Custom Website Development", text: "Purpose-built websites with professional UI, responsive frontend development and functionality shaped around the business.", href: "/services/business-websites", items: ["Custom UI and frontend", "Enquiry and contact journeys", "Bookings and integrations", "Hosting and deployment"] },
  { icon: RefreshCw, title: "Website Redesign & Support", text: "Modernise, repair or maintain an existing website through practical design and technical improvements.", href: "/services/website-support", items: ["Website redesign", "Technical maintenance", "Responsive fixes", "Troubleshooting"] },
  { icon: Blocks, title: "Application Design & Development", text: "Custom web and Windows desktop applications shaped around your users, workflows and information.", href: "/services/business-systems", items: ["Application design and prototyping", "Dashboards and portals", "Document and reporting tools", "Maintenance and improvements"] },
  { icon: RefreshCw, title: "Software Integration & Modernisation", text: "Assess and improve existing applications, workflows and compatible system connections without assuming every legacy platform can be changed.", href: "/services/business-systems", items: ["Application redesign", "Legacy software assessment", "API and database integration", "Workflow automation"] },
] as const;

const specialist = [
  { icon: HeartPulse, title: "Healthcare Technology", text: "Healthcare websites, software, portals and connected systems shaped by sector understanding.", href: "/services/healthcare-technology" },
  { icon: BriefcaseBusiness, title: "Professional & Technical Services", text: "Consulting, project support and flexible technical capacity for defined organisational needs.", href: "/services/professional-services" },
  { icon: Handshake, title: "Strategic Partnerships", text: "Carefully structured technology, supplier and implementation collaboration.", href: "/services/strategic-partnerships" },
  { icon: Stethoscope, title: "Medical Equipment & Consumables", text: "Retained as a specialist enquiry service, subject to capability, availability and applicable requirements.", href: "/services/medical-equipment-consumables" },
] as const;

const packages = [
  { title: "Business Starter Website", audience: "For startups, small businesses and independent professionals.", features: ["Responsive custom website", "Core business information pages", "Contact or enquiry form", "Basic on-page SEO", "Deployment and launch support"], href: "/services/business-websites", ...projectCommercials.starterWebsite },
  { title: "Business Growth Website", audience: "For growing businesses that need stronger visibility and more useful customer journeys.", features: ["Expanded service content", "Conversion-focused structure", "Google Analytics integration", "SEO foundations", "Lead-generation functionality"], href: "/services/business-websites", ...projectCommercials.growthWebsite },
  { title: "Custom Application Discovery", audience: "For organisations considering a new application, redesign, integration or software modernisation project.", features: ["Problem and user discovery", "Architecture and feasibility review", "Feature and data scoping", "Integration assessment", "Individual proposal and delivery plan"], href: "/services/business-systems", ...projectCommercials.customApplication },
] as const;

export default function ServicesPage() {
  return (
    <PageWrapper>
      <PageHero eyebrow="Technology Services" title="What Can We Help Your Business Build or Improve?" subtitle="From a professional website to a custom web or desktop application, CustoNexus provides practical digital services for South African businesses and specialist healthcare requirements." />

      <FadeSection><section className="bg-white py-16 sm:py-24 lg:py-28"><Container>
        <SectionHeader eyebrow="Primary Services" title="Start with the outcome you need." subtitle="Choose the closest service. If the requirement crosses categories, tell us about the complete problem and we will recommend a sensible starting point." />
        <div className="grid gap-5 lg:grid-cols-2">{primary.map(({ icon: Icon, title, text, href, items }) => <Link key={title} href={href} className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl sm:p-8"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white"><Icon size={26} aria-hidden /></span><h2 className="mt-6 text-2xl font-bold text-blue-950 sm:text-3xl">{title}</h2><p className="mt-4 leading-8 text-slate-600">{text}</p><ul className="mt-6 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">{items.map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}</ul><span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700">Explore service <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></span></Link>)}</div>
      </Container></section></FadeSection>

      <FadeSection><section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24"><Container>
        <SectionHeader eyebrow="Service Options" title="A clearer starting point for your project." subtitle="Website options provide a useful starting point. Application architecture, features, pricing and delivery schedules require technical discovery and individual scoping." />
        <div className="grid gap-5 lg:grid-cols-3">{packages.map((item) => <article key={item.title} className="flex flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"><h2 className="text-2xl font-bold text-blue-950">{item.title}</h2><p className="mt-3 leading-7 text-slate-600">{item.audience}</p><div className="mt-5 space-y-2 rounded-2xl bg-blue-50 p-4 text-sm"><p><strong className="text-blue-950">Investment:</strong> <span className="text-slate-600">{item.investment}</span></p><p><strong className="text-blue-950">Timing:</strong> <span className="text-slate-600">{item.timeline}</span></p></div><ul className="mt-6 flex-1 space-y-3">{item.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><CheckCircle2 size={18} aria-hidden className="mt-0.5 shrink-0 text-emerald-600" />{feature}</li>)}</ul><p className="mt-5 text-xs leading-6 text-slate-500"><strong>Not automatically included:</strong> {item.exclusions}</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 font-bold text-blue-700">Request a Quote <ArrowRight size={17} aria-hidden /></Link><Link href={item.href} className="mt-3 text-sm font-semibold text-slate-600 hover:text-blue-700">Review service details</Link></article>)}</div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href="/free-website-review" className="inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white">Get a Free Website Review <ArrowRight size={17} aria-hidden /></Link><Link href="/book-consultation" className="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-6 py-4 font-bold text-blue-800 transition hover:border-blue-400 hover:bg-blue-50">Book a 15-Minute Consultation</Link></div>
      </Container></section></FadeSection>

      <FadeSection><section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24"><Container>
        <SectionHeader eyebrow="Specialist Capabilities" title="Healthcare remains an important part of our direction." subtitle="These services remain available without making general technology work feel limited to the healthcare sector." />
        <div className="grid gap-5 md:grid-cols-3">{specialist.map(({ icon: Icon, title, text, href }) => <Link key={title} href={href} className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><Icon size={27} aria-hidden className="text-blue-700" /><h2 className="mt-5 text-xl font-bold text-blue-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Learn more <ArrowRight size={16} aria-hidden /></span></Link>)}</div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row"><Link href="/healthcare" className="text-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4">View the healthcare-focused overview</Link><Link href="/services/side-projects" className="text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-blue-700">Looking for selected electronics, appliance or other side-project support?</Link></div>
      </Container></section></FadeSection>

      <FadeSection><section className="bg-white py-16 sm:py-24"><Container><div className="mx-auto max-w-5xl rounded-[2rem] border border-blue-100 bg-blue-50 p-7 text-center sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Clear Project Scoping</p><h2 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">No forced package. No surprise scope.</h2><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">We first understand the requirement, then provide a written proposal covering the work, responsibilities, timing, assumptions and price.</p><Link href="/contact" className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white">Tell us about your project <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></Link></div></Container></section></FadeSection>

      <FadeSection><CTASection title="Have a Website or Application in Mind?" subtitle="Tell us what your business needs to build, redesign, integrate or improve. We will help identify a practical next step." buttonText="Start a Project" buttonLink="/contact" /></FadeSection>
    </PageWrapper>
  );
}
