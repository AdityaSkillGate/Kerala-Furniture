"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Sofa,
  Bed,
  Utensils,
  DoorClosed,
  Hammer,
  Sparkles,
  ArrowRight,
  TreePine,
} from "lucide-react";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";
import { TRANSLATIONS, SupportedLanguage } from "@/data/translations";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface NavbarProps {
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const { lang: contextLang, setLang: contextSetLang, toggleLang } = useLanguage();
  const effectiveLang = onLanguageChange ? (currentLang || contextLang) : contextLang;
  const t = TRANSLATIONS[effectiveLang];

  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);

  // 1. GSAP ScrollTrigger for Frosted-Glass & Seamless Padding Shrink
  useEffect(() => {
    if (typeof window === "undefined" || !navContainerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -15",
        end: "+=1",
        onEnter: () => {
          gsap.to(navContainerRef.current, {
            backgroundColor: "rgba(18, 16, 15, 0.85)",
            backdropFilter: "blur(14px)",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
            borderColor: "rgba(212, 175, 55, 0.25)",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            duration: 0.3,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(navContainerRef.current, {
            backgroundColor: "rgba(10, 9, 8, 0.4)",
            backdropFilter: "blur(4px)",
            paddingTop: "1.125rem",
            paddingBottom: "1.125rem",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // 2. Keyboard Accessibility & Mobile Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setCollectionsDropdownOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const collectionLinks = [
    {
      name: t.nav.livingRoom,
      tamilName: "வரவேற்பறை தொகுப்பு",
      href: "/#collections",
      desc: "3+1+1 Teak sofas, sectionals & center tables",
      image: "/images/thekku/thekku-sofa-set.jpg",
      tag: "TN Thekku",
      icon: Sofa,
    },
    {
      name: t.nav.bedroom,
      tamilName: "ராஜ படுக்கையறை",
      href: "/#collections",
      desc: "King cots, carved headboards & bedside units",
      image: "/images/thekku/thekku-royal-bed.jpg",
      tag: "Heirloom",
      icon: Bed,
    },
    {
      name: t.nav.dining,
      tamilName: "உணவு மேஜைகள்",
      href: "/#collections",
      desc: "6-8 Seater monoblock tables & cane chairs",
      image: "/images/thekku/thekku-dining-table.jpg",
      tag: "Solid Wood",
      icon: Utensils,
    },
    {
      name: t.nav.wardrobes,
      tamilName: "மர அலமாரிகள்",
      href: "/#collections",
      desc: "Fluted timber wardrobes & tallboy storage",
      image: "/images/thekku/thekku-wardrobe.jpg",
      tag: "Handcrafted",
      icon: DoorClosed,
    },
    {
      name: effectiveLang === "ta" ? "சாய்வு நாற்காலி & ஊஞ்சல்" : "Heritage Swings & Easy Chairs",
      tamilName: "ஊஞ்சல் & சாய்வு நாற்காலி",
      href: "/#collections",
      desc: "Planter's easy chairs & brass-chain swings",
      image: "/images/thekku/thekku-swing-oonjal.jpg",
      tag: "Heritage",
      icon: Sparkles,
    },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-colors duration-300"
    >
      {/* 1. TOP ANNOUNCEMENT BAR (Exact required values) */}
      <div className="bg-obsidian border-b border-white/10 text-white/80 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] font-mono tracking-wider flex items-center justify-between z-20 relative">
        {/* Left Value */}
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse shrink-0" />
          <span className="truncate">
            Railway Feeder Road, Sankarankovil • Better Spaces • Brighter Lives
          </span>
        </div>

        {/* Right Value: Direct Showroom Lines */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-sand">
          <span className="text-white/60">Direct Showroom Lines:</span>
          <a
            href="tel:+917902779356"
            className="text-champagne hover:underline font-semibold focus-ring px-1 flex items-center gap-1"
            title="Call Showroom Hotline"
          >
            <Phone className="w-3 h-3" />
            <span>79027 79356</span>
          </a>
        </div>
      </div>

      {/* 2. PRIMARY NAVBAR */}
      <nav
        ref={navContainerRef}
        aria-label="Main Navigation"
        className="w-full bg-obsidian/40 backdrop-blur-xs border-b border-white/10 py-4.5 px-4 sm:px-6 lg:px-8 transition-[padding,background-color,border-color,box-shadow]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Branding Block */}
          <div className="shrink-0 flex items-center">
            <Logo size="navbar" href="/#home" className="transition-transform duration-300 hover:scale-[1.02]" />
          </div>

          {/* Center: Centralized Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.16em]">
            {/* HOME */}
            <Link
              href="/#home"
              className="text-white/85 hover:text-champagne transition-colors focus-ring py-1 relative group"
            >
              <span>{t.nav.home}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* COLLECTIONS DROPDOWN (Luxury Atelier Mega-Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsDropdownOpen(true)}
              onMouseLeave={() => setCollectionsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCollectionsDropdownOpen(!collectionsDropdownOpen)}
                className="flex items-center gap-1.5 text-white/85 hover:text-champagne transition-colors focus-ring py-1 group cursor-pointer"
                aria-expanded={collectionsDropdownOpen}
                aria-haspopup="true"
              >
                <span>{t.nav.collections}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300",
                    collectionsDropdownOpen && "rotate-180 text-champagne"
                  )}
                />
              </button>

              {/* Collections Mega Flyout */}
              {collectionsDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-[26%] lg:-translate-x-[28%] mt-3 w-[780px] max-w-[calc(100vw-3rem)] bg-[#141210]/98 backdrop-blur-2xl border border-champagne/60 p-5 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.92)] z-50 spring-btt-in"
                  style={{ transformOrigin: "top center" }}
                >
                  {/* Top Ambient Gold Sheen */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-champagne to-transparent pointer-events-none" />

                  {/* Header Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-champagne animate-pulse" />
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-champagne font-semibold">
                        {effectiveLang === "ta" ? "மரத் தளவாடத் தொகுப்புகள்" : "KERALA FURNITURE • TIMBER SUITES"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sand/60 uppercase tracking-widest hidden sm:inline">
                      {effectiveLang === "ta" ? "சங்கரன்கோவில் பட்டறைத் தயாரிப்பு" : "SANKARANKOVIL ATELIER WORKSHOP"}
                    </span>
                  </div>

                  {/* Two-Column Grid: Left Categories (7 cols) + Right Spotlight Banner (5 cols) */}
                  <div className="grid grid-cols-12 gap-5">
                    {/* Left: Curated Suites List */}
                    <div className="col-span-12 md:col-span-7 flex flex-col gap-1.5">
                      {collectionLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setCollectionsDropdownOpen(false)}
                          className="flex items-center gap-3.5 p-2 rounded-none bg-obsidian/40 border border-white/5 hover:border-champagne/60 hover:bg-white/[0.04] transition-all duration-300 group focus-ring select-none"
                        >
                          {/* High-Resolution Thumbnail with Border */}
                          <div className="relative w-13 h-11 shrink-0 overflow-hidden border border-white/15 group-hover:border-champagne transition-colors bg-obsidian">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Text Info */}
                          <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-xs font-serif font-medium text-white group-hover:text-champagne transition-colors truncate">
                                {effectiveLang === "ta" ? item.tamilName : item.name}
                              </span>
                              {item.tag && (
                                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-champagne/15 text-champagne border border-champagne/30 shrink-0">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <span className="text-[10.5px] text-sand/65 font-sans leading-tight truncate mt-0.5">
                              {item.desc}
                            </span>
                          </div>

                          {/* Hover Arrow Indicator */}
                          <ArrowRight className="w-3.5 h-3.5 text-sand/40 group-hover:text-champagne group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>

                    {/* Right: Bespoke Custom Furniture Spotlight Card */}
                    <div className="col-span-12 md:col-span-5 flex flex-col justify-between p-4 bg-obsidian/90 border border-champagne/40 relative overflow-hidden group/card shadow-subtle">
                      {/* Background Visual Texture with Subtle Opacity */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src="/images/thekku/thekku-sofa-set.jpg"
                          alt="Custom Teakwood Furniture Craftsmanship"
                          fill
                          sizes="280px"
                          className="object-cover object-center opacity-30 group-hover/card:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/40" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-champagne">
                          <TreePine className="w-3 h-3 text-champagne" />
                          <span>{effectiveLang === "ta" ? "100% தேக்கு மரம்" : "100% SOLID THEKKU"}</span>
                        </span>

                        <h4 className="font-serif text-sm sm:text-base text-white font-medium leading-snug group-hover/card:text-champagne transition-colors">
                          {effectiveLang === "ta"
                            ? "பிரத்யேக அளவுகளில் தனிப்பயன் மரவேலை"
                            : "Bespoke Architectural Furniture Tailoring"}
                        </h4>

                        <p className="text-[10.5px] text-sand/80 font-sans leading-relaxed">
                          {effectiveLang === "ta"
                            ? "உங்கள் இல்லத்தின் வரைபடத்திற்கேற்ப உயர்தர முதிர்ந்த தேக்கு மரத்தில் பிரத்யேகமாக வடிவமைத்துத் தருகிறோம்."
                            : "Have a specific room blueprint? Our master woodcarvers handcraft bespoke suites tailored to your dimensions."}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="relative z-10 pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                        <Link
                          href="/#bespoke"
                          onClick={() => setCollectionsDropdownOpen(false)}
                          className="inline-flex items-center justify-between px-3 py-2 bg-champagne text-obsidian text-[10.5px] font-mono uppercase font-semibold tracking-wider hover:bg-champagne-light transition-all shadow-subtle cursor-pointer"
                        >
                          <span>{effectiveLang === "ta" ? "வடிவமைப்பைத் தொடங்குக" : "START BESPOKE ORDER"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href="tel:+917902779356"
                          className="inline-flex items-center justify-center gap-1.5 py-0.5 text-[10px] font-mono text-sand/70 hover:text-champagne transition-colors"
                        >
                          <Phone className="w-3 h-3 text-champagne" />
                          <span>{effectiveLang === "ta" ? "பட்டறை அழைப்பு: 79027 79356" : "Atelier Hotline: 79027 79356"}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Atelier Guarantees Bar */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-sand/75">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                      <span>{effectiveLang === "ta" ? "தமிழ்நாடு முதிர்ந்த தேக்குமரம்" : "Authentic Seasoned TN Teak"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                      <span>{effectiveLang === "ta" ? "பாரம்பரிய மர இணைப்பு" : "Tenon-and-Mortise Joinery"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                      <span>{effectiveLang === "ta" ? "சங்கரன்கோவில் ஷோரூம்" : "Sankarankovil Direct Atelier"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CUSTOM FURNITURE */}
            <Link
              href="/#bespoke"
              className="text-white/85 hover:text-champagne transition-colors focus-ring py-1 relative group"
            >
              <span>{t.nav.customFurniture}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* SHOWROOM */}
            <Link
              href="/#showroom"
              className="text-white/85 hover:text-champagne transition-colors focus-ring py-1 relative group"
            >
              <span>{t.nav.showroom}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* CONTACT */}
            <Link
              href="/#contact"
              className="text-white/85 hover:text-champagne transition-colors focus-ring py-1 relative group"
            >
              <span>{t.nav.contact}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Right: Language toggle & WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Language Toggle "தமிழ்" / "English" */}
            <button
              type="button"
              onClick={toggleLang}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider border border-white/20 hover:border-champagne text-white/90 hover:text-champagne bg-obsidian/80 transition-all focus-ring"
              aria-label="Toggle language to Tamil or English"
              title={effectiveLang === "en" ? "தமிழில் பார்க்க" : "Switch to English"}
            >
              {effectiveLang === "en" ? "தமிழ்" : "English"}
            </button>

            {/* Prominent Gold-Bordered "INQUIRE ON WHATSAPP" Primary CTA Button */}
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-champagne text-obsidian font-mono text-[11px] font-semibold uppercase tracking-wider border border-champagne-light hover:bg-champagne-light transition-all shadow-gold shrink-0 focus-ring"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-obsidian shrink-0" />
              <span className="hidden sm:inline">INQUIRE ON WHATSAPP</span>
              <span className="sm:hidden">WHATSAPP</span>
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors focus-ring"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE SLIDE-OUT DRAWER */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-md lg:hidden flex justify-end animate-in fade-in duration-200"
        >
          <div className="w-full max-w-sm bg-charcoal border-l border-champagne/30 h-full p-6 flex flex-col justify-between overflow-y-auto">
            {/* Top drawer header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Logo size="sm" onClick={() => setMobileMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-white/60 hover:text-white transition-colors focus-ring"
                aria-label="Close Mobile Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-4 py-6 font-serif text-lg">
              <Link
                href="/#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-champagne transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-champagne transition-colors"
              >
                {t.nav.collections}
              </Link>
              <Link
                href="/#bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-champagne transition-colors"
              >
                {t.nav.customFurniture}
              </Link>
              <Link
                href="/#showroom"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-champagne transition-colors"
              >
                {t.nav.showroom}
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-champagne transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>

            {/* Mobile Contact & CTA Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-sand/60">Language / மொழி:</span>
                <button
                  type="button"
                  onClick={toggleLang}
                  className="px-3 py-1 bg-obsidian border border-champagne text-champagne font-semibold"
                >
                  {effectiveLang === "en" ? "தமிழ்" : "English"}
                </button>
              </div>

              <a
                href="tel:+917902779356"
                className="flex items-center justify-center gap-2 p-3 bg-obsidian border border-white/20 text-white hover:border-champagne"
              >
                <Phone className="w-4 h-4 text-champagne" />
                <span>Call Showroom: 79027 79356</span>
              </a>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-champagne text-obsidian font-semibold uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>INQUIRE ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
