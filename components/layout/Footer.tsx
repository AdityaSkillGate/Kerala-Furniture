"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ArrowUp,
  Globe,
  Shield,
  FileText,
  X,
  Compass,
} from "lucide-react";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export interface FooterProps {
  currentLang?: string;
}

export const Footer: React.FC<FooterProps> = () => {
  const { lang, setLang, t } = useLanguage();
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-white border-t border-white/10 relative overflow-hidden">
      {/* 1. Subtle Ambient Atelier Background Glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-champagne/[0.02] blur-[150px] pointer-events-none" />

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand Identity & Ethos (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo size="lg" href="/#home" onClick={scrollToTop} />

            <div className="flex items-center gap-2 pt-1">
              <div className="h-[1px] w-6 bg-champagne/60" />
              <p className="text-sand text-xs uppercase tracking-[0.2em] font-mono">
                {lang === "ta" ? BRAND_CONFIG.taglineTamil : BRAND_CONFIG.tagline}
              </p>
            </div>

            <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed mt-1">
              {lang === "ta"
                ? "சங்கரன்கோவில், தென்காசி மற்றும் தென் தமிழக இல்லங்களுக்கான பிரத்யேக திட மரத் தளவாடங்கள். தலைமுறைகளுக்கு நிலைத்து நிற்கும் பக்குவப்படுத்தப்பட்ட தேக்கு மற்றும் ஈட்டி மர வேலைப்பாடுகள்."
                : "Curating architectural solid-hardwood furniture and bespoke interior carpentry for discerning residences across Sankarankovil, Tenkasi, and Southern Tamil Nadu."}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-[11px] font-mono text-white/50">
                {lang === "ta" ? "நேரடி ஆலோசனை:" : "Direct Consultation Desk:"}
              </span>
              <a
                href={`tel:+91${BRAND_CONFIG.primaryPhone.raw}`}
                className="text-champagne text-xs font-mono font-semibold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{BRAND_CONFIG.primaryPhone.display}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Furniture Categories (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne font-mono">
              {t.footer.collectionsSectionTitle}
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70 font-sans">
              <li>
                <Link href="/#collections" className="hover:text-champagne transition-colors">
                  {t.categories.sofas}
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-champagne transition-colors">
                  {t.categories.bedroom}
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-champagne transition-colors">
                  {t.categories.dining}
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-champagne transition-colors">
                  {t.categories.wardrobes}
                </Link>
              </li>
              <li>
                <Link href="/#bespoke" className="hover:text-champagne transition-colors">
                  {t.categories.custom}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Spaces (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne font-mono">
              {t.footer.navSectionTitle}
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/70 font-sans">
              <li>
                <Link href="/#home" onClick={scrollToTop} className="hover:text-champagne transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-champagne transition-colors">
                  {t.nav.collections}
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-champagne transition-colors">
                  {lang === "ta" ? "காட்சிப் பட்டியல்" : "Showroom Catalogue"}
                </Link>
              </li>
              <li>
                <Link href="/#bespoke" className="hover:text-champagne transition-colors">
                  {t.nav.customFurniture}
                </Link>
              </li>
              <li>
                <Link href="/#showroom" className="hover:text-champagne transition-colors">
                  {t.nav.showroom}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-champagne transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Showroom Address & Verified Contact Lines (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne font-mono">
              {t.showroom.officialShowroomBadge}
            </span>

            {/* Address Block */}
            <div className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed bg-obsidian/60 p-3.5 border border-white/5">
              <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 font-sans">
                <span className="font-semibold text-white">{BRAND_CONFIG.name}</span>
                <span>{BRAND_CONFIG.address.line1}, {BRAND_CONFIG.address.street}</span>
                <span>{BRAND_CONFIG.address.city} - {BRAND_CONFIG.address.pin}</span>
                <span>{BRAND_CONFIG.address.district}, {BRAND_CONFIG.address.state}, India</span>
              </div>
            </div>

            {/* All Three Required Contact Lines */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-[10px] text-sand/60 uppercase font-mono tracking-wider">
                {t.showroom.telephoneLinesLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {BRAND_CONFIG.phones.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.tel}
                    className="p-2 bg-obsidian border border-white/10 hover:border-champagne/60 text-white flex flex-col text-center transition-all group focus-ring"
                    title={`Call ${phone.display}`}
                  >
                    <span className="text-[9px] text-sand/50 uppercase font-mono group-hover:text-champagne">
                      {phone.label}
                    </span>
                    <span className="font-mono text-xs font-medium text-white group-hover:text-champagne">
                      {phone.display}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Actions: Directions and WhatsApp CTA */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={BRAND_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-obsidian border border-white/20 text-white hover:border-champagne hover:text-champagne text-xs font-mono uppercase tracking-wider transition-all focus-ring text-center"
              >
                <span>{t.showroom.getDirectionsCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono uppercase tracking-wider transition-all shadow-subtle focus-ring text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Middle Bar: Language Switcher, Back to Top, and Legal Placeholders */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          {/* Reusable Bilingual Language Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-white/40 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-champagne" />
              <span>Language / மொழி:</span>
            </span>
            <div className="flex items-center border border-white/20 rounded-xs overflow-hidden bg-obsidian">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "px-3 py-1 text-xs transition-colors focus-ring",
                  lang === "en"
                    ? "bg-champagne text-obsidian font-semibold"
                    : "text-white/70 hover:text-white"
                )}
                aria-pressed={lang === "en"}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("ta")}
                className={cn(
                  "px-3 py-1 text-xs transition-colors focus-ring",
                  lang === "ta"
                    ? "bg-champagne text-obsidian font-semibold"
                    : "text-white/70 hover:text-white"
                )}
                aria-pressed={lang === "ta"}
              >
                தமிழ்
              </button>
            </div>
          </div>

          {/* Legal Disclaimers & Back to Top */}
          <div className="flex items-center gap-5 text-white/60 text-xs">
            <button
              type="button"
              onClick={() => setActiveModal("privacy")}
              className="hover:text-champagne transition-colors underline-offset-4 hover:underline"
            >
              {lang === "ta" ? "தனியுரிமைக் கொள்கை" : "Privacy Policy"}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveModal("terms")}
              className="hover:text-champagne transition-colors underline-offset-4 hover:underline"
            >
              {lang === "ta" ? "ஷோரூம் நிபந்தனைகள்" : "Terms of Service"}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-champagne hover:text-champagne-light transition-colors focus-ring p-1"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === "ta" ? "மேலே செல்ல" : "Back to Top"}</span>
            </button>
          </div>
        </div>

        {/* 4. Bottom Row: Copyright & Clear Proof-of-Concept Notice */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.name}, Sankarankovil. {t.footer.allRightsReserved}
          </div>
          <div className="text-sand/70 text-center md:text-right text-[11px] max-w-xl font-mono">
            {t.footer.pocNotice}
          </div>
        </div>
      </div>

      {/* 5. Accessible Modal for Privacy Policy / Showroom Terms Placeholder */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
          className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-charcoal border border-champagne/40 max-w-lg w-full p-6 sm:p-8 text-white shadow-luxury animate-in fade-in zoom-in-95 duration-200 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                {activeModal === "privacy" ? (
                  <Shield className="w-5 h-5 text-champagne" />
                ) : (
                  <FileText className="w-5 h-5 text-champagne" />
                )}
                <h3 className="font-serif text-lg text-white font-medium">
                  {activeModal === "privacy"
                    ? lang === "ta"
                      ? "தனியுரிமைக் கொள்கை (Privacy Policy)"
                      : "Showroom Privacy Policy"
                    : lang === "ta"
                    ? "ஷோரூம் நிபந்தனைகள் (Terms of Service)"
                    : "Showroom Terms & Demonstration Notice"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-white/60 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-sand/80 leading-relaxed font-sans">
              {activeModal === "privacy" ? (
                <>
                  <p>
                    <strong>Proof of Concept Demonstration:</strong> This website is an interactive proof of concept built for Kerala Furniture, located in Sankarankovil, Tenkasi District, Tamil Nadu.
                  </p>
                  <p>
                    <strong>Zero Tracking & Zero Data Retention:</strong> We do not deploy tracking cookies, third-party analytics pixels, or commercial tracking beacons. Any product favorites or demo cart shortlists are stored strictly inside your browser&apos;s local storage memory (`localStorage`) and are never dispatched to remote servers.
                  </p>
                  <p>
                    <strong>Direct Communication:</strong> When you initiate a phone call or click to message via WhatsApp, communication is routed directly through your personal device to official Kerala Furniture staff.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Sample Content & Illustrative Pricing:</strong> All prices, furniture piece dimensions, and finish descriptions featured in this online showcase are sample demonstration values. They do not constitute a formal commercial binding quotation.
                  </p>
                  <p>
                    <strong>No E-Commerce Transactions:</strong> This showcase does not provide online payment checkout, credit card processing, or automated shipping dispatch. Actual procurement, timber inspection, and custom woodwork agreements are finalized in person at our Sankarankovil showroom.
                  </p>
                  <p>
                    <strong>Showroom Assistance:</strong> For verified pricing and timber availability, please consult our staff via our registered showroom phone lines ({BRAND_CONFIG.phones.map((p) => p.display).join(", ")}) or WhatsApp.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-champagne text-obsidian text-xs uppercase tracking-wider font-semibold hover:bg-champagne-light transition-colors"
              >
                {lang === "ta" ? "சரி (Close)" : "I Understand"}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
