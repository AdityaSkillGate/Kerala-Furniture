"use client";

import React from "react";
import { LanguageProvider } from "@/lib/language-context";
import { ShopProvider } from "@/lib/shop-context";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { WishlistDrawer } from "@/components/shop/WishlistDrawer";

export const ShopClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LanguageProvider>
      <ShopProvider>
        {children}
        <CartDrawer />
        <WishlistDrawer />
      </ShopProvider>
    </LanguageProvider>
  );
};
