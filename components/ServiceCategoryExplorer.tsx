"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
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
  detailHref: string;
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
    detailHref: "/services/healthcare-technology",
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
        "Website hosting and company email",
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
    detailHref: "/services/medical-equipment-consumables",
    title: "Medical Equipment & Consumables",
    shortDescription:
      "Medical equipment sourcing, servicing, calibration, repairs and dependable consumable supply.",
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
      {
        title: "Service, Calibration & Repairs",
        description:
          "Technical support for various medical devices, reviewed according to equipment type, condition and applicable requirements.",
        items: [
          "Preventive servicing and equipment checks",
          "Calibration coordination and verification",
          "Fault assessment and repairs",
          "Parts and maintenance planning",
        ],
      },
    ],
  },
  {
    id: "professional-services",
    detailHref: "/services/professional-services",
    title: "Professional Services",
    shortDescription:
      "Healthcare-focused consulting and delivery, plus carefully selected side projects for other customers.",
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
      {
        title: "Non-Healthcare Side Projects",
        description:
          "Selected practical assignments for individuals and organisations outside healthcare, accepted after a feasibility and safety review.",
        items: [
          "Electrical appliance and electronics assessment or repair",
          "Websites and business applications",
          "Technology and operational consultations",
          "Project planning and management",
        ],
      },
    ],
  },
  {
    id: "strategic-partnerships",
    detailHref: "/services/strategic-partnerships",
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

function subscribeToHashChange(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getCurrentHash() {
  return window.location.hash.slice(1);
}

export default function ServiceCategoryExplorer() {
  const requestedCategory = useSyncExternalStore(
    subscribeToHashChange,
    getCurrentHash,
    () => "",
  );
  const activeId = categories.some(
    (category) => category.id === requestedCategory,
  )
    ? requestedCategory
    : categories[0].id;

  const selectCategory = (categoryId: string) => {
    window.history.pushState(null, "", `#${categoryId}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };
  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];
  const ActiveIcon = activeCategory.icon;

  return (
    <div>
      <div
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:gap-4 xl:grid-cols-4"
        role="tablist"
        aria-label="Service categories"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              id={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${category.id}-panel`}
              onClick={() => selectCategory(category.id)}
              className={`group min-w-[82vw] snap-center rounded-3xl border p-5 text-left transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:min-w-0 sm:p-6 ${
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

      <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.detailHref}
              href={category.detailHref}
              className="group flex min-h-28 items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-[0_12px_35px_rgba(15,48,105,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(15,48,105,0.13)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:min-h-36 sm:rounded-3xl sm:p-5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                <Icon size={27} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  View details
                </span>
                <span className="mt-2 block text-lg font-bold leading-6 text-slate-950">
                  {category.title}
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="mt-3 text-blue-700 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </div>

      <section
        key={activeCategory.id}
        id={`${activeCategory.id}-panel`}
        role="tabpanel"
        aria-labelledby={activeCategory.id}
        className="mt-6 animate-[fadeIn_0.35s_ease-out] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-2xl shadow-blue-950/10 sm:mt-8 sm:rounded-[2rem]"
      >
        <div className="bg-gradient-to-br from-blue-950 via-[#07327c] to-blue-700 p-6 text-white sm:p-10 lg:p-12">
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

        <div className="p-4 sm:p-8 lg:p-10">
          {activeCategory.featured && (
            <article className="mb-5 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:mb-7 sm:rounded-3xl sm:p-9">
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
