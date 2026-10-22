"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, TreePine, Armchair, Coffee, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const BrandDepthShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const roomBgRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const groupFurnitureRef = useRef<HTMLDivElement>(null);
  const teaTableRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const phaseIndicatorRef = useRef<HTMLDivElement>(null);

  const [activePhase, setActivePhase] = useState<number>(1);
  const { lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const isMobile = window.innerWidth < 768;

    // On mobile or when prefers-reduced-motion is active, display fully assembled scene immediately
    if (prefersReducedMotion || isMobile) {
      if (brandTextRef.current) {
        gsap.set(brandTextRef.current, { y: -160, opacity: 1, scale: 1 });
      }
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 1, y: 0 });
      }
      if (groupFurnitureRef.current) {
        gsap.set(groupFurnitureRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      }
      if (teaTableRef.current) {
        gsap.set(teaTableRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      }
      setActivePhase(4);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State: Group furniture floating slightly above, transparent & softly blurred
      gsap.set(groupFurnitureRef.current, {
        opacity: 0,
        y: -35,
        scale: 1.02,
        filter: "blur(4px)",
      });

      // 2. Initial State: Tea table floating forward, transparent & softly blurred
      gsap.set(teaTableRef.current, {
        opacity: 0,
        y: 45,
        scale: 0.94,
        filter: "blur(4px)",
      });

      // 3. Initial State: Brand text tucked low behind the group furniture position
      gsap.set(brandTextRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.96,
      });

      gsap.set(badgeRef.current, {
        opacity: 0,
        y: 12,
      });

      // Pin the section while scrolling and scrub the 4-phase sequential assembly with extra fluid smoothing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=190%",
          pin: true,
          pinSpacing: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.22) {
              setActivePhase(1);
            } else if (p < 0.52) {
              setActivePhase(2);
            } else if (p < 0.78) {
              setActivePhase(3);
            } else {
              setActivePhase(4);
            }
          },
        },
      });

      // Phase 0: Fade out the initial scroll indicator prompt (0.00 - 0.12)
      if (scrollPromptRef.current) {
        tl.to(
          scrollPromptRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.12,
            ease: "power2.out",
          },
          0
        );
      }

      // Phase 1: Group Furniture (3+1+1 Teak Sofa Set) smoothly enters & lands into room (0.08 - 0.42)
      if (groupFurnitureRef.current) {
        tl.to(
          groupFurnitureRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.34,
            ease: "power2.out",
          },
          0.08
        );
      }

      // Phase 2: Tea Table animates in and settles onto the rug in front of sofa (0.38 - 0.68)
      if (teaTableRef.current) {
        tl.to(
          teaTableRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.30,
            ease: "power2.out",
          },
          0.38
        );
      }

      // Phase 3: Grand Brand Name "KERALA FURNITURE" / "கேரளா பர்னிச்சர்" ascends high into open wall space (0.60 - 0.90)
      if (brandTextRef.current) {
        tl.to(
          brandTextRef.current,
          {
            y: -190,
            opacity: 1,
            scale: 1,
            duration: 0.32,
            ease: "power2.out",
          },
          0.60
        );
      }

      // Phase 4: Atelier promise badges and guarantee insignia reveal as brand text settles (0.75 - 0.98)
      if (badgeRef.current) {
        tl.to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: "power2.out",
          },
          0.75
        );
      }

      // Ambient Room Camera Drift throughout the entire assembly
      if (roomBgRef.current) {
        tl.to(
          roomBgRef.current,
          {
            scale: 1.04,
            duration: 1,
            ease: "none",
          },
          0
        );
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="brand-depth"
      aria-label="Kerala Furniture — 3D Teakwood Atelier Experience"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-obsidian overflow-hidden select-none flex items-center justify-center border-b border-champagne/20"
    >
      {/* Lite Zoom-Out Master Framing Container with Bottom-Center Anchor */}
      <div className="relative w-full h-full transform scale-[0.95] sm:scale-[0.90] md:scale-[0.87] lg:scale-[0.85] origin-[center_82%] transition-transform duration-700 ease-out will-change-transform">
        {/* ========================================================
            BASE LAYER: PLAIN ROOM ELEMENTS WITHOUT FURNITURE (z-10)
            ======================================================== */}
      <div
        ref={roomBgRef}
        className="absolute inset-0 z-10 w-full h-full overflow-hidden will-change-transform"
      >
        <Image
          src="/images/thekku-living-empty-room.jpg"
          alt="Kerala Furniture Handcrafted Interior Room Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%] w-full h-full select-none brightness-[0.92] contrast-[1.04]"
        />

        {/* Ambient Top & Bottom Luxury Vignette for Seamless Section Transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/40 pointer-events-none" />
      </div>

      {/* ========================================================
          LAYER: BRAND NAME & ATELIER IDENTITY (z-20)
          Sits between Room and Group Furniture. When rising from
          below, it emerges from behind the teak sofa into wall space!
          ======================================================== */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
        <div
          ref={brandTextRef}
          className="flex flex-col items-center text-center will-change-transform max-w-6xl w-full"
        >
          {/* Top Atelier Eyebrow */}
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent to-champagne" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-obsidian/85 border border-champagne/60 text-champagne text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] backdrop-blur-md shadow-luxury">
              <Sparkles className="w-3 h-3 text-champagne animate-pulse" />
              <span>
                {lang === "ta"
                  ? "சங்கரன்கோவில் • பிரதான ஷோரூம்"
                  : "SANKARANKOVIL • ATELIER SHOWROOM"}
              </span>
            </div>
            <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-l from-transparent to-champagne" />
          </div>

          {/* Subtitle & Core Promise Badges */}
          <div
            ref={badgeRef}
            className="flex flex-col items-center gap-1.5 mb-2 sm:mb-3 transition-opacity"
          >
            <p className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-champagne/95 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {lang === "ta"
                ? "சிறந்த இல்லங்கள் • சிறந்த வாழ்வுகள்"
                : "BETTER SPACES • BRIGHTER LIVES"}
            </p>

            {/* Solid Thekku Guarantee Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-obsidian/90 border border-white/20 text-[9px] sm:text-[11px] font-mono text-sand/90 backdrop-blur-md">
              <TreePine className="w-3 h-3 text-champagne" />
              <span>
                {lang === "ta"
                  ? "100% அசல் தமிழ்நாடு முதிர்ந்த தேக்கு மரம்"
                  : "100% Authentic Seasoned Tamil Nadu Thekku"}
              </span>
            </div>
          </div>

          {/* Grand Brand Name Headline with Metallic Champagne Gold Finish (Bilingual Translation) */}
          <h2
            className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[0.08em] sm:tracking-[0.14em] text-white leading-none whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
            style={{
              textShadow:
                "0 0 45px rgba(212, 175, 55, 0.45), 0 10px 40px rgba(0, 0, 0, 0.95)",
            }}
          >
            {lang === "ta" ? (
              <>
                <span className="inline-block text-white tracking-wide mr-2 sm:mr-5">
                  கேரளா
                </span>
                <span
                  className="inline-block font-serif font-black tracking-wide text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #FFFFFF 0%, #FFF3D6 20%, #E5C365 48%, #D4AF37 72%, #8A6810 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  பர்னிச்சர்
                </span>
              </>
            ) : (
              <>
                <span className="inline-block text-white tracking-[0.10em] sm:tracking-[0.15em] mr-2 sm:mr-5">
                  KERALA
                </span>
                <span
                  className="inline-block font-serif font-black tracking-[0.12em] sm:tracking-[0.16em] text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #FFFFFF 0%, #FFF3D6 20%, #E5C365 48%, #D4AF37 72%, #8A6810 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  FURNITURE
                </span>
              </>
            )}
          </h2>
        </div>
      </div>

      {/* ========================================================
          LAYER: GROUP FURNITURES (SOFA SET 3+1+1) (z-30)
          Transparent cutout containing the solid teak sofa & armchairs.
          Animates in first over the room floor!
          ======================================================== */}
      <div
        ref={groupFurnitureRef}
        className="absolute inset-0 z-30 pointer-events-none select-none w-full h-full overflow-hidden will-change-transform"
      >
        <Image
          src="/images/thekku-living-group.png"
          alt="Solid Teakwood Sofa Set (Group Furniture)"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%] w-full h-full select-none"
        />
      </div>

      {/* ========================================================
          LAYER: TEA TABLE (CENTER TABLE WITH PLANT & BOOKS) (z-40)
          Transparent cutout in the foreground, sitting on top of the
          carpet in front of the sofa. Animates in next!
          ======================================================== */}
      <div
        ref={teaTableRef}
        className="absolute inset-0 z-40 pointer-events-none select-none w-full h-full overflow-hidden will-change-transform"
      >
        <Image
          src="/images/thekku-living-tea-table.png"
          alt="Solid Teakwood Coffee & Tea Table"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%] w-full h-full select-none"
        />
      </div>
      </div>

      {/* ========================================================
          LIVE ATELIER SCENE ASSEMBLY INDICATOR PILL (Bottom-Left)
          ======================================================== */}
      <div
        ref={phaseIndicatorRef}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-obsidian/90 border border-white/20 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-widest text-sand/90 rounded-sm shadow-luxury"
      >
        <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
        <span>
          {activePhase === 1 && (lang === "ta" ? "நிலை 1 • வாழ்க்கை அறை வெளி" : "STAGE 1 • LIVING SPACE CANVAS")}
          {activePhase === 2 && (lang === "ta" ? "நிலை 2 • தேக்கு சோஃபா சேர்க்கை" : "STAGE 2 • SOLID THEKKU ENSEMBLE")}
          {activePhase === 3 && (lang === "ta" ? "நிலை 3 • கைவினை டீபாய் மேஜை" : "STAGE 3 • ARTISAN TEA TABLE")}
          {activePhase === 4 && (lang === "ta" ? "நிலை 4 • கேரளா பர்னிச்சர் பிராண்ட்" : "STAGE 4 • KERALA FURNITURE ATELIER")}
        </span>
      </div>



      {/* ========================================================
          BOTTOM SCROLL INDICATOR PROMPT (Fades out upon scrub)
          ======================================================== */}
      <div
        ref={scrollPromptRef}
        className="absolute bottom-6 sm:bottom-8 z-50 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity"
      >
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-sand/80 px-3 py-1 bg-obsidian/85 border border-white/10 backdrop-blur-md">
          {lang === "ta" ? "கீழே உருட்டி அறையை அலங்கரிக்கவும்" : "SCROLL TO ASSEMBLE ATELIER"}
        </span>
        <div className="w-5 h-8 rounded-full border border-champagne/40 flex items-start justify-center p-1 bg-obsidian/60 backdrop-blur-xs">
          <div className="w-1 h-2 rounded-full bg-champagne animate-bounce" />
        </div>
      </div>
    </section>
  );
};
