/**
 * Kerala Furniture — Master Brand Information (Single Source of Truth)
 * Location: Sankarankovil, Tenkasi District, Tamil Nadu
 * 
 * Strict Rule: Do not modify or invent business details, address, or phone lines.
 */

export interface PhoneContact {
  id: string;
  label: string;
  display: string;
  raw: string;
  tel: string;
  whatsappUrl: string;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  taglineTamil?: string;
  address: {
    line1: string;
    street: string;
    landmark?: string;
    city: string;
    pin: string;
    pincode?: string;
    district: string;
    state: string;
    country?: string;
    full: string;
  };
  phones: PhoneContact[];
  primaryPhone: PhoneContact;
  googleMapsQuery: string;
  googleMapsUrl: string;
}

export const BRAND_CONFIG: BrandConfig = {
  name: "Kerala Furniture",
  tagline: "Better Spaces • Brighter Lives",
  taglineTamil: "சிறந்த இடங்கள் • சிறந்த வாழ்க்கை",
  address: {
    line1: "Q 299",
    street: "Railway Feeder Road",
    city: "Sankarankovil",
    pin: "627 756",
    pincode: "627 756",
    district: "Tenkasi District",
    state: "Tamil Nadu",
    country: "India",
    full: "Q 299, Railway Feeder Road, Sankarankovil - 627 756, Tenkasi District",
  },
  phones: [
    {
      id: "phone-1",
      label: "Showroom Line 1",
      display: "70347 56478",
      raw: "7034756478",
      tel: "tel:+917034756478",
      whatsappUrl: "https://wa.me/917034756478",
    },
    {
      id: "phone-2",
      label: "Showroom Line 2",
      display: "90721 98315",
      raw: "9072198315",
      tel: "tel:+919072198315",
      whatsappUrl: "https://wa.me/919072198315",
    },
    {
      id: "phone-3",
      label: "Showroom Line 3",
      display: "70927 79356",
      raw: "7092779356",
      tel: "tel:+917092779356",
      whatsappUrl: "https://wa.me/917092779356",
    },
  ],
  get primaryPhone(): PhoneContact {
    return this.phones[0];
  },
  googleMapsQuery: "Kerala Furniture, Railway Feeder Road, Sankarankovil, Tamil Nadu 627756",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kerala+Furniture+Railway+Feeder+Road+Sankarankovil+Tamil+Nadu+627756",
};

/**
 * Generates an inquiry WhatsApp link targeting one of the official phone lines.
 */
export function getWhatsAppInquiryUrl(
  productName?: string,
  category?: string,
  phoneIndex: number = 0
): string {
  const targetPhone = BRAND_CONFIG.phones[phoneIndex] || BRAND_CONFIG.phones[0];
  const baseUrl = `https://wa.me/91${targetPhone.raw}`;

  let message = `Hello Kerala Furniture, Sankarankovil! I am visiting your website and would like to inquire about your furniture collections.`;
  
  if (productName) {
    message = `Hello Kerala Furniture, Sankarankovil! I am interested in inquiring about "${productName}"${
      category ? ` (${category})` : ""
    }. Could you please share more details and availability at your showroom?`;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a bespoke consultation WhatsApp link.
 */
export function getBespokeWhatsAppUrl(serviceName?: string): string {
  const targetPhone = BRAND_CONFIG.phones[0];
  const message = `Hello Kerala Furniture! I would like to schedule a bespoke interior or furniture consultation for ${
    serviceName || "my home"
  } at your Sankarankovil showroom.`;
  return `https://wa.me/91${targetPhone.raw}?text=${encodeURIComponent(message)}`;
}
