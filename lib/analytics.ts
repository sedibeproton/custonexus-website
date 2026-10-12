export type ConversionEvent =
  | "contact_click"
  | "enquiry_submitted"
  | "website_review_cta"
  | "website_review_submitted";

type EventDetails = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: ConversionEvent, details: EventDetails = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...details };
  if (window.gtag) window.gtag("event", event, details);
  else window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("custonexus:conversion", { detail: payload }));
}
