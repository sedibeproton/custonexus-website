import Link from "next/link";
import { ArrowRight, Blocks, Code2, HeartPulse, MonitorSmartphone, RefreshCw, Wrench } from "lucide-react";

import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const services = [
  { icon: MonitorSmartphone, title: "Business Websites", text: "Professional, mobile-friendly websites designed to explain your value and turn visitor interest into enquiries.", href: "/services/business-websites", action: "Build a new website" },
  { icon: RefreshCw, title: "Website Redesign", text: "Modernise an outdated, slow or ineffective website with clearer content, stronger usability and a better customer journey.", href: "/services/website-support", action: "Improve an existing site" },
  { icon: Wrench, title: "Maintenance & WordPress Support", text: "Practical troubleshooting, updates and ongoing care for suitable existing websites, including WordPress installations.", href: "/services/website-support", action: "Get website support" },
  { icon: Blocks, title: "Custom Business Systems", text: "Dashboards, portals, booking tools, digital forms and database applications built around your workflow.", href: "/services/business-systems", action: "Explore business systems" },
  { icon: Code2, title: "Custom Software & Automation", text: "Purpose-built web applications, selected software development, integrations and responsible process automation.", href: "/services/business-systems", action: "Discuss custom software" },
  { icon: HeartPulse, title: "Healthcare Technology", text: "Websites, software and connected digital solutions shaped by an understanding of healthcare environments.", href: "/services/healthcare-technology", action: "Explore healthcare technology" },
] as const;

export default function SolutionsPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader eyebrow="What We Can Build for You" title="Practical technology for real business needs." subtitle="Start with the outcome you need. We will help define the right website, support plan or custom system for your organisation." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ icon: Icon, title, text, href, action }, index) => (
            <Link key={title} href={href} className="group relative flex min-h-72 flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:bg-white hover:shadow-[0_24px_65px_rgba(15,48,105,.12)] sm:p-8">
              <span className="absolute right-6 top-5 text-5xl font-black text-slate-200/70">0{index + 1}</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><Icon size={26} aria-hidden /></span>
              <h2 className="mt-7 text-2xl font-bold tracking-[-0.025em] text-blue-950">{title}</h2>
              <p className="mt-4 flex-1 leading-7 text-slate-600">{text}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700">{action}<ArrowRight size={17} aria-hidden className="transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
