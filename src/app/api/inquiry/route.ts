import { NextRequest, NextResponse } from "next/server";

const WP_URL = process.env.WORDPRESS_URL?.replace(/\/$/, "");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json({ ok: false, error: "Missing name or email" }, { status: 400 });
  }

  // Once the companion WordPress plugin is active, this posts to a custom
  // REST route it registers (see wordpress-plugin/halong-cruise-cms.php),
  // which stores the inquiry as a post you can view in wp-admin and — via
  // a standard wp_mail() call in the plugin — emails your reservations inbox.
  if (WP_URL) {
    try {
      const res = await fetch(`${WP_URL}/wp-json/halong/v1/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[inquiry] failed to reach WordPress:", err);
      // fall through to the logging fallback below rather than losing the lead
    }
  }

  // Fallback used in local development, or if WordPress is unreachable:
  // logs the inquiry so nothing is silently dropped. Wire this up to an
  // email provider (Resend, Postmark, SES, etc.) before going to production
  // if you don't want to rely solely on WordPress storage.
  console.log("[inquiry] received (no WordPress configured):", body);
  return NextResponse.json({ ok: true });
}
