import Image from "next/image";
import Link from "next/link";
import { Cruise } from "@/lib/types";

const STYLE_TAGS: Record<string, string> = {
  luxury: "bg-brass-400/20 text-brass-700",
  deluxe: "bg-teal-800/20 text-teal-700",
  "best-value": "bg-green-100 text-green-800",
  family: "bg-orange-100 text-orange-700",
  couples: "bg-pink-100 text-pink-700",
  honeymoon: "bg-pink-100 text-pink-700",
  group: "bg-purple-100 text-purple-700",
  "small-ship": "bg-blue-100 text-blue-700",
};

export default function CruiseCard({ cruise }: { cruise: Cruise }) {
  const displayTags = cruise.tags.slice(0, 3);
  const durationLabel =
    cruise.durationNights === 0
      ? "Day Trip"
      : `${cruise.durationDays}D${cruise.durationNights}N`;

  return (
    <Link
      href={`/cruises/${cruise.slug}`}
      data-track="cruise_card_click"
      data-cruise={cruise.slug}
      className="group block overflow-hidden rounded-2xl bg-teal-950 shadow-card transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cruise.heroImage}
          alt={cruise.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/0 to-teal-950/0" />

        {/* Region badge */}
        <span className="eyebrow absolute left-3 top-3 rounded-full bg-teal-950/75 px-3 py-1 text-brass-300 backdrop-blur-sm">
          {cruise.region}
        </span>

        {/* Duration badge */}
        <span className="absolute right-3 top-3 rounded-full bg-terracotta-500/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wideish text-sand-50 backdrop-blur-sm">
          {durationLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl italic leading-tight text-sand-50 group-hover:text-brass-300 transition">
          {cruise.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs text-sand-100/60">{cruise.tagline}</p>

        {/* Quick-filter tags */}
        {displayTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                  STYLE_TAGS[tag] ?? "bg-teal-800/30 text-sand-100/60"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA row */}
        <div className="mt-4 flex items-center justify-between border-t border-teal-800/60 pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wideish text-sand-100/50">From</p>
            <p className="font-semibold text-brass-300 text-lg">
              {cruise.startingPrice ? `$${cruise.startingPrice}` : "On request"}
            </p>
          </div>
          <span className="rounded-full bg-terracotta-500 px-4 py-2 font-mono text-[10px] uppercase tracking-wideish text-sand-50 transition group-hover:bg-terracotta-600">
            View Cruise →
          </span>
        </div>
      </div>
    </Link>
  );
}
