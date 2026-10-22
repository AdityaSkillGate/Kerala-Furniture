"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Phone,
  ArrowRight,
  ShieldAlert,
  Info,
} from "lucide-react";
import { useShop } from "@/lib/shop-context";
import { BRAND_CONFIG } from "@/data/brand";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartWhatsAppUrl,
  } = useShop();
  const { t, lang } = useLanguage();

  // Escape key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-md bg-charcoal border-l border-champagne/30 text-white shadow-luxury z-10 flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-obsidian border border-white/10 text-champagne">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="cart-drawer-title"
                className="font-serif text-lg sm:text-xl text-white font-medium"
              >
                {t.cart.title}
              </h2>
              <span className="text-[11px] text-sand/60 font-mono">
                {cartCount} {t.cart.piecesSelected}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="p-2 text-white/60 hover:text-champagne transition-colors focus-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Prototype Notice Bar */}
        <div className="bg-amber-950/40 border-b border-amber-600/30 px-5 py-3 flex items-start gap-2.5 text-xs text-amber-200/90 font-sans">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-amber-300 font-medium">{t.cart.pocNoticeTitle}</strong>{" "}
            {t.cart.pocNoticeDesc}
          </p>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => {
              const itemTotal = (item.product.samplePrice || 0) * item.quantity;
              const displayName = lang === "ta" && item.product.tamilName ? item.product.tamilName : item.product.name;

              return (
                <div
                  key={item.product.id}
                  className="bg-obsidian/60 border border-white/10 p-3.5 flex gap-3.5 items-start group hover:border-sand/40 transition-colors"
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={`/products/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="relative w-20 h-20 bg-black/40 overflow-hidden shrink-0 border border-white/10"
                  >
                    <Image
                      src={item.product.image}
                      alt={displayName}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-sm text-white hover:text-champagne transition-colors line-clamp-1 font-medium"
                      >
                        {displayName}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`Remove ${displayName} from cart`}
                        className="text-white/40 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-sand/60 font-mono block">
                      {item.product.productTypeLabel}
                    </span>

                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/20 bg-charcoal">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${displayName}`}
                          className="px-2 py-1 text-white/70 hover:text-champagne transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-white min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${displayName}`}
                          className="px-2 py-1 text-white/70 hover:text-champagne transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total / Unit Price */}
                      <div className="text-right">
                        <span className="font-serif text-xs sm:text-sm font-semibold text-champagne block">
                          ₹{itemTotal.toLocaleString("en-IN")}*
                        </span>
                        <span className="text-[9px] text-sand/50 font-mono">
                          {item.product.priceDisplay} ({lang === "ta" ? "வீதம்" : "each"})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sand mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg text-white font-medium mb-1">
                {t.cart.emptyTitle}
              </h3>
              <p className="text-xs text-sand/60 max-w-xs mb-6 font-sans">
                {t.cart.emptyDesc}
              </p>
              <Link
                href="/#showcase"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne text-obsidian text-xs uppercase tracking-wider font-semibold hover:bg-champagne-light transition-colors"
              >
                <span>{t.cart.browseCatalogue}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Footer with Calculations & WhatsApp Enquiry */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-white/10 bg-obsidian flex flex-col gap-4">
            {/* Subtotal Calculation */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider font-mono text-sand/70">
                  {t.cart.subtotalLabel}
                </span>
                <span className="font-serif text-xl sm:text-2xl text-champagne font-semibold">
                  ₹{cartSubtotal.toLocaleString("en-IN")}*
                </span>
              </div>
              <span className="text-[10px] text-sand/50 font-sans">
                {t.cart.subtotalNotice}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5">
              <a
                href={getCartWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-champagne text-obsidian text-xs font-semibold uppercase tracking-widest hover:bg-champagne-light transition-all shadow-luxury focus-ring"
              >
                <MessageCircle className="w-4 h-4 text-obsidian" />
                <span>{t.cart.requestQuoteWhatsApp}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:+91${BRAND_CONFIG.phones[0].raw}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-white/20 text-white hover:bg-white/10 text-[11px] uppercase tracking-wider font-medium transition-colors"
                >
                  <Phone className="w-3 h-3 text-champagne" />
                  <span>{t.cart.callShowroom}</span>
                </a>

                <button
                  onClick={clearCart}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-white/10 text-white/60 hover:text-rose-400 hover:border-rose-400/40 text-[11px] uppercase tracking-wider transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t.cart.clearCart}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

