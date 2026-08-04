import { Cruise } from "./types";

const BOOKING_IMAGES = [
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/411409062.webp?k=dd0f7b9297bb345b5350265a4466db99778914c17805d5a46a25ab5db2f8df33&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/695679661.webp?k=916cf4caa19f160df7cf7e259a58c22f09bc4afb464e07e9c65ab1a9fe051eea&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/540224451.webp?k=9275ad9f8fdad3bc9867f4f78fce11784317bb543b6539c8255cb7f4bd1ff16d&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/372163736.jpg?k=2ee4b3beaacbf560619940ef3ed9fdb268d80310ab6cebea72e12b164cd4a2d4",
  "https://aw-d.tripcdn.com/images/1mc3d12000dq6s641C4EE.jpg",
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/372191245.jpg?k=bb6d2a9750e797d466a6d8cc1ddf56b7378189bb9dfdbfb0707408e1bd93b0a0",
  "https://aw-d.tripcdn.com/images/0222512000kyffcwo5D55.jpg"
];

const img = (seed: string, _w = 1200, _h = 800) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % BOOKING_IMAGES.length;
  return BOOKING_IMAGES[idx];
};

export const cruises: Cruise[] = [
  {
    slug: "au-co",
    name: "Au Co",
    tagline: "A quietly grand way to sit with Ha Long Bay for three days.",
    region: "Ha Long Bay & Lan Ha Bay",
    breadcrumbLabel: "Au Co",
    tags: ["luxury", "best", "family", "group"],
    durationDays: 3,
    durationNights: 2,
    guestsMax: 56,
    cabinCount: 32,
    startingPrice: null,
    heroImage: img("au-co-hero", 1800, 1000),
    galleryImages: [img("au-co-1"), img("au-co-2"), img("au-co-3")],
    overview: [
      "Au Co keeps to a short list of things worth doing well: a still deck at sunrise, a dining room that doesn't rush you, and a route through the limestone karsts that leaves room to actually look at them. The 70-passenger ship sits inside the UNESCO-listed reach of Ha Long Bay and the quieter water of Lan Ha, and the three-day sailing is built around that geography rather than around a checklist.",
      "Cabins run larger than most boats on this route, finished in dark timber and brushed brass, with the kind of restraint that reads as confidence rather than economy.",
    ],
    lifeOnBoard: [
      "The Terrace Deck restaurant serves Vietnamese and Western menus built around what came aboard that morning — imported beef and lamb sit alongside a tasting-menu run through classic regional dishes, with a wine list chosen to go the distance rather than impress on the first glass.",
      "Evenings are unhurried by design: a sundeck cocktail before dinner, a cooking demonstration some nights, live Vietnamese folk music on others, and a squid-fishing session for anyone who wants to stay up.",
    ],
    highlights: [
      "Art Deco-influenced cabins with first-class finishes",
      "Rooftop jacuzzi and a spa built for two treatments at once",
      "Private sundeck cabanas for reading, drinking, and doing neither",
    ],
    itinerary: [
      {
        day: 1,
        title: "Ha Noi — Lan Ha Bay",
        location: "Hanoi · Lan Ha Bay",
        image: img("au-co-day1", 900, 650),
        blocks: [
          {
            period: "AM",
            text:
              "Arrive at the Bhaya Cruise Center, roughly a four-hour drive from central Hanoi through the delta and its rice terraces. A private lounge and welcome tea while your cabin is prepared, then board Au Co and settle in as the ship eases toward Ha Long Bay.",
          },
          {
            period: "PM",
            text:
              "Lunch is served as the ship crosses toward Lan Ha Bay, followed by a kayak or bamboo-boat excursion through a limestone corridor too narrow for the ship itself. Back aboard, there's time on the sundeck before the light turns for the evening.",
          },
          {
            period: "EVE",
            text:
              "A multi-course Vietnamese dinner in the Terrace Deck restaurant, then squid fishing off the stern for anyone who wants to try, or a nightcap on deck for anyone who'd rather just watch the karsts disappear into the dark.",
          },
        ],
      },
      {
        day: 2,
        title: "Lan Ha Bay — Cat Ba Island",
        location: "Lan Ha Bay",
        image: img("au-co-day2", 900, 650),
        blocks: [
          {
            period: "AM",
            text:
              "An early Tai Chi session on the sundeck for early risers, then breakfast, then a morning excursion to Viet Hai fishing village by rowing boat — one of the few remaining floating communities in the bay.",
          },
          {
            period: "PM",
            text:
              "A swim stop in a quiet cove, followed by a cooking demonstration in the ship's open kitchen — spring rolls, most weeks — before the afternoon opens up for the rooftop jacuzzi or spa.",
          },
          {
            period: "EVE",
            text:
              "A barbecue dinner on the sundeck under the karsts, with a short set from a Vietnamese folk trio to close the evening.",
          },
        ],
      },
      {
        day: 3,
        title: "Lan Ha Bay — Ha Noi",
        location: "Lan Ha Bay · Hanoi",
        image: img("au-co-day3", 900, 650),
        blocks: [
          {
            period: "AM",
            text:
              "A final sunrise on the sundeck, then breakfast as the ship makes its way back toward Halong City. Cabins are vacated by 09:00; luggage is stored while you take a last excursion or simply sit with the view.",
          },
          {
            period: "PM",
            text: "Disembark at the Bhaya Cruise Center and transfer back to Hanoi, arriving mid-afternoon.",
          },
        ],
      },
    ],
    socialAreas: [
      { name: "Restaurant", image: img("au-co-restaurant") },
      { name: "Sundeck", image: img("au-co-sundeck") },
      { name: "Spa", image: img("au-co-spa") },
      { name: "Library", image: img("au-co-library") },
      { name: "Bar", image: img("au-co-bar") },
      { name: "Jacuzzi", image: img("au-co-jacuzzi") },
    ],
    cabins: [
      {
        name: "Deluxe",
        cabinCount: 14,
        guests: "2–3",
        size: "20 m² / 215 ft²",
        beds: "Double/Twin",
        description:
          "Main Deck cabins with a queen-sized bed, dark wood flooring, and a private balcony with two chairs — the standard by which the rest of the ship's cabins are judged, which is to say, generous.",
        image: img("au-co-deluxe"),
      },
      {
        name: "Grand Deluxe",
        cabinCount: 2,
        guests: "2–3",
        size: "20 m² / 215 ft²",
        beds: "Double",
        description:
          "Upper Deck cabins with floor-to-ceiling doors that open onto uninterrupted bay views and morning light with nowhere to hide.",
        image: img("au-co-grand-deluxe"),
      },
      {
        name: "Executive",
        cabinCount: 12,
        guests: "2–3",
        size: "20 m² / 215 ft²",
        beds: "Double/Twin",
        description:
          "Upper Deck cabins with dark wood furnishings, a contemporary gold-and-black palette, and a private balcony with chairs for two.",
        image: img("au-co-executive"),
      },
      {
        name: "Long Quan Suite",
        cabinCount: 2,
        guests: "3",
        size: "40 m² / 430 ft²",
        beds: "Queen",
        description:
          "The largest cabin category, spread over the Upper Deck with floor-to-ceiling doors, a private balcony, and enough room that it stops feeling like a boat cabin at all.",
        image: img("au-co-long-quan"),
      },
      {
        name: "Au Co Suite",
        cabinCount: 2,
        guests: "2",
        size: "36 m² / 387 ft²",
        beds: "Queen",
        description:
          "The two forward suites, first to see the bay open up ahead of the ship, finished in indigo tones with a freestanding tub and a separate rain shower.",
        image: img("au-co-suite"),
      },
    ],
    features: ["Air conditioning", "Pool / Jacuzzi", "Massage room", "Wi-Fi available", "Spa", "Hot showers"],
    equipment: ["Kayaks / canoes", "Bicycles", "Fishing equipment", "Flashlights", "Water refill station", "Insect repellent"],
    deckPlanImage: img("au-co-deckplan", 1000, 500),
    relatedSlugs: ["indigo-pearl", "vermilion-sails", "jade-serenity"],
  },
  {
    slug: "indigo-pearl",
    name: "Indigo Pearl",
    tagline: "A smaller ship for a quieter corner of Lan Ha Bay.",
    region: "Lan Ha Bay",
    breadcrumbLabel: "Indigo Pearl",
    tags: ["budget", "newest"],
    durationDays: 2,
    durationNights: 1,
    guestsMax: 20,
    cabinCount: 10,
    startingPrice: 340,
    heroImage: img("indigo-hero", 1800, 1000),
    galleryImages: [img("indigo-1"), img("indigo-2"), img("indigo-3")],
    overview: [
      "Indigo Pearl carries twenty guests at most, which puts it well outside the standard tour-boat traffic and inside the calmer water off Cat Ba's western coast. It's the right size for people who want the bay without a crowd on the sundeck.",
    ],
    lifeOnBoard: ["A single set menu each evening, built around the day's catch, served family-style on deck when weather allows."],
    highlights: ["Just 10 cabins", "Kayaking directly from a floating pontoon", "Anchors in Lan Ha's quieter coves, away from the main tour routes"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi — Lan Ha Bay",
        location: "Lan Ha Bay",
        image: img("indigo-day1", 900, 650),
        blocks: [
          { period: "AM", text: "Transfer from Hanoi and board in Cat Ba town, avoiding the busier Ha Long City harbour entirely." },
          { period: "PM", text: "Kayaking through a hidden lagoon, then a swim stop before the ship anchors for the night." },
          { period: "EVE", text: "Dinner on deck, weather permitting, under a sky with almost no ambient light." },
        ],
      },
      {
        day: 2,
        title: "Lan Ha Bay — Hanoi",
        location: "Lan Ha Bay",
        image: img("indigo-day2", 900, 650),
        blocks: [
          { period: "AM", text: "Sunrise Tai Chi, breakfast, and a final cove before heading back to Cat Ba for the transfer to Hanoi." },
        ],
      },
    ],
    socialAreas: [
      { name: "Sundeck", image: img("indigo-sundeck") },
      { name: "Dining Deck", image: img("indigo-dining") },
    ],
    cabins: [
      {
        name: "Deluxe Balcony",
        cabinCount: 10,
        guests: "2",
        size: "18 m² / 194 ft²",
        beds: "Double/Twin",
        description: "Compact, well-finished cabins with a private balcony and no wasted space.",
        image: img("indigo-deluxe"),
      },
    ],
    features: ["Air conditioning", "Sundeck bar", "Hot showers"],
    equipment: ["Kayaks", "Fishing equipment", "Flashlights"],
    relatedSlugs: ["au-co", "vermilion-sails"],
  },
  {
    slug: "vermilion-sails",
    name: "Vermilion Sails",
    tagline: "Traditional junk rigging, four decks, and a route into Bai Tu Long.",
    region: "Bai Tu Long Bay",
    breadcrumbLabel: "Vermilion Sails",
    tags: ["luxury", "honeymoon"],
    durationDays: 4,
    durationNights: 3,
    guestsMax: 36,
    cabinCount: 18,
    startingPrice: 825,
    heroImage: img("vermilion-hero", 1800, 1000),
    galleryImages: [img("vermilion-1"), img("vermilion-2"), img("vermilion-3")],
    overview: [
      "Vermilion Sails runs the longer route north into Bai Tu Long Bay, which sees a fraction of the traffic of Ha Long proper. Four days is enough time to stop caring what day it is.",
    ],
    lifeOnBoard: ["A rotating chef's table one night, a full Vietnamese banquet the next, with a well-stocked bar between the two."],
    highlights: ["Traditional red-sail rigging", "Overnight anchorage inside Bai Tu Long National Park", "On-board cooking class with a working kitchen garden"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi — Bai Tu Long Bay",
        location: "Bai Tu Long Bay",
        image: img("vermilion-day1", 900, 650),
        blocks: [{ period: "PM", text: "Board at Hon Gai and sail north, past the last of the tour-boat routes." }],
      },
      {
        day: 2,
        title: "Bai Tu Long National Park",
        location: "Bai Tu Long Bay",
        image: img("vermilion-day2", 900, 650),
        blocks: [{ period: "AM", text: "A guided hike inside the national park, then kayaking back to the ship." }],
      },
      {
        day: 3,
        title: "Cong Dam Lagoon",
        location: "Bai Tu Long Bay",
        image: img("vermilion-day3", 900, 650),
        blocks: [{ period: "PM", text: "A slow paddle through Cong Dam's mangrove channels, one of the bay's least-visited corners." }],
      },
      {
        day: 4,
        title: "Bai Tu Long Bay — Hanoi",
        location: "Hanoi",
        image: img("vermilion-day4", 900, 650),
        blocks: [{ period: "AM", text: "Final breakfast on deck before the transfer back to Hanoi." }],
      },
    ],
    socialAreas: [
      { name: "Bar", image: img("vermilion-bar") },
      { name: "Library", image: img("vermilion-library") },
    ],
    cabins: [
      {
        name: "Junk Cabin",
        cabinCount: 18,
        guests: "2–3",
        size: "22 m² / 237 ft²",
        beds: "Double/Twin",
        description: "Timber-lined cabins named for the ship's traditional rigging, each with a private balcony.",
        image: img("vermilion-cabin"),
      },
    ],
    features: ["Air conditioning", "Kitchen garden", "Hot showers", "Wi-Fi available"],
    equipment: ["Kayaks", "Hiking poles", "Fishing equipment"],
    relatedSlugs: ["au-co", "jade-serenity"],
  },
  {
    slug: "jade-serenity",
    name: "Jade Serenity",
    tagline: "Wellness-forward sailing with a working spa deck.",
    region: "Ha Long Bay",
    breadcrumbLabel: "Jade Serenity",
    tags: ["deluxe", "honeymoon", "best"],
    durationDays: 3,
    durationNights: 2,
    guestsMax: 40,
    cabinCount: 22,
    startingPrice: 610,
    heroImage: img("jade-hero", 1800, 1000),
    galleryImages: [img("jade-1"), img("jade-2"), img("jade-3")],
    overview: [
      "Jade Serenity is built around its spa deck as much as its itinerary — sunrise yoga, a full treatment menu, and a route that leaves long stretches with nothing on the schedule at all.",
    ],
    lifeOnBoard: ["A largely plant-forward menu with a nightly seafood option, taken on a shaded deck that stays cool through the afternoon."],
    highlights: ["Daily sunrise yoga", "Four-treatment spa menu", "Adults-only sailing"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi — Ha Long Bay",
        location: "Ha Long Bay",
        image: img("jade-day1", 900, 650),
        blocks: [{ period: "PM", text: "Board and sail past Ha Long's karst gate before anchoring for the evening." }],
      },
      {
        day: 2,
        title: "Ha Long Bay",
        location: "Ha Long Bay",
        image: img("jade-day2", 900, 650),
        blocks: [{ period: "AM", text: "Sunrise yoga, then a cave visit before the spa deck opens for the afternoon." }],
      },
      {
        day: 3,
        title: "Ha Long Bay — Hanoi",
        location: "Hanoi",
        image: img("jade-day3", 900, 650),
        blocks: [{ period: "AM", text: "A final treatment before checkout and the transfer back to Hanoi." }],
      },
    ],
    socialAreas: [
      { name: "Spa Deck", image: img("jade-spa") },
      { name: "Yoga Deck", image: img("jade-yoga") },
    ],
    cabins: [
      {
        name: "Serenity Cabin",
        cabinCount: 22,
        guests: "2",
        size: "19 m² / 205 ft²",
        beds: "Double",
        description: "Pale timber cabins designed to stay quiet — minimal hardware, blackout blinds, and a balcony for early tea.",
        image: img("jade-cabin"),
      },
    ],
    features: ["Air conditioning", "Spa", "Yoga deck", "Hot showers"],
    equipment: ["Yoga mats", "Kayaks", "Flashlights"],
    relatedSlugs: ["au-co", "indigo-pearl"],
  },
];

export function getCruiseBySlug(slug: string): Cruise | undefined {
  return cruises.find((c) => c.slug === slug);
}

export function getRelatedCruises(cruise: Cruise): Cruise[] {
  return cruise.relatedSlugs
    .map((slug) => getCruiseBySlug(slug))
    .filter((c): c is Cruise => Boolean(c));
}

export const pressLogos = ["Fodor's", "Bloomberg", "The New York Times", "USA Today", "Travel+Leisure"];
