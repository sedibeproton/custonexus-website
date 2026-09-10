export type ServiceSeoDetails = {
  image: string;
  imageAlt: string;
  audiences: string[];
  challenges: string[];
  outcomes: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const serviceSeoDetails: Record<string, ServiceSeoDetails> = {
  "business-websites": {
    image: "/images/professional-services.jpg",
    imageAlt: "Business professionals planning a website and digital customer experience",
    audiences: ["Small and growing businesses", "Professional practices and consultants", "Startups and service businesses", "Organisations replacing an informal or outdated online presence"],
    challenges: ["A business has no credible website", "Visitors cannot quickly understand the services offered", "The current site performs poorly on phones", "Enquiries rely on unclear or disconnected contact channels"],
    outcomes: ["A professional website aligned with the business", "Clear service and customer journeys", "Mobile-friendly pages with useful calls to action", "A practical launch, hosting and support path"],
    faqs: [
      { question: "Do you build websites for businesses outside healthcare?", answer: "Yes. Business website design and development is a primary CustoNexus service for legitimate South African businesses, professional practices, consultants, startups and other organisations." },
      { question: "Can my website include bookings, WhatsApp or quotation requests?", answer: "Yes. Appropriate functionality can include enquiry and quotation forms, WhatsApp links, booking requests, availability calendars, payments, profiles and other workflows confirmed during scoping." },
      { question: "Do you guarantee Google rankings?", answer: "No responsible provider can guarantee a specific search ranking. We build sound technical and on-page SEO foundations and can recommend ongoing content and search improvements." },
    ],
  },
  "website-support": {
    image: "/images/executive-presentation-identity-v2.png",
    imageAlt: "Website redesign and technical support planning",
    audiences: ["Businesses with outdated websites", "Organisations experiencing website errors or slow performance", "Owners of existing WordPress websites", "Teams needing ongoing website maintenance"],
    challenges: ["An outdated design is weakening trust", "Pages or forms no longer work correctly", "The site is difficult to update or use on mobile", "There is no dependable person responsible for maintenance"],
    outcomes: ["A clear assessment of the current website", "Prioritised repairs, redesign or rebuild recommendations", "Improved usability, content and reliability", "An agreed path for ongoing support"],
    faqs: [
      { question: "Can you redesign an existing website?", answer: "Yes. We can assess the current website and recommend a focused redesign or complete rebuild based on its condition, platform, content and business goals." },
      { question: "Do you support WordPress websites?", answer: "Yes. While new CustoNexus websites are custom-built, we can support suitable existing WordPress websites with troubleshooting, updates, content changes and improvement planning." },
      { question: "Can you maintain a website you did not build?", answer: "Potentially. We first review the platform, access, code or configuration, backups and current condition before confirming what support can be provided safely." },
    ],
  },
  "business-systems": {
    image: "/images/healthcare-technology.jpg",
    imageAlt: "Custom dashboard and business workflow system",
    audiences: ["Businesses relying heavily on spreadsheets or paperwork", "Teams managing repetitive administrative processes", "Service organisations needing booking or client portals", "Organisations with specialised software requirements"],
    challenges: ["Important information is spread across files and messages", "Repetitive data entry consumes staff time", "Customers cannot complete common requests online", "Off-the-shelf software does not match the required workflow"],
    outcomes: ["A clearly defined digital workflow", "Structured information and appropriate access controls", "Reduced avoidable administration", "A scalable system with documented responsibilities and support"],
    faqs: [
      { question: "What kinds of business systems can you build?", answer: "Examples include internal dashboards, client portals, booking systems, digital forms, approval workflows, document systems, database applications and integrations, subject to discovery and scope." },
      { question: "Can you replace our spreadsheets with a custom application?", answer: "Potentially. We first understand the data, users, rules, reporting and risks before recommending whether a custom database application is justified." },
      { question: "Can the system connect to software we already use?", answer: "Where the existing platforms provide appropriate APIs or integration methods, we can assess feasibility and define a responsible integration approach." },
    ],
  },
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
      { question: "How do you approach website development?", answer: "CustoNexus custom-designs and professionally develops websites around the client’s users, brand and requirements. We use appropriate modern frameworks, libraries and reusable components where they improve quality, while avoiding the limitations of forcing every project into a generic pre-made design." },
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
      "Companies needing temporary or on-demand technical capacity",
      "Healthcare facilities seeking recurring monthly technical support",
      "Organisations reviewing digital readiness, security or adoption",
      "Clients needing focused consulting or managed support",
    ],
    challenges: [
      "Technology decisions that are disconnected from operational priorities",
      "Projects without clear scope, ownership, governance or delivery coordination",
      "Technical backlogs or urgent tasks caused by an absent or short-staffed technical team",
      "Low adoption, unclear training needs or inconsistent stakeholder communication",
      "Operational and access-control risks that require a structured review",
    ],
    outcomes: [
      "Clear recommendations tied to the organisation's actual priorities",
      "Defined responsibilities, milestones and decision-making paths",
      "More organised implementation, communication and handover",
      "Flexible technical capacity without immediately expanding permanent headcount",
      "A practical roadmap for continued support or improvement",
    ],
    faqs: [
      { question: "Can you support a project from planning through implementation?", answer: "Yes. An engagement may include discovery, planning, vendor coordination, implementation, testing, training, launch and optimisation, or one defined part of that journey." },
      { question: "Do you work alongside internal teams?", answer: "Yes. Our role can be advisory, delivery-focused or supportive. We define responsibilities around the capability and capacity already available within the client organisation." },
      { question: "Can we contract a CustoNexus technician when our technical team is unavailable or short-staffed?", answer: "Yes. Subject to capability and availability, organisations can contract us for defined technical tasks at an agreed hourly rate. Before work begins, we confirm the required discipline, task scope, location, working hours, tools, access, safety responsibilities and reporting arrangements." },
      { question: "Can a healthcare facility arrange monthly technical support?", answer: "Yes. We can structure a recurring monthly support arrangement around agreed equipment, operational or technology responsibilities. The proposal defines included hours, site attendance, response expectations, reporting, exclusions, escalation procedures and any work billed separately." },
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
