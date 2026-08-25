import AccentDots from "@/components/AccentDots";
import Section from "@/components/Section";
import { Target, HeartHandshake } from "lucide-react";
import SectionHeader from "../components/SectionHeader";

export default function Purpose() {
  return (
    <Section className="relative bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="pointer-events-none absolute top-10 left-10 h-48 w-48 rounded-full bg-blue-50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 right-10 h-40 w-40 rounded-full bg-blue-100/30 blur-3xl" />

      <div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            eyebrow="Our Purpose"
            title="Why CustoNexus Exists"
            subtitle="We believe healthcare becomes stronger when trusted partnerships, innovative technology and exceptional people work together."
          />
          <AccentDots className="hidden lg:block" />
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <Target className="mb-8 h-12 w-12 text-blue-600" />

            <h3 className="mb-4 text-2xl font-bold">
              Our Mission
            </h3>

            <p className="leading-8 text-slate-600">
              To strengthen healthcare through trusted partnerships,
              innovative technology and meaningful human connections.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <HeartHandshake className="mb-8 h-12 w-12 text-blue-600" />

            <h3 className="mb-4 text-2xl font-bold">
              Our Values
            </h3>

            <p className="leading-8 text-slate-600">
              Integrity. Excellence. Innovation. Partnership.
              Compassion. Continuous improvement.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-bold">
              Our Vision
            </h3>

            <p className="leading-8 text-slate-600">
              To become a globally trusted healthcare technology
              company that improves lives through meaningful innovation.
            </p>
          </div>

        </div>

      </div>
    </Section>
  );
}
