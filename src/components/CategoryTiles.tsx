import Image from "next/image";
import Link from "next/link";

type Tile = { label: string; sub: string; href: string; seed: string; className?: string };

const GRID_TILES: Tile[] = [
  { label: "Luxury", sub: "Full-service ships, top cabins", href: "/cruises?tag=luxury", seed: "cat-luxury" },
  { label: "Deluxe", sub: "Comfortable, well-priced", href: "/cruises?tag=deluxe", seed: "cat-deluxe" },
  { label: "Budget", sub: "Simple, well-run, cheaper", href: "/cruises?tag=budget", seed: "cat-budget" },
  { label: "Newest", sub: "Launched in the last year", href: "/cruises?tag=newest", seed: "cat-newest" },
  { label: "Honeymoon", sub: "Quiet cabins, private decks", href: "/cruises?tag=honeymoon", seed: "cat-honeymoon" },
  { label: "Family", sub: "Space to spread out", href: "/cruises?tag=family", seed: "cat-family" },
];

const TALL_TILE: Tile = {
  label: "Best Cruises",
  sub: "Our highest-rated sailings",
  href: "/cruises?tag=best",
  seed: "cat-best",
};

const GROUP_TILE: Tile = {
  label: "Group",
  sub: "Charters & larger parties",
  href: "/cruises?tag=group",
  seed: "cat-group",
};

function TileCard({ tile, badge }: { tile: Tile; badge?: string }) {
  return (
    <Link href={tile.href} className={`group relative overflow-hidden rounded-2xl ${tile.className ?? ""}`}>
      <Image
        src={`https://picsum.photos/seed/${tile.seed}/700/700`}
        alt=""
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/85 via-teal-950/10 to-transparent transition group-hover:from-teal-950/95" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-xl italic text-sand-50 md:text-2xl">{tile.label}</p>
        <p className="mt-0.5 hidden font-mono text-[11px] uppercase tracking-wideish text-sand-100/70 md:block">
          {tile.sub}
        </p>
      </div>
      {badge && (
        <span className="eyebrow absolute right-4 top-4 rounded-full bg-terracotta-500 px-3 py-1 text-sand-50">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function CategoryTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[190px]">
      {GRID_TILES.map((tile) => (
        <TileCard key={tile.label} tile={tile} />
      ))}

      <TileCard
        tile={{ ...TALL_TILE, className: "col-span-2 md:col-start-4 md:row-start-1 md:row-span-2" }}
        badge="Editors' Picks"
      />

      <TileCard tile={{ ...GROUP_TILE, className: "col-span-2 md:col-span-1" }} />

      <Link
        href="/cruises"
        className="col-span-2 flex items-center justify-between rounded-2xl border border-brass-500/40 bg-teal-950 px-6 py-5 transition hover:border-brass-400 md:col-span-2"
      >
        <span className="font-mono text-xs uppercase tracking-wideish text-brass-300">
          Special deals — best offers
        </span>
        <span className="font-mono text-xs uppercase tracking-wideish text-sand-100/70">View all →</span>
      </Link>
    </div>
  );
}
