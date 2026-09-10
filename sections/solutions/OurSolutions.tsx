import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import {
  Laptop,
  Briefcase,
  HeartPulse,
  Network,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/Container";
import Link from "next/link";

const solutions = [
  {
    icon: <Laptop size={30} />,
    title: "Websites & Website Support",
    description:
      "Custom business websites, redesigns, responsive improvements and ongoing technical maintenance.",
    image: "/images/executive-presentation-identity-v2.png",
    href: "/services/business-websites",
  },
  {
    icon: <HeartPulse size={30} />,
    title: "Business Systems",
    description:
      "Dashboards, portals, digital forms, booking workflows and database-backed applications.",
    image: "/images/healthcare-technology.jpg",
    href: "/services/business-systems",
  },
  {
    icon: <Briefcase size={30} />,
    title: "Professional Services",
    description:
      "Technology consulting, project delivery, hourly freelance technicians and structured implementation support.",
    image: "/images/professional-services.jpg",
    href: "/services/professional-services",
  },
  {
    icon: <Network size={30} />,
    title: "Healthcare Technology",
    description:
      "Websites, software, portals and connected digital solutions informed by healthcare environments.",
    image: "/images/solutions-healthcare.jpg",
    href: "/services/healthcare-technology",
  },
];

export default function OurSolutions() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
      <Container>

        <SectionHeader
          eyebrow="Our Solutions"
          title="Designed Around the Work That Needs to Improve"
          subtitle="Customer-facing websites, internal systems and technology support shaped around users, workflows and practical outcomes."
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,48,105,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_22px_55px_rgba(15,48,105,0.13)]"
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

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  {solution.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {solution.description}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-blue-700 transition-all duration-300 group-hover:w-20" />

                <Link
                  href={solution.href}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700 transition-all hover:gap-3 hover:text-blue-800"
                >
                  Explore category <ArrowRight size={18} aria-hidden />
                </Link>
              </div>

            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Need a Starting Point?</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-950">Tell us what is slowing the business down.</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">You do not need to choose the technical solution first. Describe the customer or operational problem and we will help explore an appropriate approach.</p>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white transition hover:bg-blue-800">Discuss the problem <ArrowRight size={18} aria-hidden /></Link>
        </div>

      </Container>
    </section>
  );
}
