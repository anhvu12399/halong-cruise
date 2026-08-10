import { NextRequest, NextResponse } from "next/server";
import { getAllCruises } from "@/lib/wp";
import { Cruise } from "@/lib/types";

function matches(cruise: Cruise, q: string): boolean {
  const haystack = [
    cruise.name,
    cruise.tagline,
    cruise.region,
    cruise.breadcrumbLabel,
    ...cruise.tags,
    ...cruise.highlights,
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 5);

  const all = await getAllCruises();
  const results = q ? all.filter((c) => matches(c, q)) : all;

  return NextResponse.json({
    query: q,
    total: results.length,
    results: results.slice(0, limit).map((c) => ({
      slug: c.slug,
      name: c.name,
      region: c.region,
      tagline: c.tagline,
      heroImage: c.heroImage,
      durationDays: c.durationDays,
      startingPrice: c.startingPrice,
    })),
  });
}
