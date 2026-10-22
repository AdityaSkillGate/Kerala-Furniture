"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, Heart, Eye, ArrowUpRight, ShieldCheck, TreePine, Ruler } from "lucide-react";
import { ProductItem } from "@/data/products";
import { getWhatsAppInquiryUrl } from "@/data/brand";
import { useShop } from "@/lib/shop-context";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export interface ProductCardProps {
  product: ProductItem;
  onSelect?: (product: ProductItem) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isWishlisted,
  onToggleWishlist,
}) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const { t, lang } = useLanguage();
  
  const currentWishlisted =
    typeof isWishlisted === "boolean" ? isWishlisted : isInWishlist(product.id);

  const displayName = lang === "ta" && product.tamilName ? product.tamilName : product.name;
  // In English mode, show ONLY English (never show Tamil text). In Tamil mode, show English subtitle for reference.
  const secondaryName = lang === "ta" ? product.name : null;
  const whatsappUrl = getWhatsAppInquiryUrl(displayName, product.productTypeLabel);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    } else {
      toggleWishlist(product.id);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(product);
    }
  };

  return (
    <article className="group relative flex flex-col justify-between bg-[#FDFCFA] border border-[#E6DDCE] hover:border-champagne/90 transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgba(23,21,18,0.04)] hover:shadow-[0_22px_50px_-10px_rgba(23,21,18,0.16)] hover:-translate-y-2 select-none">
      {/* 0. Top Hairline Champagne Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent group-hover:via-champagne transition-all duration-500 z-20 pointer-events-none" />

      {/* 1. Image Container with Alternate Image on Hover */}
      <div
        className="relative aspect-[16/11] w-full overflow-hidden bg-ivory-dark/60 cursor-pointer"
        onClick={handleViewDetails}
      >
        {/* Primary Product Image */}
        <Image
          src={product.image}
          alt={displayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover object-center transition-all duration-700 ease-out group-hover:scale-108",
            product.secondaryImage && "group-hover:opacity-0"
          )}
        />

        {/* Secondary Alternate Angle / Craftsmanship Image */}
        {product.secondaryImage && (
          <Image
            src={product.secondaryImage}
            alt={`${displayName} - Craftsmanship Angle`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-hover:scale-108 absolute inset-0"
          />
        )}

        {/* Ambient Top Vignette for Badges */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-15 flex flex-col gap-1.5 pointer-events-none">
          {product.isFeatured && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-obsidian/90 border border-champagne/60 text-champagne text-[9.5px] font-mono uppercase tracking-[0.22em] backdrop-blur-md shadow-luxury grow-ttb-in">
              <Sparkles className="w-3 h-3 text-champagne animate-pulse" />
              <span>{t.productCard.signaturePiece}</span>
            </div>
          )}
        </div>

        {/* Top-Right Wishlist Floating Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={currentWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 right-3 z-15 p-2.5 rounded-full transition-all duration-300 focus-ring shadow-luxury cursor-pointer hover:scale-110 active:scale-90",
            currentWishlisted
              ? "bg-rose-600 text-white shadow-rose-900/30"
              : "bg-obsidian/80 backdrop-blur-md text-white/90 hover:text-champagne hover:bg-obsidian border border-white/20 hover:border-champagne/60"
          )}
        >
          <Heart className={cn("w-3.5 h-3.5 transition-transform", currentWishlisted && "fill-current scale-110")} />
        </button>

        {/* Bottom Floating Category Tag on Image */}
        <div className="absolute bottom-3 left-3 z-15 pointer-events-none">
          <span className="inline-block px-2.5 py-0.5 bg-obsidian/85 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-sand/90 backdrop-blur-md">
            {product.productTypeLabel}
          </span>
        </div>

        {/* Quick View Details Overlay Button */}
        <button
          type="button"
          onClick={handleViewDetails}
          className="absolute bottom-3 right-3 z-15 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3.5 py-1.5 bg-champagne text-obsidian text-[10px] font-mono uppercase font-semibold tracking-wider flex items-center gap-1.5 hover:bg-champagne-light shadow-luxury cursor-pointer jump-in"
        >
          <Eye className="w-3.5 h-3.5 text-obsidian" />
          <span>{t.productCard.quickView}</span>
        </button>
      </div>

      {/* 2. Content Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
        <div>
          {/* Eyebrow Breadcrumb & Heritage Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-walnut font-semibold">
              {product.category} • {lang === "ta" ? "அசல் தேக்கு" : "SOLID THEKKU"}
            </span>
            <span className="inline-flex items-center gap-1 text-[9.5px] font-mono text-champagne-dark px-2 py-0.5 bg-sand/20 border border-sand/40 uppercase tracking-wider">
              <TreePine className="w-2.5 h-2.5" />
              <span>TN TEAK</span>
            </span>
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product.id}`}
            className="font-serif text-lg sm:text-xl text-obsidian font-semibold hover:text-walnut transition-colors cursor-pointer leading-snug block"
          >
            {displayName}
          </Link>

          {/* Optional Subtitle - Only rendered in Tamil mode to keep English view 100% clean English */}
          {lang === "ta" && secondaryName && (
            <span className="text-xs text-sand-dark font-sans italic mt-0.5 block line-clamp-1">
              {secondaryName}
            </span>
          )}

          {/* Editorial Description */}
          <p className="mt-2 text-xs text-charcoal/70 line-clamp-2 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Modern Specification Badges (Replaces plain table with tactile chips) */}
          <div className="mt-4 pt-3.5 border-t border-sand/25 grid grid-cols-2 gap-2 text-xs">
            {/* Material Chip */}
            <div className="flex flex-col p-2 bg-[#F6F1E8]/70 border border-sand/35">
              <div className="flex items-center gap-1 text-charcoal/60 text-[10px] uppercase font-mono tracking-wider mb-0.5">
                <ShieldCheck className="w-3 h-3 text-champagne-dark shrink-0" />
                <span>{t.productCard.materialLabel}</span>
              </div>
              <span className="font-sans font-medium text-obsidian text-[11px] truncate" title={product.material}>
                {product.material.replace("100% Seasoned Tamil Nadu Solid Teakwood", "Seasoned Solid Teak")}
              </span>
            </div>

            {/* Dimensions Chip */}
            <div className="flex flex-col p-2 bg-[#F6F1E8]/70 border border-sand/35">
              <div className="flex items-center gap-1 text-charcoal/60 text-[10px] uppercase font-mono tracking-wider mb-0.5">
                <Ruler className="w-3 h-3 text-champagne-dark shrink-0" />
                <span>{t.productCard.dimensionsLabel}</span>
              </div>
              <span className="font-mono text-[11px] text-obsidian font-medium truncate" title={product.dimensions}>
                {product.dimensions.split("(")[0].trim()}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Pricing & Actions — Refined Luxury Font Styling */}
        <div className="pt-4 border-t border-sand/30 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="font-serif text-base sm:text-lg font-medium text-champagne-dark mr-1 select-none">
                ₹
              </span>
              <span className="font-sans text-xl sm:text-[1.45rem] font-bold text-obsidian tracking-tight tabular-nums">
                {product.samplePrice ? product.samplePrice.toLocaleString("en-IN") : product.priceDisplay.replace(/[^\d,]/g, "")}
              </span>
              <sup className="text-[11px] font-sans text-sand-dark ml-0.5 select-none">*</sup>
            </div>
            <span className="text-[10px] sm:text-[10.5px] text-charcoal/65 font-sans font-light tracking-wide mt-0.5">
              {lang === "ta" ? "நேரடி தயாரிப்பு விலை" : "Direct Atelier Price"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Details Link */}
            <Link
              href={`/products/${product.id}`}
              className="p-2 border border-sand/50 hover:border-obsidian text-charcoal hover:text-obsidian transition-colors group/btn"
              title="View full piece details"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>

            {/* Quick WhatsApp Enquiry Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-obsidian text-white hover:bg-champagne hover:text-obsidian text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 focus-ring shadow-subtle hover:shadow-gold cursor-pointer"
              title="Inquire directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-champagne group-hover:text-obsidian transition-colors" />
              <span>{t.productCard.enquire}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
