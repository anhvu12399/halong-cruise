import { Cruise, ItineraryDay, Cabin, SocialArea, Guide, FrontendPage } from "./types";
import { cruises as mockCruises, getCruiseBySlug as getMockBySlug } from "./mockData";
import { guides as mockGuides, getGuideBySlug as getMockGuideBySlug } from "./mockGuides";
import { getMockFrontendPage } from "./mockFrontendPages";

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
    hero_image?: any;
    hero_image_url?: string;
    external_gallery?: any[];
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
  const a = post.acf || {};
  const cruiseName = a.breadcrumb_label || (post as any).title?.rendered || post.slug;
  const mockFallback = getMockBySlug(post.slug) || mockCruises.find((m: any) => m.name.toLowerCase() === cruiseName.toLowerCase());

  const heroImage = (a as any).hero_image_url || (typeof a.hero_image === "string" ? a.hero_image : (a.hero_image as any)?.url) || mockFallback?.heroImage || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || (a.gallery?.[0]?.url ?? "");

  const extGalleryUrls = ((a as any).external_gallery ?? []).map((e: any) => (typeof e === "string" ? e : e?.image_url || e?.url)).filter(Boolean);
  const acfGalleryUrls = (a.gallery ?? []).map((g: any) => (typeof g === "string" ? g : g?.url || g?.image_url)).filter(Boolean);
  const galleryImages = extGalleryUrls.length > 0 
    ? extGalleryUrls 
    : (acfGalleryUrls.length > 0 ? acfGalleryUrls : (mockFallback?.galleryImages && mockFallback.galleryImages.length > 0 ? mockFallback.galleryImages : [heroImage].filter(Boolean)));

  const itinerary: ItineraryDay[] = (a.itinerary ?? []).map((d, i) => ({
    day: i + 1,
    title: d.title || `Day ${i + 1}`,
    location: d.location || "Ha Long Bay",
    image: d.image?.url || galleryImages[i % galleryImages.length] || "",
    blocks: [
      d.am ? { period: "AM" as const, text: d.am } : null,
      d.pm ? { period: "PM" as const, text: d.pm } : null,
      d.eve ? { period: "EVE" as const, text: d.eve } : null,
    ].filter((b): b is { period: "AM" | "PM" | "EVE"; text: string } => Boolean(b)),
  }));

  const parsedCabins: Cabin[] = (a.cabins ?? []).map((c: any, i: number) => {
    const rawImage = typeof c.image === "string" ? c.image : (c.image?.url || c.image_url || "");
    const rawGallery = Array.isArray(c.gallery_images)
      ? c.gallery_images.map((g: any) => (typeof g === "string" ? g : (g?.url || g?.image_url || "")))
      : (Array.isArray(c.gallery) ? c.gallery.map((g: any) => (typeof g === "string" ? g : g?.url)) : []);

    let validGallery = rawGallery.filter(Boolean);
    if (validGallery.length === 0 && rawImage) {
      validGallery = [rawImage];
    }

    const fallbackCabin = mockFallback?.cabins?.[i] || mockFallback?.cabins?.[0];
    if (validGallery.length === 0) {
      if (fallbackCabin?.galleryImages && fallbackCabin.galleryImages.length > 0) {
        validGallery = fallbackCabin.galleryImages;
      } else if (fallbackCabin?.image) {
        validGallery = [fallbackCabin.image];
      } else if (galleryImages.length > 0) {
        validGallery = [galleryImages[i % galleryImages.length]];
      }
    }

    const finalImage = rawImage || validGallery[0] || fallbackCabin?.image || heroImage || "";

    return {
      name: c.name || fallbackCabin?.name || "Suite Cabin",
      cabinCount: c.cabin_count || fallbackCabin?.cabinCount || 10,
      guests: c.guests || fallbackCabin?.guests || "2–3",
      size: c.size || fallbackCabin?.size || "28 m²",
      beds: c.beds || fallbackCabin?.beds || "Double/Twin",
      description: c.description || fallbackCabin?.description || "Luxury oceanview suite with private balcony.",
      image: finalImage,
      galleryImages: validGallery,
    };
  });

  const finalCabins = parsedCabins.length > 0 ? parsedCabins : (mockFallback?.cabins || []);

  const socialAreas: SocialArea[] = (a.social_areas ?? []).map((s: any, i: number) => ({
    name: s.name || mockFallback?.socialAreas?.[i]?.name || "Social Area",
    image: typeof s.image === "string" ? s.image : (s.image?.url || mockFallback?.socialAreas?.[i]?.image || heroImage),
  }));

  const finalSocialAreas = socialAreas.length > 0 ? socialAreas : (mockFallback?.socialAreas || []);

  return {
    slug: post.slug,
    name: a.breadcrumb_label || mockFallback?.name || cruiseName,
    tagline: a.tagline || mockFallback?.tagline || `Luxury small-ship sailing aboard ${cruiseName}.`,
    region: a.region || mockFallback?.region || "Ha Long Bay",
    breadcrumbLabel: a.breadcrumb_label || mockFallback?.breadcrumbLabel || cruiseName,
    tags: splitLines(a.tags).length > 0 ? splitLines(a.tags).map((t) => t.toLowerCase()) : (mockFallback?.tags || ["luxury"]),
    durationDays: a.duration_days || mockFallback?.durationDays || 2,
    durationNights: a.duration_nights || mockFallback?.durationNights || 1,
    guestsMax: a.guests_max || mockFallback?.guestsMax || 48,
    cabinCount: a.cabin_count || mockFallback?.cabinCount || 20,
    startingPrice: a.starting_price ? Number(a.starting_price) : (mockFallback?.startingPrice || 150),
    heroImage,
    galleryImages,
    overview: splitLines(a.overview).length > 0 ? splitLines(a.overview) : (mockFallback?.overview || []),
    lifeOnBoard: splitLines(a.life_on_board).length > 0 ? splitLines(a.life_on_board) : (mockFallback?.lifeOnBoard || []),
    highlights: splitLines(a.highlights).length > 0 ? splitLines(a.highlights) : (mockFallback?.highlights || []),
    itinerary: itinerary.length > 0 ? itinerary : (mockFallback?.itinerary || []),
    socialAreas: finalSocialAreas,
    cabins: finalCabins,
    features: splitLines(a.features).length > 0 ? splitLines(a.features) : (mockFallback?.features || []),
    equipment: splitLines(a.equipment).length > 0 ? splitLines(a.equipment) : (mockFallback?.equipment || []),
    deckPlanImage: typeof a.deck_plan === "string" ? a.deck_plan : a.deck_plan?.url,
    relatedSlugs: (a.related ?? []).map((r) => r.post_name).length > 0 ? (a.related ?? []).map((r) => r.post_name) : (mockFallback?.relatedSlugs || []),
  };
}

export async function getAllCruises(): Promise<Cruise[]> {
  if (!WP_URL) return mockCruises;
  try {
    let allPosts: WpCruisePost[] = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      let res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises?_embed&per_page=100&page=${page}`, {
        next: { revalidate: 300 },
      });

      if (!res.ok) {
        res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises-vietnam?_embed&per_page=100&page=${page}`, {
          next: { revalidate: 300 },
        });
      }

      if (!res.ok) break;

      const totalPagesHeader = res.headers.get("X-WP-TotalPages");
      if (totalPagesHeader) {
        totalPages = parseInt(totalPagesHeader, 10) || 1;
      }

      const posts: WpCruisePost[] = await res.json();
      if (!Array.isArray(posts) || posts.length === 0) break;

      allPosts = allPosts.concat(posts);
      page++;
    }

    const cruiseMap = new Map<string, Cruise>();
    // First populate with all 94 mock cruises
    mockCruises.forEach((c) => cruiseMap.set(c.slug, c));

    // Merge with live WP cruises
    if (allPosts.length > 0) {
      allPosts.forEach((post) => {
        const mapped = mapWpCruise(post);
        const existing = cruiseMap.get(mapped.slug);
        cruiseMap.set(mapped.slug, existing ? { ...existing, ...mapped } : mapped);
      });
    }

    return Array.from(cruiseMap.values());
  } catch (err) {
    console.error("[wp] falling back to mock cruise data:", err);
    return mockCruises;
  }
}

export async function getCruiseBySlug(slug: string): Promise<Cruise | undefined> {
  const mockFallback = getMockBySlug(slug);
  if (!WP_URL) return mockFallback;
  try {
    let res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises?_embed&slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises-vietnam?_embed&slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 300 },
      });
    }

    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts: WpCruisePost[] = await res.json();
    if (!Array.isArray(posts) || !posts.length) return mockFallback;
    const mapped = mapWpCruise(posts[0]);
    return mockFallback ? { ...mockFallback, ...mapped } : mapped;
  } catch (err) {
    console.error("[wp] falling back to mock cruise data:", err);
    return mockFallback;
  }
}

export async function getRelatedCruises(cruise: Cruise): Promise<Cruise[]> {
  const all = await getAllCruises();
  return cruise.relatedSlugs
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is Cruise => Boolean(c));
}

export const isLive = Boolean(WP_URL);

/* ------------------------------------------------------------------ */
/* Guides — same live/mock pattern as cruises above.                  */
/* ------------------------------------------------------------------ */

type WpGuidePost = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  date: string;
  acf?: {
    excerpt?: string;
    cover_image_url?: string;
    region?: string;
    read_minutes?: number;
    related?: { post_name: string }[];
  };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
};

function formatWpDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function extractFirstImageFromHtml(html: string): string {
  if (!html) return "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : "";
}

function mapWpGuide(post: WpGuidePost): Guide {
  const acfExcerpt = post.acf?.excerpt;
  const rawExcerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]+>/g, "").trim() : "";
  const finalExcerpt = acfExcerpt || rawExcerpt || "Practical travel notes and guides for Ha Long Bay sailings.";

  const coverFromAcf = post.acf?.cover_image_url;
  const coverFromMedia = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const coverFromContent = extractFirstImageFromHtml(post.content.rendered);
  const fallbackCover = "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.jpg?k=211297536d21da0f27b9567678c717d3603a4d909e41167d9b6503efd4bc55f8&o=&hp=1";

  const coverImage = coverFromAcf || coverFromMedia || coverFromContent || fallbackCover;

  return {
    slug: post.slug,
    title: post.title?.rendered ? post.title.rendered.replace(/&#8211;|&#8212;/g, "—") : post.slug,
    excerpt: finalExcerpt,
    coverImage,
    region: post.acf?.region || "Ha Long Bay",
    readMinutes: post.acf?.read_minutes ?? 5,
    publishedAt: formatWpDate(post.date),
    bodyHtml: post.content.rendered,
    relatedCruiseSlugs: (post.acf?.related ?? []).map((r) => r.post_name),
  };
}

export async function getAllGuides(): Promise<Guide[]> {
  if (!WP_URL) return mockGuides;
  try {
    let posts: WpGuidePost[] = [];

    // 1. Try /wp-json/wp/v2/guides
    let res = await fetch(`${WP_URL}/wp-json/wp/v2/guides?_embed&per_page=100`, {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      posts = await res.json();
    }

    // 2. If guides CPT is empty or 404, try standard WP posts /wp-json/wp/v2/posts
    if (!Array.isArray(posts) || posts.length === 0) {
      res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=100`, {
        next: { revalidate: 300 },
      });
      if (res.ok) {
        posts = await res.json();
      }
    }

    if (!Array.isArray(posts) || posts.length === 0) return mockGuides;

    const liveGuides = posts.map(mapWpGuide);

    // Merge WP guides with mockGuides, keeping live WP guides first!
    const guideMap = new Map<string, Guide>();
    liveGuides.forEach((g) => guideMap.set(g.slug, g));
    mockGuides.forEach((g) => {
      if (!guideMap.has(g.slug)) guideMap.set(g.slug, g);
    });

    return Array.from(guideMap.values());
  } catch (err) {
    console.error("[wp] falling back to mock guide data:", err);
    return mockGuides;
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const mockFallback = getMockGuideBySlug(slug);
  if (!WP_URL) return mockFallback;
  try {
    // 1. Try /wp-json/wp/v2/guides?slug=...
    let res = await fetch(`${WP_URL}/wp-json/wp/v2/guides?_embed&slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    let posts: WpGuidePost[] = res.ok ? await res.json() : [];

    // 2. Try /wp-json/wp/v2/posts?slug=...
    if (!Array.isArray(posts) || posts.length === 0) {
      res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?_embed&slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 300 },
      });
      if (res.ok) posts = await res.json();
    }

    if (!Array.isArray(posts) || !posts.length) return mockFallback;
    const wpGuide = mapWpGuide(posts[0]);
    return mockFallback ? { ...mockFallback, ...wpGuide } : wpGuide;
  } catch (err) {
    console.error("[wp] falling back to mock guide data:", err);
    return mockFallback;
  }
}

export async function getRelatedCruisesForGuide(guide: Guide): Promise<Cruise[]> {
  const all = await getAllCruises();
  return guide.relatedCruiseSlugs
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is Cruise => Boolean(c));
}

/* ------------------------------------------------------------------ */
/* Free-form frontend pages — About, Contact, promo landing pages...  */
/* Powered by the "frontend_page" CPT + /halong/v1/frontend-page      */
/* endpoint already built into the real Cruise CMS plugin.            */
/* ------------------------------------------------------------------ */

type WpFrontendPageResponse = {
  route: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contentHtml: string;
  sections: { title: string; text: string; image: string }[];
  metaTitle: string;
  metaDescription: string;
};

export async function getFrontendPage(route: string): Promise<FrontendPage | undefined> {
  const normalized = "/" + route.replace(/^\/|\/$/g, "");

  if (!WP_URL) return getMockFrontendPage(normalized);

  try {
    const res = await fetch(`${WP_URL}/wp-json/halong/v1/frontend-page?route=${encodeURIComponent(normalized)}`, {
      next: { revalidate: 300 },
    });
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const data: WpFrontendPageResponse = await res.json();
    return {
      route: data.route,
      eyebrow: data.eyebrow,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroImage: data.heroImage,
      contentHtml: data.contentHtml,
      sections: (data.sections ?? []).map((s) => ({ title: s.title, text: s.text, image: s.image || undefined })),
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    };
  } catch (err) {
    console.error("[wp] falling back to mock frontend page data:", err);
    return getMockFrontendPage(normalized);
  }
}
