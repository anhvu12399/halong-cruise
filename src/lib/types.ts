export type FrontendPageSection = {
  title: string;
  text: string; // HTML from ACF wysiwyg
  image?: string;
};

export type FrontendPage = {
  route: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contentHtml: string;
  sections: FrontendPageSection[];
  metaTitle: string;
  metaDescription: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  region?: string;
  readMinutes: number;
  publishedAt: string; // display label, e.g. "Jun 2026"
  bodyHtml: string; // rendered HTML — from WP's post_content, or hand-written for mock data
  relatedCruiseSlugs: string[];
};

export type ItineraryBlock = {
  period: "AM" | "PM" | "EVE";
  text: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  location: string;
  blocks: ItineraryBlock[];
  image?: string;
};

export type Cabin = {
  name: string;
  cabinCount: number;
  guests: string;
  size: string;
  beds: string;
  description: string;
  image: string;
};

export type SocialArea = {
  name: string;
  image: string;
};

export type Cruise = {
  slug: string;
  name: string;
  tagline: string;
  region: string;
  breadcrumbLabel: string;
  /** Free-form category tags: "luxury" | "deluxe" | "budget" | "newest" | "best" | "honeymoon" | "family" | "group" ... */
  tags: string[];
  durationDays: number;
  durationNights: number;
  guestsMax: number;
  cabinCount: number;
  startingPrice: number | null; // null => "On request"
  heroImage: string;
  galleryImages: string[];
  overview: string[];
  lifeOnBoard: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  socialAreas: SocialArea[];
  cabins: Cabin[];
  features: string[];
  equipment: string[];
  deckPlanImage?: string;
  relatedSlugs: string[];
};

export type PressLogo = {
  name: string;
};
