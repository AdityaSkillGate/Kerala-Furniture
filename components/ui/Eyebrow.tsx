import React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "dark" | "ivory" | "walnut" | "outline";
  icon?: React.ReactNode;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  variant = "gold",
  icon,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.2em] px-3 py-1 border transition-colors";

  const variantStyles = {
    gold: "border-champagne/40 bg-champagne/10 text-champagne",
    dark: "border-white/10 bg-charcoal text-sand-light",
    ivory: "border-sand/40 bg-ivory text-obsidian",
    walnut: "border-walnut/40 bg-walnut/10 text-walnut",
    outline: "border-white/20 text-white/80",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
