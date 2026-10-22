"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  MessageCircle,
  Phone,
  Heart,
  Sparkles,
  Check,
  Ruler,
  Layers,
  Sparkle,
  ShieldCheck,
  Share2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { ProductItem } from "@/data/products";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";
import { useShop } from "@/lib/shop-context";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export interface ProductQuickViewModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const { addToCart } = useShop();
  const { t, lang } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState<0 | 1>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset active image when product changes
  React.useEffect(() => {
    setActiveImageIndex(0);
    setCopiedLink(false);
  }, [product?.id]);

  if (!product) return null;

  const displayName = lang === "ta" && product.tamilName ? product.tamilName : product.name;
  const currentImage =
    activeImageIndex === 1 && product.secondaryImage
      ? product.secondaryImage
      : product.image;

  const whatsappUrl = getWhatsAppInquiryUrl(
    displayName,
    product.productTypeLabel
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/#showcase?product=${product.id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="p-0 overflow-hidden bg-obsidian border-champagne/30 max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        {/* Left Column: Image Gallery & Thumbnails */}
        <div className="md:col-span-6 bg-charcoal/50 flex flex-col p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10 relative">
          {/* Main Selected Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian border border-sand/20 rounded-sm mb-4">
            <Image
              src={currentImage}
              alt={displayName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-500"
              priority
            />
            {product.isFeatured && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="gold" className="flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 text-champagne" />
                  <span>{t.productCard.signaturePiece}</span>
                </Badge>
              </div>
            )}
          </div>

          {/* Image Angle Selector Thumbnails */}
          {product.secondaryImage && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveImageIndex(0)}
                className={cn(
                  "relative w-20 h-16 overflow-hidden border-2 transition-all rounded-xs focus-ring",
                  activeImageIndex === 0
                    ? "border-champagne opacity-100 shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
                aria-label="View primary angle"
              >
                <Image
                  src={product.image}
                  alt="Primary view"
                  fill
                  className="object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveImageIndex(1)}
                className={cn(
                  "relative w-20 h-16 overflow-hidden border-2 transition-all rounded-xs focus-ring",
                  activeImageIndex === 1
                    ? "border-champagne opacity-100 shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
                aria-label="View alternate angle"
              >
                <Image
                  src={product.secondaryImage}
                  alt="Alternate view"
                  fill
                  className="object-cover"
                />
              </button>

              <span className="text-[11px] text-sand/60 font-sans ml-2">
                {lang === "ta" ? "மர மூட்டுகளைப் பார்வையிடவும்" : "Click angles to inspect joinery"}
              </span>
            </div>
          )}

          {/* Showroom Authenticity Guarantee */}
          <div className="mt-auto pt-6 flex items-center gap-3 text-sand/70 text-xs border-t border-white/5">
            <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
            <span>
              {t.productDetail.physicalInspectionDesc}
            </span>
          </div>
        </div>

        {/* Right Column: Specifications & Direct Actions */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-charcoal text-white">
          <div>
            {/* Header / Category / Close / Wishlist */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-champagne font-mono">
                  {product.productTypeLabel}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs text-sand/70">{product.category}</span>
              </div>

              <div className="flex items-center gap-2">
                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={cn(
                      "p-1.5 rounded-full border transition-colors focus-ring",
                      isWishlisted
                        ? "border-rose-500 bg-rose-500/20 text-rose-400"
                        : "border-white/20 text-white/70 hover:text-champagne hover:border-champagne"
                    )}
                  >
                    <Heart
                      className={cn("w-4 h-4", isWishlisted && "fill-current")}
                    />
                  </button>
                )}

                <button
                  onClick={handleCopyLink}
                  aria-label="Copy product link"
                  className="p-1.5 rounded-full border border-white/20 text-white/70 hover:text-champagne hover:border-champagne transition-colors focus-ring"
                  title="Copy link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-tight">
              {displayName}
            </h2>
            {/* Subtitle - Only shown in Tamil mode for English reference, never show Tamil in English mode */}
            {lang === "ta" && product.name && (
              <p className="text-sm font-sans text-sand/80 mt-1 font-normal italic">
                {product.name}
              </p>
            )}

            {/* Pricing Section with Luxury Font Styling */}
            <div className="mt-4 p-3.5 bg-obsidian/70 border border-sand/20 rounded-xs flex flex-col gap-1">
              <div className="flex items-baseline">
                <span className="font-serif text-base font-medium text-champagne mr-1 select-none">
                  ₹
                </span>
                <span className="font-sans text-2xl sm:text-[1.7rem] font-bold text-white tracking-tight tabular-nums">
                  {product.samplePrice ? product.samplePrice.toLocaleString("en-IN") : product.priceDisplay.replace(/[^\d,]/g, "")}
                </span>
                <sup className="text-xs font-sans text-champagne/80 ml-0.5 select-none">*</sup>
              </div>
              <p className="text-[11px] text-sand/60 leading-normal">
                {product.priceNote}
              </p>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-sand/90 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Structural & Timber Specs */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/5 p-4 border border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-sand/50 text-[10px] uppercase tracking-wider font-mono">
                  {t.productDetail.timberSpecies}
                </span>
                <span className="font-medium text-white text-xs">
                  {product.material}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sand/50 text-[10px] uppercase tracking-wider font-mono">
                  {t.productDetail.finishLabel}
                </span>
                <span className="font-medium text-white text-xs">
                  {product.finish}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2 pt-2 border-t border-white/10">
                <span className="text-sand/50 text-[10px] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Ruler className="w-3 h-3 text-champagne" />
                  {t.productDetail.dimensionsLabel}
                </span>
                <span className="font-mono text-champagne text-xs">
                  {product.dimensions}
                </span>
              </div>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-5">
                <h4 className="text-[11px] uppercase tracking-wider text-sand/60 font-mono mb-2">
                  {t.productDetail.highlightsTitle}
                </h4>
                <ul className="space-y-1.5 text-xs text-sand/90">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Shopping & Full Details Shortcuts */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                addToCart(product, 1);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-champagne hover:text-obsidian text-xs uppercase tracking-wider font-semibold transition-colors focus-ring"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.productDetail.addToCart}</span>
            </button>

            <Link
              href={`/products/${product.id}`}
              onClick={onClose}
              className="text-xs text-champagne hover:underline inline-flex items-center gap-1 font-mono uppercase tracking-wider"
            >
              <span>{lang === "ta" ? "முழு விபரப் பக்கம்" : "Full Details Page"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-champagne text-obsidian font-semibold text-xs uppercase tracking-widest hover:bg-champagne-light transition-colors shadow-luxury focus-ring"
            >
              <MessageCircle className="w-4 h-4 text-obsidian" />
              <span>{t.productDetail.whatsappEnquiryBtn}</span>
            </a>

            <a
              href={BRAND_CONFIG.primaryPhone.tel}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 border border-white/20 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-colors focus-ring"
            >
              <Phone className="w-3.5 h-3.5 text-champagne" />
              <span>{lang === "ta" ? "ஷோரூமை அழைக்க" : "Call Showroom"}</span>
            </a>
          </div>

          {copiedLink && (
            <div className="text-[11px] text-champagne text-center font-mono animate-fade-in">
              Direct showcase link copied to clipboard
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
