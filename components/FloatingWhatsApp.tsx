"use client";

import { usePathname } from "next/navigation";

import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

function getPageMessage(pathname: string) {
  if (pathname.startsWith("/services/business-websites")) return whatsappMessages.website;
  if (pathname.startsWith("/services/website-support")) return whatsappMessages.website;
  if (pathname.startsWith("/services/business-systems")) return whatsappMessages.project;
  if (pathname.startsWith("/services/healthcare-technology")) {
    return whatsappMessages.healthcareTechnology;
  }
  if (pathname.startsWith("/services/medical-equipment-consumables")) {
    return whatsappMessages.medicalEquipment;
  }
  if (pathname.startsWith("/services/professional-services")) {
    return whatsappMessages.professionalServices;
  }
  if (pathname.startsWith("/services/strategic-partnerships")) {
    return whatsappMessages.strategicPartnerships;
  }
  if (pathname.startsWith("/services")) return whatsappMessages.project;
  if (pathname.startsWith("/solutions")) return whatsappMessages.project;
  if (pathname.startsWith("/faqs")) return whatsappMessages.faqs;
  if (pathname.startsWith("/contact")) return whatsappMessages.contact;
  if (pathname.startsWith("/about")) return whatsappMessages.about;
  if (pathname.startsWith("/constitution")) return whatsappMessages.constitution;
  return whatsappMessages.project;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4Zm-8.3 18.2a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.4 4.7Zm5.4-7.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.3 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.4-.2-.7-.3Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const message = getPageMessage(pathname);

  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact CustoNexus Technologies on WhatsApp"
      title="Chat with CustoNexus on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20bd5a] focus-visible:ring-4 focus-visible:ring-emerald-200 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/30 motion-safe:animate-ping" />
      <WhatsAppIcon />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  );
}
