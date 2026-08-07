"use client";

import { useState } from "react";
import Image from "next/image";
import { ItineraryDay } from "@/lib/types";

interface CruiseItineraryProps {
  programs: { id: string; name: string; days: ItineraryDay[] }[];
}

export default function CruiseItinerary({ programs }: CruiseItineraryProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!programs || programs.length === 0) return null;

  const activeProgram = programs[activeTab];

  return (
    <div className="w-full">
      {/* Tabs Row */}
      {programs.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2 border-b border-ink-300/20 pb-4">
          {programs.map((program, idx) => (
            <button
              key={program.id}
              onClick={() => setActiveTab(idx)}
              className={`rounded-full px-6 py-2.5 font-mono text-xs uppercase tracking-wideish transition ${
                activeTab === idx
                  ? "bg-terracotta-500 text-sand-50"
                  : "bg-transparent text-sand-100 hover:bg-teal-800"
              }`}
            >
              {program.name}
            </button>
          ))}
        </div>
      )}

      {/* Program Content */}
      <div className="mb-14 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wideish">
        <span className="text-sand-100/50">Day:</span>
        {activeProgram.days.map((d) => (
          <a
            key={d.day}
            href={`#day-${d.day}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-brass-500/50 text-brass-300 transition hover:bg-brass-500 hover:text-teal-950"
          >
            {d.day}
          </a>
        ))}
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-[repeating-linear-gradient(180deg,theme(colors.brass.500)_0,theme(colors.brass.500)_6px,transparent_6px,transparent_14px)] md:block"
        />
        <ol className="space-y-16">
          {activeProgram.days.map((day) => (
            <li key={day.day} id={`day-${day.day}`} className="relative grid scroll-mt-40 gap-8 md:grid-cols-[56px,1fr,1.1fr] md:gap-10">
              <div className="hidden md:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brass-500 bg-teal-950 font-mono text-sm text-brass-300">
                  {String(day.day).padStart(2, "0")}
                </div>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wideish text-brass-300 md:hidden">
                  Day {String(day.day).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-2xl italic text-sand-50">{day.title}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wideish text-sand-100/50">{day.location}</p>
                <div className="mt-6 space-y-4">
                  {day.blocks.map((b, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-10 shrink-0 font-mono text-xs text-brass-400">{b.period}</span>
                      <p className="text-sand-100/80">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {day.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto">
                  <Image src={day.image} alt={day.title} fill className="object-cover" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
