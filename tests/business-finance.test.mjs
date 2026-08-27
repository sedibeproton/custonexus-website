import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateFinancialTotals,
  isInvoiceOverdue,
  parseMoneyToCents,
  parseQuantityToMilli,
} from "../lib/business/finance.ts";

test("money parser uses exact cents and rejects excess precision", () => {
  assert.equal(parseMoneyToCents("1234.56"), 123456);
  assert.equal(parseMoneyToCents("0.1"), 10);
  assert.throws(() => parseMoneyToCents("1.999"));
});

test("quantity parser and document calculations remain integer based", () => {
  assert.equal(parseQuantityToMilli("2.5"), 2500);
  const totals = calculateFinancialTotals([
    { description: "Service", quantityMilli: 2500, unit: "hours", unitPriceCents: 10000, discountCents: 500 },
    { description: "Hosting", quantityMilli: 1000, unit: "item", unitPriceCents: 2000, discountCents: 0 },
  ], 1500);
  assert.deepEqual({ subtotalCents: totals.subtotalCents, discountCents: totals.discountCents, taxCents: totals.taxCents, totalCents: totals.totalCents }, { subtotalCents: 27000, discountCents: 500, taxCents: 3975, totalCents: 30475 });
  assert.throws(() => calculateFinancialTotals([{ description: "Invalid", quantityMilli: 1000, unit: "item", unitPriceCents: 100, discountCents: 101 }], 0));
});

test("overdue state requires an open balance after the due date", () => {
  assert.equal(isInvoiceOverdue({ status: "ISSUED", dueDate: "2026-08-01", balanceDueCents: 100 }, new Date("2026-08-02T12:00:00Z")), true);
  assert.equal(isInvoiceOverdue({ status: "ISSUED", dueDate: "2026-08-01", balanceDueCents: 0 }, new Date("2026-08-02T12:00:00Z")), false);
  assert.equal(isInvoiceOverdue({ status: "CANCELLED", dueDate: "2026-08-01", balanceDueCents: 100 }, new Date("2026-08-02T12:00:00Z")), false);
});
