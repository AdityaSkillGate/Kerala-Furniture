import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "gold" | "sand" | "walnut";
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = "subtle",
  label,
  className,
  ...props
}) => {
  const lineStyles = {
    subtle: "border-white/10",
    gold: "border-champagne/40",
    sand: "border-sand/30",
    walnut: "border-walnut/30",
  };

  if (label) {
    return (
      <div
        className={cn("w-full flex items-center justify-center my-8", className)}
        {...props}
      >
        <div className={cn("flex-grow border-t", lineStyles[variant])} />
        <span className="px-4 text-[10px] uppercase tracking-[0.25em] text-sand/70 font-mono">
          {label}
        </span>
        <div className={cn("flex-grow border-t", lineStyles[variant])} />
      </div>
    );
  }

  return (
    <hr
      className={cn("w-full border-t my-8", lineStyles[variant], className)}
      {...props}
    />
  );
};
