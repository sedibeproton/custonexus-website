import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const reasons = [
  { number: "01", title: "Problem First", description: "Every solution begins with the people, workflow and outcome involved—not technology for its own sake." },
  { number: "02", title: "Clear Scope", description: "Deliverables, responsibilities, assumptions and decision points are made visible before implementation begins." },
  { number: "03", title: "Useful Technology", description: "Technology should improve a customer experience, remove avoidable work or give the organisation better control." },
  { number: "04", title: "Built for the Next Stage", description: "We consider maintainability, support and future requirements without overbuilding the first version." },
];

export default function WhyCustoNexus() {
  return (
    <Section spacing="lg" className="bg-slate-50">
      <SectionHeader eyebrow="Why CustoNexus" title="A Thoughtful Technology Partner" subtitle="Clear communication, practical recommendations and accountable delivery create more confidence than unsupported promises." />
      <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
        {reasons.map((reason) => <article key={reason.number} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-2xl sm:p-10"><span className="text-5xl font-black text-blue-100 transition-colors group-hover:text-blue-200">{reason.number}</span><h3 className="mt-6 text-2xl font-bold text-slate-900">{reason.title}</h3><p className="mt-4 leading-8 text-slate-600">{reason.description}</p></article>)}
      </div>
    </Section>
  );
}
