import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "2 Day 1 Night Ha Long Bay Cruises 2025 — From $149/Person",
  description:
    "Best 2 day 1 night Ha Long Bay cruise packages from $149/person. Sleep on the water, wake up at dawn among the limestone karsts. Departs daily.",
  alternates: { canonical: "https://www.halongbestcruises.com/tours/2-days-1-night" },
};

export default async function TwoDayPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="2 Day 1 Night Ha Long Bay Cruises"
      eyebrow="Overnight · Most Popular Duration"
      subtitle="Ha Long Bay's most popular cruise format. Sleep among the karsts, wake up on the water — from $149 per person."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o="
      descriptionParagraphs={[
        "The 2-day 1-night Ha Long Bay cruise is the most popular sailing format for good reason: it gives you a proper night on the water without requiring 3+ days of travel time. Departing Hanoi in the morning, you board at Tuan Chau Harbour around midday and spend the afternoon exploring caves and kayaking. Dinner is served as the boat anchors in a quiet bay for the night.",
        "Dawn on Ha Long Bay is the highlight most day-trippers never see — mist rising off the water, no other boats in sight, and the karsts at their most dramatic. A 2D1N cruise gives you that moment. Most ships include swimming, squid fishing at night, and a sunrise deck session before heading back on day two.",
      ]}
      keyHighlights={[
        "From $149/person all-inclusive",
        "Overnight on the bay — dawn views included",
        "Full-day sailing on day one: caves, kayaking, beach",
        "Seafood dinner and breakfast included",
        "Squid fishing, sunrise, and Tai Chi on deck",
        "Return to Hanoi by 4:00 PM on day two",
      ]}
      filterFn={(c) =>
        c.durationNights === 1 ||
        c.durationDays === 2 ||
        c.slug.includes("2-day") ||
        c.slug.includes("2d1n") ||
        c.tags.includes("2d1n")
      }
      allCruises={cruises}
      priceRangeText="$149–$450 per person (budget to luxury)"
      bestMonthsText="Year-round. October–April for calmer seas and better visibility."
      expertAdvice="For a 2D1N cruise, the ship matters more than the itinerary — all 2D1N routes are broadly similar. Spend your research time on cabin quality and crew reviews, not itinerary differences."
      faqs={[
        {
          q: "How much does a 2 day 1 night Ha Long Bay cruise cost?",
          a: "Prices range from $149/person on well-run budget ships to $450/person on luxury boutique vessels. The mid-range ($200–$300) offers the best value: comfortable cabins, good food, and small groups.",
        },
        {
          q: "What is included in a 2D1N Ha Long Bay cruise?",
          a: "Typically: hotel transfer from Hanoi, all meals (lunch D1, dinner, breakfast D2), guided cave tour, kayaking or bamboo boat, beach swim, squid fishing, and all activities. Alcohol is usually extra.",
        },
        {
          q: "Is 2 days 1 night enough for Ha Long Bay?",
          a: "Yes — for first-time visitors, a 2D1N cruise gives you everything: the karst scenery, a cave, kayaking, a night anchored in the bay, and a dawn view. Many travellers wish they'd done 3 nights, but 2D1N is never regretted.",
        },
        {
          q: "What time does a 2D1N cruise depart and return?",
          a: "Hanoi hotel pick-up is typically 7:30–8:00 AM on day one. Boarding at Tuan Chau is 11:30 AM–noon. The cruise returns to harbour around 11:30 AM on day two, arriving back in Hanoi by 3:30–4:00 PM.",
        },
      ]}
    />
  );
}
