"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Phone,
  Sparkles,
  Play,
  Pause,
  MessageCircle,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/lib/language-context";
import { getWhatsAppInquiryUrl } from "@/data/brand";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CinematicHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  // Robust Autoplay Initializer for all modern browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React 18 DOM muted attribute fix for browser autoplay policies
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const handlePlaySuccess = () => {
      setIsPlaying(true);
      setVideoLoaded(true);
    };

    video.addEventListener("loadeddata", handlePlaySuccess);
    video.addEventListener("canplay", handlePlaySuccess);
    video.addEventListener("play", handlePlaySuccess);
    video.addEventListener("playing", handlePlaySuccess);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(handlePlaySuccess).catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener("loadeddata", handlePlaySuccess);
      video.removeEventListener("canplay", handlePlaySuccess);
      video.removeEventListener("play", handlePlaySuccess);
      video.removeEventListener("playing", handlePlaySuccess);
    };
  }, []);

  // Play/Pause Video Toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // GSAP Entrance & ScrollTrigger Timeline
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Master Cinematic Entrance Timeline
      const entranceTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      });

      // Eyebrow and video toggle spring down
      entranceTl.from(".hero-eyebrow", {
        y: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "back.out(1.7)",
      });

      // Geo line expands from width 0 and text slides right
      entranceTl.from(".hero-geo-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        ease: "power3.inOut",
      }, "-=0.35");

      entranceTl.from(".hero-geo-text", {
        x: -25,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.45");

      // Masked headline lines rise up majestically with subtle 3D tilt
      entranceTl.from(".hero-title-line-1", {
        yPercent: 120,
        opacity: 0,
        rotateX: 20,
        transformOrigin: "top left",
        duration: 1.1,
        ease: "power4.out",
      }, "-=0.4");

      entranceTl.from(".hero-title-line-2", {
        yPercent: 120,
        opacity: 0,
        rotateX: 20,
        transformOrigin: "top left",
        duration: 1.15,
        ease: "power4.out",
      }, "-=0.85");

      // Paragraph fade and float
      entranceTl.from(".hero-desc", {
        y: 25,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      }, "-=0.7");

      // CTAs spring in with rhythmic bounce
      entranceTl.from(".hero-cta-btn", {
        y: 35,
        opacity: 0,
        scale: 0.92,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.8)",
      }, "-=0.6");

      // Bottom contact strip slides in from bottom
      entranceTl.from(".hero-bottom-strip", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      }, "-=0.5");

      // 2. Scrubbed Parallax ScrollTrigger
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Subtle video container drift
      if (videoRef.current) {
        scrollTl.to(
          videoRef.current,
          {
            yPercent: 12,
            scale: 1.05,
            ease: "none",
          },
          0
        );
      }

      // Hero text drifts up into the 3D showcase
      if (copyRef.current) {
        scrollTl.to(
          copyRef.current,
          {
            yPercent: -15,
            opacity: 0.4,
            ease: "none",
          },
          0
        );
      }

      // Ghost typography horizontal movement
      if (ghostTextRef.current) {
        scrollTl.to(
          ghostTextRef.current,
          {
            xPercent: -20,
            ease: "none",
          },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleScrollDown = () => {
    const target = document.getElementById("brand-depth") || document.getElementById("furniture-marquee");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Kerala Furniture — Tamil Nadu Thekku Showroom"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-obsidian text-white pt-24 sm:pt-28 lg:pt-30 pb-3 sm:pb-5"
    >
      {/* ========================================================
          1. BACKGROUND VIDEO LAYER (Direct Showroom Walkthrough)
          ======================================================== */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none bg-obsidian">
        {/* Base Fallback Image (always underneath video in DOM, visible before video frame decodes) */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-70"}`}>
          <Image
            src="/images/thekku/thekku-sofa-set.jpg"
            alt="Kerala Furniture Tamil Nadu Thekku Showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onPlay={() => setVideoLoaded(true)}
          className={`relative z-10 w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.06] transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-90"}`}
        >
          <source src="/videos/hero-showroom.mp4" type="video/mp4" />
          <source src="/videos/Kerala_Furniture_showroom_interi._20261018185836.mp4" type="video/mp4" />
        </video>

        {/* Carefully balanced cinematic gradient overlays:
            - Left: dark enough for white serif headline legibility
            - Center & Right: mostly transparent so showroom furniture in video is clearly visible
            - Top & Bottom: subtle vignette blending into navbar and next section */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-obsidian/90 via-obsidian/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-obsidian/75 via-transparent to-obsidian/50 pointer-events-none" />
      </div>

      {/* ========================================================
          2. MASSIVE GHOST TYPOGRAPHY (Midground Parallax)
          ======================================================== */}
      <div
        ref={ghostTextRef}
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 z-15 whitespace-nowrap pointer-events-none select-none overflow-visible will-change-transform opacity-10"
      >
        <span
          className="font-serif text-[17vw] font-black uppercase tracking-[0.24em] text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(212, 175, 55, 0.3)",
          }}
        >
          SANKARANKOVIL
        </span>
      </div>

      {/* ========================================================
          3. MAIN HERO CONTENT CONTAINER
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex-1 flex flex-col justify-center py-6 sm:py-10">
        <div ref={copyRef} className="max-w-3xl flex flex-col gap-5 sm:gap-6 text-left">
          {/* Eyebrow & Video Status Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="hero-eyebrow inline-flex items-center gap-1.5 px-3 py-1 bg-obsidian/90 border border-champagne/50 text-champagne text-[11px] font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-subtle will-change-transform">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === "ta" ? "தமிழ்நாடு தேக்கு மரப் பெருமை" : "TAMIL NADU TEAKWOOD HERITAGE"}
              </span>
            </span>

            {/* Showroom Video Indicator & Toggle Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause showroom video" : "Play showroom video"}
              className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1 bg-obsidian/80 border border-white/20 hover:border-champagne/50 text-sand hover:text-white text-[11px] font-mono tracking-wider transition-all backdrop-blur-md focus-ring cursor-pointer will-change-transform"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-white/90">
                {lang === "ta" ? "நேரடி ஷோரூம் வீடியோ" : "SHOWROOM TOUR"}
              </span>
              {isPlaying ? <Pause className="w-3 h-3 text-champagne ml-0.5" /> : <Play className="w-3 h-3 text-champagne ml-0.5" />}
            </button>
          </div>

          {/* Geographical Atelier Lockup */}
          <div className="flex items-center gap-3">
            <div className="hero-geo-line h-[1px] w-12 bg-champagne origin-left will-change-transform" />
            <span className="hero-geo-text text-[10px] font-mono uppercase tracking-widest text-champagne/90 will-change-transform">
              {lang === "ta"
                ? "ரயில்வே ஃபீடர் ரோடு • சங்கரன்கோவில்"
                : "RAILWAY FEEDER ROAD • SANKARANKOVIL"}
            </span>
          </div>

          {/* Main Editorial Headline with Masked Ascending Reveals */}
          {lang === "ta" ? (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.14]">
              <div className="overflow-hidden py-1">
                <span className="hero-title-line-1 block will-change-transform">
                  பாரம்பரிய தேக்கு மரம்,
                </span>
              </div>
              <div className="overflow-hidden py-1">
                <span className="hero-title-line-2 italic font-normal text-champagne block will-change-transform">
                  தலைமுறை போற்றும் கலை.
                </span>
              </div>
            </h1>
          ) : (
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08]">
              <div className="overflow-hidden py-1">
                <span className="hero-title-line-1 block will-change-transform">
                  Where Seasoned Thekku
                </span>
              </div>
              <div className="overflow-hidden py-1">
                <span className="hero-title-line-2 italic font-normal text-champagne block will-change-transform">
                  Becomes Family Heirloom.
                </span>
              </div>
            </h1>
          )}

          {/* Supporting Statement */}
          <p className="hero-desc text-sand-light/90 text-sm sm:text-base md:text-lg max-w-2xl font-sans font-light leading-relaxed will-change-transform">
            {lang === "ta"
              ? "அசல் தமிழ்நாடு தேக்கு மரத்தில் (Thekku Wood) வடிவமைக்கப்பட்ட ஆடம்பர சோஃபாக்கள், ராஜ அலங்காரக் கட்டில்கள், உணவருந்தும் மேஜைகள் மற்றும் அலமாரிகள். சங்கரன்கோவில் ஷோரூமில் நேரடி தயாரிப்பில் கிடைக்கும் தூய மரச் சாமான்கள்."
              : "Handcrafted from seasoned Tamil Nadu solid teakwood (தேக்கு மரம்) with generational tenon-and-mortise joinery. Explore heirloom-grade living, dining, and bedroom suites at our Sankarankovil showroom."}
          </p>

          {/* Core Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Solid Gold CTA */}
            <Link href="/#collections" scroll={true} className="hero-cta-btn will-change-transform">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-champagne text-obsidian font-mono text-xs font-semibold uppercase tracking-[0.16em] hover:bg-champagne-light transition-all duration-300 shadow-gold focus-ring cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{lang === "ta" ? "தேக்கு தொகுப்புகள் பார்க்க →" : "EXPLORE TEAK COLLECTIONS →"}</span>
              </button>
            </Link>

            {/* Transparent Gold-Outlined CTA */}
            <Link href="/#showroom" scroll={true} className="hero-cta-btn will-change-transform">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-transparent border border-champagne text-white hover:bg-champagne/10 hover:text-champagne font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 backdrop-blur-xs focus-ring cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{lang === "ta" ? "ஷோரூம் வருகை தருக" : "VISIT OUR SHOWROOM"}</span>
              </button>
            </Link>

            {/* Direct Hotline Quick Pill */}
            <a
              href="tel:+917902779356"
              className="hero-cta-btn inline-flex items-center gap-2 px-4 py-3 bg-obsidian/80 border border-white/15 text-sand hover:text-champagne hover:border-champagne/50 text-xs font-mono transition-all backdrop-blur-md will-change-transform hover:scale-105 active:scale-95"
              title="Call Sankarankovil Showroom Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-champagne" />
              <span className="font-semibold text-white">79027 79356</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. BOTTOM QUICK-CONTACT STRIP (Exact Phone Numbers)
          ======================================================== */}
      <div className="hero-bottom-strip w-full relative z-20 pt-5 border-t border-white/10 mt-4 bg-obsidian/70 backdrop-blur-md will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          {/* Exact Required Quick-Contact Strip */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-sand">
            <div className="flex items-center gap-1.5 text-champagne">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="uppercase tracking-wider font-semibold text-[10px] sm:text-[11px]">
                DIRECT SHOWROOM LINES:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-white/90 font-medium">
              <a
                href="tel:+917834756478"
                className="hover:text-champagne transition-colors underline-offset-4 hover:underline"
              >
                78347 56478
              </a>
              <span className="text-white/30">•</span>
              <a
                href="tel:+919872198315"
                className="hover:text-champagne transition-colors underline-offset-4 hover:underline"
              >
                98721 98315
              </a>
              <span className="text-white/30">•</span>
              <a
                href="tel:+917902779356"
                className="hover:text-champagne transition-colors underline-offset-4 hover:underline font-semibold text-champagne"
              >
                79027 79356
              </a>
            </div>
          </div>

          {/* Micro Scroll Indicator */}
          <button
            type="button"
            onClick={handleScrollDown}
            className="hidden md:flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] text-sand/60 hover:text-champagne transition-colors cursor-pointer group"
          >
            <span>{lang === "ta" ? "கீழே செல்லவும்" : "SCROLL TO DISCOVER"}</span>
            <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center group-hover:border-champagne transition-colors">
              <div className="w-1 h-1 rounded-full bg-champagne animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
