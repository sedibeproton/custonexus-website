"use client";

import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Handshake,
  HeartPulse,
  Laptop,
  type LucideIcon,
} from "lucide-react";

import PrimaryButton from "@/components/PrimaryButton";

type Category = {
  id: string;
  title: string;
  shortDescription: string;
  introduction: string;
  icon: LucideIcon;
  featured?: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  groups: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
};

const categories: Category[] = [
  {
    id: "healthcare-technology",
    title: "Healthcare Technology",
    shortDescription:
      "Digital platforms, connected systems and purpose-built software for modern healthcare.",
    introduction:
      "We design and deliver technology that supports healthcare professionals, improves workflows and creates better digital experiences for organisations and the people they serve.",
    icon: Laptop,
    featured: {
      eyebrow: "Core Speciality",
      title: "Website & App Development",
      description:
        "Professional websites, web applications and mobile experiences built around your organisation, users and long-term goals.",
      items: [
        "Healthcare and corporate websites",
        "Patient and client portals",
        "Custom web applications",
        "Mobile and progressive web apps",
        "Secure dashboards and internal tools",
        "Ongoing maintenance and optimisation",
      ],
    },
    groups: [
      {
        title: "Digital Transformation",
        description:
          "Redesigning processes and experiences to reduce friction and make everyday work more effective.",
        items: [
          "Workflow discovery and improvement",
          "Process automation",
          "Patient and staff experience design",
          "Digital adoption planning",
        ],
      },
      {
        title: "Systems Integration",
        description:
          "Connecting platforms and information flows so teams can work with greater clarity and continuity.",
        items: [
          "Integration architecture",
          "API and data-flow planning",
          "Interoperability coordination",
          "Testing and deployment support",
        ],
      },
      {
        title: "Technology Implementation",
        description:
          "Structured delivery from requirements and configuration through launch, training and improvement.",
        items: [
          "Requirements and solution planning",
          "Platform configuration",
          "Quality assurance and launch readiness",
          "Documentation and user enablement",
        ],
      },
    ],
  },
  {
    id: "medical-equipment",
    title: "Medical Equipment & Consumables",
    shortDescription:
      "Essential equipment, monitoring devices and consumables sourced around healthcare needs.",
    introduction:
      "We help healthcare providers identify and source dependable equipment and day-to-day consumables, with attention to suitability, quality and continuity of supply.",
    icon: HeartPulse,
    groups: [
      {
        title: "Clinical & Emergency Equipment",
        description:
          "Equipment that supports examination, treatment, sterilisation and emergency preparedness.",
        items: [
          "Autoclaves and sterilisation equipment",
          "Stethoscopes and diagnostic instruments",
          "Defibrillators",
          "Patient monitors",
          "Exercise monitoring equipment",
        ],
      },
      {
        title: "Medical Consumables",
        description:
          "Frequently used clinical and protective supplies for healthcare environments.",
        items: [
          "Medical gloves",
          "Face masks",
          "Personal protective equipment (PPE)",
          "Disinfectants and cleaning solutions",
          "Medical and disinfectant wipes",
        ],
      },
      {
        title: "Sourcing & Supply Support",
        description:
          "Practical assistance selecting products and coordinating dependable supply arrangements.",
        items: [
          "Requirements assessment",
          "Product and supplier evaluation",
          "Procurement coordination",
          "Delivery, setup and product orientation",
        ],
      },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    shortDescription:
      "Consulting, implementation and ongoing support designed around healthcare organisations.",
    introduction:
      "Our professional services bring structure, specialist guidance and delivery support to technology and operational improvement initiatives.",
    icon: BriefcaseBusiness,
    groups: [
      {
        title: "Consulting & Strategy",
        description:
          "Clear guidance that connects technology decisions to clinical, operational and business priorities.",
        items: [
          "Technology-readiness assessments",
          "Digital strategy and roadmaps",
          "Vendor and platform evaluation",
          "Governance and investment planning",
        ],
      },
      {
        title: "Project & Change Delivery",
        description:
          "Hands-on coordination that keeps complex initiatives clear, accountable and people-centred.",
        items: [
          "Project planning and coordination",
          "Implementation oversight",
          "Change and adoption support",
          "Training and knowledge transfer",
        ],
      },
      {
        title: "Security, Support & Optimisation",
        description:
          "Ongoing support for safer, more dependable solutions that continue to improve over time.",
        items: [
          "Security and access-control reviews",
          "Operational resilience planning",
          "Managed support and issue coordination",
          "Performance reviews and enhancement planning",
        ],
      },
    ],
  },
  {
    id: "strategic-partnerships",
    title: "Strategic Partnerships",
    shortDescription:
      "Trusted collaborations that connect expertise, products and opportunities across healthcare.",
    introduction:
      "We bring organisations, technology providers and suppliers together to create practical opportunities and sustainable value for healthcare.",
    icon: Handshake,
    groups: [
      {
        title: "Technology Partnerships",
        description:
          "Connecting healthcare needs with capable technology providers and complementary expertise.",
        items: [
          "Solution-provider collaboration",
          "Joint solution development",
          "Implementation partnerships",
          "Technology ecosystem development",
        ],
      },
      {
        title: "Supplier & Distribution Partnerships",
        description:
          "Building responsible routes between quality products, trusted suppliers and healthcare customers.",
        items: [
          "Supplier relationship development",
          "Product portfolio evaluation",
          "Market and distribution support",
          "Procurement network coordination",
        ],
      },
      {
        title: "Innovation & Growth",
        description:
          "Exploring future-focused ideas and partnerships that can create meaningful healthcare impact.",
        items: [
          "Innovation opportunity discovery",
          "Pilot and proof-of-concept support",
          "Go-to-market collaboration",
          "Long-term strategic alliance development",
        ],
      },
    ],
  },
];

export default function ServiceCategoryExplorer() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];
  const ActiveIcon = activeCategory.icon;

  return (
    <div>
      <div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        role="tablist"
        aria-label="Service categories"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              id={`${category.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${category.id}-panel`}
              onClick={() => setActiveId(category.id)}
              className={`group rounded-3xl border p-6 text-left transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                isActive
                  ? "-translate-y-1 border-blue-700 bg-blue-700 text-white shadow-xl shadow-blue-900/20"
                  : "border-slate-200 bg-white text-slate-950 shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                  isActive
                    ? "bg-white text-blue-700"
                    : "bg-blue-50 text-blue-700 group-hover:bg-blue-100"
                }`}
              >
                <Icon size={24} aria-hidden />
              </span>
              <span className="mt-5 block text-lg font-bold leading-6">
                {category.title}
              </span>
              <span
                className={`mt-3 block text-sm leading-6 ${
                  isActive ? "text-blue-100" : "text-slate-600"
                }`}
              >
                {category.shortDescription}
              </span>
              <span
                className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
                  isActive ? "text-white" : "text-blue-700"
                }`}
              >
                {isActive ? "Currently viewing" : "View category"}
                <ArrowRight size={16} aria-hidden />
              </span>
            </button>
          );
        })}
      </div>

      <section
        key={activeCategory.id}
        id={`${activeCategory.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeCategory.id}-tab`}
        className="mt-8 animate-[fadeIn_0.35s_ease-out] overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-blue-950/10"
      >
        <div className="bg-gradient-to-br from-blue-950 via-[#07327c] to-blue-700 p-8 text-white sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-xl">
              <ActiveIcon size={31} aria-hidden />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                Service Category
              </p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                {activeCategory.title}
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-8 text-blue-100 sm:text-lg">
                {activeCategory.introduction}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          {activeCategory.featured && (
            <article className="mb-7 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-7 sm:p-9">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-blue-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    {activeCategory.featured.eyebrow}
                  </span>
                  <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    {activeCategory.featured.title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    {activeCategory.featured.description}
                  </p>
                  <div className="mt-7">
                    <PrimaryButton href="/contact">
                      Discuss a digital project <ArrowRight size={18} />
                    </PrimaryButton>
                  </div>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {activeCategory.featured.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={18} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {activeCategory.groups.map((group) => (
              <article key={group.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
                <h3 className="text-xl font-bold text-slate-950">{group.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{group.description}</p>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={17} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
