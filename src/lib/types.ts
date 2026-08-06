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

export type TourCollection = {
  slug: string;
  type: "region" | "style";
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  descriptionParagraphs: string[];
  keyHighlights: string[];
  priceRangeText: string;
  bestMonthsText: string;
  expertAdvice: string;
  faqs: { question: string; answer: string }[];
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
};
