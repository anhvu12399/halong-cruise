import { Cruise, ItineraryDay, Cabin, SocialArea, TourCollection, HomepageContent } from "./types";
import { 
  cruises as mockCruises, 
  getCruiseBySlug as getMockBySlug, 
  mockTourCollections, 
  mockHomepageContent 
} from "./mockData";

const WP_URL = process.env.WORDPRESS_URL?.replace(/\/$/, "");

/**
 * Headless WordPress integration layer.
 * 
 * Every function here has a graceful mock fallback, so the site runs and looks
 * 100% right with zero WordPress setup. Once WORDPRESS_URL is set in .env.local
 * (or Vercel Environment Variables), these functions transparently fetch live
 * data from WordPress REST API (ACF & CPT).
 */

type WpMedia = {
  source_url?: string;
};

type WpCruisePost = {
  id: number;
  slug: string;
  title?: { rendered?: string };
  acf?: {
    tagline?: string;
    region?: string;
    breadcrumb_label?: string;
    duration_days?: number;
    duration_nights?: number;
    guests_max?: number;
    cabin_count?: number;
    starting_price?: number | "" | null;
    overview?: string; // rich text or multi-paragraph
    life_on_board?: string;
    highlights?: string; // one per line
    tags?: string; // one per line, e.g. "luxury\nbest\nfamily"
    gallery?: { url: string }[];
    itinerary?: {
      title: string;
      location: string;
      image?: { url: string };
      am?: string;
      pm?: string;
      eve?: string;
    }[];
    social_areas?: { name: string; image?: { url: string } }[];
    cabins?: {
      name: string;
      cabin_count: number;
      guests: string;
      size: string;
      beds: string;
      description: string;
      image?: { url: string };
      gallery_images?: { url: string }[];
    }[];
    features?: string;
    equipment?: string;
    deck_plan?: { url: string };
    related?: { post_name: string }[];
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
  const a = (post.acf as any) || {};
  const mapItinerary = (itineraryArr: any[]) => (itineraryArr ?? []).map((d, i) => ({
    day: i + 1,
    title: d.title || `Day ${i + 1}`,
    location: d.location || "Ha Long Bay",
    image: d.image?.url || "",
    blocks: [
      d.am ? { period: "AM" as const, text: d.am } : null,
      d.pm ? { period: "PM" as const, text: d.pm } : null,
      d.eve ? { period: "EVE" as const, text: d.eve } : null,
    ].filter((b): b is { period: "AM" | "PM" | "EVE"; text: string } => Boolean(b)),
  }));

  const programs: { id: string; name: string; days: ItineraryDay[] }[] = [];
  if (a.itinerary_2d1n && a.itinerary_2d1n.length > 0) {
    programs.push({ id: "2d1n", name: "2 Days 1 Night", days: mapItinerary(a.itinerary_2d1n) });
  }
  if (a.itinerary_3d2n && a.itinerary_3d2n.length > 0) {
    programs.push({ id: "3d2n", name: "3 Days 2 Nights", days: mapItinerary(a.itinerary_3d2n) });
  }
  
  // Fallback for old data or if no programs exist
  if (programs.length === 0 && a.itinerary && a.itinerary.length > 0) {
    programs.push({ id: "2d1n", name: "2 Days 1 Night", days: mapItinerary(a.itinerary) });
  }

  const cabins: Cabin[] = (a.cabins ?? []).map((c: any) => ({
    name: c.name || "Suite Cabin",
    cabinCount: c.cabin_count || 10,
    guests: c.guests || "2–3",
    size: c.size || "28 m²",
    beds: c.beds || "Double/Twin",
    description: c.description || "Luxury oceanview suite with private balcony.",
    image: c.image?.url || "",
    galleryImages: c.gallery_images ? c.gallery_images.map((g: any) => g.url) : (c.image?.url ? [c.image.url] : []),
  }));

  const socialAreas: SocialArea[] = (a.social_areas ?? []).map((s: any) => ({
    name: s.name || "Social Area",
    image: s.image?.url || "",
  }));

  const cruiseName = a.breadcrumb_label || post.title?.rendered || post.slug;

  const mockFallback = getMockBySlug(post.slug) || mockCruises.find((m: any) => m.name.toLowerCase() === cruiseName.toLowerCase());

  const heroImage = a.hero_image_url || a.hero_image?.url || mockFallback?.heroImage || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || (a.gallery?.[0]?.url ?? "");
  const extGalleryUrls = (a.external_gallery ?? []).map((e: any) => e.image_url || e).filter(Boolean);
  const galleryImages = extGalleryUrls.length > 0 ? extGalleryUrls : (mockFallback?.galleryImages && mockFallback.galleryImages.length > 0 ? mockFallback.galleryImages : (a.gallery ?? []).map((g: any) => g.url));
  const finalCabins = cabins.length > 0 ? cabins : (mockFallback?.cabins || []);
  const finalPrograms = programs.length > 0 ? programs : (mockFallback?.programs || []);

  return {
    slug: post.slug,
    name: cruiseName,
    tagline: a.tagline || mockFallback?.tagline || `Luxury small-ship sailing aboard ${cruiseName}.`,
    region: a.region || mockFallback?.region || "Ha Long Bay & Lan Ha Bay",
    breadcrumbLabel: cruiseName,
    tags: splitLines(a.tags).length > 0 ? splitLines(a.tags).map((t) => t.toLowerCase()) : (mockFallback?.tags || ["luxury"]),
    durationDays: a.duration_days || mockFallback?.durationDays || 2,
    durationNights: a.duration_nights || mockFallback?.durationNights || 1,
    guestsMax: a.guests_max || mockFallback?.guestsMax || 48,
    cabinCount: a.cabin_count || mockFallback?.cabinCount || 20,
    startingPrice: a.starting_price ? Number(a.starting_price) : (mockFallback?.startingPrice || 150),
    heroImage,
    galleryImages,
    photos: mockFallback?.photos || galleryImages.map((url: any) => ({ url, alt: cruiseName })),
    rating: mockFallback?.rating || 9.2,
    reviewCount: mockFallback?.reviewCount || 150,
    address: mockFallback?.address || "Tuan Chau Marina, Ha Long, Quang Ninh, Vietnam",
    overview: splitLines(a.overview).length > 0 ? splitLines(a.overview) : (mockFallback?.overview || []),
    lifeOnBoard: splitLines(a.life_on_board).length > 0 ? splitLines(a.life_on_board) : (mockFallback?.lifeOnBoard || []),
    highlights: splitLines(a.highlights).length > 0 ? splitLines(a.highlights) : (mockFallback?.highlights || []),
    programs: finalPrograms,
    socialAreas: socialAreas.length > 0 ? socialAreas : (mockFallback?.socialAreas || []),
    cabins: finalCabins,
    features: splitLines(a.features).length > 0 ? splitLines(a.features) : (mockFallback?.features || []),
    equipment: splitLines(a.equipment).length > 0 ? splitLines(a.equipment) : (mockFallback?.equipment || []),
    deckPlanImage: a.deck_plan?.url,
    relatedSlugs: (a.related ?? []).map((r: any) => r.post_name).length > 0 ? (a.related ?? []).map((r: any) => r.post_name) : (mockFallback?.relatedSlugs || []),
  };
}

export async function getAllCruises(): Promise<Cruise[]> {
  if (!WP_URL) return mockCruises;
  try {
    // Try standard CPT endpoint first, then custom post type cruises-vietnam
    let res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises?_embed&per_page=100`, {
      next: { revalidate: 300 },
    });
    
    if (!res.ok) {
      res = await fetch(`${WP_URL}/wp-json/wp/v2/cruises-vietnam?_embed&per_page=100`, {
        next: { revalidate: 300 },
      });
    }

    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts: WpCruisePost[] = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return mockCruises;
    return posts.map(mapWpCruise);
  } catch (err) {
    console.error("[wp-headless] falling back to local database:", err);
    return mockCruises;
  }
}

export async function getCruiseBySlug(slug: string): Promise<Cruise | undefined> {
  if (!WP_URL) return getMockBySlug(slug);
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
    if (!Array.isArray(posts) || !posts.length) return getMockBySlug(slug);
    return mapWpCruise(posts[0]);
  } catch (err) {
    console.error("[wp-headless] falling back to local database:", err);
    return getMockBySlug(slug);
  }
}

export async function getRelatedCruises(cruise: Cruise): Promise<Cruise[]> {
  const all = await getAllCruises();
  return cruise.relatedSlugs
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is Cruise => Boolean(c));
}

// Map WP Tour Collection -> frontend TourCollection
function mapWpTourCollection(post: any): TourCollection {
  const a = (post.acf as any) || {};
  return {
    slug: post.slug,
    type: a.collection_type || "region",
    eyebrow: a.eyebrow || "",
    title: a.title || post.title?.rendered || post.slug,
    subtitle: a.subtitle || "",
    heroImage: a.hero_image?.url || "",
    descriptionParagraphs: splitLines(a.description_paragraphs),
    keyHighlights: splitLines(a.key_highlights),
    priceRangeText: a.price_range_text || "",
    bestMonthsText: a.best_months_text || "",
    expertAdvice: a.expert_advice || "",
    faqs: (a.faqs ?? []).map((faq: any) => ({
      question: faq.question || "",
      answer: faq.answer || "",
    })),
  };
}

export async function getTourCollectionBySlug(slug: string): Promise<TourCollection | undefined> {
  if (!WP_URL) return mockTourCollections.find(c => c.slug === slug);
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/tour-collections?_embed&slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts = await res.json();
    if (!Array.isArray(posts) || !posts.length) return mockTourCollections.find(c => c.slug === slug);
    return mapWpTourCollection(posts[0]);
  } catch (err) {
    console.error("[wp-headless] fallback to mock tour collection:", err);
    return mockTourCollections.find(c => c.slug === slug);
  }
}

export async function getHomepageContent(): Promise<HomepageContent> {
  if (!WP_URL) return mockHomepageContent;
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/homepage-content?_embed&per_page=1`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts = await res.json();
    if (!Array.isArray(posts) || !posts.length) return mockHomepageContent;
    
    const a = posts[0].acf || {};
    return {
      heroTitle: a.hero_title || "",
      heroSubtitle: a.hero_subtitle || "",
      heroBackground: a.hero_background?.url || "",
      tripTypesTitle: a.trip_types_title || "",
      tripTypesDescription: a.trip_types_description || "",
      selectedStyles: (a.selected_styles ?? []).map((p: any) => mapWpTourCollection({ ...p, slug: p.post_name })),
      regionsTitle: a.regions_title || "",
      regionsDescription: a.regions_description || "",
      selectedRegions: (a.selected_regions ?? []).map((p: any) => mapWpTourCollection({ ...p, slug: p.post_name })),
      featuredTitle: a.featured_title || "",
      featuredCruises: (a.featured_cruises ?? []).map((p: any) => ({ ...mockCruises[0], slug: p.post_name, name: p.post_title })), // Simplification for now, would fetch full cruise ideally
      testimonialsTitle: a.testimonials_title || "",
      testimonials: (a.testimonials ?? []).map((t: any) => ({
        quote: t.quote || "",
        author: t.author || "",
        location: t.location || "",
      })),
      guidesTitle: a.guides_title || "",
      guidesList: (a.guides_list ?? []).map((g: any) => ({
        title: g.title || "",
        url: g.url || "",
        image: g.image?.url || "",
        date: g.date || "",
        readTime: g.read_time || "",
      })),
      headerMenu: {
        logo: a.header_logo?.url || a.header_logo || "",
        cruises: (a.header_cruises ?? []).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        tours: (a.header_tours ?? []).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        guides: (a.header_guides ?? []).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
      },
      footerData: {
        address: a.footer_address || "Tuan Chau Marina, Ha Long, Vietnam",
        phone: a.footer_phone || "+84 988600388",
        email: a.footer_email || "sales@halongbestcruises.com",
        cruises: (a.footer_cruises ?? []).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        tours: (a.footer_tours ?? []).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        guides: (a.footer_guides ?? []).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
      },
      seoBlock: {
        title: a.seo_title || "",
        text: a.seo_text || "",
      },
      announcementBar: {
        text: a.top_bar_text || "",
        linkText: a.top_bar_link_text || "",
        linkUrl: a.top_bar_link_url || "",
      },
      categoryTilesSection: {
        eyebrow: a.category_section_eyebrow || "",
        title: a.category_section_title || "",
        description: a.category_section_desc || "",
        tiles: (a.category_tiles ?? []).map((t: any) => ({
          label: t.label || "",
          subtitle: t.subtitle || "",
          href: t.href || "",
          image: t.image?.url || "",
          badge: t.badge || "",
        })),
      },
      leadCapture: {
        shortlistTitle: a.shortlist_form_title || "",
        shortlistSubtitle: a.shortlist_form_subtitle || "",
        shortlistDesc: a.shortlist_form_desc || "",
        stickyCtaText: a.sticky_cta_text || "",
        stickyCtaWhatsapp: a.sticky_cta_whatsapp || "84988600388",
      },
    };
  } catch (err) {
    console.error("[wp-headless] fallback to mock homepage content:", err);
    return mockHomepageContent;
  }
}

export const isLive = Boolean(WP_URL);
