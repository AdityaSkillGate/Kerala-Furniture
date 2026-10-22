"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Compass,
  Clock,
  ShieldCheck,
  Check,
  Layers,
  Ruler,
  Navigation,
  Eye,
  X,
  Maximize2,
  Calendar,
} from "lucide-react";
import { BRAND_CONFIG } from "@/data/brand";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Inspiration Gallery Data
interface InspirationItem {
  id: string;
  title: string;
  category: "living" | "dining" | "bedroom" | "details";
  categoryLabel: string;
  image: string;
  timber: string;
  description: string;
  keyPiece: string;
}

const INSPIRATION_ITEMS: InspirationItem[] = [
  {
    id: "insp-01",
    title: "Tamil Nadu Royal Teak Living Suite",
    category: "living",
    categoryLabel: "Living Space",
    image: "/images/thekku/thekku-sofa-set.jpg",
    timber: "Solid Seasoned Teak & Ivory Linen",
    description: "Hand-carved solid teakwood sofa suite with matching armchairs, Athangudi-style tiled floor, and warm ambient courtyard lighting.",
    keyPiece: "Royal Teak 3+1+1 Sofa Suite",
  },
  {
    id: "insp-02",
    title: "Gathering Teak Dining Salon",
    category: "dining",
    categoryLabel: "Dining Suite",
    image: "/images/thekku/thekku-dining-table.jpg",
    timber: "Bookmatched Teak Slab & Natural Cane",
    description: "Commanding 6-8 seater solid teak centerpiece paired with hand-woven cane backrest dining chairs and brass pendant lighting.",
    keyPiece: "Vaigai Monolith 6-8 Seater Set",
  },
  {
    id: "insp-03",
    title: "Chettinad Carved King Bed Suite",
    category: "bedroom",
    categoryLabel: "Master Suite",
    image: "/images/thekku/thekku-royal-bed.jpg",
    timber: "Solid Teakwood & Hand-Carved Crown",
    description: "Heirloom-grade king bed featuring an intricately hand-carved architectural headboard, turned corner posts, and matching teak nightstands.",
    keyPiece: "Chettinad Carved Teak King Bed",
  },
  {
    id: "insp-04",
    title: "Veranda Teak & Cane Easy Chair",
    category: "living",
    categoryLabel: "Living Space",
    image: "/images/thekku/thekku-lounge-chair.jpg",
    timber: "Solid Teakwood & Natural Rattan Cane",
    description: "Authentic South Indian planter's lounge chair (சாய்வு நாற்காலி) with swing-out leg rests and natural cane comfort.",
    keyPiece: "Heritage Planter's Easy Chair",
  },
  {
    id: "insp-05",
    title: "Traditional Heritage Teak Oonjal Swing",
    category: "living",
    categoryLabel: "Living Space",
    image: "/images/thekku/thekku-swing-oonjal.jpg",
    timber: "Solid Teak Plank & Antique Brass Chains",
    description: "Heavy single-piece solid teakwood traditional swing (ஊஞ்சல்) suspended by ornamental brass chains with silk bolster cushions.",
    keyPiece: "Chettinad Heritage Teak Oonjal",
  },
  {
    id: "insp-06",
    title: "Heirloom 3-Door Teak Wardrobe",
    category: "bedroom",
    categoryLabel: "Master Suite",
    image: "/images/thekku/thekku-wardrobe.jpg",
    timber: "Solid Teak & Solid Brass Hardware",
    description: "Full-height solid teakwood wardrobe with hand-fluted door panels, heavy brass drop handles, and spacious interior shelving.",
    keyPiece: "Chera Fluted 3-Door Wardrobe",
  },
];

// 2. Interior Detail Macro Gallery
interface DetailItem {
  id: string;
  title: string;
  material: string;
  image: string;
  description: string;
}

const DETAIL_ITEMS: DetailItem[] = [
  {
    id: "det-01",
    title: "Hand-Rubbed Teak Grain",
    material: "Solid Teak & Organic Matte Wax",
    image: "/images/thekku/thekku-wood-grain.jpg",
    description: "Natural organic matte oil finish that preserves the tactile pore structure and golden-honey luster of genuine seasoned teakwood.",
  },
  {
    id: "det-02",
    title: "Interlocking Mortise-and-Tenon Joinery",
    material: "Traditional Timber-to-Timber Joints",
    image: "/images/thekku/thekku-wood-grain.jpg",
    description: "Precision hand-mortised wood joinery providing rock-solid structural longevity without reliance on modern metal screws or brackets.",
  },
  {
    id: "det-03",
    title: "Hand-Woven Natural Rattan Cane",
    material: "Six-Way Octagonal Weave",
    image: "/images/thekku/thekku-lounge-chair.jpg",
    description: "Flexible, breathable natural cane backrests hand-woven to conform comfortably to back ergonomics and ventilate in warm climates.",
  },
  {
    id: "det-04",
    title: "Aged Brass Ferrules & Ring Pulls",
    material: "Solid Brushed Architectural Brass",
    image: "/images/thekku/thekku-coffee-table.jpg",
    description: "Protective solid brass ferrule shoes and recessed drop-ring drawer pulls hand-polished to develop a dignified antique patina.",
  },
];

// 3. Verifiable Trust Pillars (No fabricated reviews, awards, or counts)
const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Seasoned Solid Hardwoods",
    titleTamil: "100% பக்குவப்படுத்தப்பட்ட திட மரங்கள்",
    description:
      "Every frame and tabletop is built using genuinely seasoned solid teakwood or Indian rosewood, kiln-dried to eliminate moisture warping in South Indian climates.",
    descriptionTamil:
      "ஒவ்வொரு சட்டகமும் மேசையும் இயற்கையாகப் பக்குவப்படுத்தப்பட்ட திடத் தேக்கு அல்லது ஈட்டி மரத்தால் உருவாக்கப்படுகிறது.",
  },
  {
    icon: Layers,
    title: "Traditional Mortise & Tenon Joinery",
    titleTamil: "பாரம்பரிய மூட்டுவேலை நுணுக்கங்கள்",
    description:
      "We avoid fragile flat-pack dowels and staples. Interlocking timber joints ensure acoustic silence, zero squeaks, and multi-generational structural stability.",
    descriptionTamil:
      "மரங்களை ஒன்றுடன் ஒன்று இணைக்கும் பாரம்பரிய மரவேலைப்பாடுகள் நீண்டகால நிலைப்புத்தன்மையை உறுதி செய்கின்றன.",
  },
  {
    icon: Eye,
    title: "Direct Showroom & Timber Inspection",
    titleTamil: "நேரடி மரப்பரிசோதனை",
    description:
      "We welcome you to inspect raw timber billets, joint cross-sections, and test cushion densities firsthand at our Sankarankovil showroom before final polish.",
    descriptionTamil:
      "எங்கள் சங்கரன்கோவில் ஷோரூமிற்கு வருகை தந்து மரப்பலகைகளையும் மெத்தைகளின் உறுதியையும் நேரில் சோதிக்கலாம்.",
  },
  {
    icon: Ruler,
    title: "Bespoke Blueprint Customization",
    titleTamil: "தனிப்பயன் வரைபட வடிவமைப்பு",
    description:
      "Bring your architect's floor plan or room dimensions. We adjust leg heights, seat depths, and timber finishes to harmonize with your home.",
    descriptionTamil:
      "உங்கள் வீட்டின் அறை அளவுகளுக்கு ஏற்ப மர அளவுகளையும் வண்ணங்களையும் மாற்றியமைத்துக் கொள்ளலாம்.",
  },
];

export const ShowroomExperience: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "living" | "dining" | "bedroom">("all");
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Showroom Header
      gsap.from(".showroom-header", {
        scrollTrigger: {
          trigger: ".showroom-header",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
      });

      // 2. Atmosphere Showcase
      gsap.from(".showroom-hero-img", {
        scrollTrigger: {
          trigger: ".showroom-hero-showcase",
          start: "top 92%",
          once: true,
        },
        x: -35,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(".showroom-hero-text", {
        scrollTrigger: {
          trigger: ".showroom-hero-showcase",
          start: "top 92%",
          once: true,
        },
        x: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      });

      // 3. Inspiration Gallery Cards - once: true ensures cards stay visible
      gsap.from(".inspiration-card", {
        scrollTrigger: {
          trigger: ".inspiration-grid",
          start: "top 92%",
          once: true,
        },
        y: 35,
        opacity: 0,
        scale: 0.97,
        stagger: 0.08,
        duration: 0.75,
        ease: "back.out(1.3)",
        clearProps: "all",
      });

      // 4. Macro Detail Craftsmanship Cards
      gsap.from(".macro-detail-card", {
        scrollTrigger: {
          trigger: ".macro-detail-grid",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        scale: 0.96,
        stagger: 0.07,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
      });

      // 5. Trust Pillars
      gsap.from(".trust-pillar-card", {
        scrollTrigger: {
          trigger: ".trust-pillar-grid",
          start: "top 92%",
          once: true,
        },
        y: 25,
        opacity: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "all",
      });

      // 6. Showroom Hub
      gsap.from(".showroom-hub", {
        scrollTrigger: {
          trigger: ".showroom-hub",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      });
    }, sectionRef);

    // Refresh scroll triggers for exact coordinates
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const filteredInspiration =
    activeTab === "all"
      ? INSPIRATION_ITEMS
      : INSPIRATION_ITEMS.filter((item) => item.category === activeTab);

  // Search-based directions URL without invented coordinates
  const directionsUrl = BRAND_CONFIG.googleMapsUrl;

  // Visit planning WhatsApp link
  const visitWhatsAppUrl = `https://wa.me/91${BRAND_CONFIG.phones[0].raw}?text=${encodeURIComponent(
    lang === "ta"
      ? "வணக்கம் கேரளா பர்னிச்சர், சங்கரன்கோவில் ரயில்வே ஃபீடர் ரோட்டில் உள்ள உங்கள் ஷோரூமை நேரில் பார்வையிட விரும்புகிறேன். வழிகாட்டுதல் மற்றும் பொருத்தமான நேரத்தைப் பகிர முடியுமா?"
      : "Hello Kerala Furniture, I am planning to visit your showroom at Railway Feeder Road, Sankarankovil. Could you please share directions and recommend the best time to explore your furniture collections?"
  )}`;

  return (
    <section ref={sectionRef} id="showroom" className="py-24 bg-obsidian text-white border-b border-white/10 relative overflow-hidden">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-champagne/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Header with Exact Required Headline & Supporting Text */}
        <div className="showroom-header text-center max-w-3xl mx-auto mb-20">
          <Badge variant="gold" className="mb-4">
            {t.showroom.eyebrow}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight leading-tight">
            {t.showroom.heading}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-sand/80 font-sans leading-relaxed">
            {t.showroom.supporting}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-champagne">
            <MapPin className="w-3.5 h-3.5" />
            <span>{BRAND_CONFIG.address.full}</span>
          </div>
        </div>

        {/* 2. Showroom Atmospheric Hero Showcase (Alternating 2-Column Story) */}
        <div className="showroom-hero-showcase grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24 bg-charcoal/80 border border-white/10 p-6 sm:p-10 shadow-luxury">
          {/* Left Column: Visual Atmosphere */}
          <div className="showroom-hero-img lg:col-span-7 relative aspect-[16/10] bg-obsidian border border-white/10 overflow-hidden group">
            <Image
              src="/images/thekku/thekku-sofa-set.jpg"
              alt="Kerala Furniture Sankarankovil showroom display floor"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-champagne">
                  {t.showroom.visualAtmosphereBadge}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mt-1">
                  {t.showroom.visualAtmosphereTitle}
                </h3>
              </div>
              <Badge variant="dark" className="border-white/20 text-sand hidden sm:inline-flex">
                Sankarankovil, Tamil Nadu
              </Badge>
            </div>
          </div>

          {/* Right Column: Physical Touch Narrative */}
          <div className="showroom-hero-text lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-champagne font-medium">
                {t.showroom.inPersonDiffEyebrow}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-snug">
                {t.showroom.inPersonDiffTitle}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-sand/85 leading-relaxed font-sans">
              {t.showroom.inPersonDiffDesc}
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-sand/90 font-sans">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-champagne/10 text-champagne shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>{t.showroom.ergoTestingTitle}</strong> {t.showroom.ergoTestingDesc}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-champagne/10 text-champagne shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>{t.showroom.rawTimberTitle}</strong> {t.showroom.rawTimberDesc}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-champagne/10 text-champagne shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>{t.showroom.blueprintTitle}</strong> {t.showroom.blueprintDesc}</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={visitWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold hover:bg-champagne-light transition-all shadow-gold"
              >
                <Calendar className="w-4 h-4 text-obsidian" />
                <span>{t.showroom.planVisitCta}</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-white/20 text-white hover:bg-white/10 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-champagne" />
                <span>{t.showroom.getDirectionsCta}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Furniture Inspiration Gallery (Interactive Tabs) */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <Badge variant="gold" className="mb-2">
                {t.showroom.inspirationEyebrow}
              </Badge>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium">
                {t.showroom.inspirationHeading}
              </h3>
              <p className="text-xs sm:text-sm text-sand/70 mt-1 max-w-xl font-sans">
                {t.showroom.inspirationSub}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
              {(
                [
                  { id: "all", label: t.showroom.tabAll },
                  { id: "living", label: t.showroom.tabLiving },
                  { id: "dining", label: t.showroom.tabDining },
                  { id: "bedroom", label: t.showroom.tabBedroom },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-3.5 py-1.5 text-xs uppercase tracking-wider font-mono border transition-all focus-ring whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-champagne border-champagne text-obsidian font-semibold shadow-sm"
                      : "bg-charcoal border-white/10 text-sand/80 hover:border-white/30 hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inspiration Grid */}
          <div className="inspiration-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInspiration.map((item) => (
              <div
                key={item.id}
                className="inspiration-card bg-charcoal border border-white/10 hover:border-champagne/70 overflow-hidden flex flex-col justify-between group hover:-translate-y-2 transition-all duration-500 shadow-luxury select-none"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-obsidian overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-obsidian/85 backdrop-blur-sm border border-white/10 text-[10px] uppercase font-mono tracking-widest text-champagne shadow-subtle">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h4 className="font-serif text-lg text-white font-medium group-hover:text-champagne transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs text-sand/75 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-sand/60">
                      <span>{lang === "ta" ? "சிறப்பு:" : "Featured:"} <strong className="text-white">{item.keyPiece}</strong></span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/91${BRAND_CONFIG.phones[0].raw}?text=${encodeURIComponent(
                        `Hello Kerala Furniture, I am interested in inquiring about the "${item.title}" setting (${item.keyPiece}) seen in your Showroom Inspiration Gallery.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-champagne hover:underline uppercase tracking-wider font-mono group/link"
                    >
                      <span>{t.showroom.inquireSetting}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Interior-Detail Macro Craftsmanship Gallery */}
        <div className="mb-24 bg-charcoal/50 border border-white/10 p-6 sm:p-10">
          <div className="max-w-2xl mb-10">
            <Badge variant="gold" className="mb-2">
              {t.showroom.macroEyebrow}
            </Badge>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              {t.showroom.macroHeading}
            </h3>
            <p className="text-xs sm:text-sm text-sand/70 mt-1 font-sans">
              {t.showroom.macroDesc}
            </p>
          </div>

          <div className="macro-detail-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DETAIL_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDetail(item)}
                className="macro-detail-card bg-obsidian border border-white/10 hover:border-champagne/60 p-4 flex flex-col gap-3 group cursor-pointer hover:-translate-y-1.5 transition-all duration-400 shadow-subtle select-none"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-charcoal">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2 right-2 p-1.5 bg-obsidian/80 backdrop-blur-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-champagne" />
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-sm text-white font-medium group-hover:text-champagne transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-champagne font-mono uppercase tracking-wider block mt-0.5">
                    {item.material}
                  </span>
                  <p className="mt-1.5 text-[11px] text-sand/70 leading-relaxed font-sans line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Verifiable Trust Pillars (Authentic physical joinery integrity) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="gold" className="mb-3">
              {t.showroom.trustEyebrow}
            </Badge>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium">
              {t.showroom.trustHeading}
            </h3>
            <p className="text-xs sm:text-sm text-sand/70 mt-2 font-sans">
              {t.showroom.trustDesc}
            </p>
          </div>

          <div className="trust-pillar-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              const title = lang === "ta" ? pillar.titleTamil : pillar.title;
              const description = lang === "ta" ? pillar.descriptionTamil : pillar.description;

              return (
                <div
                  key={idx}
                  className="trust-pillar-card p-6 bg-charcoal border border-white/10 hover:border-champagne/50 flex flex-col gap-3.5 hover:-translate-y-1.5 transition-all duration-400 shadow-subtle select-none"
                >
                  <div className="w-10 h-10 border border-champagne/40 bg-obsidian flex items-center justify-center text-champagne">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base text-white font-medium">
                    {title}
                  </h4>
                  <p className="text-xs text-sand/75 leading-relaxed font-sans">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Comprehensive Showroom Location, Contact & Directions Hub */}
        <div id="contact" className="showroom-hub bg-charcoal border border-champagne/30 p-6 sm:p-10 shadow-luxury scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Verified Address & All Three Contact Lines */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-champagne font-mono font-medium">
                    {t.showroom.officialShowroomBadge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  {t.showroom.showroomName}
                </h3>

                {/* EXACT REQUIRED BUSINESS ADDRESS */}
                <div className="mt-4 p-5 bg-obsidian border border-white/10 rounded-xs flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-champagne shrink-0 mt-1" />
                  <div className="text-xs sm:text-sm text-sand/90 font-sans leading-relaxed">
                    <strong className="text-white block font-serif text-base mb-1">
                      {BRAND_CONFIG.name}
                    </strong>
                    <p>{BRAND_CONFIG.address.street},</p>
                    <p>{BRAND_CONFIG.address.city} - {BRAND_CONFIG.address.pincode},</p>
                    <p>{BRAND_CONFIG.address.district}, {BRAND_CONFIG.address.state}, {BRAND_CONFIG.address.country}.</p>
                    <p className="text-[11px] text-sand/50 font-mono mt-2">
                      {t.showroom.landmarkNote}
                    </p>
                  </div>
                </div>

                {/* EXACT REQUIRED CONTACT NUMBERS (ALL THREE) */}
                <div className="mt-6 flex flex-col gap-2.5">
                  <span className="text-xs uppercase tracking-wider font-mono text-sand/70">
                    {t.showroom.telephoneLinesLabel}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BRAND_CONFIG.phones.map((phone) => (
                      <a
                        key={phone.id}
                        href={phone.tel}
                        className="p-3 bg-obsidian border border-white/10 hover:border-champagne/60 text-white flex flex-col gap-1 transition-all group focus-ring"
                      >
                        <span className="text-[10px] text-sand/60 uppercase font-mono group-hover:text-champagne transition-colors">
                          {phone.label}
                        </span>
                        <span className="font-mono text-sm sm:text-base font-semibold text-champagne">
                          {phone.display}
                        </span>
                        <span className="text-[10px] text-sand/40 font-sans">
                          {t.showroom.tapToCall}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call and WhatsApp Primary Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={visitWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-champagne text-obsidian text-xs font-semibold uppercase tracking-widest hover:bg-champagne-light transition-all shadow-gold focus-ring"
                >
                  <MessageCircle className="w-4 h-4 text-obsidian" />
                  <span>{t.showroom.inquireVisitWhatsApp}</span>
                </a>

                <a
                  href={BRAND_CONFIG.primaryPhone.tel}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-white/20 text-white text-xs uppercase tracking-wider font-medium hover:bg-white/10 transition-colors focus-ring"
                >
                  <Phone className="w-3.5 h-3.5 text-champagne" />
                  <span>{t.showroom.callPrimaryDesk}</span>
                </a>
              </div>
            </div>

            {/* Right: Search-Based Map Destination & Directions Placeholder (No invented coordinates) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-obsidian border border-white/10 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-champagne" />
                    <span className="text-xs uppercase tracking-wider font-mono text-white font-medium">
                      {t.showroom.transitGuideTitle}
                    </span>
                  </div>
                  <Badge variant="dark" className="text-[10px]">
                    Sankarankovil - 627 756
                  </Badge>
                </div>

                <p className="text-xs text-sand/80 font-sans leading-relaxed mb-5">
                  {t.showroom.transitGuideDesc}
                </p>

                {/* Live Google Maps Interactive Showroom Embed */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] min-h-[320px] w-full bg-charcoal border border-champagne/40 rounded-sm overflow-hidden mb-5 shadow-luxury group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487692.2314882656!2d75.44287438491077!3d9.54404296710604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06976bce9012ab%3A0xf07ff0b9df90da2e!2sKERALA%20FURNITURE!5e0!3m2!1sen!2sin!4v1792655044063!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Kerala Furniture Sankarankovil Google Maps Live Location"
                    className="w-full h-full filter contrast-[1.05]"
                  />
                  {/* Floating Location Badge */}
                  <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-2.5 py-1 bg-obsidian/90 backdrop-blur-md border border-champagne/50 text-[10px] font-mono uppercase tracking-wider text-champagne shadow-md">
                    <MapPin className="w-3 h-3 text-champagne" />
                    <span>Sankarankovil Showroom</span>
                  </div>
                </div>
              </div>

              {/* Direct Open in Google Maps Button */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-champagne hover:text-obsidian text-white text-xs uppercase tracking-widest font-semibold transition-all border border-white/20 focus-ring"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.showroom.openGoogleMapsBtn}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Macro Details */}
      {selectedDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={() => setSelectedDetail(null)}
            className="fixed inset-0 bg-obsidian/85 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <div className="relative max-w-lg w-full bg-charcoal border border-champagne/40 p-6 text-white shadow-luxury z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <h4 className="font-serif text-lg text-white font-medium">
                  {selectedDetail.title}
                </h4>
                <span className="text-[10px] text-champagne font-mono uppercase tracking-wider">
                  {selectedDetail.material}
                </span>
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                aria-label="Close detail modal"
                className="p-1.5 text-white/60 hover:text-champagne transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden my-4 bg-obsidian border border-white/10">
              <Image
                src={selectedDetail.image}
                alt={selectedDetail.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xs text-sand/85 leading-relaxed font-sans">
              {selectedDetail.description}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2 bg-white/10 hover:bg-champagne hover:text-obsidian text-xs uppercase tracking-wider font-mono transition-colors"
              >
                {t.showroom.closePreview}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

