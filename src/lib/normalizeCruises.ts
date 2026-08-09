import type { Cabin, Cruise } from "./types";

const DURATION_SUFFIX = /\s*(?:[-–—]\s*)?(?:2\s*days?\s*1\s*night|3\s*days?\s*2\s*nights?|2d1n|3d2n).*$/i;

function cleanCabinName(name: string) {
  return name.replace(DURATION_SUFFIX, "").replace(/\s+/g, " ").trim();
}

function cleanCabinDescription(description: string, name: string) {
  return description
    .replace(/show prices?/gi, "")
    .replace(new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"), "")
    .replace(/\s+/g, " ")
    .trim();
}

const ROOM_IMAGE = /\b(bed|bedroom|bathroom|bath|bathtub|shower|toilet|sink|vanity|suite|cabin|room|balcony|terrace|wardrobe)\b/i;
const NON_ROOM_IMAGE = /\b(map|route|cave|restaurant|dining room|sundeck|sun deck|pool|kayak|boat|ship|cruise ship|mountain|island|beach|buffet|food|kitchen|bar|spa|massage|reception|lobby|gym)\b/i;

function isVerifiedRoomImage(url: string, altByUrl: Map<string, string>) {
  const alt = altByUrl.get(url) || "";
  const strongRoomSignal = /\b(bed|bedroom|bathroom|bath|bathtub|shower|toilet|sink|vanity)\b/i.test(alt);
  return ROOM_IMAGE.test(alt) && (strongRoomSignal || !NON_ROOM_IMAGE.test(alt));
}

function normalizeCabins(cabins: Cabin[], altByUrl: Map<string, string>): Cabin[] {
  const unique = new Map<string, Cabin>();
  for (const source of cabins || []) {
    const name = cleanCabinName(source.name || "Cabin");
    const key = name.toLowerCase();
    const gallery = Array.from(new Set([source.image, ...(source.galleryImages || [])].filter(Boolean)))
      .filter((url) => isVerifiedRoomImage(url, altByUrl));
    const cabin = {
      ...source,
      name,
      description: cleanCabinDescription(source.description || "", name),
      image: gallery[0] || "",
      galleryImages: gallery,
    };
    const current = unique.get(key);
    if (!current) unique.set(key, cabin);
    else {
      current.cabinCount = Math.max(current.cabinCount || 0, cabin.cabinCount || 0);
      current.galleryImages = Array.from(new Set([...(current.galleryImages || []), ...gallery]));
    }
  }

  const result = Array.from(unique.values());
  const mainUsage = new Map<string, number>();
  for (const cabin of result) if (cabin.image) mainUsage.set(cabin.image, (mainUsage.get(cabin.image) || 0) + 1);
  const shown = new Set<string>();
  return result.map((cabin) => {
    if (!cabin.image || (mainUsage.get(cabin.image) || 0) < 3) return cabin;
    if (!shown.has(cabin.image)) {
      shown.add(cabin.image);
      return cabin;
    }
    // A scraped booking rate often assigns one generic room gallery to many
    // differently named cabins. Keep the cabin facts, but do not mislabel the
    // same photos as belonging to every category.
    return { ...cabin, image: "", galleryImages: [] };
  });
}

export function normalizeCruise(cruise: Cruise): Cruise {
  const altByUrl = new Map((cruise.photos || []).map((photo) => [photo.url, photo.alt || ""]));
  return {
    ...cruise,
    galleryImages: Array.from(new Set(cruise.galleryImages || [])),
    cabins: normalizeCabins(cruise.cabins || [], altByUrl),
  };
}

export function normalizeCruiseCatalog(cruises: Cruise[]): Cruise[] {
  const unique = new Map<string, Cruise>();
  for (const cruise of cruises) if (!unique.has(cruise.slug)) unique.set(cruise.slug, normalizeCruise(cruise));
  return Array.from(unique.values());
}
