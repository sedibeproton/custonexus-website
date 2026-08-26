const SITE_URL = new URL("https://custonexus.com");
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const EXCLUDED_PATH_PREFIXES = ["/api", "/secure"];
const REQUEST_TIMEOUT_MS = 20_000;

function withTimeout() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

async function fetchWithTimeout(url, options = {}) {
  const timeout = withTimeout();

  try {
    return await fetch(url, { ...options, signal: timeout.signal });
  } finally {
    timeout.cancel();
  }
}

function decodeXmlText(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function extractIndexableUrls(sitemapXml) {
  const locations = [...sitemapXml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(
    (match) => decodeXmlText(match[1].trim()),
  );

  return [...new Set(locations)].filter((value) => {
    let url;

    try {
      url = new URL(value);
    } catch {
      console.warn("IndexNow: skipped a malformed sitemap URL.");
      return false;
    }

    if (url.origin !== SITE_URL.origin) {
      console.warn(`IndexNow: skipped an URL outside ${SITE_URL.host}.`);
      return false;
    }

    const excluded = EXCLUDED_PATH_PREFIXES.some(
      (prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`),
    );

    if (excluded) {
      console.warn(`IndexNow: skipped excluded path ${url.pathname}.`);
      return false;
    }

    return true;
  });
}

async function main() {
  const key = process.env.INDEXNOW_KEY?.trim();

  if (!key) {
    throw new Error("INDEXNOW_KEY is required.");
  }

  if (!INDEXNOW_KEY_PATTERN.test(key)) {
    throw new Error(
      "INDEXNOW_KEY must contain 8–128 letters, numbers, or hyphens.",
    );
  }

  const keyLocation = new URL(`/${key}.txt`, SITE_URL);
  const sitemapUrl = new URL("/sitemap.xml", SITE_URL);

  console.log(`IndexNow: reading the public URL inventory from ${sitemapUrl}.`);
  const sitemapResponse = await fetchWithTimeout(sitemapUrl, {
    headers: { Accept: "application/xml, text/xml;q=0.9" },
  });

  if (!sitemapResponse.ok) {
    throw new Error(
      `Unable to read the production sitemap (HTTP ${sitemapResponse.status}).`,
    );
  }

  const urlList = extractIndexableUrls(await sitemapResponse.text());

  if (urlList.length === 0) {
    throw new Error("The production sitemap did not contain any eligible URLs.");
  }

  if (urlList.length > 10_000) {
    throw new Error("The sitemap exceeds IndexNow's 10,000 URL batch limit.");
  }

  console.log("IndexNow: verifying the production key file.");
  const keyResponse = await fetchWithTimeout(keyLocation, {
    headers: { Accept: "text/plain" },
  });

  if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
    throw new Error(
      `IndexNow key verification failed (HTTP ${keyResponse.status}). Confirm the deployed key file and Railway variable match.`,
    );
  }

  if (process.argv.includes("--dry-run")) {
    console.log(
      `IndexNow: dry run passed; ${urlList.length} eligible URLs are ready for submission.`,
    );
    return;
  }

  console.log(`IndexNow: submitting ${urlList.length} URLs.`);
  const submitResponse = await fetchWithTimeout(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: SITE_URL.host,
      key,
      keyLocation: keyLocation.href,
      urlList,
    }),
  });

  if (submitResponse.status !== 200 && submitResponse.status !== 202) {
    throw new Error(
      `IndexNow rejected the submission (HTTP ${submitResponse.status}).`,
    );
  }

  console.log(
    `IndexNow: submission accepted (HTTP ${submitResponse.status}) for ${urlList.length} URLs.`,
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown failure.";
  console.error(`IndexNow: ${message}`);
  process.exitCode = 1;
});
