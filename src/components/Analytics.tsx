"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function initDataLayer() {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// Convenience helpers
export const trackCategoryClick = (category: string) =>
  track("category_click", { category });

export const trackCtaClick = (label: string, location: string = "unknown") =>
  track("cta_click", { label, location });

export const trackFormStart = (form_name: string) =>
  track("form_start", { form_name });

export const trackFormSubmit = (form_name: string) =>
  track("form_submit", { form_name });

export const trackWhatsApp = () => track("whatsapp_click");

export const trackTourEnquiry = (tour: string) =>
  track("tour_enquiry", { tour });

// Global click delegation — picks up data-track attributes
export default function Analytics({ gtmId }: { gtmId?: string }) {
  useEffect(() => {
    initDataLayer();

    // GTM script injection (optional)
    if (gtmId && !document.getElementById("gtm-script")) {
      const s = document.createElement("script");
      s.id = "gtm-script";
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
      document.head.appendChild(s);
    }

    // Global delegation
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-track]") as HTMLElement | null;
      if (!el) return;
      const evt = el.dataset.track!;
      const params: Record<string, unknown> = {};
      Object.entries(el.dataset).forEach(([k, v]) => {
        if (k !== "track") params[k] = v;
      });
      track(evt, params);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [gtmId]);

  return null;
}
