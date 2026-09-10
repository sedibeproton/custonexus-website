export type EnquiryValidationInput = {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  preferredContact?: string;
  requirements?: string;
  timeline?: string;
  currentWebsite?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const namePattern = /^[\p{L}][\p{L}\p{M}'’ .-]*$/u;

export function normalisePhone(value: string) {
  return value.trim().replace(/[\s().-]/g, "");
}

export function isValidPhone(value: string) {
  const normalised = normalisePhone(value);
  if (!/^\+?\d{9,15}$/.test(normalised)) return false;
  const digits = normalised.replace(/\D/g, "");
  return !/^(\d)\1+$/.test(digits);
}

export function isValidWebsite(value: string) {
  if (!value.trim()) return true;
  try {
    const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(candidate);
    return ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function validateEnquiryDetails(input: EnquiryValidationInput) {
  const errors: Record<string, string> = {};
  const requirements = input.requirements?.trim() ?? "";

  if (requirements.length < 20) errors.requirements = "Please provide at least 20 characters so we can understand the requirement.";
  if (!input.timeline?.trim()) errors.timeline = "Please select a preferred timeline.";
  if (!isValidWebsite(input.currentWebsite ?? "")) errors.currentWebsite = "Enter a valid website address, such as example.co.za.";

  return errors;
}

export function validateEnquiryContact(input: EnquiryValidationInput) {
  const errors: Record<string, string> = {};
  const fullName = input.fullName?.trim() ?? "";
  const company = input.company?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";

  if (fullName.length < 2 || fullName.length > 120 || !namePattern.test(fullName)) errors.fullName = "Enter a valid name using letters, spaces, apostrophes or hyphens.";
  if (company.length < 2 || company.length > 160) errors.company = "Enter a valid business or organisation name.";
  if (!emailPattern.test(email) || email.length > 200) errors.email = "Enter a valid email address, such as name@company.co.za.";
  if (phone && !isValidPhone(phone)) errors.phone = "Enter a valid phone number with 9 to 15 digits.";
  if (input.preferredContact !== "email" && !phone) errors.phone = "A phone number is required for call or WhatsApp contact.";

  return errors;
}
