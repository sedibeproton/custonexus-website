export type FinancialLineInput = {
  description: string;
  quantityMilli: number;
  unit: string;
  unitPriceCents: number;
  discountCents: number;
};

export type FinancialTotals = {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  lines: Array<FinancialLineInput & { lineTotalCents: number }>;
};

const MAX_SAFE_CENTS = 9_000_000_000_000;

export function parseMoneyToCents(value: unknown) {
  const normalized = String(value ?? "").trim().replaceAll(",", "");
  if (!/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(normalized)) {
    throw new Error("Use a valid non-negative amount with no more than two decimal places.");
  }
  const [whole, fraction = ""] = normalized.split(".");
  const cents = Number(BigInt(whole) * BigInt(100) + BigInt(fraction.padEnd(2, "0")));
  if (!Number.isSafeInteger(cents) || cents > MAX_SAFE_CENTS) throw new Error("Amount is too large.");
  return cents;
}

export function parseQuantityToMilli(value: unknown) {
  const normalized = String(value ?? "").trim();
  if (!/^(0|[1-9]\d*)(\.\d{1,3})?$/.test(normalized)) {
    throw new Error("Use a positive quantity with no more than three decimal places.");
  }
  const [whole, fraction = ""] = normalized.split(".");
  const result = Number(BigInt(whole) * BigInt(1000) + BigInt(fraction.padEnd(3, "0")));
  if (!Number.isSafeInteger(result) || result <= 0) throw new Error("Quantity must be greater than zero.");
  return result;
}

export function calculateFinancialTotals(lines: FinancialLineInput[], vatBasisPoints: number): FinancialTotals {
  if (!Number.isInteger(vatBasisPoints) || vatBasisPoints < 0 || vatBasisPoints > 10_000) throw new Error("Invalid VAT percentage.");
  if (!lines.length) throw new Error("At least one line item is required.");
  let subtotal = BigInt(0);
  let discount = BigInt(0);
  const calculated = lines.map((line) => {
    if (!line.description.trim() || !line.unit.trim()) throw new Error("Every line requires a description and unit.");
    if (!Number.isSafeInteger(line.quantityMilli) || line.quantityMilli <= 0) throw new Error("Invalid quantity.");
    if (!Number.isSafeInteger(line.unitPriceCents) || line.unitPriceCents < 0) throw new Error("Invalid unit price.");
    const gross = (BigInt(line.quantityMilli) * BigInt(line.unitPriceCents) + BigInt(500)) / BigInt(1000);
    const lineDiscount = BigInt(line.discountCents);
    if (lineDiscount < BigInt(0) || lineDiscount > gross) throw new Error("A line discount cannot exceed its amount.");
    subtotal += gross;
    discount += lineDiscount;
    return { ...line, lineTotalCents: Number(gross - lineDiscount) };
  });
  const taxable = subtotal - discount;
  const tax = (taxable * BigInt(vatBasisPoints) + BigInt(5000)) / BigInt(10_000);
  const total = taxable + tax;
  for (const amount of [subtotal, discount, tax, total]) if (amount > BigInt(MAX_SAFE_CENTS)) throw new Error("Document total is too large.");
  return { subtotalCents:Number(subtotal), discountCents:Number(discount), taxCents:Number(tax), totalCents:Number(total), lines:calculated };
}

export function formatZar(cents: number) {
  return new Intl.NumberFormat("en-ZA", { style:"currency", currency:"ZAR" }).format(cents / 100);
}

export function isInvoiceOverdue(input:{status:string;dueDate:string|Date;balanceDueCents:number}, today=new Date()) {
  if (input.status === "CANCELLED" || input.status === "PAID" || input.balanceDueCents <= 0) return false;
  const due = typeof input.dueDate === "string" ? new Date(`${input.dueDate}T23:59:59.999Z`) : input.dueDate;
  return today.getTime() > due.getTime();
}
