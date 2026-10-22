"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import { CATEGORIES, CategoryItem } from "@/data/categories";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CategoryCollectionsProps {
  onSelectCategory?: (categoryKey: string) => void;
}

export const CategoryCollections: React.FC<CategoryCollectionsProps> = ({
  onSelectCategory,
}) => {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".collections-header", {
        scrollTrigger: {
          trigger: ".collections-header",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
      });

      // Cards staggered entrance - once: true ensures cards never get stuck at opacity: 0
      gsap.from(".collection-card-item", {
        scrollTrigger: {
          trigger: ".collections-grid",
          start: "top 92%",
          once: true,
        },
        y: 35,
        opacity: 0,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.75,
        ease: "back.out(1.2)",
        clearProps: "all",
      });

      // Footnote reassurance entrance
      gsap.from(".collections-footnote", {
        scrollTrigger: {
          trigger: ".collections-footnote",
          start: "top 95%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all",
      });
    }, sectionRef);

    // Refresh scroll triggers after mount to account for dynamic image and font layouts
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="collections"
      aria-label="Explore Our Furniture Collections"
      className="py-24 bg-obsidian text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-champagne/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="collections-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start gap-3 max-w-2xl">
            <Eyebrow variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-champagne" />}>
              {t.categories.eyebrow}
            </Eyebrow>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight leading-[1.12]">
              {lang === "ta" ? (
                <span>உங்கள் இல்லத்திற்கு ஏற்ற <br className="hidden sm:inline" />
                <span className="italic font-normal text-champagne">சிறந்த வடிவமைப்பு.</span></span>
              ) : (
                <span>Find the Perfect Fit <br className="hidden sm:inline" />
                <span className="italic font-normal text-champagne">for Your Space.</span></span>
              )}
            </h2>
          </div>

          <div className="flex flex-col gap-2 max-w-md">
            <p className="text-sand-light/75 text-xs sm:text-sm font-sans font-light leading-relaxed">
              {t.categories.subtitle}
            </p>
            <span className="text-[11px] font-mono text-sand/60">
              {lang === "ta"
                ? "* சங்கரன்கோவில் ஷோரூமிற்கான மாதிரி தொகுப்பு"
                : "* Proposed POC category curations for Sankarankovil showroom"}
            </span>
          </div>
        </div>

        {/* Editorial Asymmetric Image Grid */}
        <div className="collections-grid grid grid-cols-12 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelect={onSelectCategory}
            />
          ))}
        </div>

        {/* Footnote reassurance */}
        <div className="collections-footnote mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/70">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-champagne shrink-0" />
            <span>
              {lang === "ta"
                ? "அனைத்துப் பிரிவுகளிலும் உங்கள் விருப்பத்திற்கேற்ப அளவுகளையும் மர வகைகளையும் சங்கரன்கோவில் ஷோரூமில் தேர்வு செய்யலாம்."
                : "All categories support bespoke dimensional tailoring and timber curation at our Sankarankovil showroom."}
            </span>
          </div>

          <Link
            href="/#showroom"
            className="text-champagne hover:underline inline-flex items-center gap-1.5 uppercase font-mono text-[11px] tracking-wider"
          >
            <span>{t.showroom.planVisitCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: CategoryItem;
  onSelect?: (categoryKey: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const { t, lang } = useLanguage();

  const handleClick = () => {
    if (onSelect) {
      onSelect(category.filterKey);
    }
  };

  const primaryTitle = lang === "ta" ? category.tamilName : category.name;

  return (
    <Link
      href="/#showcase"
      onClick={handleClick}
      className={cn(
        "collection-card-item group relative overflow-hidden bg-charcoal border border-sand/20 hover:border-champagne/80 transition-all duration-500 flex flex-col justify-end shadow-subtle hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus-ring hover:-translate-y-2 select-none",
        category.gridSpan.mobile,
        category.gridSpan.tablet,
        category.gridSpan.desktop,
        category.gridSpan.aspect
      )}
    >
      {/* Background Image with smooth hover scale */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-obsidian">
        <Image
          src={category.heroImage}
          alt={`Kerala Furniture - ${category.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Carefully controlled multi-stop dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/20 transition-opacity duration-500 group-hover:opacity-90" />
      </div>

      {/* Top Badge: Proposed Curation */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-sand-light bg-obsidian/85 backdrop-blur-md px-3 py-1 border border-white/10 group-hover:border-champagne/50 transition-colors shadow-subtle">
          {category.itemCountLabel}
        </span>
      </div>

      {/* Bottom Content & Hover Arrow Action */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end gap-2">
        {lang === "ta" && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans text-sand/80 font-medium">
              {category.name}
            </span>
          </div>
        )}

        <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-tight group-hover:text-champagne transition-colors">
          {primaryTitle}
        </h3>

        <p className="text-xs text-sand-light/80 line-clamp-2 max-w-xl font-sans font-light leading-relaxed">
          {category.description}
        </p>

        {/* Explore Collection Action */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-sand group-hover:text-champagne transition-colors">
          <span className="font-sans text-[11px] tracking-wider">{t.categories.exploreCta}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </Link>
  );
};

