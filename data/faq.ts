/**
 * Kerala Furniture — Master Bilingual FAQ Knowledge Base & Local Matcher
 * Location: Sankarankovil, Tenkasi District, Tamil Nadu
 * 
 * Strict Guardrails:
 * - Single source of truth for business information: BRAND_CONFIG.
 * - Opening hours: Explains that customer should contact showroom directly as verified hours have not been supplied.
 * - Custom furniture: Directs to showroom enquiry; does not fabricate service terms or stock promises.
 * - POC limitation: Local rule-based FAQ matcher without claiming live AI or backend ticket dispatch.
 */

import { BRAND_CONFIG, getWhatsAppInquiryUrl, getBespokeWhatsAppUrl } from "@/data/brand";
import { SupportedLanguage } from "@/data/translations";

export interface FAQAction {
  label: string;
  labelTamil: string;
  type: "call" | "whatsapp" | "link" | "maps";
  url?: string;
  phone?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionTamil: string;
  keywords: string[];
  answer: string;
  answerTamil: string;
  actions?: FAQAction[];
}

export const SUGGESTED_FAQ_IDS = [
  "faq-location",
  "faq-contact",
  "faq-categories",
  "faq-enquire-product",
  "faq-custom",
  "faq-hours",
] as const;

export const FAQ_DATABASE: FAQItem[] = [
  // 1. Where is Kerala Furniture located?
  {
    id: "faq-location",
    question: "Where is Kerala Furniture located?",
    questionTamil: "கேரளா பர்னிச்சர் எங்கு அமைந்துள்ளது?",
    keywords: [
      "location", "where", "address", "landmark", "place", "situated", "direction", "directions", 
      "reach", "sankarankovil", "tenkasi", "railway feeder road", "railway station",
      "எங்கு", "இடம்", "முகவரி", "எங்கே", "அமைந்துள்ளது", "சங்கரன்கோவில்", "தென்காசி", "ரயில்வே"
    ],
    answer: `Kerala Furniture is located in Sankarankovil, Tenkasi District, Tamil Nadu:\n\n📍 ${BRAND_CONFIG.address.line1}, ${BRAND_CONFIG.address.street},\n${BRAND_CONFIG.address.city} - ${BRAND_CONFIG.address.pin},\n${BRAND_CONFIG.address.district}, ${BRAND_CONFIG.address.state}, India.\n\nLandmark: Prominently situated on Railway Feeder Road Corridor, accessible from Tenkasi, Rajapalayam, Tirunelveli, and Virudhunagar.`,
    answerTamil: `கேரளா பர்னிச்சர் தமிழ்நாட்டின் தென்காசி மாவட்டம், சங்கரன்கோவிலில் அமைந்துள்ளது:\n\n📍 ${BRAND_CONFIG.address.line1}, ${BRAND_CONFIG.address.street},\n${BRAND_CONFIG.address.city} - ${BRAND_CONFIG.address.pin},\n${BRAND_CONFIG.address.district}, தமிழ்நாடு.\n\nஅடையாளம்: ரயில்வே ஃபீடர் ரோட்டில், சங்கரன்கோவில் ரயில் நிலையத்திற்கு மிக அருகில் எளிதில் வந்து சேரும் வகையில் அமைந்துள்ளது.`,
    actions: [
      {
        label: "Open in Google Maps",
        labelTamil: "கூகுள் மேப்பில் வழியைக் காண்க",
        type: "maps",
        url: BRAND_CONFIG.googleMapsUrl,
      },
      {
        label: "Call Showroom for Directions",
        labelTamil: "வழி அறிய அழைக்க",
        type: "call",
        phone: BRAND_CONFIG.primaryPhone.tel,
      },
    ],
  },

  // 2. How can I contact the showroom?
  {
    id: "faq-contact",
    question: "How can I contact the showroom?",
    questionTamil: "ஷோரூமை எவ்வாறு தொடர்பு கொள்வது?",
    keywords: [
      "contact", "phone", "number", "call", "telephone", "mobile", "whatsapp", "reach", "talk", "desk", "helpline",
      "தொடர்பு", "தொலைபேசி", "எண்", "போன்", "அழைக்க", "வாட்ஸ்அப்", "பேச"
    ],
    answer: `You can reach Kerala Furniture directly through our 3 verified showroom consultation lines:\n\n📞 Line 1: ${BRAND_CONFIG.phones[0].display}\n📞 Line 2: ${BRAND_CONFIG.phones[1].display}\n📞 Line 3: ${BRAND_CONFIG.phones[2].display}\n\nYou can also message our showroom team directly on WhatsApp for catalogue brochures and piece availability.`,
    answerTamil: `எங்கள் சங்கரன்கோவில் ஷோரூமை 3 அதிகாரப்பூர்வ தொலைபேசி எண்கள் மூலம் நேரடியாகத் தொடர்பு கொள்ளலாம்:\n\n📞 எண் 1: ${BRAND_CONFIG.phones[0].display}\n📞 எண் 2: ${BRAND_CONFIG.phones[1].display}\n📞 எண் 3: ${BRAND_CONFIG.phones[2].display}\n\nமேலும் கூடுதல் விவரங்கள் மற்றும் விலை மதிப்பீட்டிற்கு வாட்ஸ்அப் மூலமாகவும் உடனடியாக தொடர்பு கொள்ளலாம்.`,
    actions: [
      {
        label: `Call Primary Desk (${BRAND_CONFIG.phones[0].display})`,
        labelTamil: `முதன்மை எண்ணை அழைக்க (${BRAND_CONFIG.phones[0].display})`,
        type: "call",
        phone: BRAND_CONFIG.phones[0].tel,
      },
      {
        label: "Message on WhatsApp",
        labelTamil: "வாட்ஸ்அப்பில் செய்தி அனுப்ப",
        type: "whatsapp",
        url: getWhatsAppInquiryUrl("Showroom Contact Enquiry"),
      },
    ],
  },

  // 3. What furniture categories can I explore?
  {
    id: "faq-categories",
    question: "What furniture categories can I explore?",
    questionTamil: "இங்கு என்னென்ன வகையான மரத்தளவாடங்கள் உள்ளன?",
    keywords: [
      "categories", "explore", "products", "types", "collection", "living", "bedroom", "dining", "sofa", "bed", "recliner", "wardrobe", "chairs", "tables",
      "வகைகள்", "பிரிவுகள்", "தொகுப்புகள்", "சோஃபா", "கட்டில்", "டைனிங்", "அலமாரி", "நாற்காலி", "மேஜை"
    ],
    answer: `Our handcrafted solid hardwood catalogue features 9 architectural categories:\n\n🛋️ Living Room: Sofas, Recliners, Lounge Chairs & Coffee Tables\n🛏️ Bedroom: Handcrafted Solid Teak Beds & Mattresses\n🍽️ Dining: Live-Edge Monolith Tables & Dining Suites\n🚪 Storage: Solid Timber Wardrobes & Cabinets\n✨ Bespoke: Custom Architectural Furniture Commissions\n\nAll pieces are crafted from seasoned solid teakwood and rosewood with traditional mortise-and-tenon joinery.`,
    answerTamil: `எங்கள் சங்கரன்கோவில் ஷோரூமில் 9 பிரதான பிரிவுகளில் உயர்தர திட மரத்தளவாடங்கள் காட்சிப்படுத்தப்பட்டுள்ளன:\n\n🛋️ வரவேற்பறை: சொகுசு சோஃபாக்கள், சாய்வு நாற்காலிகள் & டீபாய்கள்\n🛏️ படுக்கையறை: திடத் தேக்கு மரக் கட்டில்கள் & மெத்தைகள்\n🍽️ சாப்பாட்டு அறை: இயற்கை விளிம்பு மோனோலித் டைனிங் மேஜைகள்\n🚪 சேமிப்பகம்: கலைநயமிக்க அலமாரிகள் & ட்ரெஸ்ஸர்கள்\n✨ பிரத்யேக வடிவமைப்பு: வீட்டிற்கேற்ற தனிப்பயன் மர வேலைப்பாடுகள்\n\nஅனைத்தும் பக்குவப்படுத்தப்பட்ட திடத் தேக்கு மற்றும் ஈட்டி மரத்தைக் கொண்டு நேர்த்தியாக உருவாக்கப்படுகின்றன.`,
    actions: [
      {
        label: "Explore Collections Grid",
        labelTamil: "தொகுப்புகளைப் பார்வையிடுங்கள்",
        type: "link",
        url: "/#collections",
      },
      {
        label: "View Product Catalogue",
        labelTamil: "முழுப் பட்டியலைக் காண்க",
        type: "link",
        url: "/#showcase",
      },
    ],
  },

  // 4. Can I enquire about a specific product?
  {
    id: "faq-enquire-product",
    question: "Can I enquire about a specific product?",
    questionTamil: "குறிப்பிட்ட ஒரு தளவாடம் பற்றி விசாரிக்கலாமா?",
    keywords: [
      "enquire", "specific", "product", "item", "piece", "price", "cost", "availability", "timber", "code", "reference",
      "விசாரிக்க", "குறிப்பிட்ட", "பொருள்", "தளவாடம்", "விலை", "இருப்பு", "மாதிரி", "குறியீடு"
    ],
    answer: `Yes! Every piece in our catalogue carries a unique reference code (e.g., kf-sofa-01). You can click "Enquire on WhatsApp" on any product card or detail page to open a prefilled chat with our showroom team.\n\nYou are also warmly invited to visit our Sankarankovil showroom on Railway Feeder Road to inspect the raw wood grain, joinery, and seating comfort in person.`,
    answerTamil: `நிச்சயமாக! எங்கள் பட்டியலிலுள்ள ஒவ்வொரு தளவாடப் பொருளுக்கும் பிரத்யேக குறிப்பு எண் (எ.கா: kf-sofa-01) உள்ளது. எந்தவொரு பொருளின் பக்கத்திலும் உள்ள "வாட்ஸ்அப்பில் விசாரிக்க" பொத்தானைத் தட்டி நேரடியாக ஷோரூம் குழுவுடன் பேசலாம்.\n\nமேலும் சங்கரன்கோவிலில் உள்ள எங்கள் ஷோரூமிற்கு நேரில் வந்து மரத்தின் தரம் மற்றும் இருக்கை வசதியை சோதித்துப் பார்க்கவும் வரவேற்கிறோம்.`,
    actions: [
      {
        label: "Browse Showcase Catalogue",
        labelTamil: "காட்சிப் பட்டியலைக் காண்க",
        type: "link",
        url: "/#showcase",
      },
      {
        label: "General WhatsApp Inquiry",
        labelTamil: "பொதுவான வாட்ஸ்அப் விசாரணை",
        type: "whatsapp",
        url: getWhatsAppInquiryUrl(),
      },
    ],
  },

  // 5. Do you offer customized furniture?
  {
    id: "faq-custom",
    question: "Do you offer customized furniture?",
    questionTamil: "தனிப்பயன் (Custom) மரவேலைப்பாடுகள் செய்து தரப்படுமா?",
    keywords: [
      "custom", "customized", "customize", "customisation", "bespoke", "dimensions", "blueprint", "architectural", "tailored", "size", "wood choice", "swatches",
      "தனிப்பயன்", "விருப்பம்", "அளவுகள்", "வரைபடம்", "பிரத்யேக", "வீட்டிற்கேற்ற", "செய்து தருவீர்களா"
    ],
    answer: `Yes, Kerala Furniture offers bespoke custom furniture consultations based on your architectural blueprints or spatial dimensions.\n\nYou can consult with our woodcraft advisors regarding custom room sizing, timber preferences (Seasoned Teakwood or Indian Rosewood), natural cane weaving, and fabric selections.\n\nPlease note: Feasibility, wood availability, and specific project timelines are confirmed individually upon consultation with our showroom specialists.`,
    answerTamil: `ஆம், உங்கள் வீட்டின் அறை அளவுகள் அல்லது கட்டிட வரைபடத்திற்கு ஏற்ப பிரத்யேகமாக மரத்தளவாடங்களைச் செய்து தருகிறோம்.\n\nதிடத் தேக்கு, ஈட்டி மரம், இயற்கை பிரம்பு பின்னல் மற்றும் மெத்தை துணிகளை உங்கள் விருப்பப்படி தேர்வு செய்ய எங்கள் கைவினை நிபுணர்களுடன் ஆலோசிக்கலாம்.\n\nகுறிப்பு: தனிப்பயன் வேலைப்பாடுகளுக்கான காலம் மற்றும் சாத்தியக்கூறுகள் ஷோரூம் ஆலோசனையின் போது இறுதி செய்யப்படும்.`,
    actions: [
      {
        label: "Inquire Custom Woodwork on WhatsApp",
        labelTamil: "தனிப்பயன் மரவேலை பற்றி வாட்ஸ்அப்பில் பேச",
        type: "whatsapp",
        url: getBespokeWhatsAppUrl(),
      },
      {
        label: "Call Showroom Atelier",
        labelTamil: "பட்டறையை அழைக்க",
        type: "call",
        phone: BRAND_CONFIG.primaryPhone.tel,
      },
    ],
  },

  // 6. What are your opening hours?
  {
    id: "faq-hours",
    question: "What are your opening hours?",
    questionTamil: "ஷோரூம் திறந்திருக்கும் நேரம் என்ன?",
    keywords: [
      "hours", "opening", "open", "timing", "timings", "time", "closing", "closed", "sunday", "holidays", "weekend", "working hours",
      "நேரம்", "வேலை நேரம்", "திறக்கும் நேரம்", "ஞாயிறு", "விடுமுறை", "எப்போது திறக்கும்", "மணி"
    ],
    answer: `Verified showroom opening hours have not been supplied in this catalog. \n\nBefore planning your visit to our Railway Feeder Road showroom in Sankarankovil, please contact our team via phone or WhatsApp to verify current floor hours and ensure our advisors are available to welcome you.`,
    answerTamil: `ஷோரூமின் நேரடி வேலை நேரம் தற்சமயம் அதிகாரப்பூர்வமாக இணைக்கப்படவில்லை.\n\nஎனவே சங்கரன்கோவிலில் உள்ள எங்கள் ஷோரூமிற்கு வருகை தரும் முன், எங்கள் தொலைபேசி எண்கள் அல்லது வாட்ஸ்அப் மூலம் அழைத்து உறுதி செய்துகொள்ளுமாறு அன்புடன் கேட்டுக்கொள்கிறோம்.`,
    actions: [
      {
        label: `Call Primary Desk (${BRAND_CONFIG.phones[0].display})`,
        labelTamil: `ஷோரூமை அழைக்க (${BRAND_CONFIG.phones[0].display})`,
        type: "call",
        phone: BRAND_CONFIG.phones[0].tel,
      },
      {
        label: "Check Availability on WhatsApp",
        labelTamil: "வாட்ஸ்அப்பில் நேரம் அறிய",
        type: "whatsapp",
        url: getWhatsAppInquiryUrl("Showroom Visit Hours Inquiry"),
      },
    ],
  },
];

/**
 * Intelligent local FAQ search & matching algorithm
 * Matches user input against keywords, questions, and Tamil terms without external API calls.
 */
export function matchFAQQuery(query: string, lang: SupportedLanguage): { item: FAQItem | null; confidence: number } {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return { item: null, confidence: 0 };
  }

  // Common quick greetings
  if (/^(hi|hello|hey|vanakkam|good\s*(morning|afternoon|evening)|வணக்கம்|ஹலோ)$/i.test(normalized)) {
    return {
      item: {
        id: "greeting",
        question: "Greeting",
        questionTamil: "வணக்கம்",
        keywords: [],
        answer: `Hello! Welcome to Kerala Furniture, Sankarankovil. How can we assist you with our handcrafted solid hardwood furniture today? You may choose from the suggested questions below or reach our showroom lines directly.`,
        answerTamil: `வணக்கம்! கேரளா பர்னிச்சர் சங்கரன்கோவில் உங்களை அன்புடன் வரவேற்கிறது. எங்கள் திட மரத்தளவாடங்கள் குறித்த தகவல்களை அறிய கீழே உள்ள கேள்விகளைத் தேர்ந்தெடுக்கலாம் அல்லது எங்களை நேரடியாகத் தொடர்பு கொள்ளலாம்.`,
        actions: [
          {
            label: `Call (${BRAND_CONFIG.primaryPhone.display})`,
            labelTamil: `அழைக்க (${BRAND_CONFIG.primaryPhone.display})`,
            type: "call",
            phone: BRAND_CONFIG.primaryPhone.tel,
          },
          {
            label: "WhatsApp Showroom",
            labelTamil: "வாட்ஸ்அப் செய்ய",
            type: "whatsapp",
            url: getWhatsAppInquiryUrl(),
          },
        ],
      },
      confidence: 1,
    };
  }

  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const faq of FAQ_DATABASE) {
    let score = 0;

    // Check exact question match
    const qEn = faq.question.toLowerCase();
    const qTa = faq.questionTamil.toLowerCase();

    if (normalized === qEn || normalized === qTa) {
      score += 100;
    } else {
      if (qEn.includes(normalized) || qTa.includes(normalized)) {
        score += 40;
      }

      // Keyword token score
      const queryWords = normalized.split(/\s+/).filter((w) => w.length > 2);

      for (const kw of faq.keywords) {
        const kwLower = kw.toLowerCase();
        if (normalized.includes(kwLower)) {
          score += 15;
        }

        for (const word of queryWords) {
          if (kwLower === word) {
            score += 20;
          } else if (kwLower.includes(word) || word.includes(kwLower)) {
            score += 10;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  // Threshold check: Must meet minimal relevance
  if (highestScore >= 15 && bestMatch) {
    return { item: bestMatch, confidence: highestScore };
  }

  return { item: null, confidence: 0 };
}

/**
 * Fallback response for unhandled questions
 */
export function getFallbackResponse(lang: SupportedLanguage): { answer: string; actions: FAQAction[] } {
  if (lang === "ta") {
    return {
      answer: `மன்னிக்கவும், உங்கள் குறிப்பிட்ட கேள்விக்கான நேரடிப் பதில் எங்கள் மாதிரி அடிக்கடி கேட்கப்படும் கேள்விகளில் (FAQ) இல்லை.\n\nகேரளா பர்னிச்சர் சங்கரன்கோவில் குழுவினர் உங்களுக்கு உதவ எப்போதும் தயாராக உள்ளனர். துல்லியமான விவரங்களை அறிய எங்கள் நேரடி தொலைபேசி எண்களை அழைக்கவும் அல்லது வாட்ஸ்அப்பில் செய்தி அனுப்பவும்:`,
      actions: [
        {
          label: `அழைக்க: ${BRAND_CONFIG.phones[0].display}`,
          labelTamil: `அழைக்க: ${BRAND_CONFIG.phones[0].display}`,
          type: "call",
          phone: BRAND_CONFIG.phones[0].tel,
        },
        {
          label: "வாட்ஸ்அப்பில் விசாரிக்க",
          labelTamil: "வாட்ஸ்அப்பில் விசாரிக்க",
          type: "whatsapp",
          url: getWhatsAppInquiryUrl(),
        },
      ],
    };
  }

  return {
    answer: `Thank you for asking. We could not find a direct match for your question in our showroom FAQ system.\n\nOur Kerala Furniture Sankarankovil team is readily available to answer specific requests regarding timber selections, custom dimensions, or showroom visits. Please reach out to our showroom consultation desk:`,
    actions: [
      {
        label: `Call Showroom Desk (${BRAND_CONFIG.phones[0].display})`,
        labelTamil: `ஷோரூமை அழைக்க (${BRAND_CONFIG.phones[0].display})`,
        type: "call",
        phone: BRAND_CONFIG.phones[0].tel,
      },
      {
        label: "Inquire via WhatsApp",
        labelTamil: "வாட்ஸ்அப் மூலம் விசாரிக்க",
        type: "whatsapp",
        url: getWhatsAppInquiryUrl(),
      },
    ],
  };
}
