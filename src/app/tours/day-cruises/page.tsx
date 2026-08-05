import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Halong Bay Day Cruises | 6 to 8 Hour Luxury Express Sailings",
  description:
    "Explore Ha Long Bay in a single day. 6-8 hour luxury catamaran & day cruises with buffet lunch, cave tours, kayaking & same-day Hanoi return.",
};

export default async function DayCruisesToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Halong Bay Day Cruises"
      eyebrow="Express 6-8 Hour Luxury Voyages"
      subtitle="Short on time? Experience Ha Long Bay's iconic limestone karsts, cave tours, and kayaking on a luxury 6 to 8-hour day catamaran with same-day Hanoi return."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/540224451.webp?k=9275ad9f8fdad3bc9867f4f78fce11784317bb543b6539c8255cb7f4bd1ff16d&o="
      descriptionParagraphs={[
        "Halong Bay Day Cruises are designed for travelers with limited time who still want to witness UNESCO World Heritage scenery without spending the night on water.",
        "Modern luxury day catamarans (like Halong Catamaran or Orchid Day Cruise) offer 6 to 8 hours of sailing, featuring open sundecks, outdoor Jacuzzis, water slides, and lavish international buffet lunches.",
        "The itinerary covers core highlights: Sung Sot Cave (Surprise Cave), Luon Cave kayaking, Titov Island panoramic viewpoint, and sunset tea ceremony before returning to Hanoi by 8:30 PM."
      ]}
      keyHighlights={[
        "6 to 8 Hours of scenic bay sailing",
        "International buffet lunch with seafood specialties",
        "Sung Sot Cave entrance & Titov Island beach climb",
        "Kayaking or bamboo boat ride through Luon Cave",
        "Express Hanoi transfer via expressway (Same day return)"
      ]}
      filterFn={(c) => c.durationDays === 1 || c.slug.includes("day") || c.slug.includes("catamaran")}
      allCruises={cruises}
      priceRangeText="$75 – $140 / person (Includes lunch & activities)"
      bestMonthsText="Year-Round"
      expertAdvice="Choose an 8-hour day cruise (like Halong Catamaran) over cheap 4-hour options to reach the far scenic parts of the bay instead of staying near the busy harbor."
      faqs={[
        {
          q: "What time does a day cruise start and return?",
          a: "Hanoi pickup is at 7:00–7:30 AM. Boarding at harbor is at 10:00 AM. Sailing returns to harbor at 5:30 PM, arriving back in Hanoi Old Quarter around 8:00–8:30 PM."
        }
      ]}
    />
  );
}
