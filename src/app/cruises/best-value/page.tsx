import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Best Value Ha Long Bay Cruises — Great Ships, Great Prices",
  description:
    "Find the best value Ha Long Bay cruises from $99/person. Comfortable, well-run ships at honest prices — no hidden fees, no resale markup.",
  alternates: { canonical: "https://www.halongbestcruises.com/cruises/best-value" },
};

export default async function BestValuePage() {
  const cruises = await getAllCruises();
  return (
    <CategoryListingPage
      title="Best Value Ha Long Bay Cruises"
      eyebrow="Budget · Under $250/person"
      subtitle="Great ships at honest prices — no hidden fees, no resale markup."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o="
      descriptionParagraphs={[
        "Best value doesn't mean bottom-of-the-barrel. Every ship on this list has been personally reviewed by our team — clean cabins, genuine itineraries, and crew who care. The difference is price, not quality.",
        "Most of these sailings are 2-day 1-night trips, departing daily from Tuan Chau Harbour. They include all meals, kayaking, and cave visits. You won't need to upgrade to enjoy Ha Long Bay.",
      ]}
      keyHighlights={[
        "Ships from $99/person (2D1N)",
        "Day cruises from $39/person",
        "All meals and activities included",
        "Small group departures — not mega-boats",
        "Team-vetted quality standards",
      ]}
      filterFn={(c) =>
        c.tags.includes("best-value") ||
        c.tags.includes("budget") ||
        (c.startingPrice !== null && c.startingPrice < 250)
      }
      allCruises={cruises}
      priceRangeText="$39–$249 per person"
      bestMonthsText="Year-round. Best weather: March–May and September–November."
      expertAdvice="For solo travellers and budget-conscious couples, a 2D1N on a well-run 20-cabin ship beats a day cruise hands-down. The bay looks completely different at dawn."
      faqs={[
        {
          q: "What's the cheapest way to do Ha Long Bay?",
          a: "A Ha Long Bay day cruise starts from around $39/person and includes transport, lunch, and activities. For an overnight experience, 2D1N budget cruises start around $99/person with all meals and kayaking included.",
        },
        {
          q: "Are budget cruises safe and comfortable?",
          a: "Yes — all ships on our list meet Vietnamese maritime safety standards and have been reviewed by our team. Budget ships have smaller, simpler cabins but the bay experience is identical to a luxury sailing.",
        },
        {
          q: "What's included in a best-value cruise?",
          a: "Typically: all meals, guided kayaking or bamboo boat tours, cave visits, welcome drinks, and overnight accommodation. Transfer from Hanoi is usually optional.",
        },
      ]}
    />
  );
}
