import { Cruise, ItineraryDay, Cabin, SocialArea, TourCollection, HomepageContent, FrontendPageContent } from "./types";
import { normalizeCruise } from "./normalizeCruises";
import { 
  cruises as mockCruises, 
  getCruiseBySlug as getMockBySlug, 
  mockTourCollections, 
  mockHomepageContent 
} from "./mockData";

// The production CMS. WORDPRESS_URL can still override this for another environment.
const WP_URL = (process.env.WORDPRESS_URL || "https://halongcruise.vietnamprivatetours.com").replace(/\/$/, "");

/** This WordPress host exposes REST through ?rest_route= rather than /wp-json/. */
function wpApiUrl(route: string): string {
  const [path, query = ""] = route.replace(/^\/+/, "").split("?");
  const url = new URL(WP_URL);
  url.searchParams.set("rest_route", `/${path}`);
  new URLSearchParams(query).forEach((value, key) => url.searchParams.set(key, value));
  return url.toString();
}

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
  if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean);
  return String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** ACF returns false for an empty repeater/relationship field. */
function arrayValue<T = any>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : [];
}

/** ACF can return an image as a URL, attachment object or numeric ID depending
 * on the field configuration. The CMS uses URL fields by default, but this
 * keeps old WordPress data working after an upgrade. */
function imageUrl(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return value.url || value.source_url || value.guid?.rendered || "";
}

function imageUrls(value: any): string[] {
  if (typeof value === "string") {
    return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  }
  if (!Array.isArray(value)) return imageUrl(value) ? [imageUrl(value)] : [];
  return value.map((item) => imageUrl(item?.image_url || item)).filter(Boolean);
}

function mapWpCruise(post: WpCruisePost): Cruise {
  const a = (post.acf as any) || {};
  const mapItinerary = (itineraryArr: any[]) => (itineraryArr ?? []).map((d, i) => ({
    day: i + 1,
    title: d.title || `Day ${i + 1}`,
    location: d.location || "Ha Long Bay",
    image: imageUrl(d.image_url || d.image),
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

  const cabins: Cabin[] = arrayValue(a.cabins).map((c: any) => ({
    name: c.name || "Suite Cabin",
    cabinCount: c.cabin_count || 10,
    guests: c.guests || "2–3",
    size: c.size || "28 m²",
    beds: c.beds || "Double/Twin",
    description: c.description || "Luxury oceanview suite with private balcony.",
    image: imageUrl(c.image_url || c.image),
    galleryImages: imageUrls(c.gallery_urls || c.gallery_images).length ? imageUrls(c.gallery_urls || c.gallery_images) : imageUrls(c.image_url || c.image),
  }));

  const socialAreas: SocialArea[] = arrayValue(a.social_areas).map((s: any) => ({
    name: s.name || "Social Area",
    image: imageUrl(s.image_url || s.image),
    alt: s.alt_text || s.name || "Social Area",
  }));

  const cruiseName = a.breadcrumb_label || post.title?.rendered || post.slug;

  const mockFallback = getMockBySlug(post.slug) || mockCruises.find((m: any) => m.name.toLowerCase() === cruiseName.toLowerCase());

  const heroImage = imageUrl(a.hero_image_url || a.hero_image) || mockFallback?.heroImage || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || imageUrl(a.gallery?.[0]);
  const extGalleryUrls = imageUrls(a.external_gallery);
  const externalPhotos = arrayValue(a.external_gallery).map((item: any) => ({
    url: imageUrl(item?.image_url || item?.url || item),
    alt: item?.alt_text || item?.alt || cruiseName,
  })).filter((item: any) => item.url);
  const acfGalleryUrls = imageUrls(a.gallery_urls || a.gallery);
  const galleryImages = extGalleryUrls.length > 0 ? extGalleryUrls : (acfGalleryUrls.length > 0 ? acfGalleryUrls : (mockFallback?.galleryImages || []));
  const finalCabins = cabins.length > 0 ? cabins : (mockFallback?.cabins || []);
  const finalPrograms = programs.length > 0 ? programs : (mockFallback?.programs || []);

  return normalizeCruise({
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
    photos: externalPhotos.length > 0 ? externalPhotos : (galleryImages.length > 0 ? galleryImages.map((url: any) => ({ url, alt: cruiseName })) : (mockFallback?.photos || [])),
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
    deckPlanImage: imageUrl(a.deck_plan_url || a.deck_plan),
    relatedSlugs: arrayValue(a.related).map((r: any) => r.post_name).length > 0 ? arrayValue(a.related).map((r: any) => r.post_name) : (mockFallback?.relatedSlugs || []),
  });
}

export async function getAllCruises(): Promise<Cruise[]> {
  if (!WP_URL) return mockCruises;
  try {
    // Try standard CPT endpoint first, then custom post type cruises-vietnam
    let res = await fetch(wpApiUrl("wp/v2/cruises?_embed&per_page=100"), {
      next: { revalidate: 300 },
    });
    
    if (!res.ok) {
      res = await fetch(wpApiUrl("wp/v2/cruises-vietnam?_embed&per_page=100"), {
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
    let res = await fetch(wpApiUrl(`wp/v2/cruises?_embed&slug=${encodeURIComponent(slug)}`), {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      res = await fetch(wpApiUrl(`wp/v2/cruises-vietnam?_embed&slug=${encodeURIComponent(slug)}`), {
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
    heroImage: imageUrl(a.hero_image_url || a.hero_image),
    descriptionParagraphs: splitLines(a.description_paragraphs),
    keyHighlights: splitLines(a.key_highlights),
    priceRangeText: a.price_range_text || "",
    bestMonthsText: a.best_months_text || "",
    expertAdvice: a.expert_advice || "",
    faqs: arrayValue(a.faqs).map((faq: any) => ({
      question: faq.question || "",
      answer: faq.answer || "",
    })),
  };
}

export async function getTourCollectionBySlug(slug: string): Promise<TourCollection | undefined> {
  if (!WP_URL) return mockTourCollections.find(c => c.slug === slug);
  try {
    const res = await fetch(wpApiUrl(`wp/v2/tour-collections?_embed&slug=${encodeURIComponent(slug)}`), {
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
    const res = await fetch(wpApiUrl("wp/v2/homepage-content?_embed&per_page=1"), {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const posts = await res.json();
    if (!Array.isArray(posts) || !posts.length) return mockHomepageContent;
    
    const a = posts[0].acf || {};
    const [tourResponse, cruiseResponse, siteOptionsResponse] = await Promise.all([
      fetch(wpApiUrl("wp/v2/tour-collections?_embed&per_page=100"), { next: { revalidate: 300 } }),
      fetch(wpApiUrl("wp/v2/cruises?_embed&per_page=100"), { next: { revalidate: 300 } }),
      fetch(wpApiUrl("halong/v1/site-options"), { next: { revalidate: 300 } }),
    ]);
    const tourPosts = tourResponse.ok ? await tourResponse.json() : [];
    const cruisePosts: WpCruisePost[] = cruiseResponse.ok ? await cruiseResponse.json() : [];
    const siteOptions = siteOptionsResponse.ok ? await siteOptionsResponse.json() : {};
    const resolveTour = (ref: any) => {
      const slug = ref?.post_name || ref?.slug;
      const full = (Array.isArray(tourPosts) ? tourPosts : []).find((post: any) => post.slug === slug);
      return mapWpTourCollection(full || { ...ref, slug });
    };
    const resolveCruise = (ref: any) => {
      const slug = ref?.post_name || ref?.slug;
      const full = cruisePosts.find((post) => post.slug === slug);
      return full ? mapWpCruise(full) : ({ ...mockCruises[0], slug, name: ref?.post_title || ref?.title?.rendered || slug });
    };
    return {
      heroTitle: a.hero_title || "",
      heroSubtitle: a.hero_subtitle || "",
      heroBackground: imageUrl(a.hero_background_url || a.hero_background),
      heroSlides: arrayValue(a.hero_slides).map((slide: any) => ({
        image: imageUrl(slide.image_url || slide.image),
        name: slide.name || "Ha Long Bay",
        slug: slide.slug || "cruises",
      })).filter((slide: any) => slide.image),
      tripTypesTitle: a.trip_types_title || "",
      tripTypesDescription: a.trip_types_description || "",
      selectedStyles: arrayValue(a.selected_styles).map(resolveTour),
      regionsTitle: a.regions_title || "",
      regionsDescription: a.regions_description || "",
      selectedRegions: arrayValue(a.selected_regions).map(resolveTour),
      featuredTitle: a.featured_title || "",
      featuredCruises: arrayValue(a.featured_cruises).map(resolveCruise),
      testimonialsTitle: a.testimonials_title || "",
      testimonialsEyebrow: a.testimonials_eyebrow || "",
      testimonialsRatingText: a.testimonials_rating_text || "",
      testimonials: arrayValue(a.testimonials).map((t: any) => ({
        quote: t.quote || "",
        author: t.author || "",
        location: t.location || "",
      })),
      teamSection: {
        eyebrow: a.team_eyebrow || "",
        title: a.team_title || "",
        members: arrayValue(a.team_members).map((member: any) => ({
          name: member.name || "",
          role: member.role || "",
          experience: member.experience || "",
          initial: member.initial || "",
          image: imageUrl(member.image_url || member.image),
          bio: member.bio || "",
        })),
      },
      contactStrip: {
        whatsappLabel: a.contact_whatsapp_label || "",
        // Website Settings is the single source of truth for these global contact details.
        whatsapp: siteOptions.site_whatsapp || a.contact_whatsapp || "",
        emailLabel: a.contact_email_label || "",
        email: siteOptions.site_email || a.contact_email || "",
        officeLabel: a.contact_office_label || "",
        office: a.contact_office || "",
        hours: a.contact_hours || "",
      },
      guidesTitle: a.guides_title || "",
      guidesList: arrayValue(a.guides_list).map((g: any) => ({
        title: g.title || "",
        url: g.url || "",
        image: imageUrl(g.image_url || g.image),
        date: g.date || "",
        readTime: g.read_time || "",
      })),
      headerMenu: {
        logo: imageUrl(a.header_logo_url || a.header_logo),
        logoAlt: a.header_logo_alt || "Ha Long Bay Cruises",
        logoWidth: Number(a.header_logo_width) || 180,
        cruisesLabel: a.header_cruises_label || "Cruises",
        toursLabel: a.header_tours_label || "Tours & Packages",
        guidesLabel: a.header_guides_label || "Travel Guides",
        aboutLabel: a.header_about_label || "About Us",
        ctaLabel: a.header_cta_label || "Plan a Sailing",
        ctaUrl: a.header_cta_url || "/inquire",
        cruises: arrayValue(a.header_cruises).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        tours: arrayValue(a.header_tours).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        guides: arrayValue(a.header_guides).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
      },
      footerData: {
        address: a.footer_address || "Tuan Chau Marina, Ha Long, Vietnam",
        phone: a.footer_phone || "+84 988600388",
        email: a.footer_email || "sales@halongbestcruises.com",
        cruises: arrayValue(a.footer_cruises).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        tours: arrayValue(a.footer_tours).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
        guides: arrayValue(a.footer_guides).map((i: any) => ({ label: i.label || "", href: i.href || "" })),
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
        tiles: arrayValue(a.category_tiles).map((t: any) => ({
          label: t.label || "",
          subtitle: t.subtitle || "",
          href: t.href || "",
          image: imageUrl(t.image_url || t.image),
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

export async function getFrontendPage(route: string): Promise<FrontendPageContent | undefined> {
  if (!WP_URL) return undefined;
  try {
    const res = await fetch(wpApiUrl(`halong/v1/frontend-page?route=${encodeURIComponent(route)}`), {
      next: { revalidate: 300 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    if (!data || !data.route) return undefined;
    return data;
  } catch (err) {
    console.error(`[wp-headless] frontend page fallback for ${route}:`, err);
    return undefined;
  }
}
