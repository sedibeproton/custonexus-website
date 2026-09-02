export type ServiceSeoDetails = {
  image: string;
  imageAlt: string;
  audiences: string[];
  challenges: string[];
  outcomes: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const serviceSeoDetails: Record<string, ServiceSeoDetails> = {
  "healthcare-technology": {
    image: "/images/healthcare-technology.jpg",
    imageAlt: "Healthcare professional using a connected digital platform",
    audiences: [
      "Healthcare practices and clinical teams",
      "Medical suppliers and service providers",
      "Healthcare organisations modernising internal workflows",
      "Businesses needing a fully custom website or application",
    ],
    challenges: [
      "Generic websites that do not reflect the organisation or support real workflows",
      "Manual booking, enquiry and administrative processes",
      "Disconnected systems, duplicated data entry and unclear information flows",
      "Digital services that perform poorly on mobile devices or are difficult to maintain",
    ],
    outcomes: [
      "A responsive digital experience designed around the intended users",
      "Clearer customer, patient and stakeholder journeys",
      "Practical automation and fewer avoidable manual steps",
      "A maintainable platform with an agreed hosting and support path",
    ],
    faqs: [
      { question: "Do you build WordPress or template-based websites?", answer: "No. CustoNexus websites and web platforms are designed and developed for the specific client. We do not rely on WordPress, purchased themes or generic page-builder templates." },
      { question: "Can you build booking systems and availability calendars?", answer: "Yes. Depending on the approved scope, a custom website can include booking requests, availability calendars, contact forms, payments, user accounts, dashboards, integrations and other business workflows." },
      { question: "Do you provide hosting, maintenance and company email?", answer: "Yes. We can provide hosting, maintenance and professional company email for solutions we deliver. The appropriate plan depends on traffic, storage, support needs, update frequency and mailbox requirements." },
    ],
  },
  "medical-equipment-consumables": {
    image: "/images/solutions-healthcare.jpg",
    imageAlt: "Healthcare team working with medical equipment and monitoring technology",
    audiences: [
      "Healthcare practices, clinics and care environments",
      "Clinical, procurement and facilities teams",
      "Organisations sourcing recurring medical consumables",
      "Equipment owners seeking assessment, servicing, calibration or repair",
    ],
    challenges: [
      "Unclear equipment specifications or supplier options",
      "Difficulty maintaining continuity of essential consumables",
      "Equipment faults, performance concerns or overdue technical attention",
      "Limited information about parts, service feasibility or calibration requirements",
    ],
    outcomes: [
      "Requirements clarified before products or work are approved",
      "Suitable sourcing options aligned with specification and availability",
      "A documented quotation for approved supply or technical work",
      "Clear handover guidance and available supporting service information",
    ],
    faqs: [
      { question: "Which medical equipment can you help source?", answer: "Enquiries may include autoclaves, sterilisation equipment, stethoscopes, diagnostic instruments, defibrillators, emergency equipment, patient monitors and exercise-monitoring equipment. Specifications and availability are confirmed per request." },
      { question: "Do you service, calibrate and repair medical equipment?", answer: "We consider servicing, preventive maintenance, calibration and repair requests for various medical devices. Acceptance depends on the model, condition, safety requirements, technical capability, parts and manufacturer information available." },
      { question: "Which consumables can you supply?", answer: "We can assist with medical gloves, face masks, PPE, disinfectants, cleaning products, medical wipes and related healthcare consumables, subject to the required specification and supplier availability." },
    ],
  },
  "professional-services": {
    image: "/images/professional-services.jpg",
    imageAlt: "Professionals collaborating on healthcare technology and project delivery",
    audiences: [
      "Healthcare leaders planning technology or operational change",
      "Teams that need project planning or implementation support",
      "Organisations reviewing digital readiness, security or adoption",
      "Clients needing focused consulting or managed support",
    ],
    challenges: [
      "Technology decisions that are disconnected from operational priorities",
      "Projects without clear scope, ownership, governance or delivery coordination",
      "Low adoption, unclear training needs or inconsistent stakeholder communication",
      "Operational and access-control risks that require a structured review",
    ],
    outcomes: [
      "Clear recommendations tied to the organisation's actual priorities",
      "Defined responsibilities, milestones and decision-making paths",
      "More organised implementation, communication and handover",
      "A practical roadmap for continued support or improvement",
    ],
    faqs: [
      { question: "Can you support a project from planning through implementation?", answer: "Yes. An engagement may include discovery, planning, vendor coordination, implementation, testing, training, launch and optimisation, or one defined part of that journey." },
      { question: "Do you work alongside internal teams?", answer: "Yes. Our role can be advisory, delivery-focused or supportive. We define responsibilities around the capability and capacity already available within the client organisation." },
      { question: "Do professional services include non-healthcare side projects?", answer: "Selected non-healthcare work is available through our dedicated Side Projects service. Those requests are reviewed separately for safety, feasibility, scope, expertise and delivery fit." },
    ],
  },
  "strategic-partnerships": {
    image: "/images/strategic-partnerships.jpg",
    imageAlt: "Business and healthcare professionals discussing a strategic partnership",
    audiences: [
      "Healthcare technology providers",
      "Medical equipment and consumable suppliers",
      "Implementation and specialist service partners",
      "Organisations exploring pilots or joint market opportunities",
    ],
    challenges: [
      "Promising solutions without the right delivery or market relationships",
      "Unclear partner roles, commercial expectations or governance",
      "Supplier opportunities that require responsible market coordination",
      "Early-stage ideas that need structured assessment before investment",
    ],
    outcomes: [
      "Clearer strategic fit, responsibilities and expected value",
      "A documented framework for due diligence and decision-making",
      "Defined pilot, sourcing or go-to-market steps where appropriate",
      "A sustainable governance path for successful collaborations",
    ],
    faqs: [
      { question: "Can technology providers partner with CustoNexus?", answer: "Yes. We consider technology partnerships that address genuine healthcare needs and align with our standards for integrity, quality and people-first service." },
      { question: "Can medical suppliers or distributors work with you?", answer: "Yes. Proposals should explain the product range, relevant specifications, supply capability, intended market arrangement and the contribution expected from each party." },
      { question: "Do you support pilots or proofs of concept?", answer: "Potentially. We first assess the need, expected value, feasibility, responsibilities, commercial terms and risk before recommending a pilot or proof of concept." },
    ],
  },
};
