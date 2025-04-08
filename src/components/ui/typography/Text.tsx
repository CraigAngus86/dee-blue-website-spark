
import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "large" | "medium" | "small" | "xs";
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
  color?: "default" | "primary" | "secondary" | "accent" | "muted" | "white";
  as?: "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
}

const Text = ({
  size = "medium",
  weight = "regular",
  color = "default",
  as = "p",
  className,
  children,
  ...props
}: TextProps) => {
  // Map size names to Tailwind classes
  const sizeClasses = {
    large: "text-lg leading-relaxed",
    medium: "text-body",
    small: "text-small",
    xs: "text-xs",
  };
  
  // Map weight names to Tailwind classes
  const weightClasses = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  
  // Map color names to Tailwind classes
  const colorClasses = {
    default: "text-near-black",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    muted: "text-gray",
    white: "text-white",
  };
  
  const classes = cn(
    "font-inter",
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    className
  );
  
  // Fix the dynamic component rendering with proper typing
  switch (as) {
    case 'p':
      return <p className={classes} {...props}>{children}</p>;
    case 'span':
      return <span className={classes} {...props}>{children}</span>;
    case 'div':
      return <div className={classes} {...props}>{children}</div>;
    default:
      return <p className={classes} {...props}>{children}</p>;
  }
};

export default Text;
