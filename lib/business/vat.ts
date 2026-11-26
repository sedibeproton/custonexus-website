export type VatDocumentTreatment = { taxType: string; taxLabel: string; taxBasisPoints: number };

export const noVat: VatDocumentTreatment = { taxType: "NONE", taxLabel: "No tax", taxBasisPoints: 0 };

export function johannesburgDate(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Johannesburg", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function documentVat(settings: {
  vatRegistered: boolean; vatEnabled: boolean; vatNumber: string | null;
  vatEffectiveDate: string | null; vatBasisPoints: number;
}, documentDate: string, today = johannesburgDate()): VatDocumentTreatment {
  if (!settings.vatRegistered || !settings.vatEnabled || !settings.vatNumber ||
      !settings.vatEffectiveDate || settings.vatBasisPoints <= 0 ||
      settings.vatEffectiveDate > today || settings.vatEffectiveDate > documentDate) return noVat;
  return { taxType: "STANDARD", taxLabel: "VAT", taxBasisPoints: settings.vatBasisPoints };
}

export function validateVatRegistration(body: Record<string, unknown>) {
  if (typeof body.vatRegistered !== "boolean" || typeof body.vatEnabled !== "boolean") {
    throw new Error("Select the VAT registration and charging status.");
  }
  if (!body.vatRegistered) {
    if (body.vatEnabled) throw new Error("VAT charging requires VAT registration.");
    return { registered: false, enabled: false, number: null, effectiveDate: null, basisPoints: 0 };
  }
  const number = typeof body.vatNumber === "string" ? body.vatNumber.trim() : "";
  const effectiveDate = typeof body.vatEffectiveDate === "string" ? body.vatEffectiveDate : "";
  const date = new Date(effectiveDate + "T00:00:00Z");
  if (!/^\d{10}$/.test(number)) throw new Error("Enter the verified 10-digit VAT registration number.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(effectiveDate) || !Number.isFinite(+date) || date.toISOString().slice(0, 10) !== effectiveDate) {
    throw new Error("Enter a valid VAT registration effective date.");
  }
  const rate = String(body.vatPercent ?? "");
  const basisPoints = Math.round(Number(rate) * 100);
  if (!/^\d{1,3}(\.\d{1,2})?$/.test(rate) || basisPoints > 10000 || (body.vatEnabled && basisPoints <= 0)) {
    throw new Error("Enter a valid VAT rate before enabling charging.");
  }
  return { registered: true, enabled: body.vatEnabled, number, effectiveDate, basisPoints };
}
