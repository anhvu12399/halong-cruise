import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Ha Long Bay Group Cruises & Private Charters",
  description:
    "Group cruises and private charters on Ha Long Bay. Ships for 8 to 60 guests. Corporate retreats, celebrations, and custom itineraries.",
  alternates: { canonical: "https://www.halongbestcruises.com/cruises/group" },
};

export default async function GroupPage() {
  const cruises = await getAllCruises();
  return (
    <CategoryListingPage
      cmsSlug="group"
      title="Ha Long Bay Group Cruises & Charters"
      eyebrow="Groups · Corporate · Celebrations"
      subtitle="From 8 to 60 guests. Your group, your itinerary, your boat."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/540224451.webp?k=9275ad9f8fdad3bc9867f4f78fce11784317bb543b6539c8255cb7f4bd1ff16d&o="
      descriptionParagraphs={[
        "Ha Long Bay is a spectacular setting for a group experience — whether that's a family reunion, a corporate retreat, a wedding sailing, or a group of friends celebrating a milestone. We work with ships from 10 to 60+ cabin capacity, all bookable as private charters.",
        "Group bookings through us include dedicated coordination from our local team: custom menus, onboard presentations, kayaking guides, squid fishing nights, and whatever your group needs to make the trip memorable.",
      ]}
      keyHighlights={[
        "Private charters from 10 cabins upward",
        "Custom menus and activities",
        "Corporate team-building packages",
        "Wedding and celebration sailings",
        "Group rates available on enquiry",
      ]}
      filterFn={(c) =>
        c.tags.includes("group") ||
        c.tags.includes("charter") ||
        c.guestsMax >= 30
      }
      allCruises={cruises}
      priceRangeText="From $2,500/vessel per night (charter). Individual cabin from $149/person."
      bestMonthsText="September–May. Avoid typhoon season June–August for large groups."
      expertAdvice="For groups of 10+, a full charter is almost always cheaper per person than individual bookings — and you get complete flexibility on timing and activities."
      faqs={[
        {
          q: "How big a group can Ha Long Bay cruise ships accommodate?",
          a: "Ships range from 10-cabin boutique vessels to larger 30+ cabin ships. For very large groups (50+), we can coordinate a fleet of two smaller ships sailing together.",
        },
        {
          q: "Can we get a custom itinerary for our group?",
          a: "Yes. Private charters allow full itinerary customisation — departure time, routes, activity schedule, and menu. Contact us to start the planning process.",
        },
        {
          q: "Are there group discounts?",
          a: "For groups booking 8+ cabins, we can negotiate directly with operators for reduced rates. WhatsApp us with your group size and dates for a custom quote.",
        },
      ]}
    />
  );
}
