"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Shield, Award, CheckCircle2, MapPin, Phone } from "lucide-react";
import { BRAND_CONFIG } from "@/data/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/lib/language-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const BrandStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-triggered reveal for main editorial header
      gsap.from(".story-header-item", {
        scrollTrigger: {
          trigger: ".story-header",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
      });

      // 2. Story Panel 1 (Nature of Wood): Text from Left, Image from Right
      const p1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-panel-1",
          start: "top 92%",
          once: true,
        },
        defaults: { clearProps: "all" },
      });

      p1Tl
        .from(".story-panel-1-text", {
          x: -35,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        })
        .from(
          ".story-panel-1-badge",
          {
            y: 15,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "back.out(1.5)",
            clearProps: "all",
          },
          "-=0.4"
        )
        .from(
          ".story-panel-1-img",
          {
            scale: 0.95,
            y: 20,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.5"
        )
        .from(
          ".story-panel-1-floating",
          {
            y: 30,
            x: -15,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            clearProps: "all",
          },
          "-=0.4"
        );

      // 3. Story Panel 2 (Human Comfort): Image from Left, Text from Right
      const p2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-panel-2",
          start: "top 92%",
          once: true,
        },
        defaults: { clearProps: "all" },
      });

      p2Tl
        .from(".story-panel-2-img", {
          scale: 0.95,
          y: 20,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        })
        .from(
          ".story-panel-2-floating",
          {
            y: -25,
            x: 15,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            clearProps: "all",
          },
          "-=0.4"
        )
        .from(
          ".story-panel-2-text",
          {
            x: 35,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.5"
        )
        .from(
          ".story-panel-2-badge",
          {
            y: 15,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "back.out(1.5)",
            clearProps: "all",
          },
          "-=0.4"
        );

      // 4. Parallax effect on floating detail images on continuous scrub
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((elem) => {
        gsap.to(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -35,
          ease: "none",
        });
      });

      // 5. Showroom Invitation Banner Entrance
      gsap.from(".story-invitation-banner", {
        scrollTrigger: {
          trigger: ".story-invitation-banner",
          start: "top 92%",
          once: true,
        },
        y: 30,
        opacity: 0,
        scale: 0.98,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);

    // Refresh scroll triggers to prevent any layout offset issues
    ScrollTrigger.refresh();

    return () => ctx.revert(); // Cleans up observers and timelines on unmount
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="ethos"
      aria-label="Kerala Furniture Brand Story and Craftsmanship Philosophy"
      className="relative w-full bg-obsidian text-white pt-24 pb-28 border-b border-white/10 overflow-hidden"
    >
      {/* Subtle luxury background radial gradient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Large Editorial Statement Header */}
        <div className="story-header text-center max-w-4xl mx-auto flex flex-col items-center gap-5 mb-24">
          <div className="story-header-item">
            <Eyebrow variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-champagne" />}>
              {t.brandStory.eyebrow}
            </Eyebrow>
          </div>

          <h2 className="story-header-item font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.12]">
            {lang === "ta" ? (
              <span>ஒவ்வொரு இல்லத்திற்கும் <span className="italic font-normal text-champagne">ஒரு கதை உண்டு.</span></span>
            ) : (
              <span>Every Space <span className="italic font-normal text-champagne">Has a Story.</span></span>
            )}
          </h2>

          <div className="story-header-item flex items-center gap-3">
            <div className="h-[1px] w-12 bg-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-mono">
              {lang === "ta" ? BRAND_CONFIG.taglineTamil : BRAND_CONFIG.tagline}
            </span>
            <div className="h-[1px] w-12 bg-champagne/60" />
          </div>

          <p className="story-header-item text-sand-light/85 text-base sm:text-lg max-w-2xl font-sans font-light leading-relaxed mt-2">
            {t.brandStory.supporting}
          </p>
        </div>

        {/* 2. Alternating Story Panel 1: Solid Hardwoods (Text Left, Images Right) */}
        <div className="story-panel-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          {/* Left Column: Editorial Text */}
          <div className="story-panel-1-text lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-sand/80">
                01 • THE NATURE OF WOOD
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-tight">
              Rooted in Seasoned <br className="hidden sm:inline" />
              <span className="italic font-normal text-champagne">Natural Hardwoods.</span>
            </h3>

            <p className="text-sand-light/80 text-sm sm:text-base font-sans font-light leading-relaxed">
              Every dining table, platform bed, and credenza at Kerala Furniture begins with authentically seasoned timber. We select dense-grained Malabar teak, deep-luster rosewood, and durable sheesham—eschewing artificial paper veneers and synthetic composites.
            </p>

            <p className="text-white/70 text-xs sm:text-sm font-sans font-light leading-relaxed">
              Living hardwoods expand and breathe with their environment. Handcrafted with classical mortise-and-tenon structural interlocking joinery, each piece is engineered to endure daily family gatherings while aging with organic dignity.
            </p>

            {/* Quality Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="story-panel-1-badge flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="text-sand-light/90">Seasoned Teak & Rosewood</span>
              </div>
              <div className="story-panel-1-badge flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="text-sand-light/90">Zero Artificial Veneers</span>
              </div>
              <div className="story-panel-1-badge flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="text-sand-light/90">Interlocking Joinery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Composition with Parallax Floating Detail */}
          <div className="lg:col-span-6 relative">
            {/* Primary Main Image */}
            <div className="story-panel-1-img image-reveal-card group/img relative aspect-[4/3] w-full max-w-lg mx-auto bg-charcoal border border-sand/20 hover:border-champagne/60 transition-colors duration-500 overflow-hidden shadow-luxury">
              <Image
                src="/images/thekku/thekku-wood-grain.jpg"
                alt="Kerala Furniture artisan carpentry and hardwood joinery"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-obsidian/90 backdrop-blur-md border border-white/10 text-[11px] text-sand font-mono flex items-center justify-between">
                <span>Natural Oil-Rubbed Teak</span>
                <span className="text-champagne uppercase text-[9px] tracking-wider">Handcrafted</span>
              </div>
            </div>

            {/* Secondary Floating Parallax Card */}
            <div className="story-panel-1-floating parallax-image group/float hidden sm:block absolute -bottom-10 -left-6 w-52 aspect-[3/4] bg-obsidian border border-champagne/40 hover:border-champagne shadow-gold overflow-hidden z-20 transition-all duration-300">
              <Image
                src="/images/thekku/thekku-sofa-set.jpg"
                alt="Wood grain joinery close up detail"
                fill
                sizes="220px"
                className="object-cover group-hover/float:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-obsidian/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 font-mono bg-charcoal/90 px-2 py-1">
                Mortise & Tenon Joint
              </div>
            </div>
          </div>
        </div>

        <Divider variant="gold" label="AUTHENTIC PROPORTIONS" className="my-16" />

        {/* 3. Alternating Story Panel 2: Spatial Ergonomics (Images Left, Text Right) */}
        <div className="story-panel-2 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          {/* Left Column: Composition with Parallax Floating Detail */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            {/* Primary Main Image */}
            <div className="story-panel-2-img image-reveal-card group/img relative aspect-[4/3] w-full max-w-lg mx-auto bg-charcoal border border-sand/20 hover:border-champagne/60 transition-colors duration-500 overflow-hidden shadow-luxury">
              <Image
                src="/images/thekku/thekku-dining-table.jpg"
                alt="Architectural living room interior by Kerala Furniture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-3 bg-obsidian/90 backdrop-blur-md border border-white/10 text-[11px] text-sand font-mono flex items-center justify-between">
                <span>Textured Belgian Linen & Teak</span>
                <span className="text-champagne uppercase text-[9px] tracking-wider">Ergonomic</span>
              </div>
            </div>

            {/* Secondary Floating Parallax Card */}
            <div className="story-panel-2-floating parallax-image group/float hidden sm:block absolute -top-8 -right-6 w-48 aspect-square bg-obsidian border border-sand/40 hover:border-champagne/70 shadow-luxury overflow-hidden z-20 transition-all duration-300">
              <Image
                src="/images/thekku/thekku-lounge-chair.jpg"
                alt="Natural fabric and brass hardware tactile detail"
                fill
                sizes="200px"
                className="object-cover group-hover/float:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-obsidian/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 font-mono bg-charcoal/90 px-2 py-1">
                Tactile Comfort
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="story-panel-2-text lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-sand/80">
                02 • HUMAN COMFORT
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-tight">
              Proportions Designed for <br className="hidden sm:inline" />
              <span className="italic font-normal text-champagne">Effortless Everyday Ease.</span>
            </h3>

            <p className="text-sand-light/80 text-sm sm:text-base font-sans font-light leading-relaxed">
              True luxury is ergonomic. A seat that invites relaxation, an armrest angled with anatomical care, and dining chairs that support long evenings of laughter. We harmonize geometric discipline with soft, human-centered contours.
            </p>

            <p className="text-white/70 text-xs sm:text-sm font-sans font-light leading-relaxed">
              We pair firm solid-hardwood structures with multi-density high-resilience foam layers and breathable Belgian linen weaves, preventing both sagging and heat buildup during South Indian summers.
            </p>

            {/* Detail Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="story-panel-2-badge flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="text-sand-light/90">Calibrated Seat Depths</span>
              </div>
              <div className="story-panel-2-badge flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="text-sand-light/90">Breathable Natural Weaves</span>
              </div>
              <div className="story-panel-2-badge flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="text-sand-light/90">Posture Alignment</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Sankarankovil Showroom Invitation Banner */}
        <div className="story-invitation-banner mt-16 p-8 sm:p-12 bg-charcoal border border-champagne/30 shadow-luxury relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-champagne/[0.04] blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-champagne">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {lang === "ta"
                    ? "ஷோரூம் நேரடி அனுபவம் • சங்கரன்கோவில்"
                    : "SHOWROOM EXPERIENCE • SANKARANKOVIL"}
                </span>
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {lang === "ta"
                  ? "நேரில் பார்த்து, தொட்டுணர்ந்து, தேர்வு செய்யுங்கள்."
                  : "Touch, Test, and Tailor in Person."}
              </h4>

              <p className="text-sand-light/80 text-xs sm:text-sm leading-relaxed">
                {lang === "ta"
                  ? `${BRAND_CONFIG.address.full} என்ற முகவரியில் எங்களின் ஷோரூமை நேரில் பார்வையிட்டு, திட மர அமைப்புகளைச் சரிபார்த்து, உங்கள் வீட்டிற்குரிய சரியான அளவுகளைத் தேர்ந்தெடுக்கலாம்.`
                  : `Located at ${BRAND_CONFIG.address.full}. Experience timber finishes under natural daylight, test seating ergonomics, and review custom architectural sizing with our specialists.`}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/60 font-mono">
                <span className="text-sand">
                  {lang === "ta" ? "நேரடி எண்கள்:" : "Direct Lines:"}
                </span>
                {BRAND_CONFIG.phones.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.tel}
                    className="text-white/80 hover:text-champagne transition-colors underline-offset-4 hover:underline"
                  >
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link href="/#collections">
                <Button variant="primary" size="md" className="flex items-center gap-2 group">
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#showroom">
                <Button variant="outline" size="md">
                  <span>{t.showroom.getDirectionsCta}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
