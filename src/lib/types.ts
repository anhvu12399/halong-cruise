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
  galleryImages?: string[];
};

export type SocialArea = {
  name: string;
  image: string;
  alt?: string;
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
  photos?: any[];
  rating?: number;
  reviewCount?: number;
  address?: string;
  programs?: any[];
};

export type PressLogo = {
  name: string;
};

export type TourCollectionFaq = {
  question: string;
  answer: string;
};

export type TourCollection = {
  slug: string;
  type: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  descriptionParagraphs: string[];
  keyHighlights: string[];
  priceRangeText: string;
  bestMonthsText: string;
  expertAdvice: string;
  faqs: TourCollectionFaq[];
};

export type HomepageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: string;
  tripTypesTitle: string;
  tripTypesDescription: string;
  selectedStyles: TourCollection[];
  regionsTitle: string;
  regionsDescription: string;
  selectedRegions: TourCollection[];
  featuredTitle: string;
  featuredCruises: Cruise[];
  testimonialsTitle: string;
  testimonials: { quote: string; author: string; location: string }[];
  guidesTitle: string;
  guidesList: { title: string; url: string; image: string; date: string; readTime: string }[];
  announcementBar: { text: string; linkText: string; linkUrl: string };
  categoryTilesSection: {
    eyebrow: string;
    title: string;
    description: string;
    tiles: { label: string; subtitle: string; href: string; image: string; badge?: string }[];
  };
  leadCapture: {
    shortlistTitle: string;
    shortlistSubtitle: string;
    shortlistDesc: string;
    stickyCtaText: string;
    stickyCtaWhatsapp: string;
  };
};
