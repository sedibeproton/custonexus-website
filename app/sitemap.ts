import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";

const siteUrl = "https://custonexus.com";
const lastModified = new Date("2026-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/solutions`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/faqs`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/constitution`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [
    ...routes,
    ...servicePages.map(({ slug }) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
