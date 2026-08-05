"use client";

import { useState, useEffect, useRef } from "react";
import { trackFormStart, trackFormSubmit } from "./Analytics";

type FormState = "idle" | "sending" | "success" | "error";

export default function ShortlistForm() {
  const [state, setState] = useState<FormState>("idle");
  const [started, setStarted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (!started) {
      setStarted(true);
      trackFormStart("cruise_shortlist");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, form: "shortlist" }),
      });
      if (res.ok) {
        setState("success");
        trackFormSubmit("cruise_shortlist");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <div id="get-shortlist" className="rounded-3xl bg-teal-950 p-8 text-sand-50 shadow-xl md:p-12">
      <p className="eyebrow text-brass-400">Free, no obligation</p>
      <h2 className="mt-3 font-display text-3xl italic text-sand-50 md:text-4xl">
        Get my cruise shortlist
      </h2>
      <p className="mt-3 text-sand-100/70 max-w-lg">
        Tell us your dates, budget and travel style — we&apos;ll send you 3–5 perfectly matched cruises within 2 hours.
      </p>

      {state === "success" ? (
        <div className="mt-10 rounded-2xl bg-teal-800/60 p-8 text-center">
          <span className="text-4xl">✅</span>
          <p className="mt-4 font-display text-2xl italic text-sand-50">Shortlist on its way!</p>
          <p className="mt-2 text-sand-100/70">Check your inbox — usually within 2 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sl-name" className="font-mono text-[11px] uppercase tracking-wider2 text-brass-400">
              Your Name
            </label>
            <input
              ref={firstInputRef}
              id="sl-name"
              name="name"
              type="text"
              required
              placeholder="Alex Nguyen"
              onFocus={handleFocus}
              className="rounded-xl border border-teal-700 bg-teal-900/50 px-4 py-3 text-sand-50 placeholder-sand-100/30 focus:border-brass-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sl-email" className="font-mono text-[11px] uppercase tracking-wider2 text-brass-400">
              Email Address
            </label>
            <input
              id="sl-email"
              name="email"
              type="email"
              required
              placeholder="alex@email.com"
              onFocus={handleFocus}
              className="rounded-xl border border-teal-700 bg-teal-900/50 px-4 py-3 text-sand-50 placeholder-sand-100/30 focus:border-brass-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sl-nights" className="font-mono text-[11px] uppercase tracking-wider2 text-brass-400">
              Trip Length
            </label>
            <select
              id="sl-nights"
              name="nights"
              required
              onFocus={handleFocus}
              className="rounded-xl border border-teal-700 bg-teal-900/50 px-4 py-3 text-sand-50 focus:border-brass-400 focus:outline-none"
            >
              <option value="">Select…</option>
              <option value="day">Day trip only</option>
              <option value="2d1n">2 Days 1 Night</option>
              <option value="3d2n">3 Days 2 Nights</option>
              <option value="4d3n">4 Days 3 Nights</option>
              <option value="flexible">I&apos;m flexible</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sl-budget" className="font-mono text-[11px] uppercase tracking-wider2 text-brass-400">
              Budget per person (USD)
            </label>
            <select
              id="sl-budget"
              name="budget"
              required
              onFocus={handleFocus}
              className="rounded-xl border border-teal-700 bg-teal-900/50 px-4 py-3 text-sand-50 focus:border-brass-400 focus:outline-none"
            >
              <option value="">Select…</option>
              <option value="under100">Under $100 (Day cruise)</option>
              <option value="100-250">$100–$250 (Best Value)</option>
              <option value="250-500">$250–$500 (Deluxe)</option>
              <option value="500-900">$500–$900 (Luxury)</option>
              <option value="900+">$900+ (Ultra Luxury)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="sl-style" className="font-mono text-[11px] uppercase tracking-wider2 text-brass-400">
              Travel Style
            </label>
            <div className="flex flex-wrap gap-2">
              {["Couple / Honeymoon", "Family", "Solo", "Group / Friends", "Private Charter"].map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-2 rounded-full border border-teal-700 px-4 py-2 text-sm text-sand-100/80 hover:border-brass-400 hover:text-brass-300 has-[:checked]:border-brass-400 has-[:checked]:bg-brass-400/10 has-[:checked]:text-brass-300 transition">
                  <input type="radio" name="style" value={s} className="sr-only" />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="sl-dates" className="font-mono text-[11px] uppercase tracking-wider2 text-brass-400">
              Approximate Travel Dates (optional)
            </label>
            <input
              id="sl-dates"
              name="dates"
              type="text"
              placeholder="e.g. Late October, or Nov 15–20"
              onFocus={handleFocus}
              className="rounded-xl border border-teal-700 bg-teal-900/50 px-4 py-3 text-sand-50 placeholder-sand-100/30 focus:border-brass-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              id="shortlist-submit"
              type="submit"
              disabled={state === "sending"}
              data-track="form_submit"
              data-form_name="cruise_shortlist"
              className="w-full rounded-full bg-terracotta-500 px-8 py-4 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600 disabled:opacity-50 md:w-auto"
            >
              {state === "sending" ? "Sending…" : "Send My Shortlist →"}
            </button>
            {state === "error" && (
              <p className="mt-3 text-sm text-red-400">Something went wrong. Please try WhatsApp instead.</p>
            )}
            <p className="mt-3 text-xs text-sand-100/40">No spam. No sales calls. Just a shortlist.</p>
          </div>
        </form>
      )}
    </div>
  );
}
