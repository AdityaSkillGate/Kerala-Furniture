import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "dark" | "ivory" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "gold",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] px-2.5 py-1 border transition-colors";

  const variantStyles = {
    gold: "border-champagne/40 bg-champagne/10 text-champagne",
    dark: "border-white/10 bg-charcoal text-sand-light",
    ivory: "border-sand/40 bg-ivory text-obsidian",
    outline: "border-white/20 text-white/80",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
};
