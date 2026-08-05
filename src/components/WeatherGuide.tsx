"use client";

import { useState } from "react";

type MonthData = {
  name: string;
  short: string;
  season: "peak" | "summer" | "shoulder";
  tempC: number;
  tempF: number;
  rainfallMm: number;
  waterVis: "High" | "Medium" | "Excellent";
  highlights: string;
};

const MONTHS: MonthData[] = [
  { name: "January", short: "Jan", season: "peak", tempC: 18, tempF: 64, rainfallMm: 25, waterVis: "High", highlights: "Cool, dry breeze with misty morning karsts. Perfect for light hiking & kayaking." },
  { name: "February", short: "Feb", season: "peak", tempC: 19, tempF: 66, rainfallMm: 28, waterVis: "High", highlights: "Spring festival atmosphere, mild temperatures, pleasant sundeck relaxation." },
  { name: "March", short: "Mar", season: "peak", tempC: 22, tempF: 72, rainfallMm: 35, waterVis: "Excellent", highlights: "Ideal sailing weather. Clear skies, blue water, comfortable humidity." },
  { name: "April", short: "Apr", season: "peak", tempC: 25, tempF: 77, rainfallMm: 50, waterVis: "Excellent", highlights: "Sunny skies & warm waters. Great for swimming, kayaking & cave exploration." },
  { name: "May", short: "May", season: "shoulder", tempC: 28, tempF: 82, rainfallMm: 110, waterVis: "Excellent", highlights: "Early summer warmth. Long sunshine hours & vibrant emerald waters." },
  { name: "June", short: "Jun", season: "summer", tempC: 30, tempF: 86, rainfallMm: 180, waterVis: "High", highlights: "Summer sunshine & warm sea swimming. Promotional luxury cruise rates." },
  { name: "July", short: "Jul", season: "summer", tempC: 31, tempF: 88, rainfallMm: 210, waterVis: "Medium", highlights: "Tropical summer vibes. Warmest sea waters for swimming & night squid fishing." },
  { name: "August", short: "Aug", season: "summer", tempC: 30, tempF: 86, rainfallMm: 240, waterVis: "Medium", highlights: "Dramatic sunset skies. Excellent indoor spa & air-conditioned lounge luxury." },
  { name: "September", short: "Sep", season: "shoulder", tempC: 28, tempF: 82, rainfallMm: 160, waterVis: "High", highlights: "Autumn transition. Crisp air returns, clear horizon views for photography." },
  { name: "October", short: "Oct", season: "peak", tempC: 26, tempF: 79, rainfallMm: 80, waterVis: "Excellent", highlights: "Prime autumn sailing! Bright sunshine, dry air & golden sunsets." },
  { name: "November", short: "Nov", season: "peak", tempC: 22, tempF: 72, rainfallMm: 40, waterVis: "Excellent", highlights: "Comfortable cool temperatures. Ideal for kayaking through dark & light caves." },
  { name: "December", short: "Dec", season: "peak", tempC: 19, tempF: 66, rainfallMm: 22, waterVis: "High", highlights: "Festive holiday season. Christmas & New Year gala dinners on the bay." },
];

export default function WeatherGuide() {
  const [selectedIdx, setSelectedIdx] = useState<number>(3); // April default

  const current = MONTHS[selectedIdx];

  return (
    <div className="rounded-3xl border border-ink-300/20 bg-sand-50 p-6 md:p-10">
      <div className="mb-8">
        <span className="eyebrow text-terracotta-600">Seasonality &amp; Climate</span>
        <h3 className="mt-2 font-display text-3xl italic text-ink-900 md:text-4xl">
          Best Time to Cruise Ha Long Bay
        </h3>
        <p className="mt-2 max-w-2xl text-ink-700">
          Ha Long Bay is a year-round destination with two distinct main seasons: Peak Season (Oct – Apr) for dry, crisp air, and Summer (May – Sep) for warm waters &amp; vibrant sunsets.
        </p>
      </div>

      {/* Month selector tabs */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl bg-sand-100/80 p-2">
        {MONTHS.map((m, idx) => (
          <button
            key={m.name}
            onClick={() => setSelectedIdx(idx)}
            className={`flex-1 min-w-[56px] rounded-xl py-2.5 font-mono text-xs uppercase transition ${
              idx === selectedIdx
                ? "bg-teal-950 text-sand-50 shadow-md font-semibold"
                : "text-ink-700 hover:bg-sand-200/60"
            }`}
          >
            {m.short}
          </button>
        ))}
      </div>

      {/* Selected month detail card */}
      <div className="grid gap-8 rounded-2xl border border-brass-500/30 bg-teal-950 p-6 text-sand-50 md:grid-cols-[1fr,1.4fr] md:p-8">
        <div>
          <div className="flex items-center gap-3">
            <h4 className="font-display text-4xl italic text-brass-300">{current.name}</h4>
            <span
              className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wideish ${
                current.season === "peak"
                  ? "bg-terracotta-500 text-sand-50"
                  : current.season === "shoulder"
                  ? "bg-brass-500 text-teal-950"
                  : "bg-teal-700 text-sand-50"
              }`}
            >
              {current.season === "peak" ? "Peak Season" : current.season === "shoulder" ? "Shoulder Season" : "Summer Season"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-teal-800/80 pt-6">
            <div>
              <span className="block font-mono text-xs uppercase tracking-wideish text-sand-100/60">Avg Temp</span>
              <span className="font-display text-2xl text-sand-50">
                {current.tempC}°C <span className="text-sm text-sand-100/50">({current.tempF}°F)</span>
              </span>
            </div>
            <div>
              <span className="block font-mono text-xs uppercase tracking-wideish text-sand-100/60">Avg Rainfall</span>
              <span className="font-display text-2xl text-sand-50">{current.rainfallMm} mm</span>
            </div>
            <div className="col-span-2 border-t border-teal-800/50 pt-4">
              <span className="block font-mono text-xs uppercase tracking-wideish text-sand-100/60">Water Visibility</span>
              <span className="font-mono text-sm text-brass-300">{current.waterVis}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-teal-800/80 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <div>
            <span className="eyebrow text-brass-300">Monthly Highlights</span>
            <p className="mt-3 text-lg leading-relaxed text-sand-100/90">{current.highlights}</p>
          </div>

          <div className="mt-6 rounded-xl bg-teal-900/60 p-4 border border-teal-800/60">
            <p className="font-mono text-xs text-sand-100/70">
              💡 <strong>Travel Tip:</strong> Spring (Mar-Apr) and Autumn (Oct-Nov) offer the absolute best conditions for kayaking, photography, and sundeck dining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
