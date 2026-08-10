import { FrontendPage } from "./types";

export const frontendPages: FrontendPage[] = [
  {
    route: "/about",
    eyebrow: "About us",
    heroTitle: "A small team that's actually sailed these boats.",
    heroSubtitle: "Why we started booking Ha Long Bay cruises directly.",
    heroImage: "https://picsum.photos/seed/about-hero/1800/900",
    contentHtml:
      "<p>We started out frustrated with how hard it was to get a straight answer about which boat was actually worth booking. So we went and sailed most of them ourselves.</p><p>Every cruise on this site has someone on our team who's spent a night aboard it — that's the only way a ship makes it onto the list.</p>",
    sections: [
      {
        title: "Direct rates, always",
        text: "<p>We book straight with each operator. No resale markup, no call centre reading from a script.</p>",
        image: "https://picsum.photos/seed/about-1/900/700",
      },
      {
        title: "A small, opinionated list",
        text: "<p>We'd rather recommend twelve boats we trust than five hundred we've never seen.</p>",
        image: "https://picsum.photos/seed/about-2/900/700",
      },
    ],
    metaTitle: "About — Ha Long Bay Cruises",
    metaDescription: "Why we book Ha Long Bay cruises directly, and how we choose which ships to list.",
  },
];

export function getMockFrontendPage(route: string): FrontendPage | undefined {
  const normalized = "/" + route.replace(/^\/|\/$/g, "");
  return frontendPages.find((p) => p.route === normalized);
}
