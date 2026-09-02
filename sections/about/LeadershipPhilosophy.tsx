import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function LeadershipPhilosophy() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="Leadership"
        title="A Philosophy of Service and Stewardship"
        subtitle="Our leadership believes in serving healthcare professionals, stewarding resources responsibly, and creating long-term value through humility, clarity and thoughtful execution."
        align="left"
      />

      <div className="max-w-4xl space-y-5 text-lg leading-8 text-slate-600">
        <p>
          We lead by listening. Decisions are informed by clinicians, partners and the experiences of the people we serve.
        </p>

        <p>
          Accountability, transparency and a commitment to outcomes guide how we prioritise work and measure success.
        </p>
      </div>
    </Section>
  );
}
