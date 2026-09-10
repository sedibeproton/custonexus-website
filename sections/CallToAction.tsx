import { ArrowRight, MessageCircle } from "lucide-react";

import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export default function CallToAction() {
  return (
    <Section className="relative overflow-hidden bg-blue-700 text-white" spacing="lg">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.17),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,.2),transparent_30%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <SectionHeader eyebrow="Have a Project in Mind?" title="Tell us what you are trying to improve." subtitle="Whether you need a website, support for an existing site or a custom business system, we will help determine a practical way forward." align="center" variant="inverted" />
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a href="/contact" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-blue-800 transition hover:-translate-y-0.5 hover:bg-blue-50">Start a project <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" /></a>
          <a href={createWhatsAppUrl(whatsappMessages.project)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"><MessageCircle size={19} aria-hidden /> WhatsApp us</a>
        </div>
      </div>
    </Section>
  );
}
