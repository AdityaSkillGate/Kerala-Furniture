"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  ChevronRight,
  Info,
  Maximize2,
  Check,
} from "lucide-react";
import { BRAND_CONFIG } from "@/data/brand";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Divider } from "@/components/ui/Divider";
import { ImageWrapper } from "@/components/ui/ImageWrapper";
import { Modal } from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/Tooltip";
import { Skeleton, Spinner } from "@/components/ui/Skeleton";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function StyleGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: "Obsidian", hex: "#0A0908", role: "Primary Canvas (Dark Luxury)", border: "border-white/10" },
    { name: "Charcoal", hex: "#171512", role: "Elevation / Modals / Cards", border: "border-white/10" },
    { name: "Champagne Gold", hex: "#D8B16A", role: "Accents, Indicators, Monogram", border: "border-champagne/40" },
    { name: "Warm Ivory", hex: "#F5F0E7", role: "Product Catalog Canvas (Light)", border: "border-sand/40" },
    { name: "Sand Beige", hex: "#D9C8AE", role: "Dividers, Badges, Borders", border: "border-sand/40" },
    { name: "Walnut", hex: "#67452E", role: "Wood Tone & Shopping Eyebrows", border: "border-walnut/40" },
    { name: "White", hex: "#FFFFFF", role: "Editorial Headlines & High Contrast", border: "border-white/20" },
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-obsidian text-white py-12">
      <Container size="default">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-12">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-sand hover:text-champagne flex items-center gap-1.5 transition-colors uppercase tracking-wider"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Home</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs text-champagne uppercase tracking-widest font-mono">
              Design System Specification
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Eyebrow variant="gold" icon={<Sparkles className="w-3 h-3 text-champagne" />}>
              Phase 1 Deliverable
            </Eyebrow>
          </div>
        </div>

        {/* Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-mono">
            {BRAND_CONFIG.name} • {BRAND_CONFIG.address.city}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium mt-2">
            Premium Luxury Design System
          </h1>
          <p className="text-sand/80 text-sm sm:text-base max-w-3xl mt-4 leading-relaxed font-light">
            A cohesive architectural visual language for Kerala Furniture. Combines high-contrast Obsidian and Champagne Gold brand storytelling with tactile Warm Ivory and Walnut product curations.
          </p>
        </div>

        {/* 1. Color Palette */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Color Tokens"
            title="Approved Luxury Palette"
            description="Seven calibrated tokens ensuring high contrast, editorial elegance, and dark/light section transitions."
            className="mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => copyToClipboard(c.hex)}
                className={`p-4 bg-charcoal border ${c.border} cursor-pointer hover:border-champagne transition-all group`}
              >
                <div
                  className="w-full h-24 mb-3 border border-black/20"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-white">{c.name}</span>
                  <span className="font-mono text-xs text-champagne group-hover:underline">
                    {copiedColor === c.hex ? "Copied!" : c.hex}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 mt-1">{c.role}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider variant="gold" label="TYPOGRAPHY" />

        {/* 2. Typography Scale */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Typography Scale"
            title="Editorial Serif & Precision Sans"
            description="Playfair Display for high-fashion headings; Plus Jakarta Sans for crisp legible body copy and controls."
            className="mb-8"
          />

          <div className="p-8 bg-charcoal border border-white/10 flex flex-col gap-8">
            <div className="pb-6 border-b border-white/10">
              <span className="text-[11px] font-mono text-champagne uppercase">Display Hero (Playfair Display 56px - 72px)</span>
              <p className="text-display-hero mt-2">
                Better Spaces • <span className="italic text-champagne">Brighter Lives.</span>
              </p>
            </div>

            <div className="pb-6 border-b border-white/10">
              <span className="text-[11px] font-mono text-champagne uppercase">H2 Section Heading (Playfair Display 36px - 48px)</span>
              <p className="text-display-h2 mt-2">
                Crafted in Solid Hardwood.
              </p>
            </div>

            <div className="pb-6 border-b border-white/10">
              <span className="text-[11px] font-mono text-champagne uppercase">H3 Subheading (Playfair Display 24px - 30px)</span>
              <p className="text-display-h3 mt-2">
                Malabar Teak Sectional Lounge Suite
              </p>
            </div>

            <div className="pb-6 border-b border-white/10">
              <span className="text-[11px] font-mono text-champagne uppercase">Body Regular (Plus Jakarta Sans 15px, Leading 1.6)</span>
              <p className="text-sm sm:text-base text-sand-light/85 max-w-3xl mt-2 leading-relaxed">
                Located at Q 299, Railway Feeder Road, Sankarankovil, Kerala Furniture provides seasoned timber curations without artificial veneers. Every joint employs traditional mortise-and-tenon interlocking precision for lifelong structural stability.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-champagne uppercase">Eyebrow & Monospace (Tracking 0.2em)</span>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span className="text-xs uppercase tracking-[0.2em] text-champagne font-sans font-medium">
                  ARCHITECTURAL FURNITURE ATELIER
                </span>
                <span className="font-mono text-xs text-sand">
                  +91 70347 56478 • SANKARANKOVIL - 627 756
                </span>
              </div>
            </div>
          </div>
        </section>

        <Divider variant="gold" label="BUTTONS & CONTROLS" />

        {/* 3. Button Matrix */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Interactive Controls"
            title="Buttons & Icon Buttons"
            description="Restrained luxury states, keyboard focus-ring visibility, and interactive feedback."
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dark Surface Buttons */}
            <div className="p-8 bg-charcoal border border-white/10 flex flex-col gap-6">
              <span className="text-xs uppercase tracking-wider text-sand font-mono">
                Dark Surface Variants (Obsidian / Charcoal)
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Gold</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="gold">Rich Gold</Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <Button
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 2000);
                  }}
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  {buttonLoading ? "Loading..." : "Test Loading State"}
                </Button>

                <Button disabled icon={<ArrowRight className="w-4 h-4" />}>
                  Disabled
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <IconButton aria-label="Call Line" variant="primary">
                  <Phone className="w-4 h-4" />
                </IconButton>
                <IconButton aria-label="WhatsApp Inquiry" variant="secondary">
                  <MessageCircle className="w-4 h-4 text-champagne" />
                </IconButton>
                <IconButton aria-label="Showroom Location" variant="outline">
                  <MapPin className="w-4 h-4" />
                </IconButton>
                <IconButton aria-label="Enlarge Image" variant="ghost">
                  <Maximize2 className="w-4 h-4" />
                </IconButton>
              </div>
            </div>

            {/* Light Surface Buttons */}
            <div className="p-8 bg-ivory text-obsidian border border-sand/40 flex flex-col gap-6">
              <span className="text-xs uppercase tracking-wider text-walnut font-mono">
                Light Surface Variants (Warm Ivory / Sand)
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="walnut">Walnut Primary</Button>
                <Button variant="ivory" className="!bg-white text-obsidian border-sand">
                  Ivory White
                </Button>
                <Button variant="outline" className="!border-obsidian !text-obsidian hover:!bg-obsidian/5">
                  Obsidian Outline
                </Button>
              </div>

              <div className="pt-4 border-t border-sand/30 flex flex-col gap-3">
                <span className="text-xs text-charcoal/70 font-sans">
                  Accessible Focus Ring Demo (Press Tab to test):
                </span>
                <div className="flex gap-3">
                  <Button variant="walnut" className="focus-ring">
                    Tab Focus Me
                  </Button>
                  <Button variant="primary" className="focus-ring">
                    Tab Focus Me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider variant="gold" label="EDITORIAL COMPONENTS" />

        {/* 4. Section Heading & Eyebrow Showcase */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Heading Modules"
            title="SectionHeading & Eyebrow Archetypes"
            description="Demonstrating dark luxury and warm ivory contrast layouts."
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-charcoal border border-white/10">
              <span className="text-xs font-mono text-sand mb-4 block">Dark Luxury Theme:</span>
              <SectionHeading
                eyebrow="Heritage & Joinery"
                title="Rooted in Sankarankovil"
                titleItalic="Craftsmanship"
                description="Our master woodworkers uphold classical South Indian cabinetry joinery."
                theme="dark"
              />
            </div>

            <div className="p-8 bg-ivory text-obsidian border border-sand/40">
              <span className="text-xs font-mono text-walnut mb-4 block">Light Shopping Theme:</span>
              <SectionHeading
                eyebrow="Living Room Atelier"
                title="Signature Curations in"
                titleItalic="Solid Teakwood"
                description="Designed for natural daylight, spatial warmth, and tactile comfort."
                theme="light"
              />
            </div>
          </div>
        </section>

        <Divider variant="gold" label="IMAGE ARCHETYPES" />

        {/* 5. Image Wrappers */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Aspect Ratios"
            title="ImageWrapper Standard"
            description="Standardized responsive aspect ratios with smooth hover scale and luxury captions."
            className="mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImageWrapper
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
              alt="Living Room Lounge"
              aspect="landscape"
              caption="Landscape 4:3 — Living Collection"
              badge={<Eyebrow variant="gold">4:3 Aspect</Eyebrow>}
            />

            <ImageWrapper
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
              alt="Architectural Interior"
              aspect="portrait"
              caption="Portrait 3:4 — Hero Feature"
              badge={<Eyebrow variant="dark">3:4 Aspect</Eyebrow>}
            />

            <ImageWrapper
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
              alt="Dining Table"
              aspect="square"
              caption="Square 1:1 — Material Focus"
              badge={<Eyebrow variant="gold">1:1 Aspect</Eyebrow>}
            />

            <ImageWrapper
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
              alt="Bedroom Suite"
              aspect="cinematic"
              caption="Cinematic 16:9 — Room Panorama"
              badge={<Eyebrow variant="dark">16:9 Aspect</Eyebrow>}
            />
          </div>
        </section>

        <Divider variant="gold" label="ACCESSIBLE DIALOG & TOOLTIPS" />

        {/* 6. Modal Dialog, Tooltip, and Loading Foundations */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Foundations"
            title="Dialogs, Tooltips & Skeletons"
            description="Accessible overlays with escape key listener, focus trap, and loading placeholders."
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Modal Trigger Card */}
            <div className="p-6 bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-champagne uppercase">Accessible Modal Dialog</span>
                <p className="text-xs text-sand-light/70 mt-2 leading-relaxed">
                  Interactive dialog with backdrop blur, keyboard ESC dismissal, and Framer Motion transitions.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setModalOpen(true)}
              >
                Launch Test Dialog
              </Button>
            </div>

            {/* Tooltip Demonstration */}
            <div className="p-6 bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-champagne uppercase">Accessible Tooltip</span>
                <p className="text-xs text-sand-light/70 mt-2 leading-relaxed">
                  Hover or keyboard-tab over the buttons to reveal micro tooltips.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Tooltip content="Direct Call: 70347 56478" position="top">
                  <IconButton aria-label="Direct Phone Line" variant="primary">
                    <Phone className="w-4 h-4" />
                  </IconButton>
                </Tooltip>

                <Tooltip content="Inquire via WhatsApp" position="top">
                  <IconButton aria-label="WhatsApp" variant="secondary">
                    <MessageCircle className="w-4 h-4 text-champagne" />
                  </IconButton>
                </Tooltip>

                <Tooltip content="Q 299, Railway Feeder Road" position="top">
                  <IconButton aria-label="Address" variant="outline">
                    <MapPin className="w-4 h-4" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            {/* Skeleton & Loading */}
            <div className="p-6 bg-charcoal border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-champagne uppercase">Skeleton & Spinners</span>
                <p className="text-xs text-sand-light/70 mt-2 leading-relaxed">
                  Shimmering loading placeholders matching product card ratios.
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Skeleton className="w-full h-12" />
                <div className="flex gap-2">
                  <Skeleton className="w-2/3 h-4" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                <Spinner size="sm" variant="gold" />
                <Spinner size="md" variant="white" />
                <Spinner size="lg" variant="gold" />
              </div>
            </div>
          </div>
        </section>

        <Divider variant="gold" label="PRODUCT CARD TOKENS" />

        {/* 7. Product Card Design Tokens */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="Product Archetype"
            title="Product Card Design Tokens"
            description="Verified card presentation ensuring authentic materials, dimensions, and zero fake prices."
            className="mb-8"
          />

          <div className="max-w-md">
            <ProductCard product={PRODUCTS[0]} />
          </div>
        </section>

        {/* Interactive Modal Instance */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Kerala Furniture — Showroom Inquiry"
          description="Direct assistance from Q 299, Railway Feeder Road, Sankarankovil"
        >
          <div className="flex flex-col gap-4 text-sm text-sand-light/80">
            <p>
              This accessible dialog confirms keyboard trap, ESC key dismissal, and backdrop blur integration. In future phases, this modal will power the Product Quick-View drawer and Bespoke Interior Consultation sheet.
            </p>

            <div className="p-4 bg-obsidian border border-white/10 flex flex-col gap-2 text-xs">
              <span className="text-champagne font-mono font-medium">Verified Showroom Lines:</span>
              {BRAND_CONFIG.phones.map((phone) => (
                <div key={phone.id} className="flex justify-between">
                  <span>{phone.label}:</span>
                  <span className="text-champagne font-mono">{phone.display}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Understood & Close
              </Button>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
}
