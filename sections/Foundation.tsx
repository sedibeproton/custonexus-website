import Section from "@/components/Section";
import ImageFrame from "@/components/ImageFrame";
import SectionHeader from "@/components/SectionHeader";

export default function Foundation() {
  return (
    <Section className="relative bg-white">
      <div className="pointer-events-none absolute top-16 right-16 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 left-10 h-48 w-48 rounded-full bg-blue-50 blur-3xl" />

      <div className="grid items-center gap-20 lg:grid-cols-2">

        {/* Image */}

        <div className="relative">
          <div className="absolute -right-8 top-8 -z-10 h-full w-full rounded-[36px] bg-gradient-to-bl from-blue-100 to-blue-50" />
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-2xl group">
            <ImageFrame
              src="/images/founder-handshake.jpg"
              alt="Founder collaborating with healthcare professionals"
              width={800}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}

        <div>
          <SectionHeader
            eyebrow="Our Foundation"
            title="Great healthcare begins with meaningful connections."
            subtitle="CustoNexus Technologies was founded on the belief that the strongest healthcare systems are built on trust, collaboration, and shared purpose. We connect healthcare professionals, organisations, technology, and expertise to create solutions that improve patient care, strengthen clinical outcomes, and simplify the way healthcare is delivered."
            align="left"
          />

          <p className="mt-6 text-lg leading-9 text-slate-600">
            We connect healthcare professionals, organisations, technology,
            and expertise to create solutions that improve patient care,
            strengthen clinical outcomes, and simplify the way healthcare
            is delivered.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            Every partnership we build and every solution we develop is
            guided by one enduring principle:
          </p>

          <div className="mt-10 h-px w-24 bg-blue-700" />

          <blockquote className="mt-6 rounded-r-2xl border-l-4 border-blue-700 bg-slate-50 px-6 py-6 text-2xl font-semibold italic leading-relaxed text-slate-900">
            &ldquo;When healthcare works better together, everyone benefits.&rdquo;
          </blockquote>

        </div>

      </div>
    </Section>
  );
}