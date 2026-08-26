export const servicePages = [
  {
    slug: "healthcare-technology",
    title: "Healthcare Technology",
    pageTitle: "Healthcare Technology & Custom Software",
    description:
      "Healthcare websites, mobile apps, patient portals, custom software, systems integration and digital transformation services from CustoNexus Technologies.",
    introduction:
      "We design and deliver practical digital solutions that help healthcare organisations communicate clearly, work efficiently and create better experiences for patients, professionals and partners.",
    highlights: [
      "Healthcare and corporate websites",
      "Custom web and mobile applications",
      "Patient and client portals",
      "Secure dashboards and internal tools",
      "Systems integration and API planning",
      "Digital transformation and automation",
    ],
    sections: [
      { title: "Website & App Development", text: "Our core speciality includes responsive healthcare websites, progressive web apps, mobile experiences, portals and custom business applications designed around real users and measurable goals." },
      { title: "Systems Integration", text: "We help connect platforms, APIs and information flows so teams can work with better continuity, fewer manual steps and clearer access to the information they need." },
      { title: "Implementation & Optimisation", text: "We support requirements, configuration, testing, launch, documentation, adoption and ongoing improvement throughout the technology lifecycle." },
    ],
  },
  {
    slug: "medical-equipment-consumables",
    title: "Medical Equipment & Consumables",
    pageTitle: "Medical Equipment & Healthcare Consumables",
    description:
      "Source autoclaves, stethoscopes, defibrillators, patient monitors, PPE, medical gloves, masks, disinfectants and clinical consumables through CustoNexus.",
    introduction:
      "We help healthcare providers identify and source essential clinical equipment, monitoring devices and everyday consumables with attention to suitability, quality and continuity of supply.",
    highlights: [
      "Autoclaves and sterilisation equipment",
      "Stethoscopes and diagnostic instruments",
      "Defibrillators and emergency equipment",
      "Patient and exercise monitoring equipment",
      "Medical gloves, masks and PPE",
      "Disinfectants and medical wipes",
    ],
    sections: [
      { title: "Clinical & Monitoring Equipment", text: "Our equipment enquiries cover examination, sterilisation, emergency response, patient monitoring and exercise-monitoring requirements for healthcare environments." },
      { title: "Protective & Clinical Consumables", text: "We support sourcing for medical gloves, face masks, personal protective equipment, disinfectants, cleaning products and medical wipes." },
      { title: "Sourcing Support", text: "We help define requirements, evaluate appropriate products and suppliers, coordinate procurement and support delivery or product orientation where applicable." },
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    pageTitle: "Healthcare Consulting & Professional Services",
    description:
      "Healthcare technology consulting, digital strategy, project delivery, implementation, security reviews, managed support and operational improvement.",
    introduction:
      "Our professional services give healthcare organisations practical guidance and accountable delivery support for technology, operations and organisational improvement.",
    highlights: [
      "Technology readiness assessments",
      "Digital strategy and roadmaps",
      "Project and implementation support",
      "Security and access-control reviews",
      "Change, training and adoption support",
      "Managed support and optimisation",
    ],
    sections: [
      { title: "Consulting & Strategy", text: "We connect technology decisions to clinical, operational and business priorities through assessments, roadmaps, platform evaluation and governance guidance." },
      { title: "Project & Change Delivery", text: "We provide project planning, implementation coordination, quality oversight, stakeholder communication, training and adoption support." },
      { title: "Security, Support & Resilience", text: "We help organisations review access controls, strengthen operational resilience, coordinate support and plan meaningful enhancements over time." },
    ],
  },
  {
    slug: "strategic-partnerships",
    title: "Strategic Partnerships",
    pageTitle: "Healthcare Technology & Supplier Partnerships",
    description:
      "Strategic healthcare partnerships connecting technology providers, medical suppliers, implementation expertise and sustainable growth opportunities.",
    introduction:
      "We connect healthcare organisations, technology providers and suppliers to build trusted collaborations that create practical, sustainable value.",
    highlights: [
      "Technology provider collaboration",
      "Joint solution development",
      "Supplier and distribution partnerships",
      "Implementation partnerships",
      "Pilot and proof-of-concept support",
      "Market and growth collaboration",
    ],
    sections: [
      { title: "Technology Partnerships", text: "We collaborate with complementary providers on solution design, implementation, integration and the development of stronger healthcare technology ecosystems." },
      { title: "Supplier & Distribution Partnerships", text: "We help create responsible connections between suitable products, trusted suppliers, distribution capabilities and healthcare customers." },
      { title: "Innovation & Growth", text: "We explore pilots, proofs of concept, market opportunities and long-term alliances that can deliver meaningful healthcare impact." },
    ],
  },
] as const;

export type ServicePage = (typeof servicePages)[number];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
