"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Heart,
  ShoppingBag,
  Sparkles,
  Check,
  Ruler,
  ShieldCheck,
  Plus,
  Minus,
  Share2,
  CheckCircle2,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { ProductItem, PRODUCT_TYPE_TAMIL } from "@/data/products";
import { BRAND_CONFIG } from "@/data/brand";
import { useShop } from "@/lib/shop-context";
import { useLanguage } from "@/lib/language-context";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/products/ProductCard";
import { ShowroomChatbot } from "@/components/chat/ShowroomChatbot";
import { cn } from "@/lib/utils";

export interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts?: ProductItem[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts = [],
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const { t, lang } = useLanguage();

  const [activeImageIndex, setActiveImageIndex] = useState<0 | 1>(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const currentImage =
    activeImageIndex === 1 && product.secondaryImage
      ? product.secondaryImage
      : product.image;

  // Language-aware naming
  const mainTitle = lang === "ta" && product.tamilName ? product.tamilName : product.name;
  const subTitle = lang === "ta" ? product.name : product.tamilName;
  const typeLabel = lang === "ta" && PRODUCT_TYPE_TAMIL[product.productType]
    ? PRODUCT_TYPE_TAMIL[product.productType]
    : product.productTypeLabel;
  const materialLabel = product.material;

  // Official WhatsApp prefilled enquiry link (Bilingual)
  const generateWhatsAppUrl = () => {
    let text = "";
    if (lang === "ta") {
      text = `வணக்கம் கேரளா பர்னிச்சர்,\n\nநான் ${mainTitle} (${typeLabel}) பற்றி அறிய விரும்புகிறேன்.\n\nசங்கரன்கோவில் ஷோரூமில் இதன் இருப்பு நிலை, மர வகைகள் மற்றும் டெலிவரி விவரங்களை பகிர்ந்து கொள்ள முடியுமா?\n\n(POC Showcase Reference: ${product.id})`;
    } else {
      text = `Hello Kerala Furniture,\n\nI am interested in the ${product.name} (${product.productTypeLabel}).\n\nCould you please share showroom availability, timber options, and delivery details for Sankarankovil / Tenkasi District?\n\n(POC Showcase Reference: ${product.id})`;
    }
    const phone = BRAND_CONFIG.phones[0].raw;
    return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  return (
    <div>
      {/* 1. Breadcrumbs & Return Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 py-4 mb-6 border-b border-white/10 text-xs text-sand/60 font-sans">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-champagne transition-colors">
            {t.productDetail.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/#showcase" className="hover:text-champagne transition-colors">
            {t.productDetail.breadcrumbCatalogue}
          </Link>
          <span>/</span>
          <span className="text-sand font-mono uppercase tracking-wider">
            {typeLabel}
          </span>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
            {mainTitle}
          </span>
        </div>

        <Link
          href="/#showcase"
          className="inline-flex items-center gap-1.5 text-champagne hover:underline text-xs uppercase tracking-wider font-mono shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.productDetail.backToCollection}</span>
        </Link>
      </nav>

      {/* 2. Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Large Product Image Gallery & Thumbnails */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Active Large Image Display */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal border border-white/10 shadow-luxury group">
            <Image
              src={currentImage}
              alt={mainTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-700 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.isFeatured && (
                <Badge variant="gold" className="flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-champagne" />
                  <span>{t.productDetail.signaturePiece}</span>
                </Badge>
              )}
              <Badge variant="dark" className="border-white/20 text-sand/80 shadow-sm">
                {t.productDetail.solidHardwood}
              </Badge>
            </div>

            {/* Share Button Overlay */}
            <button
              onClick={handleCopyLink}
              aria-label="Share product link"
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-obsidian/70 backdrop-blur-sm text-white/80 hover:text-champagne hover:bg-obsidian border border-white/10 transition-all shadow-sm focus-ring"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Selector (Keyboard Accessible) */}
          {product.secondaryImage && (
            <div className="flex items-center gap-4 pt-1" role="tablist" aria-label="Product angles">
              <button
                type="button"
                role="tab"
                aria-selected={activeImageIndex === 0}
                aria-label="Select primary angle"
                onClick={() => setActiveImageIndex(0)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActiveImageIndex(1);
                }}
                className={cn(
                  "relative w-24 h-20 overflow-hidden border-2 transition-all rounded-xs focus-ring bg-charcoal",
                  activeImageIndex === 0
                    ? "border-champagne shadow-md opacity-100"
                    : "border-transparent opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={product.image}
                  alt="Primary angle view"
                  fill
                  className="object-cover object-center"
                />
                <span className="sr-only">Primary Perspective</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeImageIndex === 1}
                aria-label="Select alternate angle"
                onClick={() => setActiveImageIndex(1)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setActiveImageIndex(0);
                }}
                className={cn(
                  "relative w-24 h-20 overflow-hidden border-2 transition-all rounded-xs focus-ring bg-charcoal",
                  activeImageIndex === 1
                    ? "border-champagne shadow-md opacity-100"
                    : "border-transparent opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={product.secondaryImage}
                  alt="Alternate perspective view"
                  fill
                  className="object-cover object-center"
                />
                <span className="sr-only">Alternate Perspective</span>
              </button>

              <span className="text-xs text-sand/60 font-sans ml-2">
                {lang === "ta" ? "மரத்தின் தோற்றம் மற்றும் அமைப்பைக் காணக் கோணங்களைத் தேர்ந்தெடுக்கவும்" : "Select angles to inspect wood grain and profile"}
              </span>
            </div>
          )}

          {/* Showroom Authenticity Inspection Callout */}
          <div className="mt-4 p-4 bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-sand/80">
            <ShieldCheck className="w-5 h-5 text-champagne shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-white">{t.productDetail.physicalInspectionTitle}</strong>{" "}
              {t.productDetail.physicalInspectionDesc}
            </p>
          </div>
        </div>

        {/* Right Column: Information, Pricing, Specs & Purchase Interest */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            {/* Category & Room Tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-mono font-medium">
                {typeLabel}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-sand/70 font-sans">{product.category}</span>
            </div>

            {/* Product Name */}
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
              {mainTitle}
            </h1>

            {/* Subtitle - Only rendered in Tamil mode to keep English view 100% clean English */}
            {lang === "ta" && subTitle && (
              <p className="text-sm sm:text-base text-sand/70 mt-1 font-sans italic">
                {subTitle}
              </p>
            )}

            {/* Refined Luxury Pricing Box */}
            <div className="mt-5 p-4 bg-charcoal border border-champagne/30 rounded-xs flex flex-col gap-1.5 shadow-subtle">
              <div className="flex items-baseline">
                <span className="font-serif text-xl sm:text-2xl font-medium text-champagne mr-1 select-none">
                  ₹
                </span>
                <span className="font-sans text-3xl sm:text-4xl text-white font-bold tracking-tight tabular-nums">
                  {product.samplePrice ? product.samplePrice.toLocaleString("en-IN") : product.priceDisplay.replace(/[^\d,]/g, "")}
                </span>
                <sup className="text-sm font-sans text-champagne/80 ml-0.5 select-none">*</sup>
              </div>
              <p className="text-xs text-sand/70 leading-relaxed font-sans mt-0.5">
                {product.priceNote}
              </p>
            </div>

            {/* Description Narrative */}
            <p className="mt-5 text-sm sm:text-base text-sand/90 font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Structural Specifications & Materials Grid */}
          <div className="p-5 bg-charcoal/80 border border-white/10 rounded-xs flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-widest font-mono text-sand/70 pb-2 border-b border-white/10">
              {t.productDetail.specsTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-sand/50 uppercase tracking-wider font-mono text-[10px]">
                  {t.productDetail.timberSpecies}
                </span>
                <span className="font-medium text-white text-xs sm:text-sm">
                  {materialLabel}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sand/50 uppercase tracking-wider font-mono text-[10px]">
                  {t.productDetail.finishLabel}
                </span>
                <span className="font-medium text-white text-xs sm:text-sm">
                  {product.finish}
                </span>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1 pt-2 border-t border-white/10">
                <span className="text-sand/50 uppercase tracking-wider font-mono text-[10px] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-champagne" />
                  {t.productDetail.dimensionsLabel}
                </span>
                <span className="font-mono text-champagne text-xs sm:text-sm font-medium">
                  {product.dimensions}
                </span>
                <span className="text-[10px] text-sand/50 italic font-sans mt-0.5">
                  {t.productDetail.customBlueprintNote}
                </span>
              </div>
            </div>
          </div>

          {/* Key Features Bullet Points */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest font-mono text-sand/70">
                {t.productDetail.highlightsTitle}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-sand/90 font-sans">
                {product.features.map((feat, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Shopping Interactions (Quantity, Demo Cart, Wishlist) */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-white/20 bg-charcoal" title={t.productDetail.quantityLabel}>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3.5 py-3 text-white/70 hover:text-champagne transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-mono font-medium text-white min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="px-3.5 py-3 text-white/70 hover:text-champagne transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Demo Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-champagne text-obsidian text-xs font-semibold uppercase tracking-widest hover:bg-champagne-light transition-all shadow-luxury focus-ring"
              >
                <ShoppingBag className="w-4 h-4 text-obsidian" />
                <span>{t.productDetail.addToCart}</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isFavorited ? t.productDetail.savedWishlist : t.productDetail.saveWishlist}
                className={cn(
                  "p-3.5 border transition-all focus-ring shrink-0",
                  isFavorited
                    ? "bg-rose-500 border-rose-500 text-white shadow-md"
                    : "bg-charcoal border-white/20 text-white/80 hover:border-champagne hover:text-champagne"
                )}
                title={isFavorited ? t.productDetail.savedWishlist : t.productDetail.saveWishlist}
              >
                <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
              </button>
            </div>

            {/* Feedback Toast */}
            {addedToast && (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-mono animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.productDetail.addedToCartToast}</span>
              </div>
            )}

            {copiedLink && (
              <div className="text-xs text-champagne text-center font-mono animate-in fade-in">
                {lang === "ta" ? "இணைப்பு நகலெடுக்கப்பட்டது." : "Product showcase URL copied to clipboard."}
              </div>
            )}

            {/* Primary WhatsApp Direct Enquiry Button */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-subtle focus-ring"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>{t.productDetail.whatsappEnquiryBtn}</span>
              </a>
              <span className="text-[11px] text-sand/60 text-center font-sans">
                {t.productDetail.whatsappDisclaimer}
              </span>
            </div>

            {/* Showroom Direct Dial & Location */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sand/70 font-mono">
              <span>{t.productDetail.showroomLineLabel}</span>
              <a
                href={BRAND_CONFIG.primaryPhone.tel}
                className="text-champagne hover:underline font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3" />
                <span>{BRAND_CONFIG.primaryPhone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bespoke Showroom Commission Notice */}
      <div className="mt-20 p-8 sm:p-12 bg-charcoal border border-champagne/30 text-white relative overflow-hidden">
        <div className="max-w-3xl flex flex-col gap-4">
          <Badge variant="gold" className="w-fit">
            {t.productDetail.customNoticeEyebrow}
          </Badge>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            {t.productDetail.customNoticeHeading}
          </h3>
          <p className="text-xs sm:text-sm text-sand/80 leading-relaxed font-sans">
            {t.productDetail.customNoticeDesc}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-champagne">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {BRAND_CONFIG.address.line1}, {BRAND_CONFIG.address.city}
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Lines: {BRAND_CONFIG.phones[0].display} / {BRAND_CONFIG.phones[1].display}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Curated Complementary Furniture Pieces */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="gold" className="mb-2">
                {t.productDetail.relatedEyebrow}
              </Badge>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {t.productDetail.relatedHeading}
              </h3>
            </div>
            <Link
              href="/#showcase"
              className="text-xs text-champagne hover:underline uppercase tracking-wider font-mono inline-flex items-center gap-1"
            >
              <span>{t.productDetail.viewAllCatalogue}</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}

      {/* Product-Aware Floating Showroom Chatbot */}
      <ShowroomChatbot currentProduct={product} />
    </div>
  );
};
