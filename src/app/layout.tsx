import type { Metadata } from "next";
import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ha Long Bay Cruise Specialist — Every Budget & Travel Style",
    template: "%s — Ha Long Bay Cruises",
  },
  description:
    "64 handpicked Ha Long Bay cruises from $39/person. Day trips, 2D1N & 3D2N voyages across Ha Long, Lan Ha & Bai Tu Long Bay. Free expert shortlist within 2 hours.",
  metadataBase: new URL("https://www.halongbestcruises.com"),
  keywords: [
    "Ha Long Bay cruise",
    "Halong Bay cruise",
    "Ha Long Bay tour",
    "Lan Ha Bay cruise",
    "Bai Tu Long Bay cruise",
    "Ha Long Bay day cruise",
    "2 day 1 night Halong Bay",
    "3 day 2 night Halong Bay",
    "best Ha Long Bay cruise",
    "luxury Ha Long Bay cruise",
    "Ha Long Bay family cruise",
    "Ha Long Bay honeymoon cruise",
  ],
  authors: [{ name: "Ha Long Best Cruises", url: "https://www.halongbestcruises.com" }],
  creator: "Ha Long Best Cruises",
  publisher: "Ha Long Best Cruises",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.halongbestcruises.com",
    siteName: "Ha Long Best Cruises",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ha Long Bay Cruise Specialist — Every Budget & Travel Style",
    description:
      "64 handpicked cruises across Ha Long, Lan Ha & Bai Tu Long Bay. Free expert shortlist within 2 hours.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
