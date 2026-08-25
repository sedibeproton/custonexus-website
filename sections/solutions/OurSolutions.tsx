import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import {
  Laptop,
  Briefcase,
  Network,
  Lightbulb,
} from "lucide-react";
import Container from "@/components/Container";

const solutions = [
  {
    icon: <Laptop size={30} />,
    title: "Healthcare Technology",
    description:
      "Digital solutions that improve workflows, efficiency and healthcare experiences.",
    image: "/images/healthcare-technology.jpg",
  },
  {
    icon: <Briefcase size={30} />,
    title: "Professional Services",
    description:
      "Consulting and specialised support designed around the realities of healthcare organisations.",
    image: "/images/professional-services.jpg",
  },
  {
    icon: <Network size={30} />,
    title: "Strategic Partnerships",
    description:
      "Connecting organisations with trusted expertise, products and opportunities that strengthen healthcare.",
    image: "/images/strategic-partnerships.jpg",
  },
  {
    icon: <Lightbulb size={30} />,
    title: "Innovation",
    description:
      "Exploring future-focused ideas that improve healthcare experiences and create meaningful impact.",
    image: "/images/healthcare-innovation.jpg",
  },
];

export default function OurSolutions() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>

        <SectionHeader
          eyebrow="Our Solutions"
          title="Designed Around Healthcare"
          subtitle="Digital solutions, professional services and partnerships crafted to improve workflows, efficiency and patient experiences."
          align="center"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-lg">
                  {solution.icon}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  {solution.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {solution.description}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-blue-700 transition-all duration-300 group-hover:w-20" />
              </div>

            </article>
          ))}
        </div>

      </Container>
    </section>
  );
}
