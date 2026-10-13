export type ConversionEvent =
  | "contact_click"
  | "enquiry_submitted"
  | "website_review_cta"
  | "generate_lead"
  | "consultation_booked";

type EventDetails = Record<string, string | number | boolean | undefined>;

const allowedParameters: Record<ConversionEvent, ReadonlySet<string>> = {
  contact_click: new Set(["method", "page_path"]),
  enquiry_submitted: new Set(["service", "intent"]),
  website_review_cta: new Set(["page_path", "link_text"]),
  generate_lead: new Set(["form_name", "lead_type"]),
  consultation_booked: new Set(["consultation_type", "booking_source"]),
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: ConversionEvent, details: EventDetails = {}) {
  if (typeof window === "undefined") return;
  const safeDetails = Object.fromEntries(
    Object.entries(details).filter(([key, value]) => allowedParameters[event].has(key) && value !== undefined),
  );
  const payload = { event, ...safeDetails };
  if (window.gtag) window.gtag("event", event, safeDetails);
  else window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("custonexus:conversion", { detail: payload }));
}
