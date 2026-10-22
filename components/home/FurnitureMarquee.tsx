"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/lib/language-context";

interface MarqueeFurnitureItem {
  id: string;
  name: string;
  nameTamil?: string;
  category: string;
  categoryTamil?: string;
  material: string;
  materialTamil?: string;
  image: string;
  targetId: string;
}

const MARQUEE_ITEMS: MarqueeFurnitureItem[] = [
  {
    id: "marq-1",
    name: "Royal Tamil Nadu Thekku Sofa Suite",
    nameTamil: "தமிழ்நாடு ராஜ தேக்கு சோஃபா",
    category: "Sofas & Living",
    categoryTamil: "சோஃபா & வரவேற்பறை",
    material: "100% Solid Seasoned Teak & Ivory Linen",
    materialTamil: "100% திடத் தேக்கு & உயர்தர லினன்",
    image: "/images/thekku/thekku-sofa-set.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-2",
    name: "Heritage Teak Planter's Easy Chair",
    nameTamil: "பாரம்பரிய தேக்கு சாய்வு நாற்காலி",
    category: "Accent Seating",
    categoryTamil: "சிறப்பு ஆசனம்",
    material: "Solid Teak & Hand-Woven Natural Cane",
    materialTamil: "திடத் தேக்கு & கைமுடை பிரம்பு",
    image: "/images/thekku/thekku-lounge-chair.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-3",
    name: "Vaigai Monolith 6-8 Seater Dining Set",
    nameTamil: "வைகை 6-8 இருக்கை தேக்கு டைனிங் செட்",
    category: "Dining Suites",
    categoryTamil: "சாப்பாட்டு அறை",
    material: "Bookmatched Teakwood Slab & Cane Chairs",
    materialTamil: "தேக்கு மரம் & பிரம்பு நாற்காலிகள்",
    image: "/images/thekku/thekku-dining-table.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-4",
    name: "Chettinad Carved Teak King Cot",
    nameTamil: "செட்டிநாடு கைவினை தேக்கு கட்டில்",
    category: "Bedroom Suites",
    categoryTamil: "படுக்கையறை",
    material: "Solid Plantation Teak & Turned Posts",
    materialTamil: "திடத் தேக்கு & செதுக்கல் தலைப்பலகை",
    image: "/images/thekku/thekku-royal-bed.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-5",
    name: "Chera Fluted 3-Door Teak Wardrobe",
    nameTamil: "சேரா 3-கதவு தேக்கு அலமாரி",
    category: "Wardrobes & Storage",
    categoryTamil: "அலமாரிகள்",
    material: "Solid Teak & Brass Drop Handles",
    materialTamil: "திடத் தேக்கு & பித்தளை கைப்பிடிகள்",
    image: "/images/thekku/thekku-wardrobe.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-6",
    name: "Periyar Live-Edge Teak Coffee Table",
    nameTamil: "பெரியார் தேக்கு மர டீப்பாய்",
    category: "Center Tables",
    categoryTamil: "வரவேற்பறை மேஜை",
    material: "Solid Teak Slab with Through Tenons",
    materialTamil: "திடத் தேக்கு & மர மூட்டுகள்",
    image: "/images/thekku/thekku-coffee-table.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-7",
    name: "Chettinad Heritage Teak Oonjal Swing",
    nameTamil: "செட்டிநாடு பாரம்பரிய தேக்கு ஊஞ்சல்",
    category: "Traditional Swing",
    categoryTamil: "பாரம்பரிய ஊஞ்சல்",
    material: "Solid Teak Plank & Antique Brass Chains",
    materialTamil: "திடத் தேக்கு பலகை & பித்தளைச் சங்கிலி",
    image: "/images/thekku/thekku-swing-oonjal.jpg",
    targetId: "catalogue",
  },
  {
    id: "marq-8",
    name: "Tenon & Mortise Hardwood Joinery",
    nameTamil: "பாரம்பரிய தேக்கு மரப் பொருத்து",
    category: "Master Craftsmanship",
    categoryTamil: "தனிப்பயன் மரவேலை",
    material: "Natural Oil Rubbed Seasoned Grain",
    materialTamil: "இயற்கை எண்ணெய் பூச்சு தேக்கு",
    image: "/images/thekku/thekku-wood-grain.jpg",
    targetId: "catalogue",
  },
];

export const FurnitureMarquee: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="furniture-marquee"
      aria-label="Continuous Showcase of Kerala Furniture Showroom Pieces"
      className="relative w-full overflow-hidden bg-charcoal border-y border-white/10 py-10"
    >
      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-champagne shrink-0" />
          <span className="text-xs uppercase tracking-[0.25em] text-sand font-mono">
            {lang === "ta"
              ? "ஷோரூம் சிறப்புத் தொகுப்பு • சங்கரன்கோவில்"
              : "Curated Showroom Curation • Sankarankovil"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-white/50 font-mono">
          <span>{lang === "ta" ? "திடத் தேக்குமரம்" : "Solid Teakwood"}</span>
          <span>•</span>
          <span>{lang === "ta" ? "ஈட்டி மரம்" : "Rosewood"}</span>
          <span>•</span>
          <span>{lang === "ta" ? "பாரம்பரிய மரவேலை" : "Bespoke Joinery"}</span>
        </div>
      </div>

      {/* Marquee Track Container (Right-to-Left, Infinite, CSS Animated) */}
      <div className="group relative w-full overflow-hidden">
        {/* Subtle Edge Vignette Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-charcoal via-charcoal/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track using Pure CSS Animation */}
        <div className="flex w-max animate-marquee-slow group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto">
          {/* Track 1: Accessible primary items */}
          <div className="flex gap-6 pr-6">
            {MARQUEE_ITEMS.map((item) => (
              <MarqueeCard key={item.id} item={item} />
            ))}
          </div>

          {/* Track 2: Seamless duplicate for continuous visual loop (hidden from screen readers) */}
          <div className="flex gap-6 pr-6" aria-hidden="true">
            {MARQUEE_ITEMS.map((item) => (
              <MarqueeCard key={`dup-${item.id}`} item={item} isDuplicate={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Reduced-Motion Guidance Notice (Shown only if reduced motion is active) */}
      <p className="sr-only">
        Horizontal showcase of handcrafted furniture pieces from Kerala Furniture, Sankarankovil.
      </p>
    </section>
  );
};

interface MarqueeCardProps {
  item: MarqueeFurnitureItem;
  isDuplicate?: boolean;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ item, isDuplicate = false }) => {
  const { lang } = useLanguage();
  const displayName = lang === "ta" && item.nameTamil ? item.nameTamil : item.name;
  const displayCategory = lang === "ta" && item.categoryTamil ? item.categoryTamil : item.category;
  const displayMaterial = lang === "ta" && item.materialTamil ? item.materialTamil : item.material;

  return (
    <Link
      href={`/#${item.targetId}`}
      tabIndex={isDuplicate ? -1 : 0}
      className={cn(
        "group/card relative w-72 sm:w-80 shrink-0 bg-obsidian border border-sand/20 hover:border-champagne/70 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-subtle hover:shadow-luxury focus-ring",
        isDuplicate && "pointer-events-none"
      )}
    >
      {/* Image with subtle zoom on hover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian">
        <Image
          src={item.image}
          alt={isDuplicate ? "" : `${displayName} - ${displayCategory}`}
          fill
          sizes="(max-width: 640px) 288px, 320px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
        />

        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-sand-light bg-obsidian/85 backdrop-blur-sm px-2.5 py-1 border border-white/10">
            {displayCategory}
          </span>
        </div>

        {/* Quick view indicator on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 p-1.5 bg-champagne text-obsidian shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Card Information */}
      <div className="p-4 bg-obsidian/90 border-t border-white/5 flex flex-col justify-between gap-1">
        <h3 className="font-serif text-sm sm:text-base text-white group-hover/card:text-champagne transition-colors truncate">
          {displayName}
        </h3>
        <p className="text-[11px] font-sans text-sand/70 truncate">
          {displayMaterial}
        </p>
      </div>
    </Link>
  );
};

