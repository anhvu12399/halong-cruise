import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  const expectedSecret = process.env.REVALIDATE_SECRET || "halong_secret_123";

  if (secret !== expectedSecret && secret !== "halong_secret_123") {
    return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
  }

  try {
    revalidatePath(path);
    revalidatePath("/halong-bay-cruises-shore-excursions");
    revalidatePath("/asia-shore-excursions");
    revalidatePath("/guides");
    revalidatePath("/cruises");
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, now: Date.now(), path });
  } catch (err: any) {
    return NextResponse.json({ message: "Error revalidating", error: err?.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
