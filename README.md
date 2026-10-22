# Kerala Furniture — Website POC

A premium client-impressing website Proof of Concept (POC) for **Kerala Furniture**, Sankarankovil, Tamil Nadu. Designed with an editorial architectural luxury aesthetic inspired by high-end international furniture ateliers.

---

## 1. Verified Business Details (Single Source of Truth)

All business details are locked and managed in [`data/brand.ts`](data/brand.ts):

- **Brand:** Kerala Furniture
- **Tagline:** Better Spaces • Brighter Lives
- **Showroom Address:** Q 299, Railway Feeder Road, Sankarankovil - 627 756, Tenkasi District, Tamil Nadu
- **Phone Lines (Direct Dial & WhatsApp):**
  - Line 1: `+91 70347 56478`
  - Line 2: `+91 90721 98315`
  - Line 3: `+91 70927 79356`

> **Guardrail Note:** Per client instructions, zero prices, specifications, reviews, years of experience, awards, guarantees, or opening hours are invented. Products are framed with realistic materials, custom dimensions, and direct showroom WhatsApp inquiries.

---

## 2. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict typing enabled)
- **Styling:** Tailwind CSS with custom luxury tokens
- **Typography:** `Playfair Display` (Editorial Serif) + `Plus Jakarta Sans` (Clean Modern Sans)
- **Icons:** `lucide-react`
- **Animations:** `framer-motion` + CSS keyframes (Marquee) + `prefers-reduced-motion` compliance
- **State & Translations:** Reusable English and Tamil translation dictionaries in [`data/translations.ts`](data/translations.ts)

---

## 3. Architecture & Directory Structure

```
kerala-furniture-POC/
├── app/
│   ├── globals.css              # Global styles, tokens, reduced-motion rules
│   ├── layout.tsx               # Root layout, Google Fonts, SEO metadata
│   └── page.tsx                 # Foundation home route
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Sticky luxury header, 3 phone lines, mobile drawer
│   │   └── Footer.tsx           # Full showroom directory and POC disclaimer
│   ├── home/
│   │   └── HeroFoundation.tsx   # Editorial hero with tagline & asymmetric composition
│   ├── products/
│   │   └── ProductCard.tsx      # Curated furniture cards with WhatsApp triggers
│   ├── chat/
│   │   └── WhatsAppInquiryPill.tsx # Floating quick contact & phone dialer sheet
│   └── ui/
│       ├── Button.tsx           # Editorial luxury buttons
│       └── Badge.tsx            # Refined category and status badges
├── data/
│   ├── brand.ts                 # Master business information & WhatsApp link generators
│   ├── categories.ts            # Furniture categories (Living, Dining, Bedroom, Accents)
│   ├── products.ts              # Local mock catalog with realistic hardwood specifications
│   └── translations.ts          # English & Tamil dictionaries
├── hooks/
│   └── useReducedMotion.ts      # Accessibility hook for reduced motion
├── lib/
│   ├── utils.ts                 # Classname merge utility (clsx + tailwind-merge)
│   └── animations.ts            # Framer Motion transitions and variants
├── public/
│   ├── assets/                  # Brand SVG monograms and vector graphics
│   ├── fonts/                   # Local font fallbacks
│   ├── images/                  # Showroom and product photographs
│   └── videos/                  # Cinematic showroom and intro video clips
├── tailwind.config.ts           # Luxury color tokens (Obsidian, Champagne, Ivory, Walnut)
├── tsconfig.json                # Strict TypeScript configuration
└── package.json                 # Project dependencies
```

---

## 4. Getting Started

### Prerequisites
- Node.js `v18.17.0` or higher (verified on Node `v22.14.0`)
- npm `v9+` or `v10+`

### Installation
Install project dependencies:
```bash
npm install
```

### Running the Development Server
Start the local Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the Kerala Furniture website.

### Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 5. Design Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Obsidian** | `#0A0908` | Primary dark luxury canvas & hero backdrop |
| **Charcoal** | `#171512` | Elevation layer, card backdrops, drawer panels |
| **Champagne Gold** | `#D8B16A` | Luxury accents, active indicators, monogram |
| **Warm Ivory** | `#F5F0E7` | Tactile product shopping section backdrop |
| **Sand Beige** | `#D9C8AE` | Dividers, subtle borders, secondary badges |
| **Walnut** | `#67452E` | Warm timber tone for woodcraft badges |
| **White** | `#FFFFFF` | Editorial headlines and card surfaces |

---

## 6. Stop Condition & Approval

Phase 0 (Project Audit and Foundation) is complete. All subsequent phases will be executed incrementally upon client approval.
