import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import Container from "@/components/Container";
import EnquiryForm from "@/components/EnquiryForm";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: "Request a CustoNexus quote or callback for custom websites and apps, hosting, medical equipment, servicing, repairs, professional services, side projects or partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact CustoNexus Technologies", description: "Tell us what you need and receive a focused response from CustoNexus Technologies.", url: "/contact" },
};

const methods = [
  { icon: MessageCircle, label: "WhatsApp", value: "Message 072 270 1087", href: createWhatsAppUrl(whatsappMessages.contact), external: true },
  { icon: Phone, label: "Phone", value: "Call 072 270 1087", href: "tel:+27722701087" },
  { icon: Mail, label: "Email", value: "info@custonexus.com", href: "mailto:info@custonexus.com" },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageHero eyebrow="Contact · Quotes · Callbacks" title="Tell Us What You Need." subtitle="Answer a few focused questions and give our team the context needed to respond with the right service, quote or next step." />

      <FadeSection>
        <section className="relative bg-[#f7f9fc] py-16 sm:py-24">
          <Container>
            <div className="grid gap-10 xl:grid-cols-[0.64fr_1.36fr] xl:items-start">
              <aside className="xl:sticky xl:top-32">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-700"><span className="h-px w-8 bg-emerald-500" />Start here</p>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-blue-950 sm:text-4xl">A better first conversation starts with useful context.</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">The guided form adapts to your service—including non-healthcare side projects. You can request a quote, ask for a callback or share an early-stage idea.</p>
                <div className="mt-8 space-y-3">{methods.map(({ icon: Icon, label, value, href, external }) => <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"><Icon size={21} /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span><span className="mt-1 block font-semibold text-slate-900">{value}</span></span></a>)}</div>
                <div className="mt-7 flex items-start gap-3 rounded-2xl bg-blue-950 p-5 text-blue-100"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-400" size={22} /><p className="text-sm leading-6">Your information is used only to understand and respond to your enquiry. Do not submit confidential patient or clinical information, passwords, or sensitive device data.</p></div>
              </aside>
              <EnquiryForm />
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-white py-16 sm:py-20"><Container><div className="grid gap-6 rounded-[2rem] border border-blue-100 bg-blue-50/60 p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-md"><MapPin size={29} /></div><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Based in South Africa · Global mindset</p><h2 className="mt-3 text-2xl font-semibold text-blue-950 sm:text-3xl">Technology, healthcare supply and professional collaboration in one conversation.</h2><p className="mt-3 leading-7 text-slate-600">We review each request in context and will be clear where specifications, availability, timelines or specialist input must still be confirmed.</p></div></div></Container></section>
      </FadeSection>
    </PageWrapper>
  );
}
