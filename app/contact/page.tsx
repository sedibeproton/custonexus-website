import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import Container from "@/components/Container";
import EnquiryForm from "@/components/EnquiryForm";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Start a Technology Project",
  description: "Request a website, redesign, maintenance, WordPress support, business system, custom software or healthcare technology consultation from CustoNexus.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Start a Project with CustoNexus Technologies", description: "Tell CustoNexus about your website, business system, software or healthcare technology requirement.", url: "/contact", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contact CustoNexus Technologies" }] },
  twitter: { card: "summary_large_image", title: "Start a Project with CustoNexus Technologies", description: "Request a website, business system or technology consultation.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const methods = [
  { icon: MessageCircle, label: "WhatsApp", value: "Message 072 270 1087", href: createWhatsAppUrl(whatsappMessages.project), external: true },
  { icon: Phone, label: "Phone", value: "Call 072 270 1087", href: "tel:+27722701087" },
  { icon: Mail, label: "Email", value: "info@custonexus.com", href: "mailto:info@custonexus.com" },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageHero eyebrow="Projects · Quotes · Support" title="What Would You Like to Build or Improve?" subtitle="Tell us about the business, the current problem and the outcome you need. We will respond with useful questions and a practical next step." />
      <FadeSection><section className="relative bg-[#f7f9fc] py-16 sm:py-24"><Container>
        <div className="grid gap-8 lg:gap-10 xl:grid-cols-[0.64fr_1.36fr] xl:items-start">
          <aside className="xl:sticky xl:top-32">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-700"><span className="h-px w-8 bg-emerald-500" />Start here</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-blue-950 sm:text-4xl">A useful first conversation starts with the real problem.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Request a new website, website redesign, maintenance, WordPress support, a custom business system, healthcare technology or professional project support.</p>
            <div className="mt-8 space-y-3">{methods.map(({ icon: Icon, label, value, href, external }) => <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"><Icon size={21} aria-hidden /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span><span className="mt-1 block font-semibold text-slate-900">{value}</span></span></a>)}</div>
            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-blue-950 p-5 text-blue-100"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-400" size={22} aria-hidden /><p className="text-sm leading-6">Your information is used only to understand and respond to your enquiry. Do not submit passwords, confidential patient information or sensitive system data.</p></div>
          </aside>
          <EnquiryForm />
        </div>
      </Container></section></FadeSection>
      <FadeSection><section className="bg-white py-16 sm:py-20"><Container><div className="grid gap-6 rounded-[2rem] border border-blue-100 bg-blue-50/60 p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-md"><MapPin size={29} aria-hidden /></div><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Based in South Africa · Built to grow</p><h2 className="mt-3 text-2xl font-semibold text-blue-950 sm:text-3xl">Technology services for businesses, practices and healthcare organisations.</h2><p className="mt-3 leading-7 text-slate-600">We review each request in context and clearly explain what can be delivered, what information is still needed and what the next step will be.</p></div></div></Container></section></FadeSection>
    </PageWrapper>
  );
}
