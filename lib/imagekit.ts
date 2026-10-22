/**
 * ImageKit Optimization Helper
 * Kerala Furniture Architectural Showcase
 *
 * Provides URL transformation utilities for progressive image loading,
 * WebP/AVIF auto-format negotiation, responsive srcset generation,
 * and high-performance blur-up placeholders.
 */

export interface ImageKitTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  blur?: number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  dpr?: number;
  crop?: "maintain_ratio" | "force" | "at_least" | "at_max";
  focus?: "auto" | "center" | "top" | "bottom";
}

const DEFAULT_IMAGEKIT_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
  "https://ik.imagekit.io/keralafurniture";

/**
 * Transforms an image path or URL with ImageKit optimization parameters.
 * If the image is an external full URL and no custom endpoint is configured,
 * it applies optimized CDN query parameters gracefully.
 */
export function getImageKitUrl(
  src: string,
  options: ImageKitTransformOptions = {}
): string {
  if (!src) return "";

  const {
    width,
    height,
    quality = 85,
    blur,
    format = "auto",
    dpr,
    crop = "maintain_ratio",
    focus = "auto",
  } = options;

  // Build ImageKit transform string
  const transforms: string[] = [];

  if (width) transforms.push(`w-${width}`);
  if (height) transforms.push(`h-${height}`);
  if (quality) transforms.push(`q-${quality}`);
  if (blur) transforms.push(`bl-${blur}`);
  if (format && format !== "auto") transforms.push(`f-${format}`);
  if (dpr) transforms.push(`dpr-${dpr}`);
  if (crop) transforms.push(`c-${crop}`);
  if (focus) transforms.push(`fo-${focus}`);

  const transformString = transforms.length > 0 ? `tr:${transforms.join(",")}` : "";

  // If using local relative path (e.g., /images/teak-flagship-cutout.png)
  if (src.startsWith("/")) {
    // If an ImageKit endpoint is explicitly provided in env, prepend it
    if (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
      const endpoint = DEFAULT_IMAGEKIT_ENDPOINT.replace(/\/$/, "");
      return transformString
        ? `${endpoint}/${transformString}${src}`
        : `${endpoint}${src}`;
    }
    // Otherwise return the local public path directly for Next.js static export
    return src;
  }

  // If source is already an Unsplash URL, apply optimal Unsplash CDN query parameters
  if (src.includes("images.unsplash.com")) {
    try {
      const url = new URL(src);
      if (width) url.searchParams.set("w", width.toString());
      if (height) url.searchParams.set("h", height.toString());
      if (quality) url.searchParams.set("q", quality.toString());
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      return url.toString();
    } catch {
      return src;
    }
  }

  // If source is a full external URL and ImageKit endpoint is active
  if (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    const endpoint = DEFAULT_IMAGEKIT_ENDPOINT.replace(/\/$/, "");
    return transformString
      ? `${endpoint}/${transformString}/${src}`
      : `${endpoint}/${src}`;
  }

  return src;
}

/**
 * Common ImageKit Transform Presets for Kerala Furniture Atelier
 */
export const IMAGE_PRESETS = {
  heroBackground: {
    width: 2000,
    quality: 85,
    format: "auto" as const,
  },
  heroForegroundCutout: {
    width: 1200,
    quality: 95,
    format: "auto" as const,
  },
  productCard: {
    width: 800,
    height: 600,
    quality: 80,
    format: "auto" as const,
  },
  productDetailMain: {
    width: 1400,
    height: 1050,
    quality: 90,
    format: "auto" as const,
  },
  blurPlaceholder: {
    width: 32,
    quality: 20,
    blur: 10,
    format: "auto" as const,
  },
};
