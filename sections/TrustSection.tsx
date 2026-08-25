import { Globe2, HeartPulse, Lightbulb, ShieldCheck } from "lucide-react";
import Container from "@/components/Container";

const items = [
  {
    icon: ShieldCheck,
    title: "Built on Trust",
    description: "Integrity, transparency and accountability in all we do.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Focused",
    description: "Dedicated to improving healthcare experiences.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "Leveraging technology to solve real-world challenges.",
  },
  {
    icon: Globe2,
    title: "Global Mindset",
    description: "Connecting people, partners and possibilities.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative z-20 -mt-24 pb-10 sm:-mt-28 sm:pb-14">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-white/80 bg-white/95 shadow-[0_24px_70px_rgba(15,48,105,0.16)] backdrop-blur md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className={`flex gap-4 p-6 sm:p-7 ${index ? "border-t border-slate-200 md:border-l md:border-t-0 xl:border-l" : ""} ${index === 2 ? "md:border-l-0 xl:border-l" : ""}`}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Icon size={27} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="font-bold text-blue-950">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
