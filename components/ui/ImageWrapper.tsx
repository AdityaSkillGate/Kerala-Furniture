import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ImageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspect?: "square" | "portrait" | "landscape" | "cinematic" | "banner";
  priority?: boolean;
  sizes?: string;
  overlay?: "none" | "dark" | "gradient" | "subtle";
  zoomOnHover?: boolean;
  badge?: React.ReactNode;
  caption?: string;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  aspect = "landscape",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  overlay = "none",
  zoomOnHover = true,
  badge,
  caption,
  className,
  ...props
}) => {
  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    cinematic: "aspect-[16/9]",
    banner: "aspect-[21/9]",
  };

  const overlayClasses = {
    none: "",
    dark: "bg-obsidian/40",
    gradient: "bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent",
    subtle: "bg-obsidian/20",
  };

  return (
    <figure className={cn("group flex flex-col gap-2 overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-charcoal border border-white/10",
          aspectClasses[aspect]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            zoomOnHover && "group-hover:scale-105"
          )}
        />

        {overlay !== "none" && (
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-300",
              overlayClasses[overlay]
            )}
          />
        )}

        {badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            {badge}
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="text-[11px] font-sans text-sand/70 tracking-wide italic px-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
