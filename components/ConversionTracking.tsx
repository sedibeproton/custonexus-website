"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackConversion } from "@/lib/analytics";

export default function ConversionTracking() {
  const pathname = usePathname();

  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const label = (link.textContent ?? link.getAttribute("aria-label") ?? "").trim().slice(0, 100);

      if (href === "/free-website-review") {
        trackConversion("website_review_cta", { page_path: pathname, link_text: label });
      } else if (href.startsWith("tel:")) {
        trackConversion("contact_click", { method: "phone", page_path: pathname });
      } else if (href.startsWith("mailto:")) {
        trackConversion("contact_click", { method: "email", page_path: pathname });
      } else if (href.includes("wa.me/")) {
        trackConversion("contact_click", { method: "whatsapp", page_path: pathname });
      }
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [pathname]);

  return null;
}
