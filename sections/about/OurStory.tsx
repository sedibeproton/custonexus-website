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
            CustoNexus Technologies was founded on a simple but powerful
            belief: meaningful connections create better healthcare.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            We recognised that healthcare professionals deserve trusted
            partners who understand their challenges and share their
            commitment to improving patient outcomes.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            Rather than focusing only on technology, we focus on the
            relationships that allow technology, people and healthcare
            organisations to work together more effectively.
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
