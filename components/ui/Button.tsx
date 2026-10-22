import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Skeleton";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "walnut" | "ivory";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "right",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none rounded-none select-none";

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
        "bg-gradient-to-r from-champagne to-champagne-dark text-obsidian font-semibold hover:brightness-110 shadow-gold",
      walnut:
        "bg-walnut text-white hover:bg-walnut-dark shadow-subtle border border-walnut-light/30",
      ivory:
        "bg-ivory text-obsidian hover:bg-white border border-sand/30 shadow-subtle",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 uppercase tracking-wider gap-1.5",
      md: "text-sm px-6 py-3 uppercase tracking-wider gap-2",
      lg: "text-base px-8 py-4 uppercase tracking-widest gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <Spinner
            size="sm"
            variant={variant === "primary" || variant === "gold" ? "walnut" : "gold"}
          />
        )}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
