"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Heart,
  PackageSearch,
  MessageCircle,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";
import {
  PRODUCTS,
  PRODUCT_TYPES,
  PRODUCT_TYPE_TAMIL,
  ProductItem,
  ProductType,
} from "@/data/products";
import { BRAND_CONFIG, getWhatsAppInquiryUrl, getBespokeWhatsAppUrl } from "@/data/brand";
import { useShop } from "@/lib/shop-context";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductQuickViewModal } from "@/components/products/ProductQuickViewModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

type SortOption = "featured" | "price-low" | "price-high" | "name-asc" | "name-desc";

export const ProductCatalogue: React.FC = () => {
  // Global Shop & Language Context
  const { wishlist, toggleWishlist } = useShop();
  const { t, lang } = useLanguage();

  // 1. Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductType>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // 2. Quick View Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // 3. Wishlist Toggle Handler
  const handleToggleWishlist = (productId: string) => {
    toggleWishlist(productId);
  };

  // 4. Quick View Open Handler
  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // 5. Compute Dynamic Product Counts per Category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length };
    PRODUCT_TYPES.forEach((type) => {
      if (type.id !== "all") {
        counts[type.id] = PRODUCTS.filter((p) => p.productType === type.id).length;
      }
    });
    return counts;
  }, []);

  // 6. Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== "all" && product.productType !== selectedCategory) {
        return false;
      }

      // Wishlist Only Filter
      if (showWishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTamil = product.tamilName?.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesType = product.productTypeLabel.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFeatures = product.features.some((f) =>
          f.toLowerCase().includes(query)
        );

        return (
          matchesName ||
          matchesTamil ||
          matchesCategory ||
          matchesType ||
          matchesMaterial ||
          matchesDesc ||
          matchesFeatures
        );
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "featured") {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      }
      if (sortBy === "price-low") {
        return (a.samplePrice || 0) - (b.samplePrice || 0);
      }
      if (sortBy === "price-high") {
        return (b.samplePrice || 0) - (a.samplePrice || 0);
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [selectedCategory, showWishlistOnly, wishlist, searchQuery, sortBy]);

  // 7. Reset All Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setShowWishlistOnly(false);
    setVisibleCount(6);
  };

  const isFilterActive =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    sortBy !== "featured" ||
    showWishlistOnly;

  // 8. Load More Slicing
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredProducts.length));
  };

  return (
    <section
      id="showcase"
      className="py-24 bg-ivory text-obsidian border-b border-sand/30 scroll-mt-20 relative"
    >
      <div id="catalogue" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="ivory" className="mb-3 border-walnut/30 text-walnut">
              {t.catalogue.eyebrow}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-obsidian font-medium tracking-tight">
              {t.catalogue.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-2 max-w-lg">
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
              {t.catalogue.subheading}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-walnut">
              <span className="w-2 h-2 rounded-full bg-champagne-dark animate-pulse" />
              <span>{t.catalogue.demoNotice}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-white border border-sand/40 p-4 sm:p-6 mb-8 shadow-subtle flex flex-col gap-5">
          {/* Top Bar: Search Input, Sorting, Wishlist Shortcut */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative flex-grow max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                id="product-search-input"
                name="productSearch"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6); // reset pagination on search
                }}
                placeholder={t.catalogue.searchPlaceholder}
                aria-label={t.catalogue.searchPlaceholder}
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-ivory border border-sand/40 text-obsidian placeholder:text-charcoal/50 focus:outline-none focus:border-walnut transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-charcoal/40 hover:text-obsidian transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sorting & Shortlist Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Shortlist / Wishlist Filter Pill */}
              <button
                type="button"
                onClick={() => {
                  setShowWishlistOnly(!showWishlistOnly);
                  setVisibleCount(6);
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-3.5 py-2.5 text-xs uppercase tracking-wider font-sans border transition-all focus-ring",
                  showWishlistOnly
                    ? "bg-rose-50 border-rose-300 text-rose-700 shadow-sm"
                    : "bg-ivory border-sand/40 text-charcoal/80 hover:border-sand hover:text-obsidian"
                )}
                aria-pressed={showWishlistOnly}
              >
                <Heart
                  className={cn(
                    "w-3.5 h-3.5",
                    wishlist.length > 0 && "text-rose-500",
                    showWishlistOnly && "fill-current"
                  )}
                />
                <span className="hidden sm:inline">{t.catalogue.savedPill}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-black/5 rounded-xs">
                  {wishlist.length}
                </span>
              </button>

              {/* Sorting Select Dropdown */}
              <div className="relative inline-flex items-center">
                <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-charcoal/40 pointer-events-none" />
                <select
                  id="product-sort-select"
                  name="productSort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-8 pr-8 py-2.5 bg-ivory border border-sand/40 text-xs uppercase tracking-wider text-charcoal/90 focus:outline-none focus:border-walnut cursor-pointer font-sans"
                  aria-label="Sort furniture items"
                >
                  <option value="featured">{t.catalogue.sortFeatured}</option>
                  <option value="price-low">{t.catalogue.sortPriceLow}</option>
                  <option value="price-high">{t.catalogue.sortPriceHigh}</option>
                  <option value="name-asc">{t.catalogue.sortNameAsc}</option>
                  <option value="name-desc">{t.catalogue.sortNameDesc}</option>
                </select>
                <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-charcoal/40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-sand/20 pt-4">
            <span className="text-[11px] font-mono text-charcoal/50 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              <span>{t.catalogue.categoryPillPrefix}</span>
            </span>

            {PRODUCT_TYPES.map((type) => {
              const isSelected = selectedCategory === type.id;
              const count = categoryCounts[type.id] ?? 0;
              const displayLabel =
                lang === "ta" && PRODUCT_TYPE_TAMIL[type.id]
                  ? PRODUCT_TYPE_TAMIL[type.id]
                  : type.label;

              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedCategory(type.id);
                    setVisibleCount(6); // reset pagination when category changes
                  }}
                  className={cn(
                    "px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all font-sans flex items-center gap-1.5 border shrink-0 focus-ring",
                    isSelected
                      ? "bg-obsidian border-obsidian text-champagne font-medium shadow-sm"
                      : "bg-ivory border-sand/40 text-charcoal/70 hover:border-sand hover:text-obsidian"
                  )}
                  aria-pressed={isSelected}
                >
                  <span>{displayLabel}</span>
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1 py-0.2 rounded-xs",
                      isSelected
                        ? "bg-champagne/20 text-champagne"
                        : "bg-black/5 text-charcoal/50"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Summary Bar */}
          {isFilterActive && (
            <div className="pt-3 border-t border-sand/20 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal/80">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-obsidian">{t.catalogue.activeFiltersLabel}</span>
                {selectedCategory !== "all" && (
                  <span className="px-2 py-0.5 bg-sand/30 border border-sand/50 text-obsidian text-[11px] uppercase tracking-wider font-mono flex items-center gap-1">
                    {t.catalogue.categoryPillPrefix}{" "}
                    {lang === "ta" && PRODUCT_TYPE_TAMIL[selectedCategory]
                      ? PRODUCT_TYPE_TAMIL[selectedCategory]
                      : PRODUCT_TYPES.find((t) => t.id === selectedCategory)?.label}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-walnut ml-1"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-sand/30 border border-sand/50 text-obsidian text-[11px] uppercase tracking-wider font-mono flex items-center gap-1">
                    {lang === "ta" ? "தேடல்:" : "Search:"} &ldquo;{searchQuery}&rdquo;
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-walnut ml-1"
                      aria-label="Clear search filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {showWishlistOnly && (
                  <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] uppercase tracking-wider font-mono flex items-center gap-1">
                    {t.catalogue.savedPill} ({wishlist.length})
                    <button
                      onClick={() => setShowWishlistOnly(false)}
                      className="hover:text-rose-900 ml-1"
                      aria-label="Disable wishlist filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {sortBy !== "featured" && (
                  <span className="px-2 py-0.5 bg-sand/30 border border-sand/50 text-obsidian text-[11px] uppercase tracking-wider font-mono">
                    {lang === "ta" ? "வரிசை:" : "Sort:"} {sortBy}
                  </span>
                )}
              </div>

              {/* Reset All Filters Action Button */}
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-walnut hover:text-obsidian font-medium uppercase tracking-wider transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.catalogue.resetFilters}</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Count Summary */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-charcoal/60 font-mono">
          <span>
            {t.catalogue.showingCountPrefix} {Math.min(visibleCount, filteredProducts.length)}{" "}
            {t.catalogue.showingCountMiddle} {filteredProducts.length} {t.catalogue.showingCountSuffix}
          </span>
          <span className="hidden sm:inline">
            {lang === "ta"
              ? "சங்கரன்கோவில் ஷோரூம் தொகுப்பு • ரயில்வே ஃபீடர் ரோடு"
              : "Sankarankovil Showroom Collection • Railway Feeder Road"}
          </span>
        </div>

        {/* Main Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {visibleProducts.map((product, idx) => {
              const delayClass = [
                "anim-delay-75",
                "anim-delay-150",
                "anim-delay-200",
                "anim-delay-250",
                "anim-delay-300",
                "anim-delay-400",
              ][idx % 6];
              return (
                <div key={product.id} className={cn("spring-btt-in", delayClass)}>
                  <ProductCard
                    product={product}
                    onSelect={handleSelectProduct}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-sand/40 p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto my-8 shadow-subtle">
            <div className="w-14 h-14 rounded-full bg-sand/30 flex items-center justify-center text-walnut mb-4">
              <PackageSearch className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-obsidian font-medium mb-2">
              {t.catalogue.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-sans max-w-md mb-6">
              {t.catalogue.emptyDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-obsidian text-white hover:bg-charcoal text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.catalogue.resetFilters}</span>
              </button>

              <a
                href={getBespokeWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-walnut/40 text-walnut hover:bg-walnut/5 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-walnut" />
                <span>{t.catalogue.customCommissionCta}</span>
              </a>
            </div>
          </div>
        )}

        {/* Pagination / Load More Interaction */}
        {hasMore && (
          <div className="mt-14 text-center flex flex-col items-center gap-3">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-4 bg-obsidian text-white hover:bg-charcoal hover:text-champagne text-xs uppercase tracking-widest font-medium transition-all shadow-subtle focus-ring"
            >
              <span>{t.catalogue.loadMore}</span>
              <span className="text-[10px] font-mono text-champagne">
                ({filteredProducts.length - visibleCount} {t.catalogue.remaining})
              </span>
            </button>
            <span className="text-[11px] text-charcoal/60 font-sans">
              {t.catalogue.showingCountPrefix} {visibleCount} {t.catalogue.showingCountMiddle}{" "}
              {filteredProducts.length} {t.catalogue.showingCountSuffix}
            </span>
          </div>
        )}

        {/* Showroom Lookbook Inquiry Banner */}
        <div className="mt-16 pt-8 border-t border-sand/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/60 p-6 sm:p-8">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-lg text-obsidian font-medium">
              {t.catalogue.lookbookPrompt}
            </span>
            <span className="text-xs text-charcoal/70 font-sans">
              {lang === "ta"
                ? "தேக்கு, ஈட்டி மற்றும் பிரம்பு தனிப்பயனாக்கங்களுக்கு எங்கள் முதன்மை கைவினைஞர்களுடன் நேரடியாக இணையுங்கள்."
                : "Connect with our master artisans directly for teak, rosewood, and cane customizations."}
            </span>
          </div>

          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-walnut text-white hover:bg-obsidian text-xs uppercase tracking-widest font-medium transition-all shadow-subtle shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-champagne" />
            <span>{t.catalogue.lookbookCta}</span>
          </a>
        </div>
      </div>

      {/* Interactive Product Quick-View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </section>
  );
};
