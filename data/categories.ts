export interface CategoryItem {
  id: string;
  name: string;
  tamilName: string;
  tagline: string;
  description: string;
  heroImage: string;
  itemCountLabel: string;
  gridSpan: {
    mobile: string;
    tablet: string;
    desktop: string;
    aspect: string;
  };
  filterKey: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "living-room",
    name: "Living Room",
    tamilName: "வரவேற்பறை",
    tagline: "Architectural presence & generous conversation",
    description: "Deep sectional seating, solid timber coffee tables, and sculpted occasional accent chairs.",
    heroImage: "/images/thekku/thekku-sofa-set.jpg",
    itemCountLabel: "Proposed Living Curations",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-8",
      desktop: "lg:col-span-8",
      aspect: "aspect-[16/10]",
    },
    filterKey: "living",
  },
  {
    id: "sofas-recliners",
    name: "Sofas & Recliners",
    tamilName: "சோஃபாக்கள் & சாய்வு இருக்கைகள்",
    tagline: "High-resilience foam & posture alignment",
    description: "Ergonomic lounge recliners, modular L-shapes, and breathable Belgian linen suites.",
    heroImage: "/images/thekku/thekku-lounge-chair.jpg",
    itemCountLabel: "Proposed Seating Curations",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-4",
      desktop: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    filterKey: "living",
  },
  {
    id: "bedroom-furniture",
    name: "Bedroom Furniture",
    tamilName: "படுக்கையறை தளவாடங்கள்",
    tagline: "Restful proportions & acoustic joinery",
    description: "Solid hardwood bedroom suites, cantilevered platform bed frames, and nightstands.",
    heroImage: "/images/thekku/thekku-royal-bed.jpg",
    itemCountLabel: "Proposed Bedroom Suites",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-4",
      desktop: "lg:col-span-4",
      aspect: "aspect-square",
    },
    filterKey: "bedroom",
  },
  {
    id: "beds-mattresses",
    name: "Beds & Mattresses",
    tamilName: "கட்டில்கள் & மெத்தைகள்",
    tagline: "Calming low-profile timber architecture",
    description: "Solid plantation teak platform bases engineered with non-squeak rib-slat support.",
    heroImage: "/images/thekku/thekku-royal-bed.jpg",
    itemCountLabel: "Proposed Platform Beds",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-4",
      desktop: "lg:col-span-4",
      aspect: "aspect-square",
    },
    filterKey: "bedroom",
  },
  {
    id: "dining-collections",
    name: "Dining Collections",
    tamilName: "சாப்பாட்டு மேஜை தொகுப்புகள்",
    tagline: "Natural wood slabs & woven cane backrests",
    description: "Bookmatched solid teak dining tables paired with double-layered hand-knotted cane chairs.",
    heroImage: "/images/thekku/thekku-dining-table.jpg",
    itemCountLabel: "Proposed Dining Suites",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-4",
      desktop: "lg:col-span-4",
      aspect: "aspect-square",
    },
    filterKey: "dining",
  },
  {
    id: "wardrobes-storage",
    name: "Wardrobes & Storage",
    tamilName: "அலமாரிகள் & சேமிப்பு அறைகள்",
    tagline: "Soft-close dovetail joinery & cane ventilation",
    description: "Solid hardwood tallboys, credenzas, and integrated modular wardrobe solutions.",
    heroImage: "/images/thekku/thekku-wardrobe.jpg",
    itemCountLabel: "Proposed Storage Systems",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-4",
      desktop: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    filterKey: "bedroom",
  },
  {
    id: "home-decor",
    name: "Home Decor",
    tamilName: "வீட்டு அலங்காரப் பொருட்கள்",
    tagline: "Sculptural consoles, mirrors & stone tops",
    description: "Travertine pedestal tables, solid rosewood entry consoles, and artisanal accent lighting.",
    heroImage: "/images/thekku/thekku-swing-oonjal.jpg",
    itemCountLabel: "Proposed Accent Decor",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-8",
      desktop: "lg:col-span-8",
      aspect: "aspect-[16/10]",
    },
    filterKey: "accents",
  },
  {
    id: "office-furniture",
    name: "Office Furniture",
    tamilName: "அலுவலகத் தளவாடங்கள்",
    tagline: "Ergonomic executive desks & reading libraries",
    description: "Solid wood executive workspaces, cable-managed timber desks, and modular bookshelves.",
    heroImage: "/images/thekku/thekku-coffee-table.jpg",
    itemCountLabel: "Proposed Executive Desks",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-6",
      desktop: "lg:col-span-6",
      aspect: "aspect-[16/10]",
    },
    filterKey: "accents",
  },
  {
    id: "custom-furniture",
    name: "Custom Furniture",
    tamilName: "தனிப்பயன் தளவாடங்கள்",
    tagline: "Tailored to your architectural floor plan",
    description: "Bespoke carpentry, personalized timber selection, and on-site spatial consultation.",
    heroImage: "/images/thekku/thekku-wood-grain.jpg",
    itemCountLabel: "Bespoke Millwork Atelier",
    gridSpan: {
      mobile: "col-span-12",
      tablet: "md:col-span-6",
      desktop: "lg:col-span-6",
      aspect: "aspect-[16/10]",
    },
    filterKey: "bespoke",
  },
];
