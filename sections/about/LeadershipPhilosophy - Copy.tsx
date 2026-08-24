import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import QuoteBlock from "@/components/QuoteBlock";

export default function LeadershipPhilosophy() {
  return (
    <Section className="bg-slate-50">

      <SectionHeader
        eyebrow="Leadership"
        title="Leadership Through Service."
        subtitle="Our philosophy is simple: leadership is measured by the value we create for others."
      />

      <div className="mt-20 grid gap-16 lg:grid-cols-2">

        <div>

          <p className="text-lg leading-9 text-slate-600">
            We believe leadership begins with listening, learning and serving.
            Every decision we make is guided by our commitment to healthcare
            professionals, partners and the communities they serve.
          </p>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Rather than pursuing growth for its own sake, we pursue sustainable
            impact built on trust, integrity and meaningful collaboration.
          </p>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Our Constitution ensures that as CustoNexus grows, our principles
            remain unchanged.
          </p>

        </div>

        <QuoteBlock
          quote="Leadership is not defined by authority. It is defined by the responsibility to improve the lives of others."
          author="The CustoNexus Constitution"
        />

      </div>

    </Section>
  );
}