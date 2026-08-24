import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function LookingAhead() {
  return (
    <Section spacing="lg" className="bg-white">
      <SectionHeader
        eyebrow="Looking Ahead"
        title="Where We&apos;re Headed"
        subtitle="We focus on sustainable growth, responsible innovation, and partnerships that scale impact across healthcare systems."
        align="left"
      />

      <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600">
        <p>
          Over the coming years we&apos;ll expand our platform capabilities, deepen clinical partnerships, and invest in technologies that increase access and quality of care.
        </p>

        <p>
          Our roadmap is shaped by front-line feedback, measurable outcomes and a commitment to equitable solutions.
        </p>
      </div>
    </Section>
  );
}
