export type PricingEntry = {
  id: string;
  name: string;
  service: string;
  description: string;
  price: number | null;
  type: "fixed" | "starting" | "quotation";
  billing: string;
  inclusions: readonly string[];
  exclusions: string;
  featured: boolean;
  active: boolean;
  serviceUrl: string;
};

function group(service: string, title: string, note: string, rows: readonly (readonly [string, number | string, string?, (readonly string[])?])[]) {
  const entries: PricingEntry[] = rows.map(([name, amount, billing = "Once-off", inclusions = []]) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name, service, description: note, price: typeof amount === "number" ? amount : null,
    type: typeof amount === "string" ? "quotation" : title === "Website maintenance" && inclusions.length ? "fixed" : "starting",
    billing: typeof amount === "string" ? amount : billing,
    inclusions, exclusions: note, featured: name === "Business Website", active: true,
    serviceUrl: `/services/${service}`,
  }));
  return { service, title, note, entries };
}

export const pricingGroups = [
  group("business-websites", "Website packages", "Extra products, functionality, revisions, copywriting, subscriptions and transaction fees are quoted separately.", [
    ["Starter Website",1499,"Once-off",["One page","Responsive design","Contact form","WhatsApp integration","Basic on-page SEO","One revision round","Customer-supplied content"]],
    ["Business Website",3499,"Once-off",["Up to five pages","Responsive design","Contact and enquiry forms","Google Maps","WhatsApp integration","Social links","On-page SEO","Two revision rounds"]],
    ["Professional Website",5999,"Once-off",["Up to ten pages","Advanced custom design","Content management","Enhanced SEO","Analytics","Advanced enquiry forms","Three revision rounds"]],
    ["E-commerce Website",8499,"Once-off",["Up to 20 initial products","Product categories","Shopping cart","Payment gateway integration","Order management","Customer accounts where appropriate","Responsive storefront","Basic store management training"]],
  ]),
  group("website-support", "Hosting and business email", "Storage, bandwidth, mailbox capacity and support scope are confirmed in the quote. Domains are subject to availability, extension and renewal rates.", [
    ["Basic website hosting",149,"Monthly"],
    ["Business website hosting",299,"Monthly"],
    ["Advanced managed hosting",599,"Monthly"],
    ["Business email hosting",79,"Monthly per mailbox"],
    ["Business email setup",349],
    [".co.za domain registration",149,"Annually"],
    [".com domain registration",399,"Annually"],
    ["Website migration",749],
  ]),
  group("website-support", "Website maintenance", "Additional development, redesign, licences, third-party services and out-of-scope incident recovery are quoted separately.", [
    ["Essential",399,"Monthly",["Routine health checks","Applicable software and security updates","Monthly backup checks","30 minutes of minor content changes"]],
    ["Business",799,"Monthly",["Essential features","More frequent health monitoring","Backup verification","One hour of minor content changes","Basic performance reviews"]],
    ["Premium",1499,"Monthly",["Business features","Priority support","Enhanced performance and security reviews","Three hours of minor changes","Monthly health summary"]],
    ["Website troubleshooting",499,"Hourly"],
    ["Website redesign",2999],
  ]),
  group("business-systems", "Custom software", "Starting prices cover limited-scope work. Complex projects require a requirements assessment.", [
    ["Business process automation",2499],
    ["Custom business dashboards",4999],
    ["Desktop application development",5999],
    ["Web application development",7999],
    ["API and system integration",3499],
    ["Mobile application development",14999],
    ["Custom CRM and management systems",12999],
    ["Software maintenance and support",799,"Monthly"],
    ["Software development consulting",599,"Hourly"],
  ]),
  group("healthcare-technology", "Healthcare technology", "Scope is assessed for security, privacy, interoperability, technical and applicable regulatory requirements.", [
    ["Healthcare practice website",4499],
    ["Appointment booking integration",2499],
    ["Digital patient intake forms",1999],
    ["Healthcare reporting dashboards",5999],
    ["Medical device data integration",7499],
    ["Custom healthcare software",14999],
    ["Healthcare technology consulting",699,"Hourly"],
    ["Healthcare system support",999,"Monthly"],
  ]),
  group("medical-equipment-consumables", "Medical equipment and consumables", "Supply depends on specifications, quantities, availability, delivery and supplier costs. Servicing depends on device compatibility, technician competence and applicable requirements.", [
    ["Medical equipment supply","Request quotation"],
    ["Medical consumables","Request quotation"],
    ["Personal protective equipment","Request quotation"],
    ["Mobility and rehabilitation equipment","Request quotation"],
    ["Bulk procurement","Volume-based quotation"],
    ["Equipment assessment",499],
    ["Equipment fault diagnosis",599],
    ["Equipment maintenance",799],
    ["Equipment repairs","Quotation after assessment"],
    ["Preventive maintenance contracts","Custom quotation"],
  ]),
  group("professional-services", "Professional services", "Engagement scope and deliverables are confirmed in the quote.", [
    ["General IT consulting",499,"Hourly"],
    ["Business technology assessment",999],
    ["Digital transformation consulting",699,"Hourly"],
    ["Technical documentation",799],
    ["Business systems implementation",3499],
    ["Staff technology training",1499,"Per session"],
    ["Technical project management",699,"Hourly"],
    ["Freelance technician support","Custom quotation"],
  ]),
  group("strategic-partnerships", "Partnerships", "Terms are agreed per engagement.", [
    ["Strategic partnerships","Custom agreement"],
    ["White-label development","Custom quotation"],
  ]),
  group("side-projects", "Side projects", "Scope and costs are confirmed per project.", [
    ["Side projects and innovation","Project-based quotation"],
  ]),
  group("business-websites", "Website add-ons", "Basic booking add-ons connect an existing booking tool. Custom, healthcare or integrated booking workflows require a separate assessment.", [
    ["Additional website page",349],
    ["Additional e-commerce product upload",49,"Per product"],
    ["Blog setup",499],
    ["Online booking integration",999],
    ["Google Analytics setup",499],
    ["Google Search Console setup",349],
    ["Google Business Profile setup assistance",499],
    ["Website copywriting",399,"Per page"],
    ["Additional design revisions",349,"Per round"],
    ["Multilingual website setup",1499],
    ["Advanced contact form",499],
    ["Newsletter integration",749],
  ]),
];

export const pricingEntries = pricingGroups.flatMap(({ entries }) => entries.filter(({ active }) => active));
export const findPrice = (id: unknown) => pricingEntries.find((entry) => entry.id === id);

const zar = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 });
export function pricingLabel(entry: PricingEntry) {
  return entry.price === null ? entry.billing : `${entry.type === "starting" ? "From " : ""}${zar.format(entry.price)} · ${entry.billing}`;
}

export const enquiryService = (service: string) => ({
  "business-websites": "business-website", "business-systems": "business-system",
  "medical-equipment-consumables": "medical-equipment", "side-projects": "professional-services",
}[service] ?? service);
