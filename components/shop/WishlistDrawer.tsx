"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useShop } from "@/lib/shop-context";
import { getWhatsAppInquiryUrl } from "@/data/brand";
import { useLanguage } from "@/lib/language-context";

export const WishlistDrawer: React.FC = () => {
  const {
    wishlistProducts,
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    clearWishlist,
    addToCart,
    getWishlistWhatsAppUrl,
  } = useShop();
  const { t, lang } = useLanguage();

  // Escape key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWishlistOpen) {
        setIsWishlistOpen(false);
      }
    };

    if (isWishlistOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-md bg-charcoal border-l border-champagne/30 text-white shadow-luxury z-10 flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-obsidian border border-white/10 text-rose-400">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2
                id="wishlist-drawer-title"
                className="font-serif text-lg sm:text-xl text-white font-medium"
              >
                {t.wishlist.title}
              </h2>
              <span className="text-[11px] text-sand/60 font-mono">
                {wishlist.length} {t.wishlist.piecesSaved}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist drawer"
            className="p-2 text-white/60 hover:text-champagne transition-colors focus-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => {
              const displayName = lang === "ta" && product.tamilName ? product.tamilName : product.name;

              return (
                <div
                  key={product.id}
                  className="bg-obsidian/60 border border-white/10 p-3.5 flex gap-3.5 items-start group hover:border-sand/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.id}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="relative w-20 h-20 bg-black/40 overflow-hidden shrink-0 border border-white/10"
                  >
                    <Image
                      src={product.image}
                      alt={displayName}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="font-serif text-sm text-white hover:text-champagne transition-colors line-clamp-1 font-medium"
                      >
                        {displayName}
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={`Remove ${displayName} from wishlist`}
                        className="text-white/40 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-sand/60 font-mono block">
                      {product.productTypeLabel} • {product.category}
                    </span>

                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-serif text-sm font-semibold text-champagne">
                        {product.priceDisplay}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-sand/50 font-mono">
                        {lang === "ta" ? "மாதிரி விலை" : "demo price"}
                      </span>
                    </div>

                    {/* Actions for Item */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-champagne text-obsidian text-[11px] uppercase tracking-wider font-semibold hover:bg-champagne-light transition-colors shadow-sm"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>{t.wishlist.moveToCart}</span>
                      </button>

                      <a
                        href={getWhatsAppInquiryUrl(displayName, product.productTypeLabel)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-white/20 text-white hover:bg-white/10 text-[11px] uppercase tracking-wider transition-colors"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3 text-champagne" />
                        <span className="hidden sm:inline">{t.wishlist.enquire}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sand mb-4">
                <Heart className="w-7 h-7 text-sand/60" />
              </div>
              <h3 className="font-serif text-lg text-white font-medium mb-1">
                {t.wishlist.emptyTitle}
              </h3>
              <p className="text-xs text-sand/60 max-w-xs mb-6 font-sans">
                {t.wishlist.emptyDesc}
              </p>
              <Link
                href="/#showcase"
                onClick={() => setIsWishlistOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne text-obsidian text-xs uppercase tracking-wider font-semibold hover:bg-champagne-light transition-colors"
              >
                <span>{t.wishlist.browseCatalogue}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Footer with Bulk Actions */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-white/10 bg-obsidian flex flex-col gap-3">
            <a
              href={getWishlistWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-champagne text-obsidian text-xs font-semibold uppercase tracking-widest hover:bg-champagne-light transition-all shadow-luxury focus-ring"
            >
              <MessageCircle className="w-4 h-4 text-obsidian" />
              <span>{t.wishlist.bulkInquireWhatsApp}</span>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-sand/60 font-sans">
                {t.wishlist.storageNote}
              </span>
              <button
                onClick={clearWishlist}
                className="text-[11px] uppercase tracking-wider font-mono text-sand/50 hover:text-rose-400 transition-colors"
              >
                {t.wishlist.clearShortlist}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

