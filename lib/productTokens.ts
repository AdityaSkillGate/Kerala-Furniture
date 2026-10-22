/**
 * Reusable Product Card Design Tokens
 * Harmonizes the warm ivory shopping surface with restrained luxury details.
 */

export const productCardTokens = {
  // Container surface & elevation
  card: {
    container:
      "group bg-white border border-sand/30 flex flex-col justify-between transition-all duration-300 hover:shadow-luxury hover:border-sand overflow-hidden",
    darkContainer:
      "group bg-charcoal border border-white/10 flex flex-col justify-between transition-all duration-300 hover:shadow-luxury hover:border-champagne/40 overflow-hidden",
  },

  // Image display
  image: {
    aspect: "relative aspect-[4/3] w-full overflow-hidden bg-ivory-dark",
    img: "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
    badgePosition: "absolute top-3 left-3 z-10",
  },

  // Content typography & layout
  content: {
    wrapper: "p-6 flex flex-col flex-grow justify-between gap-4",
    categoryEyebrow:
      "text-[11px] uppercase tracking-[0.2em] text-walnut font-medium font-sans",
    categoryEyebrowDark:
      "text-[11px] uppercase tracking-[0.2em] text-champagne font-medium font-sans",
    title:
      "font-serif text-lg md:text-xl text-obsidian font-medium group-hover:text-walnut transition-colors leading-tight",
    titleDark:
      "font-serif text-lg md:text-xl text-white font-medium group-hover:text-champagne transition-colors leading-tight",
    description: "mt-2 text-xs text-charcoal/70 line-clamp-2 leading-relaxed font-sans",
    descriptionDark: "mt-2 text-xs text-sand-light/70 line-clamp-2 leading-relaxed font-sans",
  },

  // Specifications
  specs: {
    container: "mt-4 pt-4 border-t border-sand/20 flex flex-col gap-1.5 text-xs",
    specsContainerDark: "mt-4 pt-4 border-t border-white/10 flex flex-col gap-1.5 text-xs",
    label: "text-charcoal/50 font-sans",
    labelDark: "text-white/40 font-sans",
    value: "font-medium text-right text-obsidian font-sans",
    valueDark: "font-medium text-right text-white font-sans",
    dimensions: "font-mono text-[11px] text-obsidian",
    dimensionsDark: "font-mono text-[11px] text-sand-light",
  },

  // Footer & Actions
  footer: {
    container: "pt-4 border-t border-sand/20 flex items-center justify-between gap-3",
    containerDark: "pt-4 border-t border-white/10 flex items-center justify-between gap-3",
    pricingLabel: "text-[10px] uppercase tracking-wider text-charcoal/50 font-sans",
    pricingLabelDark: "text-[10px] uppercase tracking-wider text-white/40 font-sans",
    pricingNote: "text-xs font-serif text-walnut font-medium",
    pricingNoteDark: "text-xs font-serif text-champagne font-medium",
    inquiryButton:
      "inline-flex items-center gap-1.5 px-3.5 py-2 bg-charcoal text-white hover:bg-obsidian hover:text-champagne text-xs uppercase tracking-wider transition-colors shrink-0 focus-ring",
    inquiryButtonDark:
      "inline-flex items-center gap-1.5 px-3.5 py-2 bg-champagne text-obsidian hover:bg-champagne-light text-xs uppercase tracking-wider font-semibold transition-colors shrink-0 focus-ring",
  },
};
