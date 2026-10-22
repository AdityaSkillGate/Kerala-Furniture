import React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-champagne text-obsidian hover:bg-champagne-light shadow-subtle hover:shadow-gold",
      secondary:
        "bg-charcoal text-white hover:bg-obsidian border border-sand/20 hover:border-sand/40",
      outline:
        "bg-transparent text-white border border-champagne/40 hover:border-champagne hover:bg-champagne/10 text-champagne",
      ghost:
        "bg-transparent text-white/80 hover:text-champagne hover:bg-white/5",
      gold:
        "bg-gradient-to-r from-champagne to-champagne-dark text-obsidian hover:brightness-110",
    };

    const sizeStyles = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
