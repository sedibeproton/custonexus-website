import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { enquiryService, findPrice, pricingEntries, pricingLabel } from "../lib/pricing.ts";

test("migration seeds the complete catalogue with the same IDs and prices", () => {
  const migration = readFileSync(new URL("../migrations/010_pricing_catalogue.sql", import.meta.url), "utf8");
  const seed = JSON.parse(migration.split("$catalogue$")[1]);
  assert.deepEqual(seed, pricingEntries);
  assert.match(migration, /ON CONFLICT \(singleton\) DO NOTHING/);
});

test("each pricing link resolves to a unique active enquiry selection", () => {
  assert.equal(new Set(pricingEntries.map(({ id }) => id)).size, pricingEntries.length);
  for (const entry of pricingEntries) {
    assert.equal(findPrice(entry.id), entry);
    assert.match(enquiryService(entry.service), /^(business-website|website-support|business-system|healthcare-technology|medical-equipment|professional-services|strategic-partnerships)$/);
    if (entry.price !== null) assert.match(pricingLabel(entry), /R/);
  }
  assert.equal(findPrice("unknown-package"), undefined);
  assert.equal(findPrice("starter-website").price, 1499);
});
