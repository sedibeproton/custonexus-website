import Section from "@/components/Section";
import ImageFrame from "@/components/ImageFrame";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";

export default function AboutPreview() {
  return (
    <Section
      id="about"
      className="scroll-mt-28 relative overflow-hidden bg-slate-50"
    >
      <div className="pointer-events-none absolute top-10 right-10 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-8 h-44 w-44 rounded-full bg-blue-50 blur-3xl" />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Left */}

        <div className="relative">

          <div className="absolute -left-8 top-8 -z-10 h-full w-full rounded-[36px] bg-gradient-to-br from-blue-100 to-blue-50"></div>
          <div className="relative group overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-2xl">
            <ImageFrame
                src="/images/executive-presentation-identity-v2.png"
              alt="CustoNexus leadership presenting a healthcare technology strategy"
              width={600}
              height={700}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Right */}

        <div>
          <SectionHeader
            eyebrow="Who We Are"
            title="Building Meaningful Connections Across Healthcare."
            subtitle="CustoNexus Technologies exists to improve healthcare through trusted partnerships, innovative technology, and meaningful human connections. We work alongside healthcare professionals, suppliers, technology providers and organisations to create solutions that strengthen healthcare delivery, improve operational efficiency and enhance patient experiences."
            align="left"
          />

          <div className="grid gap-3 sm:grid-cols-3">
            {["Founded in South Africa", "Healthcare focused", "Built for meaningful growth"].map((item) => <div key={item} className="rounded-2xl border border-blue-100 bg-white px-4 py-4 text-sm font-bold leading-6 text-blue-950 shadow-sm">{item}</div>)}
          </div>

          <div className="mt-10">
            <PrimaryButton href="/about">
              Learn More About Us
            </PrimaryButton>
          </div>

        </div>

      </div>
    </Section>
  );
}
