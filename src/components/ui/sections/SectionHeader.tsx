"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Align = "left" | "center" | "right";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: Align;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  viewAllLink?: string;
  viewAllText?: string;
  textColor?: string; // deprecated
  rightSlot?: React.ReactNode;
  showAccentBar?: boolean;
  as?: "h2" | "h3";
}

const alignMap: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  viewAllLink,
  viewAllText = "View All",
  textColor, // deprecated
  rightSlot,
  showAccentBar = true,
  as = "h2",
}) => {
  const HeadingTag = as;
  const legacyColorClass = textColor ? undefined : "text-text-strong";
  const titleColorStyle = textColor ? { color: `rgb(var(--${textColor}))` } : undefined;
  const wrapperAlign = alignMap[align];
  
  // Check if there's actually content on the right side
  const hasRightContent = rightSlot || viewAllLink;
  
  // Determine justify behavior based on content and alignment
  const getJustifyClass = () => {
    // If className prop contains justify- classes, don't override
    if (className?.includes('justify-')) {
      return ''; // Let the className prop handle justification
    }
    
    if (hasRightContent) {
      return "justify-between";
    }
    if (align === "center") {
      return "justify-center";
    }
    return "justify-start";
  };

  return (
    <div
      className={cn(
        "section-header mb-6 flex items-end",
        // Apply default layout unless overridden
        !className?.includes('!flex-row') && (
          align === "center" ? "flex-col gap-3 md:flex-row md:gap-6" : "gap-3"
        ),
        // Apply justify class unless overridden
        getJustifyClass(),
        className
      )}
    >
      {/* Tightened accent→title spacing */}
      <div className={cn(
        "flex items-start gap-2 md:gap-3", 
        align !== "left" && "mx-auto",
        align !== "left" && hasRightContent && "md:mx-0"
      )}>
        {showAccentBar && <div className="w-1.5 h-10 bg-accent shrink-0" />}
        <div className={cn(wrapperAlign, align !== "left" && "w-full")}>
          <HeadingTag
            className={cn(
              "section-header__title font-heading font-bold tracking-tightest text-h2 leading-none mb-0",
              legacyColorClass,
              titleClassName
            )}
            style={titleColorStyle}
          >
            {title}
          </HeadingTag>
          {subtitle ? (
            <p
              className={cn(
                "section-header__subtitle mt-1 text-sm md:text-base text-text-muted",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* Right-side actions - only render if there's content */}
      {hasRightContent && (
        <div className={cn("hidden md:block", align === "center" && "md:self-end")}>
          {rightSlot ? (
            rightSlot
          ) : viewAllLink ? (
            <Link
              href={viewAllLink}
              className="inline-flex items-center text-link hover:text-link-hover font-semibold transition-colors"
              aria-label={viewAllText}
            >
              {viewAllText}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0-7 7m7-7H3" />
              </svg>
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;