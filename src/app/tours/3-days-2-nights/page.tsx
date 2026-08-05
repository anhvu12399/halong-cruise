import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "3 Day 2 Night Ha Long Bay Cruises 2025 — The Full Experience",
  description:
    "Best 3 day 2 night Ha Long Bay cruise packages from $249/person. Reach the quiet bays, visit floating villages, and see Ha Long Bay properly.",
  alternates: { canonical: "https://www.halongbestcruises.com/tours/3-days-2-nights" },
};

export default async function ThreeDayPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="3 Day 2 Night Ha Long Bay Cruises"
      eyebrow="Extended Voyage · The Full Experience"
      subtitle="The best way to see Ha Long Bay — reach the quiet bays, visit villages, kayak at your own pace."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/695679661.webp?k=916cf4caa19f160df7cf7e259a58c22f09bc4afb464e07e9c65ab1a9fe051eea&o="
      descriptionParagraphs={[
        "If a 2D1N cruise shows you Ha Long Bay, a 3D2N cruise lets you experience it. With two nights on the water, ships can reach the quieter corners of the bay that day-trip boats and short overnight cruises never visit: the Vung Vieng Fishing Village, the mangrove forests of Bai Tu Long Bay, and the deserted beaches of the eastern islands.",
        "The itinerary over three days typically includes: two cave visits, kayaking in multiple locations, a floating village boat tour, cooking class, beach barbecue, and two dawn views on deck. Most 3D2N cruises now sail primarily through Lan Ha Bay for the first night, moving deeper into Bai Tu Long for the second.",
      ]}
      keyHighlights={[
        "From $249/person for 3 days 2 nights",
        "Reach Lan Ha Bay and Bai Tu Long Bay",
        "Two cave visits + two kayaking sessions",
        "Floating village and cooking class",
        "Two dawns on the water",
        "Beach barbecue and sunset cocktails",
      ]}
      filterFn={(c) =>
        c.durationNights === 2 ||
        c.durationDays === 3 ||
        c.slug.includes("3-day") ||
        c.slug.includes("3d2n") ||
        c.tags.includes("3d2n")
      }
      allCruises={cruises}
      priceRangeText="$249–$900+ per person (budget to ultra-luxury)"
      bestMonthsText="October–April. Best weather window: Nov–Jan (cool, clear, dry)."
      expertAdvice="On a 3D2N cruise, ask which bays the ship sails to on night two. The best ships go to Bai Tu Long Bay or deep Lan Ha — you should see no other boats when you anchor on night two."
      faqs={[
        {
          q: "How much does a 3 day 2 night Ha Long Bay cruise cost?",
          a: "Budget 3D2N cruises start around $249/person. Mid-range boutique ships run $350–$500/person. Luxury sailings cost $600–$900+ per person. All include meals and activities.",
        },
        {
          q: "What is the itinerary for a 3 day 2 night cruise?",
          a: "Day 1: Hanoi → Harbour → Lunch at sea → Cave → Kayaking → Dinner anchored in Ha Long or Lan Ha Bay. Day 2: Dawn → Floating village or cooking class → Lunch → Beach → Dinner in Bai Tu Long Bay. Day 3: Sunrise → Breakfast → Return to harbour → Hanoi.",
        },
        {
          q: "Is 3 days 2 nights better than 2 days 1 night?",
          a: "For most visitors who can afford the extra night, yes. The second night takes you to parts of the bay that are genuinely less visited. If budget is tight, a well-chosen 2D1N is still excellent.",
        },
        {
          q: "What bays does a 3D2N cruise visit?",
          a: "Typically Ha Long Bay and Lan Ha Bay (nights 1–2), with some ships extending to Bai Tu Long Bay on night two. Ask your operator which anchorage they use for both nights before booking.",
        },
      ]}
    />
  );
}
