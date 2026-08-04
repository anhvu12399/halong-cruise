import { Cruise, ItineraryDay, Cabin, SocialArea } from "./types";
import { cruises as mockCruises, getCruiseBySlug as getMockBySlug } from "./mockData";

const WP_URL = process.env.WORDPRESS_URL?.replace(/\/$/, "");

/**
 * Every function here has a mock fallback, so the site runs and looks right
 * with zero WordPress setup. Once WORDPRESS_URL is set in .env.local (and the
 * companion plugin in /wordpress-plugin is installed & activated), these
 * functions transparently switch to live data — nothing in app/ changes.
 */

type WpMedia = {
  source_url?: string;
};

type WpCruisePost = {
  slug: string;
  acf: {
    tagline: string;
    region: string;
    breadcrumb_label: string;
    duration_days: number;
    duration_nights: number;
    guests_max: number;
    cabin_count: number;
    starting_price: number | "" | null;
    overview: string; // rich text, one paragraph per line
    life_on_board: string;
    highlights: string; // one per line
    tags: string; // one per line, e.g. "luxury\nbest\nfamily"
    gallery: { url: string }[];
    itinerary: {
      title: string;
      location: string;
      image?: { url: string };
      am?: string;
      pm?: string;
      eve?: string;
    }[];
    social_areas: { name: string; image?: { url: string } }[];
    cabins: {
      name: string;
      cabin_count: number;
      guests: string;
      size: string;
      beds: string;
      description: string;
      image?: { url: string };
    }[];
    features: string; // one per line
    equipment: string; // one per line
    deck_plan?: { url: string };
    related: { post_name: string }[];
  };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
};

function splitLines(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function mapWpCruise(post: WpCruisePost): Cruise {
  const a = post.acf;
  const itinerary: ItineraryDay[] = (a.itinerary ?? []).map((d, i) => ({
    day: i + 1,
    title: d.title,
    location: d.location,
    image: d.image?.url,
    blocks: [
      d.am ? { period: "AM" as const, text: d.am } : null,
      d.pm ? { period: "PM" as const, text: d.pm } : null,
      d.eve ? { period: "EVE" as const, text: d.eve } : null,
    ].filter((b): b is { period: "AM" | "PM" | "EVE"; text: string } => Boolean(b)),
  }));

  const cabins: Cabin[] = (a.cabins ?? []).map((c) => ({
    name: c.name,
    cabinCount: c.cabin_count,
    guests: c.guests,
    size: c.size,
    beds: c.beds,
    description: c.description,
    image: c.image?.url ?? "",
  }));

  const socialAreas: SocialArea[] = (a.social_areas ?? []).map((s) => ({
    name: s.name,
    image: s.image?.url ?? "",
  }));

  return {
    slug: post.slug,
    name: a.breadcrumb_label,
    tagline: a.tagline,
    region: a.region,
    breadcrumbLabel: a.breadcrumb_label,
    tags: splitLines(a.tags).map((t) => t.toLowerCase()),
    durationDays: a.duration_days,
    durationNights: a.duration_nights,
    guestsMax: a.guests_max,
    cabinCount: a.cabin_count,
    startingPrice: a.starting_price ? Number(a.starting_price) : null,
    heroImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
    galleryImages: (a.gallery ?? []).map((g) => g.url),
    overview: splitLines(a.overview),
    lifeOnBoard: splitLines(a.life_on_board),
    highlights: splitLines(a.highlights),
    itinerary,
    socialAreas,
    cabins,
    features: splitLines(a.features),
    equipment: splitLines(a.equipment),
    deckPlanImage: a.deck_plan?.url,
    relatedSlugs: (a.related ?? []).map((r) => r.post_name),
  };
}

export async function getAllCruises(): Promise<Cruise[]> {
  if (!WP_URL) return mockCruises;
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises?_embed&per_page=50`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts: WpCruisePost[] = await res.json();
    return posts.map(mapWpCruise);
  } catch (err) {
    console.error("[wp] falling back to mock cruise data:", err);
    return mockCruises;
  }
}

export async function getCruiseBySlug(slug: string): Promise<Cruise | undefined> {
  if (!WP_URL) return getMockBySlug(slug);
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises?_embed&slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts: WpCruisePost[] = await res.json();
    if (!posts.length) return undefined;
    return mapWpCruise(posts[0]);
  } catch (err) {
    console.error("[wp] falling back to mock cruise data:", err);
    return getMockBySlug(slug);
  }
}

export async function getRelatedCruises(cruise: Cruise): Promise<Cruise[]> {
  const all = await getAllCruises();
  return cruise.relatedSlugs
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is Cruise => Boolean(c));
}

export const isLive = Boolean(WP_URL);
