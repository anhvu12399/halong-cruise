import { NextResponse } from "next/server";
import { mockCruises } from "@/lib/mockData";

export const dynamic = "force-static";

/** Public catalogue export used by the WordPress CMS migration tool.
 * It contains only content already visible on the public website. */
export function GET() {
  return NextResponse.json({
    version: 1,
    generatedAt: new Date().toISOString(),
    cruises: mockCruises,
  });
}
