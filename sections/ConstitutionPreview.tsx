import Section from "@/components/Section";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ConstitutionPreview() {
  return (
    <Section
      id="constitution"
      className="scroll-mt-28 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-blue-700 text-white"
    >

      <div className="relative grid gap-20 lg:grid-cols-2">

        {/* Left */}

        <div>
          <SectionHeader
            eyebrow="Our Constitution"
            title="Principles That Endure."
            subtitle="More than a corporate document, our Constitution defines who we are, why we exist, and the principles that guide every decision, every partnership, and every solution we create."
            align="left"
            variant="inverted"
          />
          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span>People First</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span>Integrity Always</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span>Healthcare Without Compromise</span>
            </div>

          </div>

          <div className="mt-12">
            <PrimaryButton href="/constitution">
              Read the Constitution
            </PrimaryButton>
          </div>

        </div>

        {/* Right */}

        <div className="group max-w-lg rounded-3xl bg-white p-10 text-slate-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
          <div className="mb-8 h-2 w-24 rounded-full bg-blue-700"></div>

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-700">
            Founder&apos;s Edition
          </p>

          <h3 className="mt-4 text-3xl font-bold">The CustoNexus Constitution</h3>

          <p className="mt-2 text-slate-500">Version 1.0 • Founder&apos;s Copy</p>
          <div className="my-8 h-px bg-slate-200"></div>
          <div className="mt-8 space-y-6 leading-8 text-slate-600">

            <p>Healthcare is one of humanity&apos;s greatest responsibilities.</p>
            <p>This Constitution defines the enduring principles upon which CustoNexus Technologies is built.</p>
            <p>
              Every day, healthcare professionals dedicate their
              knowledge, compassion and skill to improving the
              lives of others.
            </p>

            <p>
              CustoNexus Technologies was founded on the belief
              that meaningful connections are the foundation
              of exceptional healthcare.
            </p>
            <Link
              href="/constitution"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-blue-700 transition-colors hover:text-blue-800"
            >
              Continue Reading
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-8 h-20 bg-gradient-to-b from-transparent to-white" />

          </div>

        </div>

      </div>

    </Section>
  );
}
