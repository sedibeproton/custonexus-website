import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateFinancialTotals } from "../lib/business/finance.ts";
import { documentVat, validateVatRegistration } from "../lib/business/vat.ts";
import { findPrice } from "../lib/pricing.ts";

test("confirmed unregistered VAT policy preserves the six requested catalogue totals", () => {
  const tax = documentVat({ vatRegistered: false, vatEnabled: true, vatNumber: null, vatEffectiveDate: null, vatBasisPoints: 1500 }, "2026-11-26");
  assert.equal(tax.taxType, "NONE");
  const cases = [
    [["starter-website"], 1499], [["business-website"], 3499],
    [["professional-website"], 5999], [["e-commerce-website"], 8499],
    [["business-website-hosting"], 299], [["business-website", "business-website-hosting"], 3798],
  ];
  for (const [ids, total] of cases) {
    const lines = ids.map((id) => ({ description: id, unit: "each", quantityMilli: 1000, unitPriceCents: findPrice(id).price * 100, discountCents: 0 }));
    const result = calculateFinancialTotals(lines, tax.taxBasisPoints);
    assert.equal(result.totalCents, total * 100);
    assert.equal(result.taxCents, 0);
  }
});

test("VAT requires explicit charging, a valid registration and a reached effective date", () => {
  assert.throws(() => validateVatRegistration({ vatRegistered: false, vatEnabled: true }));
  assert.throws(() => validateVatRegistration({ vatRegistered: true, vatEnabled: true, vatNumber: "1234567890", vatEffectiveDate: "2027-02-30", vatPercent: "15" }));
  const settings = { vatRegistered: true, vatEnabled: true, vatNumber: "1234567890", vatEffectiveDate: "2027-01-01", vatBasisPoints: 1500 };
  assert.equal(documentVat(settings, "2027-01-01", "2026-12-31").taxBasisPoints, 0);
  assert.equal(documentVat(settings, "2026-12-31", "2027-01-01").taxBasisPoints, 0);
  assert.equal(documentVat({ ...settings, vatEnabled: false }, "2027-01-01", "2027-01-01").taxBasisPoints, 0);
  assert.equal(documentVat(settings, "2027-01-01", "2027-01-01").taxBasisPoints, 1500);
});
