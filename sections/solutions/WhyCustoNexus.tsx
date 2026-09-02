import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const reasons = [
  {
    number: "01",
    title: "Healthcare First",
    description:
      "Every solution begins with the needs of healthcare professionals, practices, and patients—not technology for its own sake.",
  },
  {
    number: "02",
    title: "Trusted Partnerships",
    description:
      "We believe lasting partnerships create lasting impact. We work alongside our clients to understand their challenges and deliver meaningful outcomes.",
  },
  {
    number: "03",
    title: "Innovation with Purpose",
    description:
      "Technology should simplify healthcare, improve experiences, and strengthen clinical and operational excellence.",
  },
  {
    number: "04",
    title: "Built for the Future",
    description:
      "As healthcare evolves, CustoNexus evolves with it—developing scalable solutions that support sustainable growth and long-term success.",
  },
];

export default function WhyCustoNexus() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader
        eyebrow="Why CustoNexus"
        title="A Different Kind of Healthcare Partner"
        subtitle="We are building more than healthcare technology. We are building trusted relationships, meaningful solutions, and a company committed to improving healthcare experiences for generations to come."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {reasons.map((reason) => (
          <div
            key={reason.number}
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              sm:p-10
              shadow-lg
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-blue-200
              hover:shadow-2xl
            "
          >
            <span className="text-5xl font-black text-blue-100 transition-colors duration-500 group-hover:text-blue-200">
              {reason.number}
            </span>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              {reason.title}
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
