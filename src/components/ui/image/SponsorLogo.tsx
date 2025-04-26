import React from "react";
import { cn } from "@/lib/utils";
import { Sponsor } from "@/lib/types";
import { ImagePaths } from "@/lib/constants/imagePaths";
import { toast } from "sonner";

/**
 * Props for the SponsorLogo component
 */
interface SponsorLogoProps {
  /** Sponsor data object containing name, logo paths, and website */
  sponsor: Sponsor;
  /** Visual variant - dark for colored backgrounds, light for dark backgrounds */
  variant?: "dark" | "light";
  /** Size of the logo */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Additional CSS classes */
  className?: string;
  /** Whether to display the logo in a container */
  useContainer?: boolean;
  /** Additional CSS classes for the container */
  containerClassName?: string;
}

/**
 * SponsorLogo component displays a sponsor's logo with consistent styling.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <SponsorLogo 
 *   sponsor={sponsorData}
 *   size="md"
 * />
 * 
 * // With light variant in container
 * <SponsorLogo 
 *   sponsor={sponsorData}
 *   variant="light"
 *   size="lg"
 *   useContainer={true}
 * />
 * ```
 */
const SponsorLogo: React.FC<SponsorLogoProps> = ({
  sponsor,
  variant = "dark",
  size = "md",
  className,
  useContainer = false,
  containerClassName,
}) => {
  // Map size strings to dimensions for consistent sizing
  const sizeClasses = {
    xs: { height: 24, width: 80 },
    sm: { height: 40, width: 120 },
    md: { height: 64, width: 180 },
    lg: { height: 80, width: 240 },
    xl: { height: 96, width: 300 },
  };

  // Get dimensions based on selected size
  const dimensions = sizeClasses[size];

  // Use light variant logo if available and requested, otherwise use default logo
  let logoSrc = variant === "light" && sponsor.logoLight 
    ? sponsor.logoLight 
    : sponsor.logo;
  
  // Fallback to a constructed path if no logo is provided
  if (!logoSrc) {
    logoSrc = `${ImagePaths.sponsors.base}/${sponsor.name.toLowerCase().replace(/\s+/g, '-')}.png`;
  }

  // Construct the logo component
  const Logo = (
    <div className={cn("relative", dimensions.height && `h-[${dimensions.height}px]`)}>
      <img
        src={logoSrc}
        alt={`${sponsor.name} logo`}
        width={dimensions.width}
        height={dimensions.height}
        className={cn("w-auto max-h-full", className)}
        onError={() => toast.error(`Failed to load sponsor logo: ${sponsor.name}`)}
        loading="lazy"
      />
    </div>
  );

  // If useContainer is true, wrap the logo in a container
  if (useContainer) {
    return (
      <div className={cn(
        "flex items-center justify-center p-4 bg-white rounded-md",
        containerClassName
      )}>
        {Logo}
      </div>
    );
  }

  // If sponsor has a website, wrap the logo in a link
  if (sponsor.website) {
    return (
      <a 
        href={sponsor.website} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        {Logo}
      </a>
    );
  }

  // Otherwise, return the logo in a simple div
  return <div className="inline-block">{Logo}</div>;
};

export default SponsorLogo;
