import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-display",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "relative overflow-hidden bg-glass/40 backdrop-blur-2xl border border-glass-border/50 text-foreground shadow-[0_8px_32px_rgba(0,212,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary/5 after:to-transparent after:pointer-events-none hover:bg-glass/60 hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(0,212,255,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]",
        "glass-primary":
          "relative overflow-hidden bg-primary/15 backdrop-blur-2xl border border-primary/40 text-primary shadow-[0_8px_32px_rgba(0,212,255,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:via-transparent before:to-transparent before:pointer-events-none hover:bg-primary/25 hover:border-primary/60 hover:shadow-[0_12px_48px_rgba(0,212,255,0.25)] hover:scale-[1.02] active:scale-[0.98]",
        liquid:
          "relative overflow-hidden bg-gradient-to-br from-glass/70 via-glass/50 to-glass/30 backdrop-blur-2xl border border-glass-border/50 text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.2)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:pointer-events-none hover:border-primary/50 hover:shadow-[0_12px_48px_rgba(0,212,255,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]",
        hero:
          "relative overflow-hidden bg-primary text-primary-foreground font-semibold shadow-[0_8px_32px_rgba(0,212,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:pointer-events-none hover:shadow-[0_12px_48px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98]",
        "hero-outline":
          "relative overflow-hidden bg-transparent border-2 border-foreground/20 text-foreground before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none hover:border-primary/50 hover:text-primary hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
