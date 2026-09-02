import Section from "@/components/Section";
import AccentDots from "@/components/AccentDots";
import FadeSection from "@/components/FadeSection";
import ImageFrame from "@/components/ImageFrame";
import Link from "next/link";
import SectionHeader from "../components/SectionHeader";
import AnimatedCard from "@/components/AnimatedCard";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "Healthcare Technology",
    description:
      "Purpose-built websites, apps, platforms and connected digital solutions that improve healthcare workflows and experiences.",
    image: "/images/healthcare-technology.jpg",
    reverse: false,
    href: "/services/healthcare-technology",
  },
  {
    title: "Medical Equipment & Consumables",
    description:
      "Medical equipment supply, servicing, calibration, repairs and dependable consumables for healthcare environments.",
    image: "/images/solutions-healthcare.jpg",
    reverse: true,
    href: "/services/medical-equipment-consumables",
  },
  {
    title: "Professional Services",
    description:
      "Healthcare-focused consulting and delivery, with selected technology, electrical and electronic side projects for other customers.",
    image: "/images/professional-services.jpg",
    reverse: false,
    href: "/services/professional-services",
  },
  {
    title: "Strategic Partnerships",
    description:
      "Connecting organisations with trusted expertise, products and opportunities that create sustainable healthcare value.",
    image: "/images/strategic-partnerships.jpg",
    reverse: true,
    href: "/services/strategic-partnerships",
  },
];

export default function SolutionsPreview() {
  return (
    <Section
      id="solutions"
      className="scroll-mt-28 relative bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="pointer-events-none absolute top-12 right-12 h-56 w-56 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeader
          eyebrow="Our Solutions"
          title="Transforming Healthcare Together"
          subtitle="We combine healthcare expertise, technology and trusted partnerships to improve healthcare experiences."
        />
        <AccentDots className="hidden lg:block" />
      </div>

      <div className="mt-20 space-y-20">
        {solutions.map((solution, index) => (
          <FadeSection key={solution.title} delay={index * 0.12}>
            <AnimatedCard
              className={
                solution.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }
            >
              <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-14">
                <div>
                  <p className="mb-4 text-sm font-bold tracking-[0.4em] text-blue-600">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>

                  <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    {solution.title}
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-slate-600">
                    {solution.description}
                  </p>

                  <Link
                    href={solution.href}
                    className="group mt-8 inline-flex items-center gap-3 font-semibold tracking-wide text-blue-700 transition-colors hover:text-blue-800"
                  >
                    Learn More
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <div>
                  <ImageFrame
                    src={solution.image}
                    alt={solution.title}
                    width={900}
                    height={720}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </AnimatedCard>
          </FadeSection>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div><h3 className="text-xl font-bold text-blue-950">Looking for support outside healthcare?</h3><p className="mt-2 text-slate-600">Explore custom digital work, selected appliance and electronics repairs, consulting and project support.</p></div>
        <Link href="/services/side-projects" className="inline-flex shrink-0 items-center gap-2 font-bold text-blue-700 hover:text-blue-900">View Side Projects <ArrowRight size={18} aria-hidden /></Link>
      </div>
    </Section>
  );
}
