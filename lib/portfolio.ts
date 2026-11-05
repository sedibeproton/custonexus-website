export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  industry: string;
  description: string;
  attribution: string;
  capabilities: readonly string[];
  href: string;
  external: boolean;
  publicationStatus: "published" | "draft";
  publicationNote?: string;
};

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    slug: "custonexus-digital-platform",
    title: "CustoNexus Digital Platform",
    category: "Business Application",
    industry: "Technology Operations",
    description:
      "A responsive public website and secure operational workspace supporting enquiries, document management, quotations, invoices and administrative workflows.",
    attribution: "Designed and developed by CustoNexus Technologies",
    capabilities: ["Next.js", "PostgreSQL", "Cloudflare R2"],
    href: "/services/business-systems",
    external: false,
    publicationStatus: "published",
  },
  {
    slug: "custonexus-website-experience",
    title: "CustoNexus Website Experience",
    category: "Website Design & Development",
    industry: "Technology Services",
    description:
      "A custom-designed, mobile-first business website with structured service journeys, accessible enquiry forms, technical SEO and privacy-conscious analytics integration.",
    attribution: "Designed and developed by CustoNexus Technologies",
    capabilities: ["Next.js", "TypeScript", "Responsive UI"],
    href: "/services/business-websites",
    external: false,
    publicationStatus: "published",
  },
  {
    slug: "sedibe-mbhele-physiotherapy",
    title: "Sedibe Mbhele Physiotherapy",
    category: "Website Design & Development",
    industry: "Healthcare / Physiotherapy",
    description:
      "A professional website for a physiotherapy practice, focused on presenting services clearly and helping visitors find relevant information and contact options.",
    attribution: "Designed by the CustoNexus founder",
    capabilities: ["Professional Website", "Responsive Design", "Healthcare Experience"],
    href: "https://sedibembhelephysio.co.za",
    external: true,
    publicationStatus: "published",
    publicationNote:
      "The practice owner confirmed permission to publish the practice name, branding, live website reference and genuine website screenshots.",
  },
] as const;

export const publishedPortfolioProjects = portfolioProjects.filter(
  (project) => project.publicationStatus === "published",
);
