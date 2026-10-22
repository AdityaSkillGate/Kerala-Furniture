import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { BRAND_CONFIG } from "@/data/brand";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailClient } from "./ProductDetailClient";

interface PageProps {
  params: {
    id: string;
  };
}

// 1. Static Generation for All 16 Products
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// 2. SEO Metadata Generation
export function generateMetadata({ params }: PageProps): Metadata {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found | Kerala Furniture",
      description: "The requested furniture piece could not be located in our catalogue.",
    };
  }

  return {
    title: `${product.name} — Kerala Furniture | Sankarankovil`,
    description: `${product.description} Crafted from ${product.material} with ${product.finish}. Showroom at ${BRAND_CONFIG.address.full}.`,
    openGraph: {
      title: `${product.name} | Kerala Furniture`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-champagne mb-4">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-3">
            Furniture Piece Not Found
          </h1>
          <p className="text-xs sm:text-sm text-sand/70 max-w-md mb-8 font-sans">
            The piece you are looking for is either archived or unavailable in our current showcase. Explore our complete handcrafted collection.
          </p>
          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-champagne text-obsidian text-xs uppercase tracking-widest font-semibold hover:bg-champagne-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Furniture Catalogue</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Related products from the same category or type (excluding the current one)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.productType === product.productType)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      {/* Global Navigation with Bilingual Switcher */}
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetailClient
            product={product}
            relatedProducts={relatedProducts}
          />
        </div>
      </main>

      {/* Global Footer with Bilingual Content */}
      <Footer />
    </div>
  );
}
