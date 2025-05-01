
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "none" | "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = { default: 1, sm: 2, md: 3, lg: 4 },
      gap = "md",
      animate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    // Gap sizes
    const gapClasses = {
      none: "gap-0",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };
    
    // Column configuration
    const columnClasses = [
      `grid-cols-${columns.default}`,
      columns.sm && `sm:grid-cols-${columns.sm}`,
      columns.md && `md:grid-cols-${columns.md}`,
      columns.lg && `lg:grid-cols-${columns.lg}`,
      columns.xl && `xl:grid-cols-${columns.xl}`,
    ].filter(Boolean);
    
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
      
      if (gridRef.current) {
        observer.observe(gridRef.current);
      }
      
      return () => {
        if (gridRef.current) {
          observer.unobserve(gridRef.current);
        }
      };
    }, [animate]);
    
    return (
      <div
        ref={(node) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          if (gridRef) {
            gridRef.current = node;
          }
        }}
        className={cn(
          "grid",
          columnClasses,
          gapClasses[gap],
          animate && "stagger-children",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export default Grid;
