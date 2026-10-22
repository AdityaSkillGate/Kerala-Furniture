import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND_CONFIG } from "@/data/brand";
import { ShopClientProvider } from "@/components/providers/ShopClientProvider";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keralafurniture.in"),
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline} | Sankarankovil`,
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/images/logo.png",
  },
  description: `Luxury architectural furniture atelier in Sankarankovil, Tenkasi District. Solid hardwood joinery, custom spatial interiors, and curated living, dining, and bedroom suites. Contact: ${BRAND_CONFIG.phones.map((p) => p.display).join(", ")}.`,
  keywords: [
    "Kerala Furniture Sankarankovil",
    "Furniture showroom Tenkasi",
    "Solid teakwood furniture Sankarankovil",
    "Luxury living room furniture Tamil Nadu",
    "Custom interior woodworking Sankarankovil",
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  openGraph: {
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: `Discover fine artisanal furniture at ${BRAND_CONFIG.address.full}.`,
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="bg-obsidian text-white min-h-screen flex flex-col selection:bg-champagne selection:text-obsidian antialiased">
        <ShopClientProvider>{children}</ShopClientProvider>
      </body>
    </html>
  );
}
