import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const innovations = [
  {
    title: "Connected Experiences",
    description:
      "Creating coherent journeys between customers, teams, websites and business systems.",
  },
  {
    title: "Smart Operations",
    description:
      "Reducing repetitive work with practical technology designed around real operations.",
  },
  {
    title: "Responsible Growth",
    description:
      "Building secure, maintainable solutions that can evolve as an organisation grows.",
  },
];

export default function FutureInnovation() {
  return (
    <Section spacing="lg" className="bg-white">
      <SectionHeader
        eyebrow="Future Ready"
        title="Technology That Can Grow With You"
        subtitle="CustoNexus creates useful foundations today while considering how your customers, workflows and digital systems may need to evolve tomorrow."
      />

      <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
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
              hover:-translate-y-1.5
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
