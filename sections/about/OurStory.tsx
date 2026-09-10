import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import ImageFrame from "@/components/ImageFrame";

export default function OurStory() {
  return (
    <Section id="our-story" className="bg-white" spacing="lg">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="About"
            title="Our Story"
            subtitle="The journey that inspired CustoNexus Technologies."
            align="left"
          />

          <p className="text-lg leading-9 text-slate-600">
            CustoNexus Technologies was founded in South Africa in 2026 with a
            belief that well-designed technology should make organisations more
            capable and people&apos;s experiences more straightforward.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            Our immediate work includes websites, business systems and practical
            technology support for organisations across sectors. We focus on
            clear problems that can be responsibly scoped and delivered.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            Healthcare remains central to our long-term identity. The responsibility,
            trust and human impact of healthcare influence how we approach every
            system, relationship and decision as the company grows.
          </p>
        </div>

        <ImageFrame
          src="/images/about-healthcare.jpg"
          alt="Healthcare collaboration"
          width={700}
          height={850}
          variant="floating"
        />
      </div>
    </Section>
  );
}
