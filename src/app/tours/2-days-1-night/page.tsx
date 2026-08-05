import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "2 Days 1 Night Halong Bay Cruises | Classic Overnight Tour",
  description:
    "Book classic 2-day 1-night Ha Long Bay & Lan Ha Bay overnight cruises. Full board meals, kayaking, cave exploration, sunset party & Tai Chi included.",
};

export default async function TwoDaysOneNightToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="2 Days 1 Night Halong Bay Cruises"
      eyebrow="The Classic Overnight Voyage"
      subtitle="The perfect overnight escape. Sail through iconic limestone karsts, enjoy 4 gourmet meals, kayak through hidden caves, and sleep in a luxury oceanview cabin."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o="
      descriptionParagraphs={[
        "The 2-day 1-night itinerary is the most popular way to experience Ha Long Bay and Lan Ha Bay. Departing around noon from Tuan Chau Marina or Got Port, guests are welcomed with a refreshing drink and lunch as the ship glides into the karst landscape.",
        "Afternoon activities include guided kayaking through limestone arches, visiting ancient stalactite caves (Sung Sot, Dark & Light, or Trung Trang), and swimming in crystal waters.",
        "As dusk falls, enjoy a sundeck sunset party with cocktails, cooking demonstration, multi-course seafood dinner, and night squid fishing before resting in your private oceanfront cabin."
      ]}
      keyHighlights={[
        "4 Full meals onboard (Lunch, Dinner, Breakfast, Brunch)",
        "Overnight stay in air-conditioned oceanview balcony suite",
        "Guided kayaking or bamboo boat ride included",
        "Cave exploration: Sung Sot Cave or Dark & Light Cave",
        "Morning sundeck Tai Chi session & spring roll cooking class"
      ]}
      filterFn={(c) => c.durationDays === 2}
      allCruises={cruises}
      priceRangeText="$160 – $480 / person"
      bestMonthsText="Year-Round"
      expertAdvice="If arriving from Hanoi, book a 2D1N package with limousine transfer. Pickup is around 8:00 AM in Hanoi Old Quarter, returning you by 3:00 PM on Day 2."
      faqs={[
        {
          q: "What is the check-in time for 2D1N cruises?",
          a: "Boarding begins between 11:30 AM and 12:15 PM at Tuan Chau Marina or Got Harbour."
        }
      ]}
    />
  );
}
