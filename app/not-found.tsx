import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Home, MessageCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col justify-between">
      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 sm:py-32 text-center relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/[0.04] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          {/* Compass Hallmark */}
          <div className="w-16 h-16 rounded-full bg-charcoal border border-champagne/40 flex items-center justify-center text-champagne mb-6 shadow-luxury">
            <Compass className="w-8 h-8 text-champagne animate-pulse" />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne bg-obsidian/80 px-3.5 py-1 border border-champagne/30 mb-4">
            Atelier Directory • 404 Notice
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4 leading-tight">
            Furniture Piece or Page Not Found
          </h1>

          <p className="text-sand/80 text-sm leading-relaxed max-w-md mb-8 font-sans font-light">
            The page you requested could not be located in our Sankarankovil showcase. Explore our complete handcrafted solid teakwood collection below.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#showcase"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold hover:bg-champagne-light hover:shadow-[0_0_20px_rgba(216,177,106,0.35)] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Furniture Catalogue</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <Home className="w-4 h-4 text-champagne" />
              <span>Back to Home</span>
            </Link>

            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Atelier</span>
            </a>
          </div>

          {/* Sankarankovil Workshop Address Footnote */}
          <div className="mt-12 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-sand/60">
            <Phone className="w-3.5 h-3.5 text-champagne" />
            <span>Showroom Assistance: {BRAND_CONFIG.primaryPhone.display}</span>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
