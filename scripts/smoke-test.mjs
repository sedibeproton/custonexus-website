const baseUrl = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const publicPaths = [
  "/",
  "/about",
  "/services",
  "/services/healthcare-technology",
  "/services/medical-equipment-consumables",
  "/services/professional-services",
  "/services/strategic-partnerships",
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

for (const path of publicPaths.filter((path) => !/\.(txt|xml|webmanifest)$/.test(path) && path !== "/opengraph-image")) {
  const html = await (await fetch(`${baseUrl}${path}`)).text();
  pageCache.set(path, html);
  for (const match of html.matchAll(/href="(\/[^"?]*)/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/_next/") && !href.startsWith("/api/") && !href.startsWith("/secure/")) internalLinks.add(href);
  }
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

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error(`Smoke test failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`Smoke test passed for ${baseUrl}.`);
