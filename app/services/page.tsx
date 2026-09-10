import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Blocks, BriefcaseBusiness, Handshake, HeartPulse, MonitorSmartphone, RefreshCw, Stethoscope } from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Website, Business Software & Technology Services",
  description: "Custom website design and development, website redesign, technical support, custom web applications and business systems in South Africa.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Technology Services for South African Businesses", description: "Professional websites, website support, custom business systems and healthcare technology from CustoNexus Technologies.", url: "/services", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus technology services" }] },
  twitter: { card: "summary_large_image", title: "Technology Services for South African Businesses", description: "Websites, website support, custom systems and technology services.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const primary = [
  { icon: MonitorSmartphone, title: "Custom Website Development", text: "Purpose-built websites with professional UI, responsive frontend development and functionality shaped around the business.", href: "/services/business-websites", items: ["Custom UI and frontend", "Enquiry and contact journeys", "Bookings and integrations", "Hosting and deployment"] },
  { icon: RefreshCw, title: "Website Redesign & Support", text: "Modernise, repair or maintain an existing website through practical design and technical improvements.", href: "/services/website-support", items: ["Website redesign", "Technical maintenance", "Responsive fixes", "Troubleshooting"] },
  { icon: Blocks, title: "Business Systems & Software", text: "Custom applications shaped around the workflows, customers and information your organisation manages.", href: "/services/business-systems", items: ["Dashboards and portals", "Bookings and forms", "Database applications", "Integrations and automation"] },
  { icon: BriefcaseBusiness, title: "Professional & Technical Services", text: "Technology consulting, project support and flexible technical capacity for defined organisational needs.", href: "/services/professional-services", items: ["Technology consulting", "Project support", "Freelance technicians", "Monthly facility support"] },
] as const;

const specialist = [
  { icon: HeartPulse, title: "Healthcare Technology", text: "Healthcare websites, software, portals and connected systems shaped by sector understanding.", href: "/services/healthcare-technology" },
  { icon: Handshake, title: "Strategic Partnerships", text: "Carefully structured technology, supplier and implementation collaboration.", href: "/services/strategic-partnerships" },
  { icon: Stethoscope, title: "Medical Equipment & Consumables", text: "Retained as a specialist enquiry service, subject to capability, availability and applicable requirements.", href: "/services/medical-equipment-consumables" },
] as const;

export default function ServicesPage() {
  return (
    <PageWrapper>
      <PageHero eyebrow="Technology Services" title="What Can We Help Your Business Build or Improve?" subtitle="From a professional website to a custom internal system, CustoNexus provides practical technology services for South African businesses and healthcare organisations." />

      <FadeSection><section className="bg-white py-16 sm:py-24 lg:py-28"><Container>
        <SectionHeader eyebrow="Primary Services" title="Start with the outcome you need." subtitle="Choose the closest service. If the requirement crosses categories, tell us about the complete problem and we will recommend a sensible starting point." />
        <div className="grid gap-5 lg:grid-cols-2">{primary.map(({ icon: Icon, title, text, href, items }) => <Link key={title} href={href} className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl sm:p-8"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white"><Icon size={26} aria-hidden /></span><h2 className="mt-6 text-2xl font-bold text-blue-950 sm:text-3xl">{title}</h2><p className="mt-4 leading-8 text-slate-600">{text}</p><ul className="mt-6 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">{items.map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}</ul><span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700">Explore service <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></span></Link>)}</div>
      </Container></section></FadeSection>

      <FadeSection><section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24"><Container>
        <SectionHeader eyebrow="Specialist Capabilities" title="Healthcare remains an important part of our direction." subtitle="These services remain available without making general technology work feel limited to the healthcare sector." />
        <div className="grid gap-5 md:grid-cols-3">{specialist.map(({ icon: Icon, title, text, href }) => <Link key={title} href={href} className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"><Icon size={27} aria-hidden className="text-blue-700" /><h2 className="mt-5 text-xl font-bold text-blue-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Learn more <ArrowRight size={16} aria-hidden /></span></Link>)}</div>
        <div className="mt-8 text-center"><Link href="/services/side-projects" className="text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-blue-700">Looking for selected electronics, appliance or other side-project support?</Link></div>
      </Container></section></FadeSection>

      <FadeSection><section className="bg-white py-16 sm:py-24"><Container><div className="mx-auto max-w-5xl rounded-[2rem] border border-blue-100 bg-blue-50 p-7 text-center sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Clear Project Scoping</p><h2 className="mt-4 text-3xl font-bold text-blue-950 sm:text-4xl">No forced package. No surprise scope.</h2><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">We first understand the requirement, then provide a written proposal covering the work, responsibilities, timing, assumptions and price.</p><Link href="/contact" className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white">Tell us about your project <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></Link></div></Container></section></FadeSection>

      <FadeSection><CTASection title="Have a Website or System in Mind?" subtitle="Tell us what your business needs to build, repair or improve. We will help identify a practical next step." buttonText="Start a Project" buttonLink="/contact" /></FadeSection>
    </PageWrapper>
  );
}
