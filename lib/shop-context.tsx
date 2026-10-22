"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ProductItem, PRODUCTS } from "@/data/products";
import { BRAND_CONFIG, getWhatsAppInquiryUrl } from "@/data/brand";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface ShopContextType {
  // Wishlist
  wishlist: string[];
  wishlistProducts: ProductItem[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  getWishlistWhatsAppUrl: () => string;

  // Cart
  cart: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getCartWhatsAppUrl: () => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "kerala_furniture_wishlist_v1";
const CART_STORAGE_KEY = "kerala_furniture_cart_v1";

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Safe Client Hydration from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart: { productId: string; quantity: number }[] = JSON.parse(savedCart);
        const reconstructed: CartItem[] = [];
        parsedCart.forEach((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          if (product) {
            reconstructed.push({ product, quantity: Math.max(1, item.quantity) });
          }
        });
        setCart(reconstructed);
      }
    } catch (e) {
      console.warn("Failed to read shop data from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Persist Wishlist changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Failed to save wishlist to localStorage:", e);
    }
  }, [wishlist, isHydrated]);

  // 3. Persist Cart changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const serializable = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      console.warn("Failed to save cart to localStorage:", e);
    }
  }, [cart, isHydrated]);

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  // Cart Actions
  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Open cart drawer for instant feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.product.samplePrice || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cart]);

  // WhatsApp formatted enquiry message for cart
  const getCartWhatsAppUrl = () => {
    if (cart.length === 0) return getWhatsAppInquiryUrl();

    let text = "Hello Kerala Furniture,\n\nI would like to enquire about availability and tailored sizing for these pieces from my showroom demo cart:\n\n";

    cart.forEach((item, index) => {
      const priceStr = item.product.samplePrice
        ? `₹${(item.product.samplePrice * item.quantity).toLocaleString("en-IN")}*`
        : "Showroom Quote";
      text += `${index + 1}. ${item.product.name} (Qty: ${item.quantity}) — ${priceStr}\n`;
    });

    if (cartSubtotal > 0) {
      text += `\nEstimated Demo Subtotal: ₹${cartSubtotal.toLocaleString("en-IN")}*\n`;
    }

    text += "\nNote: I understand these prices are illustrative POC demo values. Please advise on custom timber, finishes, and showroom consultation at Sankarankovil.";

    const phone = BRAND_CONFIG.phones[0].raw;
    return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
  };

  // WhatsApp formatted enquiry message for wishlist
  const getWishlistWhatsAppUrl = () => {
    if (wishlistProducts.length === 0) return getWhatsAppInquiryUrl();

    let text = "Hello Kerala Furniture,\n\nI have saved these pieces to my Kerala Furniture shortlist and would like to enquire about showroom viewings:\n\n";

    wishlistProducts.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.productTypeLabel}) — ${item.priceDisplay}\n`;
    });

    text += "\nPlease let me know if these pieces can be inspected or customized at your Railway Feeder Road showroom in Sankarankovil.";

    const phone = BRAND_CONFIG.phones[0].raw;
    return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
  };

  const value = {
    wishlist,
    wishlistProducts,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    getWishlistWhatsAppUrl,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    getCartWhatsAppUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
