"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Suggestion = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  heroImage: string;
  durationDays: number;
  startingPrice: number | null;
};

const REGIONS = ["Any region", "Ha Long Bay", "Lan Ha Bay", "Bai Tu Long Bay"];

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`);
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [q]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goToListing() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (region !== "Any region") params.set("region", region);
    router.push(`/cruises?${params.toString()}`);
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-2xl">
      <div className="flex flex-col gap-2 rounded-2xl border border-sand-100/20 bg-teal-950/80 p-2 backdrop-blur md:flex-row md:items-center md:gap-0 md:rounded-full">
        <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
          <svg className="h-4 w-4 shrink-0 text-brass-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && goToListing()}
            type="text"
            placeholder="Search a ship, bay, or trip type…"
            className="w-full bg-transparent text-sm text-sand-50 placeholder:text-sand-100/50 outline-none"
          />
        </div>

        <div className="hidden h-8 w-px bg-sand-100/15 md:block" />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border-t border-sand-100/15 bg-transparent px-4 py-2.5 font-mono text-xs uppercase tracking-wideish text-sand-100/80 outline-none md:border-t-0"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r} className="text-ink-900">
              {r}
            </option>
          ))}
        </select>

        <button
          onClick={goToListing}
          className="m-0.5 shrink-0 rounded-full bg-terracotta-500 px-6 py-2.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
        >
          Search
        </button>
      </div>

      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-ink-300/15 bg-white shadow-card">
          {loading && <p className="p-4 text-sm text-ink-500">Searching…</p>}

          {!loading && results.length === 0 && (
            <p className="p-4 text-sm text-ink-500">No ships match "{q}" yet — try a bay name or "budget", "honeymoon"…</p>
          )}

          {!loading &&
            results.map((r) => (
              <a
                key={r.slug}
                href={`/cruises/${r.slug}`}
                className="flex items-center gap-3 border-b border-ink-300/10 p-3 transition last:border-0 hover:bg-sand-100/50"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={r.heroImage} alt={r.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg italic text-ink-900">{r.name}</p>
                  <p className="truncate font-mono text-[11px] uppercase tracking-wideish text-ink-400">
                    {r.region} · {r.durationDays} Days
                  </p>
                </div>
              </a>
            ))}

          {!loading && results.length > 0 && (
            <button
              onClick={goToListing}
              className="block w-full bg-sand-100/50 p-3 text-center font-mono text-xs uppercase tracking-wideish text-terracotta-600 hover:bg-sand-100"
            >
              See all results for "{q}" →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
