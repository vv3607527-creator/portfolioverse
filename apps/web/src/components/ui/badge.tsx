import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "outline" | "success";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "default",
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary text-primary-foreground": variant === "default",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-input bg-background": variant === "outline",
          "bg-emerald-500/10 text-emerald-600": variant === "success",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
