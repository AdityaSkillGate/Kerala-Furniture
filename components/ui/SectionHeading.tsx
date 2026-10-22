import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  titleItalic?: string;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  theme?: "dark" | "light";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  titleItalic,
  description,
  align = "left",
  theme = "dark",
  className,
  ...props
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const isLight = theme === "light";

  return (
    <div
      className={cn("flex flex-col gap-3 max-w-3xl", alignClasses[align], className)}
      {...props}
    >
      {eyebrow && (
        <Eyebrow
          variant={isLight ? "walnut" : "gold"}
          className="mb-1"
        >
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.14]",
          isLight ? "text-obsidian" : "text-white"
        )}
      >
        {title}{" "}
        {titleItalic && (
          <span
            className={cn(
              "italic font-normal",
              isLight ? "text-walnut" : "text-champagne"
            )}
          >
            {titleItalic}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "text-sm sm:text-base font-sans font-light leading-relaxed mt-1 max-w-2xl",
            isLight ? "text-charcoal/75" : "text-sand-light/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
