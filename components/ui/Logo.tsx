"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND_CONFIG } from "@/data/brand";

export interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "navbar";
  showText?: boolean;
  showTagline?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = "full",
  size = "navbar",
  showText = true,
  showTagline = true,
  href = "/#home",
  onClick,
}) => {
  const sizeConfig = {
    sm: {
      markSize: "w-9 h-9 sm:w-10 sm:h-10",
      textClass: "text-lg sm:text-xl",
      atelierClass: "text-[9.5px] tracking-[0.2em]",
      taglineClass: "text-[8.5px] tracking-[0.16em]",
    },
    md: {
      markSize: "w-12 h-12 sm:w-14 sm:h-14",
      textClass: "text-xl sm:text-2xl md:text-[1.65rem]",
      atelierClass: "text-[10px] sm:text-[11px] tracking-[0.24em]",
      taglineClass: "text-[9.5px] sm:text-[10.5px] tracking-[0.18em]",
    },
    lg: {
      markSize: "w-16 h-16 sm:w-20 sm:h-20",
      textClass: "text-2xl sm:text-3xl md:text-4xl",
      atelierClass: "text-xs tracking-[0.26em]",
      taglineClass: "text-xs tracking-[0.22em]",
    },
    xl: {
      markSize: "w-20 h-20 sm:w-24 sm:h-24",
      textClass: "text-3xl sm:text-4xl md:text-5xl",
      atelierClass: "text-sm tracking-[0.28em]",
      taglineClass: "text-xs sm:text-sm tracking-[0.22em]",
    },
    navbar: {
      markSize: "w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px]",
      textClass: "text-2xl sm:text-[1.7rem] md:text-[1.85rem]",
      atelierClass: "text-[10px] sm:text-[11px] tracking-[0.25em]",
      taglineClass: "text-[9.5px] sm:text-[10.5px] tracking-[0.18em]",
    },
  }[size];

  const content = (
    <div className={cn("flex items-center gap-3 sm:gap-3.5 group focus-ring select-none", className)}>
      {/* Official Metallic Gold Emblem */}
      <div
        className={cn(
          "relative overflow-hidden shrink-0 border-[1.5px] border-champagne/70 bg-obsidian transition-all duration-300 group-hover:border-champagne group-hover:shadow-[0_0_20px_rgba(216,177,106,0.35)] shadow-subtle rounded-sm",
          sizeConfig.markSize,
          variant === "badge" ? "p-0.5" : ""
        )}
      >
        <Image
          src="/images/logo.png"
          alt="Kerala Furniture Official Insignia"
          fill
          priority
          sizes="96px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 border border-champagne/20 pointer-events-none" />
      </div>

      {/* Typography Block */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-serif text-white font-medium group-hover:text-champagne transition-colors leading-tight tracking-tight",
              sizeConfig.textClass
            )}
          >
            {BRAND_CONFIG.name}
          </span>
          <span
            className={cn(
              "font-mono uppercase text-champagne font-medium mt-0.5",
              sizeConfig.atelierClass
            )}
          >
            SANKARANKOVIL • ATELIER
          </span>
          {showTagline && (
            <span
              className={cn(
                "hidden sm:inline-block font-sans text-sand/70 mt-0.5 tracking-wider",
                sizeConfig.taglineClass
              )}
            >
              {BRAND_CONFIG.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} aria-label="Kerala Furniture Atelier">
        {content}
      </Link>
    );
  }

  return content;
};
