import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const innovations = [
  {
    title: "Connected Care",
    description:
      "Building seamless experiences between patients, clinicians and systems.",
  },
  {
    title: "Smart Operations",
    description:
      "Streamlining workflows with technology that supports meaningful care.",
  },
  {
    title: "Patient Centricity",
    description:
      "Designing solutions that improve health outcomes and human experiences.",
  },
];

export default function FutureInnovation() {
  return (
    <Section spacing="lg" className="bg-white">
      <SectionHeader
        eyebrow="Future Innovation"
        title="The Healthcare Systems of Tomorrow"
        subtitle="CustoNexus explores future-ready solutions that improve care, simplify operations and create more meaningful experiences for providers and patients."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {innovations.map((innovation) => (
          <div
            key={innovation.title}
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-lg
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-blue-200
              hover:shadow-2xl
            "
          >
            <div className="mb-6 h-1 w-12 rounded-full bg-blue-700 transition-all duration-500 group-hover:w-20" />

            <h3 className="text-2xl font-bold text-slate-900">
              {innovation.title}
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              {innovation.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}