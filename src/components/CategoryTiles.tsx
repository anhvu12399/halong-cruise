import Image from "next/image";
import Link from "next/link";

type Tile = { label: string; subtitle: string; href: string; image: string; badge?: string; className?: string };

function StyleTile({ tile }: { tile: Tile }) {
  return (
    <Link
      href={tile.href}
      data-track="category_click"
      data-category={tile.label.toLowerCase().replace(/\s+/g, "-")}
      className={`group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-52 ${tile.className ?? ""}`}
    >
      <Image
        src={tile.image}
        alt={tile.label + " cruises"}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent transition group-hover:from-teal-950" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-xl italic text-sand-50">{tile.label}</p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wideish text-sand-100/70">{tile.subtitle}</p>
      </div>
      {tile.badge && (
        <span className="absolute right-3 top-3 rounded-full bg-terracotta-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wideish text-sand-50">
          {tile.badge}
        </span>
      )}
    </Link>
  );
}

export default function CategoryTiles({ data }: { data?: any[] }) {
  const tiles = data && data.length > 0 ? data : [];
  
  if (!tiles.length) return null;

  return (
    <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 md:grid-rows-2">
      {tiles.slice(0, 1).map((t, i) => (
        <StyleTile key={i} tile={{ ...t, className: "col-span-2 row-span-2 md:h-auto aspect-square md:aspect-auto" }} />
      ))}
      
      {tiles.slice(1, 3).map((t, i) => (
        <StyleTile key={i} tile={{ ...t, className: "col-span-2 md:col-span-1" }} />
      ))}
      
      {tiles.slice(3, 7).map((t, i) => (
        <StyleTile key={i} tile={t} />
      ))}
      <Link
        href="/cruises"
        data-track="category_click"
        data-category="all-cruises"
        className="col-span-1 flex items-center justify-between rounded-2xl border border-brass-500/40 bg-teal-950 px-5 py-4 transition hover:border-brass-400 md:col-span-3"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-300">All ships</p>
          <p className="mt-0.5 font-display text-lg italic text-sand-50">Browse the full fleet →</p>
        </div>
        <span className="hidden rounded-full border border-brass-500/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wideish text-brass-300 md:block">
          Filter &amp; compare
        </span>
      </Link>
    </div>
  );
}
