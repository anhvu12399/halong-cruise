import Image from "next/image";
import Link from "next/link";
import { Guide } from "@/lib/types";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block overflow-hidden rounded-2xl border border-ink-300/15 bg-white shadow-card transition hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={guide.coverImage}
          alt={guide.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        {guide.region && (
          <span className="eyebrow absolute left-4 top-4 rounded-full bg-teal-950/70 px-3 py-1 text-brass-300">
            {guide.region}
          </span>
        )}
      </div>
      <div className="p-6">
        <p className="font-mono text-[11px] uppercase tracking-wideish text-ink-300">
          {guide.publishedAt} · {guide.readMinutes} min read
        </p>
        <h3 className="mt-2 font-display text-2xl italic text-ink-900">{guide.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-500">{guide.excerpt}</p>
      </div>
    </Link>
  );
}
