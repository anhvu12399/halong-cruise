import Link from "next/link";
import { getAllCruises, getFrontendPage } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";
import FrontendCmsPage from "@/components/FrontendCmsPage";

export const metadata = { title: "All Cruises" };

const REGION_FILTERS = ["Ha Long Bay", "Lan Ha Bay", "Bai Tu Long Bay"];

const TAG_LABELS: Record<string, string> = {
  luxury: "Luxury",
  deluxe: "Deluxe",
  budget: "Budget",
  newest: "Newest",
  best: "Best Cruises",
  honeymoon: "Honeymoon",
  family: "Family",
  group: "Group",
};

export default async function CruisesPage({
  searchParams,
}: {
  searchParams: { region?: string; days?: string; tag?: string; q?: string };
}) {
  const cmsPage = await getFrontendPage("/cruises");
  if (cmsPage && !searchParams.q && !searchParams.region && !searchParams.days && !searchParams.tag) {
    return <FrontendCmsPage page={cmsPage} />;
  }
  const cruises = await getAllCruises();
  const q = searchParams.q?.trim().toLowerCase();

  const filtered = cruises.filter((c) => {
    const regionMatch = searchParams.region ? c.region.includes(searchParams.region) : true;
    const daysMatch = searchParams.days ? c.durationDays >= Number(searchParams.days) : true;
    const tagMatch = searchParams.tag ? c.tags.includes(searchParams.tag) : true;
    const qMatch = q
      ? [c.name, c.tagline, c.region, c.breadcrumbLabel, ...c.tags, ...c.highlights]
          .join(" ")
          .toLowerCase()
          .includes(q)
      : true;
    return regionMatch && daysMatch && tagMatch && qMatch;
  });

  return (
    <div className="bg-sand-50">
      <div className="chart-grid bg-gradient-to-b from-[#0D2644] via-[#0A1D33] to-[#081524] py-20 text-sand-100 border-b border-brass-500/20">
        <div className="container-content">
          <p className="eyebrow mb-3">
            Home / Cruises
            {searchParams.tag ? ` / ${TAG_LABELS[searchParams.tag] ?? searchParams.tag}` : ""}
            {searchParams.q ? ` / "${searchParams.q}"` : ""}
          </p>
          <h1 className="max-w-2xl font-display text-5xl text-sand-50">
            {searchParams.q
              ? `Results for "${searchParams.q}"`
              : searchParams.tag
              ? TAG_LABELS[searchParams.tag] ?? "All sailings"
              : "All sailings"}
          </h1>
          <p className="mt-4 max-w-xl text-sand-100/70">
            {filtered.length} of {cruises.length} small-ship cruises across Ha Long, Lan Ha and Bai Tu
            Long Bay match this search — adjust the filters below to widen it.
          </p>
          {(searchParams.tag || searchParams.q || searchParams.region) && (
            <Link
              href="/cruises"
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wideish text-brass-300 hover:text-brass-200"
            >
              Clear filters ×
            </Link>
          )}
        </div>
      </div>

      <div className="container-content py-14">
        <div className="mb-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wideish">
          <Link
            href="/cruises"
            className={`rounded-full border px-4 py-2 transition ${
              !searchParams.region
                ? "border-terracotta-500 bg-terracotta-500 text-sand-50"
                : "border-ink-300 text-ink-500 hover:border-terracotta-500 hover:text-terracotta-600"
            }`}
          >
            All regions
          </Link>
          {REGION_FILTERS.map((r) => (
            <Link
              key={r}
              href={`/cruises?region=${encodeURIComponent(r)}`}
              className={`rounded-full border px-4 py-2 transition ${
                searchParams.region === r
                  ? "border-terracotta-500 bg-terracotta-500 text-sand-50"
                  : "border-ink-300 text-ink-500 hover:border-terracotta-500 hover:text-terracotta-600"
              }`}
            >
              {r}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-ink-500">No sailings match that filter yet. Try All regions.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cruise) => (
              <CruiseCard key={cruise.slug} cruise={cruise} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
