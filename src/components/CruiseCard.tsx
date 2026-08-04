import Image from "next/image";
import Link from "next/link";
import { Cruise } from "@/lib/types";

export default function CruiseCard({ cruise }: { cruise: Cruise }) {
  return (
    <Link
      href={`/cruises/${cruise.slug}`}
      className="group block overflow-hidden rounded-2xl bg-teal-950 shadow-card transition hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cruise.heroImage}
          alt={cruise.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/0 to-teal-950/0" />
        <span className="eyebrow absolute left-4 top-4 rounded-full bg-teal-950/70 px-3 py-1 text-brass-300">
          {cruise.region}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl italic text-sand-50">{cruise.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-sand-100/70">{cruise.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-teal-800/70 pt-4 font-mono text-xs uppercase tracking-wideish text-sand-100/60">
          <span>
            {cruise.durationDays} Days / {cruise.durationNights} Nights
          </span>
          <span className="text-brass-300">
            {cruise.startingPrice ? `From $${cruise.startingPrice}` : "Price on request"}
          </span>
        </div>
      </div>
    </Link>
  );
}
