import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Deluxe Ha Long Bay Cruises — Comfortable, Stylish, Great Value",
  description:
    "Deluxe Ha Long Bay cruises from $150–$350/person. The best middle ground — stylish ships, balcony cabins, good food, and small groups. Not budget, not over-the-top.",
  alternates: { canonical: "https://www.halongbestcruises.com/cruises/deluxe" },
};

export default async function DeluxePage() {
  const cruises = await getAllCruises();
  return (
    <CategoryListingPage
      cmsSlug="deluxe"
      title="Deluxe Ha Long Bay Cruises"
      eyebrow="$150–$350/person · The Sweet Spot"
      subtitle="Stylish ships, balcony cabins, and good food — without the luxury price tag."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o="
      descriptionParagraphs={[
        "Deluxe cruises occupy the sweet spot of Ha Long Bay sailing: significantly better than a budget boat, without the premium price of a five-star operator. You get balcony cabins with proper bay views, a proper restaurant with a set menu, and a small-group feel — typically 20–30 cabins.",
        "Most of our most-recommended ships fall into this category. The crew-to-guest ratio is better than budget, the itineraries go further, and the cabins are genuinely comfortable. For most travellers, this is the right tier.",
      ]}
      keyHighlights={[
        "Balcony cabins with bay views",
        "Set-menu restaurant dining",
        "20–30 cabin ships — small group feel",
        "Guided cave tours and kayaking included",
        "From $150/person (2D1N)",
      ]}
      filterFn={(c) =>
        c.tags.includes("deluxe") ||
        c.tags.includes("boutique") ||
        (c.startingPrice !== null && c.startingPrice >= 150 && c.startingPrice <= 400)
      }
      allCruises={cruises}
      priceRangeText="$150–$400 per person"
      bestMonthsText="Year-round. October–April for best conditions."
      expertAdvice="In our experience, travellers who 'upgraded' from budget to deluxe on a second trip almost never go back. The difference in cabin quality and food is material — and the price difference is often only $50–80 per person."
      faqs={[
        {
          q: "What is the difference between deluxe and luxury on Ha Long Bay?",
          a: "Deluxe ships ($150–$350/person) have comfortable balcony cabins, set-menu dining, and good activities. Luxury ships ($400+/person) add butler service, premium wine lists, larger suites with bathtubs, and more exclusive anchorages. Both are well above budget class.",
        },
        {
          q: "Which deluxe Ha Long Bay cruise is best?",
          a: "It depends on your priorities. For couples, we recommend ships with private balcony suites. For families, look for ships with connecting cabins and child activities. Request our free shortlist and we'll match you to the right one.",
        },
      ]}
    />
  );
}
