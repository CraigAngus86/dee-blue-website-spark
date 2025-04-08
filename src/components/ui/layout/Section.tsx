
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: 
    | "white" 
    | "light" 
    | "primary" 
    | "primary-gradient" 
    | "accent-gradient";
  spacing?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      background = "white",
      spacing = "lg",
      animate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    // Background variations
    const backgroundClasses = {
      white: "bg-white",
      light: "bg-light-gray",
      primary: "bg-primary text-white",
      "primary-gradient":
        "bg-gradient-to-r from-primary to-primary-light text-white",
      "accent-gradient":
        "bg-gradient-to-r from-accent to-accent-light",
    };
    
    // Spacing variations
    const spacingClasses = {
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
      xl: "py-24",
    };
    
    // Set up intersection observer for animation
    useEffect(() => {
      if (!animate) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, [animate]);
    
    const animationClass = animate
      ? isVisible
        ? "animate-fade-in"
        : "opacity-0"
      : "";
    
    return (
      <section
        ref={(node) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          if (sectionRef) {
            sectionRef.current = node;
          }
        }}
        className={cn(
          backgroundClasses[background],
          spacingClasses[spacing],
          animationClass,
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
