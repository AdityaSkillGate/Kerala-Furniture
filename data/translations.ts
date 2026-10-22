/**
 * Kerala Furniture — Master Bilingual Translation Dictionaries
 * English (en) and Tamil (ta)
 * 
 * Rules:
 * - Use natural, polite, customer-friendly Tamil appropriate for a furniture showroom in Southern Tamil Nadu.
 * - Do not translate brand name (Kerala Furniture), phone numbers, or raw address identifiers unnecessarily.
 * - Tagline preserved: Better Spaces • Brighter Lives.
 */

export type SupportedLanguage = "en" | "ta";

export interface TranslationDictionary {
  nav: {
    home: string;
    collections: string;
    livingRoom: string;
    bedroom: string;
    dining: string;
    wardrobes: string;
    customFurniture: string;
    showroom: string;
    contact: string;
    callUs: string;
    switchLang: string;
    wishlistLabel: string;
    cartLabel: string;
    inquireWhatsApp: string;
  };
  brand: {
    name: string;
    tagline: string;
    taglineTamil: string;
    location: string;
    addressLabel: string;
    fullAddress: string;
    threeLinesNotice: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    locationBadge: string;
    scrollPrompt: string;
  };
  marquee: {
    solidTeak: string;
    liveEdge: string;
    customDimensions: string;
    mortiseJoinery: string;
    naturalCane: string;
    handPolished: string;
    sankarankovilAtelier: string;
  };
  brandStory: {
    eyebrow: string;
    headline: string;
    supporting: string;
    taglineLead: string;
    philosophyP1: string;
    philosophyP2: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    showroomCallout: string;
  };
  categories: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    exploreCta: string;
    sofas: string;
    recliners: string;
    bedroom: string;
    beds: string;
    dining: string;
    wardrobes: string;
    decor: string;
    office: string;
    custom: string;
  };
  catalogue: {
    eyebrow: string;
    heading: string;
    subheading: string;
    demoNotice: string;
    searchPlaceholder: string;
    categoryPillPrefix: string;
    allPieces: string;
    savedPill: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortNameAsc: string;
    sortNameDesc: string;
    activeFiltersLabel: string;
    resetFilters: string;
    showingCountPrefix: string;
    showingCountMiddle: string;
    showingCountSuffix: string;
    loadMore: string;
    remaining: string;
    emptyTitle: string;
    emptyDesc: string;
    customCommissionCta: string;
    lookbookPrompt: string;
    lookbookCta: string;
  };
  productCard: {
    signaturePiece: string;
    quickView: string;
    enquire: string;
    demoPill: string;
    materialLabel: string;
    dimensionsLabel: string;
    inquireShowroom: string;
  };
  productDetail: {
    breadcrumbHome: string;
    breadcrumbCatalogue: string;
    backToCollection: string;
    signaturePiece: string;
    solidHardwood: string;
    physicalInspectionTitle: string;
    physicalInspectionDesc: string;
    demoPriceBadge: string;
    specsTitle: string;
    timberSpecies: string;
    finishLabel: string;
    dimensionsLabel: string;
    customBlueprintNote: string;
    highlightsTitle: string;
    quantityLabel: string;
    addToCart: string;
    addedToCartToast: string;
    saveWishlist: string;
    savedWishlist: string;
    whatsappEnquiryBtn: string;
    whatsappDisclaimer: string;
    showroomLineLabel: string;
    customNoticeEyebrow: string;
    customNoticeHeading: string;
    customNoticeDesc: string;
    relatedEyebrow: string;
    relatedHeading: string;
    viewAllCatalogue: string;
    notFoundTitle: string;
    notFoundDesc: string;
    returnCatalogueBtn: string;
  };
  cart: {
    title: string;
    piecesSelected: string;
    pocNoticeTitle: string;
    pocNoticeDesc: string;
    emptyTitle: string;
    emptyDesc: string;
    browseCatalogue: string;
    subtotalLabel: string;
    subtotalNotice: string;
    requestQuoteWhatsApp: string;
    callShowroom: string;
    clearCart: string;
  };
  wishlist: {
    title: string;
    piecesSaved: string;
    emptyTitle: string;
    emptyDesc: string;
    browseCatalogue: string;
    moveToCart: string;
    enquire: string;
    bulkInquireWhatsApp: string;
    clearShortlist: string;
    storageNote: string;
  };
  showroom: {
    eyebrow: string;
    heading: string;
    supporting: string;
    addressSubtext: string;
    visualAtmosphereTitle: string;
    visualAtmosphereBadge: string;
    inPersonDiffEyebrow: string;
    inPersonDiffTitle: string;
    inPersonDiffDesc: string;
    ergoTestingTitle: string;
    ergoTestingDesc: string;
    rawTimberTitle: string;
    rawTimberDesc: string;
    blueprintTitle: string;
    blueprintDesc: string;
    planVisitCta: string;
    getDirectionsCta: string;
    inspirationEyebrow: string;
    inspirationHeading: string;
    inspirationSub: string;
    tabAll: string;
    tabLiving: string;
    tabDining: string;
    tabBedroom: string;
    inquireSetting: string;
    macroEyebrow: string;
    macroHeading: string;
    macroDesc: string;
    trustEyebrow: string;
    trustHeading: string;
    trustDesc: string;
    officialShowroomBadge: string;
    showroomName: string;
    landmarkNote: string;
    telephoneLinesLabel: string;
    tapToCall: string;
    inquireVisitWhatsApp: string;
    callPrimaryDesk: string;
    transitGuideTitle: string;
    transitGuideDesc: string;
    mapPlaceholderLabel: string;
    mapPlaceholderNotice: string;
    openGoogleMapsBtn: string;
    closePreview: string;
  };
  footer: {
    taglineSubtitle: string;
    navSectionTitle: string;
    collectionsSectionTitle: string;
    showroomSectionTitle: string;
    hoursNotice: string;
    pocNotice: string;
    allRightsReserved: string;
  };
  bespoke: {
    eyebrow: string;
    heading: string;
    desc: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    consultationCta: string;
  };
  concierge: {
    pillLabel: string;
    title: string;
    desc: string;
    callLine: string;
    chatLine: string;
    close: string;
  };
  chatbot: {
    launcherLabel: string;
    headerTitle: string;
    headerSubtitle: string;
    onlineBadge: string;
    welcomeMessage: string;
    suggestedHeading: string;
    inputPlaceholder: string;
    sendButtonLabel: string;
    clearChatLabel: string;
    closeChatLabel: string;
    minimizeChatLabel: string;
    disclaimer: string;
    directDeskTitle: string;
    callLinesTitle: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    nav: {
      home: "Home",
      collections: "Collections",
      livingRoom: "Living Room",
      bedroom: "Bedroom",
      dining: "Dining",
      wardrobes: "Wardrobes",
      customFurniture: "Custom Furniture",
      showroom: "Showroom",
      contact: "Contact",
      callUs: "Call Us",
      switchLang: "தமிழ்",
      wishlistLabel: "Saved Shortlist",
      cartLabel: "Demo Cart",
      inquireWhatsApp: "Inquire on WhatsApp",
    },
    brand: {
      name: "Kerala Furniture",
      tagline: "Better Spaces • Brighter Lives",
      taglineTamil: "சிறந்த இடங்கள் • சிறந்த வாழ்க்கை",
      location: "Sankarankovil, Tamil Nadu",
      addressLabel: "Showroom Address",
      fullAddress: "Q 299, Railway Feeder Road, Sankarankovil - 627 756, Tenkasi District, Tamil Nadu, India",
      threeLinesNotice: "3 dedicated direct consultation lines available",
    },
    hero: {
      eyebrow: "CRAFTED FOR THE WAY YOU LIVE",
      headlineLine1: "Where Beautiful Spaces",
      headlineLine2: "Become Home.",
      description: "Discover furniture that brings comfort, character and timeless elegance to every corner of your home.",
      primaryCta: "EXPLORE COLLECTIONS",
      secondaryCta: "VISIT OUR SHOWROOM",
      locationBadge: "SANKARANKOVIL, TAMIL NADU",
      scrollPrompt: "SCROLL TO DISCOVER",
    },
    marquee: {
      solidTeak: "Seasoned Solid Teakwood",
      liveEdge: "Live-Edge Monolith Tables",
      customDimensions: "Architectural Custom Sizing",
      mortiseJoinery: "Traditional Mortise-and-Tenon Joinery",
      naturalCane: "Hand-Woven Natural Rattan Cane",
      handPolished: "Organic Matte Oil Finishes",
      sankarankovilAtelier: "Sankarankovil Master Atelier",
    },
    brandStory: {
      eyebrow: "ARCHITECTURAL WOODCRAFT HERITAGE",
      headline: "Every Space Has a Story.",
      supporting: "Discover furniture that brings comfort, character and thoughtful design into your everyday living.",
      taglineLead: "Better Spaces • Brighter Lives.",
      philosophyP1: "At Kerala Furniture, we believe furniture should transcend utility. True craftsmanship anchors a home, bringing warmth to morning conversations and lasting serenity to evening gatherings.",
      philosophyP2: "Our woodcraft atelier is rooted in seasoned solid teak, dense Indian rosewood, and hand-woven natural cane. Every joint is cut with geometric discipline, ensuring generations of acoustic silence and structural strength.",
      card1Title: "100% Solid Seasoned Timber",
      card1Desc: "Zero particle boards, MDF, or artificial veneers. Each piece begins with slow-seasoned solid hardwood selected for grain integrity.",
      card2Title: "Precision Mortise & Tenon Joinery",
      card2Desc: "Crafted using interlocking wood-to-wood joinery that naturally breathes and expands without mechanical failure.",
      card3Title: "Tactile Organic Matte Finishes",
      card3Desc: "Hand-rubbed natural oil and beeswax lusters that highlight the organic pore texture rather than sealing it beneath plastic coats.",
      showroomCallout: "Visit our Sankarankovil showroom along Railway Feeder Road to experience the physical density and finish of our solid wood creations in person.",
    },
    categories: {
      eyebrow: "EXPLORE OUR COLLECTIONS",
      headline: "Find the Perfect Fit for Your Space.",
      subtitle: "From commanding live-edge dining tables to intimate winged armchairs, explore fine woodwork shaped for modern Southern living.",
      exploreCta: "Explore Collection",
      sofas: "Living Room Sofas",
      recliners: "Sofas & Recliners",
      bedroom: "Bedroom Furniture",
      beds: "Beds & Mattresses",
      dining: "Dining Collections",
      wardrobes: "Wardrobes & Storage",
      decor: "Home Decor Accents",
      office: "Office & Study Furniture",
      custom: "Custom Commission Furniture",
    },
    catalogue: {
      eyebrow: "CURATED SHOWROOM CATALOGUE",
      heading: "Furniture Worth Coming Home To.",
      subheading: "Handcrafted solid teak, rosewood, and cane craftsmanship for modern Southern living. Explore living, bedroom, dining, and storage essentials crafted at our Sankarankovil showroom.",
      demoNotice: "All prices marked with * represent POC demo models",
      searchPlaceholder: "Search by piece name, wood type (e.g. Teak, Rosewood), or room...",
      categoryPillPrefix: "Category:",
      allPieces: "All Pieces",
      savedPill: "Saved",
      sortFeatured: "Featured First",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortNameAsc: "Name: A to Z",
      sortNameDesc: "Name: Z to A",
      activeFiltersLabel: "Active Filters:",
      resetFilters: "Reset All Filters",
      showingCountPrefix: "Showing",
      showingCountMiddle: "of",
      showingCountSuffix: "pieces",
      loadMore: "Load More Pieces",
      remaining: "remaining",
      emptyTitle: "No Pieces Match Your Criteria",
      emptyDesc: "We could not find any furniture items matching your filters. At Kerala Furniture, we also craft completely bespoke commissions to your exact timber and dimension requirements.",
      customCommissionCta: "Inquire About Custom Design",
      lookbookPrompt: "Require specific timber dimensions or bulk home interiors?",
      lookbookCta: "Request Showroom Lookbook",
    },
    productCard: {
      signaturePiece: "Signature Piece",
      quickView: "Quick View",
      enquire: "Enquire",
      demoPill: "Demo",
      materialLabel: "Material:",
      dimensionsLabel: "Dimensions:",
      inquireShowroom: "Inquire at Sankarankovil",
    },
    productDetail: {
      breadcrumbHome: "Home",
      breadcrumbCatalogue: "Catalogue",
      backToCollection: "Back to Collection",
      signaturePiece: "Signature Workshop Piece",
      solidHardwood: "Solid Hardwood Joinery",
      physicalInspectionTitle: "Physical Workshop Inspection:",
      physicalInspectionDesc: "You are welcome to inspect raw timber grains and test ergonomic seating comfort at our Sankarankovil showroom.",
      demoPriceBadge: "POC Showcase Demo Price",
      specsTitle: "Craftsmanship & Materials Specification",
      timberSpecies: "Timber Species",
      finishLabel: "Artisanal Finish",
      dimensionsLabel: "Standard Spatial Dimensions",
      customBlueprintNote: "*Custom dimensions crafted to architectural blueprints upon showroom request.",
      highlightsTitle: "Design & Joinery Highlights",
      quantityLabel: "Quantity",
      addToCart: "Add to Demo Cart",
      addedToCartToast: "Added to Demo Showroom Cart. Open cart anytime from header.",
      saveWishlist: "Save to Wishlist",
      savedWishlist: "Saved in Shortlist",
      whatsappEnquiryBtn: "Inquire Piece Availability on WhatsApp",
      whatsappDisclaimer: "Opens official WhatsApp to connect with Kerala Furniture showroom staff. No automated messages are dispatched.",
      showroomLineLabel: "Direct Showroom Line:",
      customNoticeEyebrow: "Bespoke Showroom Service",
      customNoticeHeading: "Require Custom Dimensions or Alternate Timber?",
      customNoticeDesc: "Every Kerala Furniture design can be tailored to match your architectural floor plan. Choose from Seasoned Solid Teakwood, Indian Rosewood, Natural Rattan Cane, or imported upholstery swatches. Visit our Sankarankovil showroom on Railway Feeder Road to inspect wood grain samples in person.",
      relatedEyebrow: "Curated Complements",
      relatedHeading: "Complementary Pieces for Your Space",
      viewAllCatalogue: "View Full Catalogue",
      notFoundTitle: "Furniture Piece Not Found",
      notFoundDesc: "The piece you are looking for is either archived or unavailable in our current showcase. Explore our complete handcrafted collection.",
      returnCatalogueBtn: "Return to Furniture Catalogue",
    },
    cart: {
      title: "Showroom Demo Cart",
      piecesSelected: "pieces selected",
      pocNoticeTitle: "POC Showcase Cart:",
      pocNoticeDesc: "No payment processing exists. Request a personalized showroom quote via WhatsApp or phone.",
      emptyTitle: "Your Demo Cart is Empty",
      emptyDesc: "Explore our handcrafted living, dining, and bedroom suites to curate your bespoke home enquiry.",
      browseCatalogue: "Browse Furniture Catalogue",
      subtotalLabel: "Estimated Demo Subtotal",
      subtotalNotice: "*Illustrative demo total. Custom sizing and timber species are quoted at our Sankarankovil showroom.",
      requestQuoteWhatsApp: "Request Quotation on WhatsApp",
      callShowroom: "Call Showroom",
      clearCart: "Clear Cart",
    },
    wishlist: {
      title: "Saved Shortlist",
      piecesSaved: "pieces saved",
      emptyTitle: "No Saved Pieces Yet",
      emptyDesc: "Save pieces as you browse the collection to build your personalized showroom wishlist.",
      browseCatalogue: "Browse Furniture Catalogue",
      moveToCart: "Move to Cart",
      enquire: "Enquire",
      bulkInquireWhatsApp: "Inquire All Saved Pieces on WhatsApp",
      clearShortlist: "Clear Shortlist",
      storageNote: "Saved in local browser memory",
    },
    showroom: {
      eyebrow: "Sankarankovil Atelier & Showroom",
      heading: "Experience It in Person.",
      supporting: "Visit Kerala Furniture in Sankarankovil to explore furniture collections and discover options for your home.",
      addressSubtext: "Q 299, Railway Feeder Road, Sankarankovil - 627 756, Tenkasi District",
      visualAtmosphereTitle: "Spaces Designed to Be Lived In",
      visualAtmosphereBadge: "Showroom Floor • Railway Feeder Road",
      inPersonDiffEyebrow: "The In-Person Difference",
      inPersonDiffTitle: "Why There Is No Substitute for the Physical Touch",
      inPersonDiffDesc: "Furniture is an intimate, enduring part of daily family life. A photograph cannot convey the dense, cool heft of seasoned solid teakwood, the gentle scent of organic beeswax polish, or the anatomical lumbar support of a calibrated recliner.",
      ergoTestingTitle: "Ergonomic testing:",
      ergoTestingDesc: "Sit, recline, and test cushion firmness across our curated salon seating suites.",
      rawTimberTitle: "Raw timber inspection:",
      rawTimberDesc: "View our raw timber cross-sections and observe authentic grain patterns.",
      blueprintTitle: "Blueprint consultations:",
      blueprintDesc: "Sit with our woodcraft advisors to match furniture scales to your doorway and room dimensions.",
      planVisitCta: "Plan Your Visit",
      getDirectionsCta: "Get Directions",
      inspirationEyebrow: "Room Scene Visualizer",
      inspirationHeading: "Furniture Inspiration Gallery",
      inspirationSub: "Explore how Kerala Furniture pieces coalesce into cohesive, elegant room settings designed for Southern homes.",
      tabAll: "All Room Sets",
      tabLiving: "Living Salons",
      tabDining: "Dining Suites",
      tabBedroom: "Bedrooms",
      inquireSetting: "Inquire Setting on WhatsApp",
      macroEyebrow: "Macro Craftsmanship",
      macroHeading: "Interior & Joinery Detail Gallery",
      macroDesc: "Examine the close-up texture of our materials: hand-fluted wood, hand-woven cane, and protective cast brass hardware.",
      trustEyebrow: "Craftsmanship Integrity",
      trustHeading: "Built on Honest Woodworking",
      trustDesc: "We make no fabricated promises or inflated claims. Our trust is anchored in physical woodcraft: seasoned timber, traditional joinery, and an open workshop door.",
      officialShowroomBadge: "Official Showroom & Registered Location",
      showroomName: "Kerala Furniture Showroom",
      landmarkNote: "Landmark: Railway Feeder Road Corridor • Convenient transit from Sankarankovil Junction",
      telephoneLinesLabel: "Showroom Telephone & Consultation Lines:",
      tapToCall: "Tap to call",
      inquireVisitWhatsApp: "Inquire Visit via WhatsApp",
      callPrimaryDesk: "Call Primary Desk",
      transitGuideTitle: "Directions & Transit Guide",
      transitGuideDesc: "Located prominently on Railway Feeder Road, Kerala Furniture is centrally accessible for visitors arriving from Tenkasi, Rajapalayam, Tirunelveli, and Virudhunagar.",
      mapPlaceholderLabel: "Kerala Furniture Showroom",
      mapPlaceholderNotice: "Search-based Navigation • No raw GPS fabrication",
      openGoogleMapsBtn: "Open in Google Maps / Get Directions",
      closePreview: "Close Preview",
    },
    footer: {
      taglineSubtitle: "Architectural & Solid Hardwood Furniture • Sankarankovil, Tamil Nadu",
      navSectionTitle: "Explore Spaces",
      collectionsSectionTitle: "Spatial Collections",
      showroomSectionTitle: "Showroom & Atelier",
      hoursNotice: "Showroom Hours: Mon – Sat • Railway Feeder Road, Sankarankovil",
      pocNotice: "Kerala Furniture Website Proof of Concept • Client Showcase Edition",
      allRightsReserved: "All rights reserved. Kerala Furniture, Sankarankovil.",
    },
    bespoke: {
      eyebrow: "ARCHITECTURAL BESPOKE SERVICE",
      heading: "Tailored to Your Floor Plan & Timber Taste.",
      desc: "Every residence in Southern Tamil Nadu has its own distinct proportions, ceiling heights, and sunlight exposure. At Kerala Furniture, our master craftsmen work directly from your architectural blueprints or room measurements to create custom furniture that fits your home with millimeter precision.",
      pillar1Title: "01. Spatial Measurement",
      pillar1Desc: "Exact plan sizing to prevent proportion crowding.",
      pillar2Title: "02. Solid Timber Selection",
      pillar2Desc: "Seasoned Kerala Teak, Rosewood, or Sheesham.",
      pillar3Title: "03. Custom Fabric Swatches",
      pillar3Desc: "Natural woven linens, velvets, and top-grain leathers.",
      pillar4Title: "04. Lifetime Joinery",
      pillar4Desc: "Mortise-and-tenon interlocking woodwork.",
      consultationCta: "Schedule Bespoke Consultation on WhatsApp",
    },
    concierge: {
      pillLabel: "Showroom Assistance",
      title: "Kerala Furniture Concierge",
      desc: "Connect directly with our Sankarankovil showroom specialists for pricing, custom woodwork, and visit directions:",
      callLine: "Call Line",
      chatLine: "WhatsApp Line",
      close: "Close contact drawer",
    },
    chatbot: {
      launcherLabel: "Showroom Guide & FAQ",
      headerTitle: "Kerala Furniture Assistant",
      headerSubtitle: "Sankarankovil Showroom Helpdesk",
      onlineBadge: "Local Showroom FAQ",
      welcomeMessage: "Welcome to Kerala Furniture. I can answer common questions about our Sankarankovil showroom, solid wood collections, and custom orders. Choose a suggested question below or type your inquiry.",
      suggestedHeading: "Suggested Inquiries:",
      inputPlaceholder: "Type your question in English or தமிழ்...",
      sendButtonLabel: "Send message",
      clearChatLabel: "Reset Conversation",
      closeChatLabel: "Close Chat Assistant",
      minimizeChatLabel: "Minimize Chat",
      disclaimer: "POC Showroom Guide • Direct connection to Sankarankovil consultation desk",
      directDeskTitle: "Direct Showroom Lines",
      callLinesTitle: "3 Verified Lines Available",
    },
  },

  ta: {
    nav: {
      home: "முகப்பு",
      collections: "தொகுப்புகள்",
      livingRoom: "வரவேற்பறை",
      bedroom: "படுக்கையறை",
      dining: "சாப்பாட்டு அறை",
      wardrobes: "அலமாரிகள்",
      customFurniture: "தனிப்பயன் மரவேலைகள்",
      showroom: "ஷோரூம்",
      contact: "தொடர்பு",
      callUs: "அழைக்க",
      switchLang: "English",
      wishlistLabel: "விருப்பப் பட்டியல்",
      cartLabel: "மாதிரி கூடை",
      inquireWhatsApp: "வாட்ஸ்அப்பில் விசாரிக்க",
    },
    brand: {
      name: "Kerala Furniture",
      tagline: "Better Spaces • Brighter Lives",
      taglineTamil: "சிறந்த இடங்கள் • சிறந்த வாழ்க்கை",
      location: "சங்கரன்கோவில், தமிழ்நாடு",
      addressLabel: "ஷோரூம் முகவரி",
      fullAddress: "Q 299, ரயில்வே ஃபீடர் ரோடு, சங்கரன்கோவில் - 627 756, தென்காசி மாவட்டம், தமிழ்நாடு",
      threeLinesNotice: "3 பிரத்யேக நேரடி தொலைபேசி எண்கள் பயன்பாட்டில் உள்ளன",
    },
    hero: {
      eyebrow: "உங்கள் இல்லத்திற்கான தனித்துவமான கலைப்படைப்பு",
      headlineLine1: "அழகிய இடங்கள்",
      headlineLine2: "இனிய இல்லமாக மாறும் இடம்.",
      description: "உங்கள் இல்லத்தின் ஒவ்வொரு பகுதிக்கும் வசதியும், கம்பீரமும், காலத்தால் அழியாத அழகும் சேர்க்கும் உயர்தர திட மரத்தளவாடங்கள்.",
      primaryCta: "தொகுப்புகளைக் காண்க",
      secondaryCta: "ஷோரூமிற்கு வருகை தருக",
      locationBadge: "சங்கரன்கோவில், தமிழ்நாடு",
      scrollPrompt: "மேலும் அறிய உருட்டவும்",
    },
    marquee: {
      solidTeak: "பக்குவப்படுத்தப்பட்ட திடத் தேக்கு மரம்",
      liveEdge: "இயற்கை விளிம்பு மோனோலித் மேஜைகள்",
      customDimensions: "வீட்டிற்கேற்ற பிரத்யேக அளவுகள்",
      mortiseJoinery: "பாரம்பரிய மரப் பொருத்து வேலைப்பாடு",
      naturalCane: "கைவண்ணத்தில் உருவான இயற்கை பிரம்பு",
      handPolished: "இயற்கை எண்ணெய் மெழுகு பூச்சு",
      sankarankovilAtelier: "சங்கரன்கோவில் முதன்மை மரக்கூடம்",
    },
    brandStory: {
      eyebrow: "பாரம்பரிய மரவேலைப்பாட்டின் பெருமை",
      headline: "ஒவ்வொரு இடத்திற்கும் ஒரு கதை உண்டு.",
      supporting: "உங்கள் அன்றாட வாழ்க்கையில் வசதியையும், தனித்துவத்தையும், நேர்த்தியான வடிவமைப்பையும் கொண்டு சேர்க்கும் மரத்தளவாடங்களைக் கண்டறியுங்கள்.",
      taglineLead: "சிறந்த இடங்கள் • சிறந்த வாழ்க்கை.",
      philosophyP1: "கேரளா பர்னிச்சரில், தளவாடங்கள் வெறும் பயன்பாட்டுப் பொருள் மட்டுமல்ல; அது குடும்பத்தின் தலைமுறைகளை இணைக்கும் பெருமைமிக்க கலைப்படைப்பு என நம்புகிறோம்.",
      philosophyP2: "எங்கள் மரக்கூடத்தில் நன்கு பக்குவப்படுத்தப்பட்ட திடத் தேக்கு, உறுதியான ஈட்டி மரம் (Rosewood) மற்றும் இயற்கை பிரம்பு மட்டுமே பயன்படுத்தப்படுகின்றன. பாரம்பரிய மூட்டுவேலைப்பாடுகள் பல தலைமுறைகளுக்கு நீடித்து உழைக்கும்.",
      card1Title: "100% பக்குவப்படுத்தப்பட்ட திட மரம்",
      card1Desc: "எவ்வித ஒட்டுப்பலகைகளோ பிளைவுட்டோ இன்றி, இயற்கையான திட மரப்பலகைகளைக் கொண்டு மட்டுமே உருவாக்கப்படுகிறது.",
      card2Title: "பாரம்பரிய மோர்டைஸ் & டெனன் மூட்டுகள்",
      card2Desc: "இரும்பு ஆணிகள் இல்லாது மரம் மரத்தோடு பிணைக்கப்பட்டு தலைமுறைகளுக்கு உறுதியுடன் நிலைக்கும் மரவேலைப்பாடு.",
      card3Title: "இயற்கை மெழுகு மற்றும் எண்ணெய் பூச்சு",
      card3Desc: "மரத்தின் சுய தன்மையை மறைக்காமல், அதன் இயற்கையான நரம்புகளையும் அழகையும் பாதுகாக்கும் கைவண்ணப் பூச்சு.",
      showroomCallout: "மரத்தின் எடை, உறுதி மற்றும் வர்ணங்களை நேரில் பார்வையிட சங்கரன்கோவில் ரயில்வே ஃபீடர் ரோட்டில் உள்ள எங்கள் ஷோரூமிற்கு வருகை தாருங்கள்.",
    },
    categories: {
      eyebrow: "எங்கள் தளவாடத் தொகுப்புகள்",
      headline: "உங்கள் இல்லத்திற்குப் பொருத்தமானதைத் தேர்வு செய்யுங்கள்.",
      subtitle: "கம்பீரமான டைனிங் டேபிள்கள் முதல் இதமான சாய்வு நாற்காலிகள் வரை தென்னிந்திய வாழ்வியலுக்கேற்ற மர வேலைப்பாடுகள்.",
      exploreCta: "தொகுப்பைப் பார்க்க",
      sofas: "வரவேற்பறை சோஃபாக்கள்",
      recliners: "சோஃபா & சாய்வு நாற்காலிகள்",
      bedroom: "படுக்கையறைத் தளவாடங்கள்",
      beds: "கட்டில்கள் & மெத்தைகள்",
      dining: "சாப்பாட்டு மேஜை தொகுப்புகள்",
      wardrobes: "அலமாரிகள் & சேமிப்பகங்கள்",
      decor: "அலங்காரப் பொருட்கள்",
      office: "அலுவலகத் தளவாடங்கள்",
      custom: "தனிப்பயன் வடிவமைப்புத் தளவாடங்கள்",
    },
    catalogue: {
      eyebrow: "ஷோரூம் நேரடிக் காட்சிப் பட்டியல்",
      heading: "வீட்டிற்குப் பெருமை சேர்க்கும் மரத்தளவாடங்கள்.",
      subheading: "நவீன தென்னிந்திய வாழ்விற்கான திடத் தேக்கு, ரோஸ்வுட் மற்றும் பிரம்பு வேலைப்பாடுகள். சங்கரன்கோவிலில் உங்கள் விருப்பத்திற்கேற்ப வடிவமைக்கப்படும் படைப்புகள்.",
      demoNotice: "* எனக் குறிக்கப்பட்ட விலைகள் மாதிரி மதிப்பீடுகளே ஆகும்",
      searchPlaceholder: "பெயர், மர வகை (தேக்கு, ஈட்டி மரம்) அல்லது அறைப் பெயரால் தேடவும்...",
      categoryPillPrefix: "பிரிவு:",
      allPieces: "அனைத்தும்",
      savedPill: "சேமித்தவை",
      sortFeatured: "முக்கியப் படைப்புகள்",
      sortPriceLow: "விலை: குறைவு முதல் அதிகம்",
      sortPriceHigh: "விலை: அதிகம் முதல் குறைவு",
      sortNameAsc: "பெயர்: அகரவரிசை",
      sortNameDesc: "பெயர்: இறங்குவரிசை",
      activeFiltersLabel: "தேர்ந்தெடுத்தவை:",
      resetFilters: "அனைத்தையும் மீட்டமைக்க",
      showingCountPrefix: "காட்டப்படுபவை:",
      showingCountMiddle: "/",
      showingCountSuffix: "படைப்புகள்",
      loadMore: "மேலும் படைப்புகளைக் காண்க",
      remaining: "மீதமுள்ளது",
      emptyTitle: "பொருத்தமான படைப்புகள் கிடைக்கவில்லை",
      emptyDesc: "உங்கள் தேடலுக்கு ஏற்ற தளவாடங்கள் பட்டியலில் இல்லை. கேரளா பர்னிச்சரில் நீங்கள் விரும்பும் எந்தவொரு வடிவமைப்பு மற்றும் அளவிலும் பிரத்யேகமாகச் செய்து தருகிறோம்.",
      customCommissionCta: "தனிப்பயன் வடிவமைப்பு பற்றி விசாரிக்க",
      lookbookPrompt: "குறிப்பிட்ட அளவு அல்லது மொத்த வீட்டின் தளவாடங்கள் தேவையா?",
      lookbookCta: "ஷோரூம் கேட்லாக் பெறுக",
    },
    productCard: {
      signaturePiece: "முக்கியப் படைப்பு",
      quickView: "விரைவுப் பார்வை",
      enquire: "விசாரிக்க",
      demoPill: "மாதிரி",
      materialLabel: "மரம்:",
      dimensionsLabel: "அளவுகள்:",
      inquireShowroom: "சங்கரன்கோவிலில் விசாரிக்க",
    },
    productDetail: {
      breadcrumbHome: "முகப்பு",
      breadcrumbCatalogue: "காட்சிப் பட்டியல்",
      backToCollection: "தொகுப்பிற்குத் திரும்புக",
      signaturePiece: "பட்டறையின் முதன்மைப் படைப்பு",
      solidHardwood: "திட மர மூட்டுவேலைப்பாடு",
      physicalInspectionTitle: "நேரடி மரப் பரிசோதனை:",
      physicalInspectionDesc: "மரத்தின் தரம் மற்றும் இருக்கையின் வசதியை எங்கள் சங்கரன்கோவில் ஷோரூமில் நேரில் சோதித்துப் பார்க்கலாம்.",
      demoPriceBadge: "மாதிரி மாதிரி விலை மதிப்பீடு",
      specsTitle: "மர விவரங்கள் & அளவீட்டு விபரம்",
      timberSpecies: "மர வகை",
      finishLabel: "வார்னிஷ் / பூச்சு",
      dimensionsLabel: "நிலையான அளவுகள்",
      customBlueprintNote: "*உங்கள் வீட்டின் வரைபடத்திற்கேற்ப அளவுகள் தனிப்பயனாக்கப்படும்.",
      highlightsTitle: "வடிவமைப்பு சிறப்பம்சங்கள்",
      quantityLabel: "எண்ணிக்கை",
      addToCart: "மாதிரி கூடையில் சேர்க்க",
      addedToCartToast: "கூடையில் சேர்க்கப்பட்டது. மேலே உள்ள குறியீட்டைத் தட்டிப் பார்க்கலாம்.",
      saveWishlist: "விருப்பப்பட்டியலில் சேர்க்க",
      savedWishlist: "பட்டியலில் உள்ளது",
      whatsappEnquiryBtn: "வாட்ஸ்அப்பில் இருப்பை விசாரிக்க",
      whatsappDisclaimer: "கேரளா பர்னிச்சர் குழுவினருடன் நேரடியாகப் பேச அதிகாரப்பூர்வ வாட்ஸ்அப் திறக்கும்.",
      showroomLineLabel: "நேரடி ஷோரூம் எண்:",
      customNoticeEyebrow: "பிரத்யேக ஷோரூம் சேவை",
      customNoticeHeading: "தனிப்பயன் அளவுகள் அல்லது வேறு மர வகை தேவையா?",
      customNoticeDesc: "ஒவ்வொரு கேரளா பர்னிச்சர் வடிவமைப்பையும் உங்கள் வீட்டின் அளவுக்கு ஏற்ப மாற்றி அமைத்துக் கொள்ளலாம். தேக்கு, ஈட்டி மரம், பிரம்பு அல்லது மெத்தை துணிகளைத் தேர்வு செய்ய சங்கரன்கோவில் ரயில்வே ஃபீடர் ரோடு ஷோரூமிற்கு வருகை தாருங்கள்.",
      relatedEyebrow: "பொருத்தமான துணைகள்",
      relatedHeading: "உங்கள் இடத்திற்கு ஏற்ற பிற படைப்புகள்",
      viewAllCatalogue: "முழுப் பட்டியலையும் பார்க்க",
      notFoundTitle: "தளவாடப் பொருள் கிடைக்கவில்லை",
      notFoundDesc: "நீங்கள் தேடிய பொருள் தற்சமயம் பட்டியலில் இல்லை. எங்கள் முழு கைவினைத் தொகுப்பைப் பார்வையிடுங்கள்.",
      returnCatalogueBtn: "காட்சிப் பட்டியலுக்குத் திரும்புக",
    },
    cart: {
      title: "ஷோரூம் மாதிரி கூடை",
      piecesSelected: "பொருட்கள் உள்ளன",
      pocNoticeTitle: "மாதிரிப் பார்வை கூடை:",
      pocNoticeDesc: "ஆன்லைன் பணப்பரிவர்த்தனை கிடையாது. வாட்ஸ்அப் அல்லது தொலைபேசி மூலம் நேரடி விலை மதிப்பீட்டைப் பெறலாம்.",
      emptyTitle: "மாதிரி கூடை காலியாக உள்ளது",
      emptyDesc: "உங்கள் விருப்பமான வரவேற்பறை, படுக்கையறை மற்றும் டைனிங் தளவாடங்களைத் தேர்ந்தெடுங்கள்.",
      browseCatalogue: "தளவாடப் பட்டியலைக் காண்க",
      subtotalLabel: "தோராய மாதிரி கூட்டுத்தொகை",
      subtotalNotice: "*மாதிரி மதிப்பீடே. அளவு மற்றும் மரத்திற்கேற்ப இறுதி விலை சங்கரன்கோவில் ஷோரூமில் வழங்கப்படும்.",
      requestQuoteWhatsApp: "வாட்ஸ்அப்பில் விலை விவரம் பெறுக",
      callShowroom: "ஷோரூமை அழைக்க",
      clearCart: "கூடையை காலி செய்க",
    },
    wishlist: {
      title: "சேமித்த விருப்பப் பட்டியல்",
      piecesSaved: "பொருட்கள் சேமிக்கப்பட்டுள்ளன",
      emptyTitle: "சேமித்த பொருட்கள் ஏதுமில்லை",
      emptyDesc: "தொகுப்புகளைப் பார்க்கும்போது உங்களுக்குப் பிடித்தவற்றைச் சேமித்து வைத்து விசாரிக்கலாம்.",
      browseCatalogue: "தளவாடப் பட்டியலைக் காண்க",
      moveToCart: "கூடைக்கு மாற்றுக",
      enquire: "விசாரிக்க",
      bulkInquireWhatsApp: "சேமித்த அனைத்தையும் வாட்ஸ்அப்பில் விசாரிக்க",
      clearShortlist: "பட்டியலை நீக்குக",
      storageNote: "உங்கள் உலாவியின் நினைவகத்தில் சேமிக்கப்பட்டுள்ளது",
    },
    showroom: {
      eyebrow: "சங்கரன்கோவில் பட்டறை & ஷோரூம்",
      heading: "நேரில் வந்து அனுபவியுங்கள்.",
      supporting: "உங்கள் இல்லத்திற்கான சிறந்த தளவாடங்களைத் தேர்வு செய்ய சங்கரன்கோவிலில் உள்ள கேரளா பர்னிச்சருக்கு வருகை தாருங்கள்.",
      addressSubtext: "Q 299, ரயில்வே ஃபீடர் ரோடு, சங்கரன்கோவில் - 627 756, தென்காசி மாவட்டம்",
      visualAtmosphereTitle: "வாழ்வியலோடு இணைந்த வடிவமைப்பு",
      visualAtmosphereBadge: "ஷோரூம் தளம் • ரயில்வே ஃபீடர் ரோடு",
      inPersonDiffEyebrow: "நேரில் பார்ப்பதன் முக்கியத்துவம்",
      inPersonDiffTitle: "நேரடி தொடுவுணர்வுக்கு ஈடு இணை ஏதுமில்லை",
      inPersonDiffDesc: "தளவாடங்கள் என்பது அன்றாட வாழ்வின் இன்றியமையாத அங்கம். திடத் தேக்கு மரத்தின் குளிர்ந்த கனத்தையோ, இயற்கை தேன்மெழுகின் மணத்தையோ அல்லது சாய்வு நாற்காலியின் இதமான வசதியையோ புகைப்படங்களால் முழுமையாக உணர முடியாது.",
      ergoTestingTitle: "வசதியை சோதித்துப் பார்த்தல்:",
      ergoTestingDesc: "எங்கள் சோஃபாக்கள் மற்றும் சாய்வு நாற்காலிகளில் அமர்ந்து மெத்தையின் உறுதியை சோதிக்கலாம்.",
      rawTimberTitle: "திட மரப் பரிசோதனை:",
      rawTimberDesc: "செயற்கை ஒட்டுகள் அற்ற உண்மையான திட மரப்பலகைகளை நேரில் பார்வையிடலாம்.",
      blueprintTitle: "வீட்டு வரைபட ஆலோசனை:",
      blueprintDesc: "உங்கள் வீட்டின் அறை அளவிற்கு ஏற்றவாறு மர அளவுகளைத் தீர்மானிக்க எங்கள் தச்சர்களுடன் ஆலோசிக்கலாம்.",
      planVisitCta: "வருகையைத் திட்டமிடுங்கள்",
      getDirectionsCta: "வழியைப் பெறுக",
      inspirationEyebrow: "அறை அலங்காரக் காட்சி",
      inspirationHeading: "தளவாடக் காட்சி அரங்கம்",
      inspirationSub: "தென்னிந்திய வீடுகளுக்கு ஏற்றவாறு தளவாடங்கள் எவ்வாறு அழகாகப் பொருந்துகின்றன என்பதைப் பாருங்கள்.",
      tabAll: "அனைத்து அறைகளும்",
      tabLiving: "வரவேற்பறை",
      tabDining: "சாப்பாட்டு மேஜை",
      tabBedroom: "படுக்கையறை",
      inquireSetting: "அமைப்பை வாட்ஸ்அப்பில் விசாரிக்க",
      macroEyebrow: "நுணுக்கமான கைவினைத்திறன்",
      macroHeading: "மரவேலை நுணுக்கங்களின் காட்சி",
      macroDesc: "கைகளால் செதுக்கப்பட்ட மர நரம்புகள், பிரம்பு பின்னல்கள் மற்றும் பித்தளைப் பிடிகளின் நேர்த்தியைக் காணுங்கள்.",
      trustEyebrow: "நாணயமான கைவினைத்திறன்",
      trustHeading: "நேர்மையான மரவேலைப்பாட்டின் மீது உருவான நம்பிக்கை",
      trustDesc: "போலி விளம்பரங்களோ வீண் வாக்குறுதிகளோ இன்றி, பக்குவப்படுத்தப்பட்ட மரம் மற்றும் பாரம்பரிய மூட்டுவேலைப்பாடுகளின் உறுதியில் உருவானது எங்கள் நம்பிக்கை.",
      officialShowroomBadge: "அதிகாரப்பூர்வ பதிவுபெற்ற ஷோரூம்",
      showroomName: "கேரளா பர்னிச்சர் ஷோரூம்",
      landmarkNote: "அடையாளம்: ரயில்வே ஃபீடர் ரோடு • சங்கரன்கோவில் ரயில் நிலையத்திற்கு மிக அருகில்",
      telephoneLinesLabel: "ஷோரூம் தொலைபேசி & ஆலோசனை எண்கள்:",
      tapToCall: "அழைக்கத் தட்டவும்",
      inquireVisitWhatsApp: "வருகை குறித்து வாட்ஸ்அப்பில் விசாரிக்க",
      callPrimaryDesk: "முதன்மைக் கூடத்தை அழைக்க",
      transitGuideTitle: "போக்குவரத்து & வழிகாட்டுதல்",
      transitGuideDesc: "ரயில்வே ஃபீடர் ரோட்டில் அமைந்துள்ள கேரளா பர்னிச்சர், தென்காசி, ராஜபாளையம், திருநெல்வேலி, விருதுநகர் ஆகிய பகுதிகளில் இருந்து எளிதில் வந்து சேரும் வகையில் அமைந்துள்ளது.",
      mapPlaceholderLabel: "கேரளா பர்னிச்சர் ஷோரூம்",
      mapPlaceholderNotice: "கூகுள் மேப் அடிப்படையிலான வழிகாட்டுதல்",
      openGoogleMapsBtn: "கூகுள் மேப்பில் வழியைப் பார்க்க",
      closePreview: "மூடுக",
    },
    footer: {
      taglineSubtitle: "நேர்த்தியான திட மரத்தளவாடங்கள் • சங்கரன்கோவில், தமிழ்நாடு",
      navSectionTitle: "இடங்களை ஆராய்க",
      collectionsSectionTitle: "தளவாடப் பிரிவுகள்",
      showroomSectionTitle: "ஷோரூம் & பட்டறை",
      hoursNotice: "ஷோரூம் வேலை நேரம்: திங்கள் – சனி • ரயில்வே ஃபீடர் ரோடு, சங்கரன்கோவில்",
      pocNotice: "கேரளா பர்னிச்சர் இணையதள மாதிரி வடிவம் • வாடிக்கையாளர் பார்வைக்கு",
      allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. கேரளா பர்னிச்சர், சங்கரன்கோவில்.",
    },
    bespoke: {
      eyebrow: "பிரத்யேக கட்டிடக்கலை மரவேலை சேவை",
      heading: "உங்கள் வீட்டின் அளவிற்கேற்ற தனிப்பயன் மரத்தளவாடங்கள்.",
      desc: "ஒவ்வொரு வீட்டிற்கும் அதன் தனித்துவமான அறை அளவுகளும் வெளிச்ச அமைப்பும் உண்டு. கேரளா பர்னிச்சரில், உங்கள் வீட்டின் வரைபடத்திற்கு ஏற்ப மில்லிமீட்டர் துல்லியத்துடன் பிரத்யேகமாக மரத்தளவாடங்களைச் செய்து தருகிறோம்.",
      pillar1Title: "01. அறை அளவீடு",
      pillar1Desc: "இட நெரிசல் இன்றி கச்சிதமாகப் பொருந்தும் துல்லிய அளவீடு.",
      pillar2Title: "02. திட மரத் தேர்வு",
      pillar2Desc: "பக்குவப்படுத்தப்பட்ட கேரளா தேக்கு, ஈட்டி மரம் அல்லது சீஷம்.",
      pillar3Title: "03. மெத்தை துணி தேர்வுகள்",
      pillar3Desc: "இயற்கை லினன், வெல்வெட் மற்றும் உயர்தர தோல் தேர்வுகள்.",
      pillar4Title: "04. ஆயுள் கால மூட்டுவேலைப்பாடு",
      pillar4Desc: "பாரம்பரிய மோர்டைஸ் & டெனன் பிணைப்பு வேலைப்பாடு.",
      consultationCta: "வாட்ஸ்அப்பில் பிரத்யேக ஆலோசனை பெறுக",
    },
    concierge: {
      pillLabel: "ஷோரூம் உதவி",
      title: "கேரளா பர்னிச்சர் நேரடி உதவி மையம்",
      desc: "விலை விவரம், தனிப்பயன் மரவேலைகள் மற்றும் ஷோரூம் வழிகாட்டுதலுக்கு எங்களை நேரடியாகத் தொடர்பு கொள்ளுங்கள்:",
      callLine: "அழைக்க",
      chatLine: "வாட்ஸ்அப் எண்",
      close: "மூடுக",
    },
    chatbot: {
      launcherLabel: "ஷோரூம் வழிகாட்டி & FAQ",
      headerTitle: "கேரளா பர்னிச்சர் உதவியாளர்",
      headerSubtitle: "சங்கரன்கோவில் ஷோரூம் உதவி மையம்",
      onlineBadge: "ஷோரூம் FAQ வழிகாட்டி",
      welcomeMessage: "கேரளா பர்னிச்சருக்கு தங்களை அன்புடன் வரவேற்கிறோம். எங்கள் சங்கரன்கோவில் ஷோரூம், திட மரத்தளவாடங்கள் மற்றும் தனிப்பயன் ஆர்டர்கள் பற்றிய விவரங்களை அறிய கீழே உள்ள கேள்விகளைத் தேர்ந்தெடுக்கலாம் அல்லது உங்கள் கேள்வியைத் தட்டச்சு செய்யலாம்.",
      suggestedHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள்:",
      inputPlaceholder: "உங்கள் கேள்வியை ஆங்கிலம் அல்லது தமிழில் தட்டச்சு செய்க...",
      sendButtonLabel: "செய்தி அனுப்புக",
      clearChatLabel: "உரையாடலை மீட்டமைக்க",
      closeChatLabel: "உதவியாளரை மூடுக",
      minimizeChatLabel: "சிறிதாக்குக",
      disclaimer: "மாதிரி ஷோரூம் வழிகாட்டி • சங்கரன்கோவில் ஷோரூமுடன் நேரடித் தொடர்பு",
      directDeskTitle: "நேரடி ஷோரூம் எண்கள்",
      callLinesTitle: "3 அதிகாரப்பூர்வ எண்கள்",
    },
  },
};
