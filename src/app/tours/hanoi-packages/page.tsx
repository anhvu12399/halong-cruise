import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Hanoi to Halong Bay Cruise Packages | Door-to-Door Transfers Included",
  description:
    "All-inclusive Hanoi to Ha Long Bay cruise packages. Luxury DCar Limousine transfer, hotel pickup, meals, kayaking & full 5-star service included.",
};

export default async function HanoiPackagesToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Hanoi to Halong Bay Packages"
      eyebrow="All-Inclusive Door-to-Door Tour Packages"
      subtitle="Hassle-free luxury cruise packages including round-trip Hanoi Old Quarter Limousine transfers, hotel door-to-door pickup, full board meals, kayaking, and cave tours."
      heroImage="https://aw-d.tripcdn.com/images/0222512000kyffcwo5D55.jpg"
      descriptionParagraphs={[
        "Our Hanoi to Ha Long Bay Cruise Packages take care of every detail from the moment you step out of your Hanoi hotel lobby until your safe return.",
        "Travel in comfort aboard 9-seat DCar Luxury Limousines equipped with plush leather recliner seats, Wi-Fi, and USB ports. The 2-hour journey via the Hanoi - Hai Phong Expressway includes a brief refreshment stop.",
        "Upon arrival at the marina, seamless VIP express check-in ensures you step onto your 5-star ship without queuing."
      ]}
      keyHighlights={[
        "Round-trip DCar Luxury Limousine transfers included",
        "Hotel door-to-door pickup & dropoff in Hanoi Old Quarter",
        "2-Hour fast highway travel via Hanoi - Hai Phong Expressway",
        "Full board meals, kayaking, cave tickets & guide fees included",
        "24/7 Personal trip coordinator support via WhatsApp"
      ]}
      filterFn={(c) => c.tags.includes("best") || c.tags.includes("luxury")}
      allCruises={cruises}
      priceRangeText="$220 – $680 / person (All-inclusive with transfers)"
      bestMonthsText="Year-Round"
      expertAdvice="Limousine pickup starts between 8:00 AM and 8:30 AM from Hanoi Old Quarter hotels. If staying outside the Old Quarter, we arrange meeting point transfer or private car pickup."
      faqs={[
        {
          q: "Can I be picked up directly at Hanoi Noi Bai Airport (HAN)?",
          a: "Yes! Private car airport transfers can be arranged directly to the cruise port or back to the airport after disembarkation."
        }
      ]}
    />
  );
}
