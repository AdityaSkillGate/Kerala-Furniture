"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getBespokeWhatsAppUrl } from "@/data/brand";
import { useLanguage } from "@/lib/language-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/home/CinematicHero";
import { BrandDepthShowcase } from "@/components/home/BrandDepthShowcase";
import { FurnitureMarquee } from "@/components/home/FurnitureMarquee";
import { BrandStory } from "@/components/home/BrandStory";
import { CategoryCollections } from "@/components/home/CategoryCollections";
import { ProductCatalogue } from "@/components/home/ProductCatalogue";
import { ShowroomExperience } from "@/components/home/ShowroomExperience";
import { ShowroomChatbot } from "@/components/chat/ShowroomChatbot";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-grow flex flex-col">
        {/* 2. Cinematic Hero with Live Showroom Video Background */}
        <CinematicHero />

        {/* 2b. 3D Layered Atelier Reveal (Text-Behind-Furniture Pinning Scrollytelling) */}
        <BrandDepthShowcase />

        {/* 3. Continuous Furniture Marquee Strip */}
        <FurnitureMarquee />

        {/* 4. Brand Story and Premium Editorial Experience */}
        <BrandStory />

        {/* 5. Furniture Category Collections (Editorial Asymmetric Grid) */}
        <CategoryCollections />

        {/* 6. E-Commerce-Style Product Catalogue (Furniture Worth Coming Home To) */}
        <ProductCatalogue />

        {/* 7. Bespoke Interior Consultation (Dark Atelier Canvas) */}
        <section id="bespoke" className="py-24 bg-obsidian border-b border-white/10 relative overflow-hidden">
          {/* Subtle Atelier Ambient Glow */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/[0.04] blur-[160px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col gap-6 slide-ltr-in">
                <Badge variant="gold" className="self-start spring-ttb-in">{t.bespoke.eyebrow}</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                  {t.bespoke.heading}
                </h2>
                <p className="text-sand/80 text-sm leading-relaxed">
                  {t.bespoke.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-charcoal/90 border border-white/10 hover:border-champagne/40 transition-all duration-300 spring-btt-in anim-delay-75 group/pillar">
                    <span className="text-xs text-champagne uppercase tracking-wider font-medium group-hover/pillar:text-champagne-light transition-colors">
                      {t.bespoke.pillar1Title}
                    </span>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {t.bespoke.pillar1Desc}
                    </p>
                  </div>
                  <div className="p-4 bg-charcoal/90 border border-white/10 hover:border-champagne/40 transition-all duration-300 spring-btt-in anim-delay-150 group/pillar">
                    <span className="text-xs text-champagne uppercase tracking-wider font-medium group-hover/pillar:text-champagne-light transition-colors">
                      {t.bespoke.pillar2Title}
                    </span>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {t.bespoke.pillar2Desc}
                    </p>
                  </div>
                  <div className="p-4 bg-charcoal/90 border border-white/10 hover:border-champagne/40 transition-all duration-300 spring-btt-in anim-delay-200 group/pillar">
                    <span className="text-xs text-champagne uppercase tracking-wider font-medium group-hover/pillar:text-champagne-light transition-colors">
                      {t.bespoke.pillar3Title}
                    </span>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {t.bespoke.pillar3Desc}
                    </p>
                  </div>
                  <div className="p-4 bg-charcoal/90 border border-white/10 hover:border-champagne/40 transition-all duration-300 spring-btt-in anim-delay-300 group/pillar">
                    <span className="text-xs text-champagne uppercase tracking-wider font-medium group-hover/pillar:text-champagne-light transition-colors">
                      {t.bespoke.pillar4Title}
                    </span>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {t.bespoke.pillar4Desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 spring-btt-in anim-delay-400">
                  <a
                    href={getBespokeWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-champagne text-obsidian text-xs font-semibold uppercase tracking-wider hover:bg-champagne-light hover:shadow-[0_0_25px_rgba(216,177,106,0.35)] transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.bespoke.consultationCta}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] bg-charcoal border border-sand/20 overflow-hidden shadow-luxury group zoom-in">
                <Image
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
                  alt="Kerala Furniture bespoke carpentry craftsmanship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10 spring-btt-in anim-delay-200">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-champagne bg-obsidian/90 backdrop-blur-md px-3 py-1.5 border border-champagne/30 shadow-subtle">
                    {lang === "ta" ? "நேரடி மரப்பட்டறை தனிப்பயன் வேலைப்பாடு" : "Handcrafted Atelier Custom Work"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Showroom Experience, Inspiration Gallery & Verifiable Trust */}
        <ShowroomExperience />
      </main>

      {/* 9. Global Architectural Footer */}
      <Footer />

      {/* 10. Floating Bilingual FAQ Showroom Chatbot */}
      <ShowroomChatbot />
    </div>
  );
}
