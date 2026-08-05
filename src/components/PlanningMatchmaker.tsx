"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cruise } from "@/lib/types";

type PlanningMatchmakerProps = {
  allCruises: Cruise[];
};

export default function PlanningMatchmaker({ allCruises }: PlanningMatchmakerProps) {
  const [vibe, setVibe] = useState<string>("all");
  const [duration, setDuration] = useState<number | "all">("all");
  const [region, setRegion] = useState<string>("all");

  const filtered = allCruises.filter((c) => {
    if (vibe !== "all" && !c.tags.includes(vibe)) return false;
    if (duration !== "all") {
      if (duration === 1 && c.durationDays !== 1) return false;
      if (duration === 2 && c.durationDays !== 2) return false;
      if (duration === 3 && c.durationDays < 3) return false;
    }
    if (region !== "all" && !c.region.toLowerCase().includes(region.toLowerCase())) return false;
    return true;
  });

  const displayCruises = filtered.slice(0, 4);

  return (
    <div className="rounded-3xl border border-brass-500/30 bg-teal-900/60 p-6 backdrop-blur md:p-10">
      <div className="mb-8 text-center md:text-left">
        <span className="eyebrow text-brass-300">Interactive Matchmaker</span>
        <h3 className="mt-2 font-display text-3xl italic text-sand-50 md:text-4xl">
          Find Your Perfect Ha Long Sailing
        </h3>
        <p className="mt-2 max-w-xl text-sm text-sand-100/70">
          Answer a few quick preferences to instantly filter from our handpicked fleet of 64 luxury vessels.
        </p>
      </div>

      {/* Filter controls */}
      <div className="grid gap-6 rounded-2xl bg-teal-950/80 p-6 md:grid-cols-3">
        {/* Vibe */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wideish text-sand-100/60">
            Travel Style &amp; Vibe
          </label>
          <select
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            className="w-full rounded-xl border border-teal-700/80 bg-teal-900 px-4 py-3 font-sans text-sm text-sand-50 focus:border-brass-400 focus:outline-none"
          >
            <option value="all">All Travel Styles</option>
            <option value="luxury">Ultra Luxury &amp; 5-Star</option>
            <option value="honeymoon">Honeymoon &amp; Couples</option>
            <option value="best">Best Seller &amp; Award-winning</option>
            <option value="newest">Newly Launched Ships</option>
            <option value="budget">Day Cruises &amp; Express</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wideish text-sand-100/60">
            Trip Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="w-full rounded-xl border border-teal-700/80 bg-teal-900 px-4 py-3 font-sans text-sm text-sand-50 focus:border-brass-400 focus:outline-none"
          >
            <option value="all">Any Duration</option>
            <option value="2">2 Days / 1 Night (Classic)</option>
            <option value="3">3 Days / 2 Nights (Immersive)</option>
            <option value="1">1 Day Cruise (Express)</option>
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-wideish text-sand-100/60">
            Bay Area
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-xl border border-teal-700/80 bg-teal-900 px-4 py-3 font-sans text-sm text-sand-50 focus:border-brass-400 focus:outline-none"
          >
            <option value="all">All Bay Regions</option>
            <option value="lan ha">Lan Ha Bay (Pristine &amp; Quiet)</option>
            <option value="ha long">Ha Long Bay (Classic Karsts)</option>
            <option value="bai tu long">Bai Tu Long Bay (Uncrowded)</option>
          </select>
        </div>
      </div>

      {/* Matches summary */}
      <div className="mt-8 flex items-center justify-between border-b border-teal-800/80 pb-4">
        <p className="font-mono text-xs uppercase tracking-wideish text-brass-300">
          Matched Vessels ({filtered.length} available)
        </p>
        {filtered.length > 4 && (
          <Link
            href={`/cruises?${vibe !== "all" ? `vibe=${vibe}&` : ""}${duration !== "all" ? `days=${duration}&` : ""}${region !== "all" ? `region=${region}` : ""}`}
            className="font-mono text-xs uppercase tracking-wideish text-sand-100/80 underline decoration-brass-400 underline-offset-4 hover:text-brass-300"
          >
            View all {filtered.length} matches →
          </Link>
        )}
      </div>

      {/* Grid of matched cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayCruises.map((c) => (
          <div
            key={c.slug}
            className="group flex flex-col justify-between rounded-2xl border border-teal-800/60 bg-teal-950 p-4 transition duration-300 hover:border-brass-500/50 hover:shadow-xl"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={c.heroImage}
                  alt={c.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-teal-950/80 px-2.5 py-1 font-mono text-[10px] uppercase text-brass-300 backdrop-blur">
                  {c.durationDays}D / {c.durationNights}N
                </span>
              </div>
              <h4 className="mt-3 font-display text-lg italic text-sand-50 group-hover:text-brass-300">
                {c.name}
              </h4>
              <p className="mt-1 line-clamp-2 text-xs text-sand-100/70">{c.tagline}</p>
            </div>

            <div className="mt-4 border-t border-teal-800/50 pt-3 flex items-center justify-between">
              <div>
                <span className="block font-mono text-[10px] uppercase text-sand-100/50">From</span>
                <span className="font-mono text-sm font-semibold text-terracotta-400">
                  {c.startingPrice ? `$${c.startingPrice}` : "On request"}
                </span>
              </div>
              <Link
                href={`/cruises/${c.slug}`}
                className="rounded-full border border-brass-400/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wideish text-brass-300 transition hover:bg-brass-400 hover:text-teal-950"
              >
                View Ship
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
