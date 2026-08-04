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
