"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Phone } from "lucide-react";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const HeroFoundation: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-obsidian overflow-hidden border-b border-white/10 pt-32 lg:pt-36 pb-16">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-champagne/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="gold" className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                <span>Architectural Furniture Atelier</span>
              </Badge>
              <div className="flex items-center gap-1 text-xs text-sand/80">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Sankarankovil, Tamil Nadu</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08]">
              Crafting <span className="italic text-champagne">Better Spaces</span> for Brighter Lives.
            </h1>

            <p className="text-sand-light/80 text-base sm:text-lg max-w-2xl font-sans font-light leading-relaxed">
              Explore timeless solid-hardwood furniture, modern spatial harmony, and bespoke artisanal joinery at our Sankarankovil showroom. Built for longevity without artificial veneers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="#showcase">
                <Button variant="primary" size="lg" className="flex items-center gap-2 group">
                  <span>Explore Curations</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#showroom">
                <Button variant="outline" size="lg">
                  <span>Visit Showroom</span>
                </Button>
              </Link>
            </div>

            {/* Direct Phone Lines Fast-Dial Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-1.5 text-sand">
                <Phone className="w-3.5 h-3.5 text-champagne" />
                <span className="uppercase tracking-wider font-medium">Showroom Direct:</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {BRAND_CONFIG.phones.map((phone) => (
                  <a
                    key={phone.id}
                    href={phone.tel}
                    className="font-mono text-white/90 hover:text-champagne transition-colors underline-offset-4 hover:underline"
                  >
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Architectural Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-sand/20 shadow-luxury bg-charcoal">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                alt="Kerala Furniture luxury living curation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-obsidian/90 backdrop-blur-md border border-white/10 text-xs">
                <div className="flex items-center justify-between text-sand font-serif">
                  <span>Kerala Furniture Showroom</span>
                  <span className="text-[10px] tracking-widest uppercase font-sans text-champagne">Sankarankovil</span>
                </div>
                <p className="mt-1 text-white/70 text-[11px] leading-relaxed">
                  {BRAND_CONFIG.address.street}, near Railway Station area, Sankarankovil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
