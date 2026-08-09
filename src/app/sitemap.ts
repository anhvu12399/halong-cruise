import type { MetadataRoute } from "next";
import { getAllCruises } from "@/lib/wp";

const SITE_URL = "https://www.halongbestcruises.com";

const staticRoutes = [
  "", "/cruises", "/about", "/contact", "/planning", "/inquire",
  "/cruises/5-star", "/cruises/best-value", "/cruises/boutique", "/cruises/couples",
  "/cruises/deluxe", "/cruises/family", "/cruises/group", "/cruises/luxury",
  "/cruises/private-charter", "/cruises/small-ship",
  "/guides/bay-comparison", "/guides/best-cruises", "/guides/best-time-to-visit",
  "/guides/cruise-prices", "/guides/hanoi-to-halong", "/guides/how-to-choose",
  "/guides/is-halong-worth-it", "/guides/what-to-pack",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cruises = await getAllCruises();
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/cruises" ? 0.9 : 0.7,
    })),
    ...cruises.map((cruise) => ({
      url: `${SITE_URL}/cruises/${cruise.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
