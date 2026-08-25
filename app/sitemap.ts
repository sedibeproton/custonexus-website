import type { MetadataRoute } from "next";

const siteUrl = "https://custonexus.com";
const lastModified = new Date("2026-08-25");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/solutions`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/constitution`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
