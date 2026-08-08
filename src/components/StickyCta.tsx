"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackWhatsApp, trackCtaClick } from "./Analytics";

// CMS handles the WhatsApp URL now

export default function StickyCta({ data }: { data?: any }) {
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    // Show after scrolling 300px
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hide when the shortlist form is visible
    const form = document.getElementById("get-shortlist");
    if (form) {
      const obs = new IntersectionObserver(
        ([entry]) => setFormInView(entry.isIntersecting),
        { rootMargin: "0px 0px -100px 0px" }
      );
      obs.observe(form);
      return () => {
        window.removeEventListener("scroll", onScroll);
        obs.disconnect();
      };
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && !formInView;

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 bg-teal-950/95 px-4 py-3 backdrop-blur-sm md:rounded-t-2xl md:px-8 border-t border-teal-800">
        <p className="hidden text-sm text-sand-100/70 md:block">
          <span className="font-semibold text-sand-50">
            {data?.stickyCtaText || "64 Ha Long Bay cruises"}
          </span>
        </p>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <a
            id="sticky-whatsapp"
            href={`https://wa.me/${data?.stickyCtaWhatsapp || "84905999888"}?text=Hi%2C+I%27d+like+a+Ha+Long+Bay+cruise+shortlist`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsApp}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-mono text-xs uppercase tracking-wideish text-white transition hover:bg-[#1fbd5b] md:flex-none"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.855L.057 23.25a.75.75 0 00.921.921l5.395-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.74-.51-5.3-1.4l-.38-.22-3.94 1.08 1.08-3.94-.22-.38A10 10 0 1112 22z" />
            </svg>
            WhatsApp
          </a>
          <Link
            id="sticky-shortlist"
            href="#get-shortlist"
            onClick={() => trackCtaClick("get_shortlist", "sticky_bar")}
            className="flex flex-1 items-center justify-center rounded-full bg-terracotta-500 px-5 py-2.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600 md:flex-none"
          >
            Get Free Shortlist
          </Link>
        </div>
      </div>
    </div>
  );
}
