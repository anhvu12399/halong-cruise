import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Ha Long Bay Day Cruises 2025 — From $39/Person, Same-Day Return",
  description:
    "Best Ha Long Bay day cruises from $39/person. 6–8 hour sailings with buffet lunch, cave tours, kayaking and same-day Hanoi return. Departs daily.",
  alternates: { canonical: "https://www.halongbestcruises.com/tours/day-cruises" },
};

export default async function DayCruisesToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Ha Long Bay Day Cruises"
      eyebrow="6–8 Hours · Same-Day Return to Hanoi"
      subtitle="Experience UNESCO-listed limestone karsts, sea caves, and kayaking — all in a single day, with a same-day return to Hanoi."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/540224451.webp?k=9275ad9f8fdad3bc9867f4f78fce11784317bb543b6539c8255cb7f4bd1ff16d&o="
      descriptionParagraphs={[
        "A Ha Long Bay day cruise is the perfect option if you're short on time but don't want to skip one of the world's most beautiful natural wonders. Modern day cruises depart from Tuan Chau Harbour (2.5 hours from Hanoi) and spend 6–8 hours sailing through the limestone karst islands before returning in time for dinner.",
        "Good day cruises include a sit-down seafood lunch, guided cave visits (typically Sung Sot Cave), kayaking through Luon Cave's tunnel, and a stop at Titov Island for a beach swim. We only list ships that go far enough into the bay to leave the harbour traffic behind.",
      ]}
      keyHighlights={[
        "From $39/person — best-value Ha Long Bay experience",
        "6–8 hours of sailing among the karsts",
        "Lunch, cave tour, and kayaking included",
        "Same-day return to Hanoi",
        "Departs daily from Tuan Chau Harbour",
        "Small-group and private options available",
      ]}
      filterFn={(c) =>
        c.durationDays === 1 ||
        c.durationNights === 0 ||
        c.slug.includes("day") ||
        c.slug.includes("catamaran") ||
        c.tags.includes("day-cruise")
      }
      allCruises={cruises}
      priceRangeText="$39–$140 per person (includes lunch and activities)"
      bestMonthsText="Year-round. Best visibility: October–April (dry season)."
      expertAdvice="Choose a cruise that sails at least 20km from the harbour — you want to reach Luon Cave and Sung Sot Cave, not spend 4 hours near the pier. We only list boats that do."
      faqs={[
        {
          q: "How much does a Ha Long Bay day cruise cost?",
          a: "Ha Long Bay day cruises range from $39 to $140 per person. Budget options include a basic lunch and one cave visit; premium day cruises include a hot buffet, kayaking, Titov Island, and unlimited drinks.",
        },
        {
          q: "What time does the day cruise start and finish?",
          a: "Hotel pick-up in Hanoi Old Quarter is around 7:30 AM. Boarding at Tuan Chau Harbour is around 10:00–11:00 AM. The boat returns to harbour around 5:00–5:30 PM, arriving back in Hanoi around 8:00–8:30 PM.",
        },
        {
          q: "Is a day cruise worth it?",
          a: "Yes, if your itinerary doesn't allow an overnight stay. A well-chosen day cruise still gives you 6–8 hours among the karsts with cave tours, kayaking, and lunch. For the full experience, we recommend a 2D1N cruise.",
        },
        {
          q: "What's included in a Ha Long Bay day cruise?",
          a: "Most include: return transfer from Hanoi, seafood lunch, guided cave visit, kayaking or bamboo boat ride, and Titov Island stop. Premium cruises also include open bar, swimming, and private sundeck access.",
        },
      ]}
    />
  );
}
