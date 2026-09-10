const baseUrl = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const publicPaths = [
  "/",
  "/about",
  "/services",
  "/services/business-websites",
  "/services/website-support",
  "/services/business-systems",
  "/services/healthcare-technology",
  "/services/medical-equipment-consumables",
  "/services/professional-services",
  "/services/strategic-partnerships",
  "/services/side-projects",
  "/solutions",
  "/constitution",
  "/faqs",
  "/contact",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/opengraph-image",
];

const failures = [];

for (const path of publicPaths) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  console.log(`${response.status} ${path}`);
  if (!response.ok) failures.push(`${path} returned ${response.status}`);
}

const home = await (await fetch(`${baseUrl}/`)).text();
const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
const secure = await fetch(`${baseUrl}/secure/dashboard`, { redirect: "manual" });
const secureBody = secure.status === 200 ? await secure.text() : "";

const checks = [
  [home.includes('rel="canonical" href="https://custonexus.com"'), "Homepage canonical URL is correct"],
  [home.includes('property="og:image"') && home.includes("/opengraph-image"), "Homepage Open Graph image is present"],
  [home.includes('type="application/ld+json"'), "Homepage structured data is present"],
  [robots.includes("Disallow: /secure/"), "robots.txt blocks the secure area"],
  [robots.includes("Disallow: /api/"), "robots.txt blocks API routes"],
  [!sitemap.includes("/secure/"), "sitemap.xml excludes secure routes"],
  [!sitemap.includes("/api/"), "sitemap.xml excludes API routes"],
  [
    (secure.status >= 300 && secure.status < 400) || secureBody.includes("/secure/login"),
    "Unauthenticated secure dashboard request leads to login",
  ],
];

for (const [passed, message] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} ${message}`);
  if (!passed) failures.push(`Check failed: ${message}`);
}

const pageCache = new Map();
const internalLinks = new Set();
const pageTitles = new Map();
const pageDescriptions = new Map();

const htmlPaths = publicPaths.filter((path) => !/\.(txt|xml|webmanifest)$/.test(path) && path !== "/opengraph-image");

for (const path of htmlPaths) {
  const html = await (await fetch(`${baseUrl}${path}`)).text();
  pageCache.set(path, html);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim();
  const canonical = path === "/" ? "https://custonexus.com" : `https://custonexus.com${path}`;
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  if (!title) failures.push(`Missing title: ${path}`);
  else if (pageTitles.has(title)) failures.push(`Duplicate title on ${path} and ${pageTitles.get(title)}: ${title}`);
  else pageTitles.set(title, path);
  if (!description) failures.push(`Missing meta description: ${path}`);
  else if (pageDescriptions.has(description)) failures.push(`Duplicate meta description on ${path} and ${pageDescriptions.get(description)}`);
  else pageDescriptions.set(description, path);
  if (!html.includes(`rel="canonical" href="${canonical}"`)) failures.push(`Incorrect canonical URL: ${path}`);
  if (h1Count !== 1) failures.push(`${path} contains ${h1Count} H1 elements; expected 1`);
  if (html.includes('name="robots" content="noindex')) failures.push(`Public page is accidentally noindex: ${path}`);
  if (!html.includes('property="og:title"') || !html.includes('property="og:description"') || !html.includes('property="og:image"')) failures.push(`Incomplete Open Graph metadata: ${path}`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { failures.push(`Invalid JSON-LD on ${path}`); }
  }
  for (const match of html.matchAll(/href="(\/[^"?]*)/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/_next/") && !href.startsWith("/api/") && !href.startsWith("/secure/")) internalLinks.add(href);
  }
}

for (const path of htmlPaths) {
  const sitemapUrl = path === "/" ? "https://custonexus.com" : `https://custonexus.com${path}`;
  if (!sitemap.includes(`<loc>${sitemapUrl}</loc>`)) failures.push(`Sitemap is missing public page: ${path}`);
}

for (const href of internalLinks) {
  const [path, hash] = href.split("#");
  const targetPath = path || "/";
  let html = pageCache.get(targetPath);
  if (!html) {
    const response = await fetch(`${baseUrl}${targetPath}`, { redirect: "manual" });
    if (!response.ok) {
      failures.push(`Broken internal link: ${href} returned ${response.status}`);
      continue;
    }
    html = await response.text();
    pageCache.set(targetPath, html);
  }
  if (hash && !html.includes(`id="${decodeURIComponent(hash)}"`)) failures.push(`Missing anchor target: ${href}`);
}

console.log(`${failures.length ? "FAIL" : "PASS"} Checked ${internalLinks.size} internal links and anchor targets`);
console.log(`${failures.length ? "FAIL" : "PASS"} Checked ${htmlPaths.length} pages for unique metadata, canonicals, H1s, indexability, Open Graph and JSON-LD`);

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error(`Smoke test failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`Smoke test passed for ${baseUrl}.`);
