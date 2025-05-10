
import React from "react";
import { cn } from "@/lib/utils";
import Container from "../layout/Container";

interface SectionHeroProps {
  backgroundSrc: string;
  backgroundAlt?: string;
  overlayColor?: "primary" | "dark" | "gradient";
  overlayOpacity?: "light" | "medium" | "heavy";
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  className?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({
  backgroundSrc,
  backgroundAlt = "",
  overlayColor = "primary",
  overlayOpacity = "medium",
  title,
  subtitle,
  breadcrumbs,
  className,
}) => {
  // Define overlay color styles
  const overlayColors = {
    primary: "from-primary",
    dark: "from-black",
    gradient: "from-primary to-primary-light",
  };

  // Define overlay opacity styles
  const overlayOpacities = {
    light: "bg-opacity-30",
    medium: "bg-opacity-50",
    heavy: "bg-opacity-70",
  };

  return (
    <div className={cn("relative w-full h-64 md:h-80 overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundSrc}
          alt={backgroundAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          overlayColors[overlayColor],
          overlayOpacities[overlayOpacity]
        )}
      />

      {/* Content */}
      <Container className="relative z-10 h-full flex flex-col justify-end pb-8">
        {breadcrumbs && (
          <div className="mb-4 flex items-center gap-2 text-white/80">
            <a href="/" className="text-white/80 hover:text-white text-sm transition-colors">Home</a>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <span className="text-white/60">/</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white text-sm">{crumb.label}</span>
                ) : (
                  <a 
                    href={crumb.href} 
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    {crumb.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        
        <h1 className="text-h1 md:text-display font-montserrat font-bold text-white">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-2 text-white/90 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
};

export default SectionHero;
