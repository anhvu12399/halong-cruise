import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Halong Bay Family Cruise Packages | Interconnecting Cabins & Kids Free",
  description:
    "All-inclusive family Ha Long Bay cruise packages. Connecting family suites, child discounts, kid-friendly activities, swimming pools, and safe transfers.",
};

export default async function FamilyPackagesToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Halong Bay Family Packages"
      eyebrow="All-Inclusive Family Tour Packages"
      subtitle="Complete family vacation packages including interconnecting family suites, private limousine transfers from Hanoi, child discounts, and engaging activities for all ages."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o="
      descriptionParagraphs={[
        "Planning a family trip to Vietnam should be stress-free. Our family cruise packages combine luxury vessel accommodation with seamless private transfer logistics, ensuring your family travels in comfort.",
        "Cruises feature dedicated family connecting suites (up to 55m²), onboard swimming pools, children's menu options, and interactive cultural activities like spring roll masterclasses, morning Tai Chi, and night squid fishing.",
        "Child pricing policies are generous: infants under 4 stay free, while children 5–11 enjoy discounted rates."
      ]}
      keyHighlights={[
        "Spacious connecting family suites with private balcony",
        "Generous child discounts (Infants free, kids 25-50% off)",
        "Sundeck swimming pool & safe solid railings",
        "Kid-friendly food options & spring roll cooking class",
        "Door-to-door Hanoi Limousine van transfer included"
      ]}
      filterFn={(c) => c.tags.includes("family") || c.cabins.some(cb => cb.name.toLowerCase().includes("family") || cb.name.toLowerCase().includes("connecting"))}
      allCruises={cruises}
      priceRangeText="$260 – $580 / person (Child discounts apply)"
      bestMonthsText="Mar – Aug (Warm water for family swimming & kayaking)"
      expertAdvice="Book connecting family suites early as ships usually only have 2 to 4 connecting suites per vessel."
      faqs={[
        {
          q: "What is the policy for extra beds for children?",
          a: "Most 5-star cabins allow 1 extra bed or rollaway bed per room for a child. Infants can share existing double bedding with parents at no extra charge."
        }
      ]}
    />
  );
}
