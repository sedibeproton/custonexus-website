import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Handshake,
  HeartPulse,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import Container from "@/components/Container";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CustoNexus Technologies by phone, WhatsApp or email to discuss healthcare technology, medical equipment, professional services and partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CustoNexus Technologies",
    description:
      "Start a conversation about healthcare technology, medical equipment, professional services or strategic partnerships.",
    url: "/contact",
  },
};

const contactMethods = [
  {
    icon: MessageCircle,
    eyebrow: "WhatsApp",
    title: "Chat With Us",
    description:
      "Send us a WhatsApp message for a convenient conversation about your needs.",
    href: "https://wa.me/27722701087",
    label: "Message 072 270 1087",
    external: true,
  },
  {
    icon: Phone,
    eyebrow: "Call",
    title: "Speak With Us",
    description:
      "Call directly when you would prefer to discuss your requirements by phone.",
    href: "tel:+27722701087",
    label: "Call 072 270 1087",
    external: false,
  },
  {
    icon: Mail,
    eyebrow: "Email",
    title: "Send an Enquiry",
    description:
      "Email project details, product requirements or partnership proposals to our team.",
    href: "mailto:info@custonexus.com",
    label: "info@custonexus.com",
    external: false,
  },
];

const enquiryTypes = [
  {
    icon: Send,
    title: "Technology Projects",
    description:
      "Websites, apps, digital platforms, integrations and healthcare technology implementations.",
    subject: "Healthcare Technology Enquiry",
  },
  {
    icon: HeartPulse,
    title: "Equipment & Consumables",
    description:
      "Medical equipment, patient monitoring, PPE, clinical consumables and supply requirements.",
    subject: "Medical Equipment and Consumables Enquiry",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professional Services",
    description:
      "Consulting, strategy, project delivery, security, support and operational improvement.",
    subject: "Professional Services Enquiry",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Technology, supplier, distribution, implementation and growth partnerships.",
    subject: "Strategic Partnership Enquiry",
  },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Contact CustoNexus"
        title="Let’s Start a Meaningful Conversation."
        subtitle="Whether you need a healthcare website or app, medical equipment, professional expertise or a strategic partner, we are ready to understand your goals."
      />

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader
              eyebrow="Get in Touch"
              title="Choose the Most Convenient Way to Reach Us"
              subtitle="Contact us directly by WhatsApp, phone or email."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {contactMethods.map(
                ({ icon: Icon, eyebrow, title, description, href, label, external }) => (
                  <article
                    key={eyebrow}
                    className="group flex flex-col rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl sm:p-9"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
                      <Icon size={27} aria-hidden />
                    </div>
                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
                      {eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
                    <p className="mt-4 flex-1 leading-8 text-slate-600">{description}</p>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-700 transition group-hover:gap-3"
                    >
                      {label} <ArrowRight size={18} aria-hidden />
                    </a>
                  </article>
                ),
              )}
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="bg-slate-50 py-16 sm:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-700">
                  Direct Details
                </p>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  CustoNexus Technologies
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Share what you are trying to achieve, the support you need and
                  any important timelines. We will use that context to guide the
                  conversation.
                </p>

                <dl className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <Phone className="shrink-0 text-blue-700" size={22} aria-hidden />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone & WhatsApp</dt>
                      <dd className="mt-1 font-semibold text-slate-900">072 270 1087</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <Mail className="shrink-0 text-blue-700" size={22} aria-hidden />
                    <div className="min-w-0">
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</dt>
                      <dd className="mt-1 break-all font-semibold text-slate-900">info@custonexus.com</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <MapPin className="shrink-0 text-blue-700" size={22} aria-hidden />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</dt>
                      <dd className="mt-1 font-semibold text-slate-900">South Africa</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5 sm:p-10">
                <div className="flex items-center gap-3">
                  <Clock3 className="text-blue-700" size={25} aria-hidden />
                  <h2 className="text-2xl font-bold text-slate-950">What can we help you with?</h2>
                </div>
                <p className="mt-4 leading-8 text-slate-600">
                  Choose an enquiry type to begin an email with the right subject line.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {enquiryTypes.map(({ icon: Icon, title, description, subject }) => (
                    <a
                      key={title}
                      href={`mailto:info@custonexus.com?subject=${encodeURIComponent(subject)}`}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <Icon className="text-blue-700" size={24} aria-hidden />
                      <h3 className="mt-4 font-bold text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        Start enquiry <ArrowRight size={15} aria-hidden />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-[#07327c] to-blue-700 py-16 text-white sm:py-24">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.3),transparent_34%)]" />
          <Container className="relative text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-200">Prefer WhatsApp?</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">A conversation can be the first step toward a better solution.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">Message CustoNexus directly and tell us how we can support your organisation.</p>
            <a
              href="https://wa.me/27722701087"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-blue-700 shadow-xl transition hover:-translate-y-1 hover:bg-blue-50"
            >
              <MessageCircle size={21} aria-hidden /> Message on WhatsApp
            </a>
          </Container>
        </section>
      </FadeSection>
    </PageWrapper>
  );
}
