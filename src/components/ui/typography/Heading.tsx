
import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
  weight?: "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold";
  color?: "default" | "primary" | "secondary" | "accent" | "muted" | "white";
  className?: string;
  children: React.ReactNode;
}

const Heading = ({
  level = 1,
  as,
  weight = "bold",
  color = "default",
  className,
  children,
  ...props
}: HeadingProps) => {
  const headingLevel = as || level;
  
  // Map weight names to Tailwind classes
  const weightClasses = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };
  
  // Map color names to Tailwind classes
  const colorClasses = {
    default: "text-black",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    muted: "text-gray",
    white: "text-white",
  };
  
  // Map heading levels to Tailwind size classes
  const sizeClasses = {
    1: "text-h1",
    2: "text-h2",
    3: "text-h3",
    4: "text-h4",
    5: "text-h5",
    6: "text-h6",
  };
  
  const classes = cn(
    "font-montserrat tracking-tight",
    weightClasses[weight],
    colorClasses[color],
    sizeClasses[level],
    className
  );
  
  const Tag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  
  return <Tag className={classes} {...props}>{children}</Tag>;
};

export default Heading;
