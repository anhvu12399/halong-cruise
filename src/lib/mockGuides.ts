import { Guide } from "./types";

const p = (text: string) => `<p>${text}</p>`;

export const guides: Guide[] = [
  {
    slug: "best-time-to-visit-ha-long-bay",
    title: "The best time to visit Ha Long Bay",
    excerpt: "Weather, crowds, and water clarity change more than you'd think across the seasons — here's how to time it.",
    coverImage: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.jpg?k=211297536d21da0f27b9567678c717d3603a4d909e41167d9b6503efd4bc55f8&o=&hp=1",
    region: "Ha Long Bay",
    readMinutes: 6,
    publishedAt: "Jul 2026",
    relatedCruiseSlugs: ["majesty-luxury-prime-cruise-by-premier-group", "genesis-luxury-regal-cruise-by-premier-group"],
    bodyHtml: [
      p("October through December gets the most recommendations, and for good reason: skies are clearer, humidity drops, and the karsts photograph the way you've seen them online. It's also the busiest stretch — book six to eight weeks out for anything with fewer than 20 cabins."),
      "<h3>Shoulder season: March–April, late September</h3>",
      p("Fewer boats, occasional haze, water still calm enough for kayaking most days. This is where you get a quiet anchorage without paying peak rates."),
      "<h3>Summer: May–August</h3>",
      p("Warmest water, best for swimming off the sundeck, but also typhoon season — itineraries can shift with a day's notice. Worth it if flexibility doesn't bother you; worth avoiding if it's a once-a-decade trip."),
      "<h3>Winter: January–February</h3>",
      p("Cool and often misty — beautiful in photos, less so if you were picturing a swim. Good time for the lowest rates and the emptiest bays."),
    ].join(""),
  },
  {
    slug: "ha-long-vs-lan-ha-bay",
    title: "Ha Long Bay or Lan Ha Bay — which one, actually",
    excerpt: "Same limestone, very different traffic. A straight answer on which bay fits which trip.",
    coverImage: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/294655147.jpg?k=1c13cce7a0f9d3f6b4a0ec31c52fe348513b26920c11bd680643c4a7aff977b9&o=",
    readMinutes: 5,
    publishedAt: "Jun 2026",
    relatedCruiseSlugs: ["genesis-luxury-regal-cruise-by-premier-group", "mon-cheri-cruises"],
    bodyHtml: [
      p("Ha Long Bay is the name everyone knows, the UNESCO site, and — as a direct result — the busiest water in northern Vietnam. Lan Ha Bay sits just south, same geology, a fraction of the boat traffic, because most large ships still depart from Ha Long City rather than Cat Ba."),
      "<h3>Pick Ha Long if</h3>",
      p("You want the iconic sights (Sung Sot Cave, Ti Top Island) and don't mind sharing them with other boats."),
      "<h3>Pick Lan Ha if</h3>",
      p("You'd rather kayak into a quiet lagoon than tick off a list, or you're on a smaller ship where the point is the water, not the itinerary."),
      p("Most 2–3 day cruises now sail a mix of both — check the itinerary map on each cruise page rather than assuming from the name."),
    ].join(""),
  },
  {
    slug: "what-to-pack-for-a-bay-cruise",
    title: "What to actually pack for a Ha Long Bay cruise",
    excerpt: "Shorter than most packing lists, because most of what you'll read online is padding.",
    coverImage: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783924563.jpg?k=a0d48a2293f3571e21b105f812db19e32e2bcbaf230265aeb05a952bc38e6a48&o=&hp=1",
    readMinutes: 4,
    publishedAt: "May 2026",
    relatedCruiseSlugs: ["mon-cheri-cruises"],
    bodyHtml: [
      p("Boats run air conditioning and provide towels, so you don't need to overpack. What actually matters:"),
      "<ul><li>Reef-safe sunscreen — cheap sunscreen is the one thing every cabin runs out of</li><li>A dry bag for the kayak excursions</li><li>Light layers for the sundeck after sunset, even in summer</li><li>Cash — most on-board bars and spas don't take cards</li><li>Motion-sickness tablets if you're prone to it; the bay is usually calm, but not always</li></ul>",
      p("Skip the hiking boots unless your itinerary specifically includes Cat Ba National Park — deck shoes cover almost everything else."),
    ].join(""),
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
