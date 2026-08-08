import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" && "bg-accent/10 text-accent",
        variant === "secondary" && "bg-foreground/5 text-muted",
        variant === "outline" && "border border-border text-muted",
        variant === "accent" && "bg-accent text-white",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
