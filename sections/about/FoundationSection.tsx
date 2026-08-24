import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import PrimaryButton from "@/components/PrimaryButton";
import ImageFrame from "@/components/ImageFrame";

export default function FoundationSection() {
  return (
    <Section spacing="lg" className="bg-white">
      <SectionHeader
        eyebrow="About"
        title="Our Foundation"
        subtitle="The principles that guide every partnership and decision."
        align="center"
      />

      <div className="grid items-center gap-20 lg:grid-cols-2">
        <div className="space-y-6 text-lg leading-9 text-slate-600">
          <p>
            It is more than a document. It is the foundation of our culture, our partnerships and our commitment to improving healthcare experiences.
          </p>

          <div className="mt-12">
            <PrimaryButton href="/constitution">
              Read the Constitution
            </PrimaryButton>
          </div>
        </div>

        <ImageFrame
          src="/images/constitution.jpg"
          alt="The CustoNexus Constitution"
          width={700}
          height={550}
          loading="lazy"
          variant="floating"
        />
      </div>
    </Section>
  );
}