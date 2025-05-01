
import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Link } from "react-router-dom";

export interface ButtonNewProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "accent";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const ButtonNew = React.forwardRef<HTMLButtonElement, ButtonNewProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      asChild = false,
      href,
      children,
      ...props
    },
    ref
  ) => {
    // If href is provided, we'll render a Link component
    const Comp = href ? Link : asChild ? Slot : "button";

    // Updated variant classes to improve contrast and follow the new style guide
    const variantClasses = {
      primary:
        "bg-secondary text-primary hover:bg-secondary-dark active:bg-secondary-dark/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      secondary:
        "bg-white text-primary border border-primary hover:bg-light-gray active:bg-medium-gray focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      tertiary:
        "bg-transparent text-primary hover:text-primary-light active:text-primary-dark underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      // Updated accent style to use white background with gold border by default, gold fill on hover
      accent:
        "bg-white text-primary border-2 border-accent hover:bg-accent hover:text-primary active:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    };

    // Map sizes to Tailwind classes
    const sizeClasses = {
      sm: "text-sm px-3 py-1.5 h-9",
      md: "text-base px-4 py-2 h-10",
      lg: "text-lg px-6 py-2.5 h-12",
    };

    // Apply transition classes
    const transitionClasses =
      "transition-all duration-[var(--animation-quick)] ease-in-out";

    // Prepare props for the component
    const componentProps = href ? { to: href, ...props } : props;

    return (
      <Comp
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-montserrat font-semibold rounded-md select-none",
          variantClasses[variant],
          sizeClasses[size],
          transitionClasses,
          className
        )}
        ref={href ? undefined : ref}
        {...componentProps}
      >
        {iconLeft && <span className="inline-flex">{iconLeft}</span>}
        {children}
        {iconRight && <span className="inline-flex">{iconRight}</span>}
      </Comp>
    );
  }
);

ButtonNew.displayName = "ButtonNew";

export { ButtonNew };
