"use client";

import { useState } from "react";
import { Cruise } from "@/lib/types";

type Status = "idle" | "sending" | "sent" | "error";

export default function InquiryForm({ cruises, defaultSlug }: { cruises: Cruise[]; defaultSlug?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brass-500/40 bg-teal-950 p-10 text-center text-sand-100">
        <p className="eyebrow mb-3">Received</p>
        <p className="font-display text-2xl italic text-sand-50">
          Thanks — we'll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Phone / WhatsApp" name="phone" />
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wideish text-ink-500">
            Cruise
          </label>
          <select
            name="cruise"
            defaultValue={defaultSlug ?? ""}
            className="w-full rounded-lg border border-ink-300/30 bg-transparent px-4 py-3 text-ink-900 outline-none focus:border-terracotta-500"
          >
            <option value="">Not sure yet</option>
            {cruises.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} — {c.durationDays}D/{c.durationNights}N
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Preferred travel dates" name="dates" placeholder="e.g. Oct 12–15, 2026" />
        <Field label="Number of guests" name="guests" type="number" min={1} />
      </div>
      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-wideish text-ink-500">
          Anything else
        </label>
        <textarea
          name="message"
          rows={5}
          className="w-full rounded-lg border border-ink-300/30 bg-transparent px-4 py-3 text-ink-900 outline-none focus:border-terracotta-500"
          placeholder="Cabin preference, celebration, dietary needs — whatever's useful to know."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-terracotta-500 px-7 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600 disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
      {status === "error" && (
        <p className="text-sm text-terracotta-600">
          Something went wrong on our end — please try again, or email us directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-wideish text-ink-500">
        {label}
        {required && <span className="text-terracotta-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        className="w-full rounded-lg border border-ink-300/30 bg-transparent px-4 py-3 text-ink-900 outline-none focus:border-terracotta-500"
      />
    </div>
  );
}
