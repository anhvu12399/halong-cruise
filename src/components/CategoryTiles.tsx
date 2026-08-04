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

const BOOKING_TILES: Record<string, string> = {
  "cat-luxury": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o=",
  "cat-deluxe": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o=",
  "cat-budget": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o=",
  "cat-newest": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o=",
  "cat-honeymoon": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/411409062.webp?k=dd0f7b9297bb345b5350265a4466db99778914c17805d5a46a25ab5db2f8df33&o=",
  "cat-family": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o=",
  "cat-best": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/695679661.webp?k=916cf4caa19f160df7cf7e259a58c22f09bc4afb464e07e9c65ab1a9fe051eea&o=",
  "cat-group": "https://cf.bstatic.com/xdata/images/hotel/max1280x900/540224451.webp?k=9275ad9f8fdad3bc9867f4f78fce11784317bb543b6539c8255cb7f4bd1ff16d&o="
};

function TileCard({ tile, badge }: { tile: Tile; badge?: string }) {
  const imgSrc = BOOKING_TILES[tile.seed] || BOOKING_TILES["cat-luxury"];
  return (
    <Link href={tile.href} className={`group relative overflow-hidden rounded-2xl ${tile.className ?? ""}`}>
      <Image
        src={imgSrc}
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
