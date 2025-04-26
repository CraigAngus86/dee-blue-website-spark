
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sponsor } from "@/lib/types";
import { ImagePaths } from "@/lib/constants/imagePaths";
import { toast } from "sonner";

interface SponsorLogoProps {
  sponsor: Sponsor;
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  useContainer?: boolean;
  containerClassName?: string;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({
  sponsor,
  variant = "dark",
  size = "md",
  className,
  useContainer = false,
  containerClassName,
}) => {
  const sizeClasses = {
    xs: { height: 24, width: 80 },
    sm: { height: 40, width: 120 },
    md: { height: 64, width: 180 },
    lg: { height: 80, width: 240 },
    xl: { height: 96, width: 300 },
  };

  const dimensions = sizeClasses[size];

  let logoSrc = variant === "light" && sponsor.logoLight 
    ? sponsor.logoLight 
    : sponsor.logo;
  
  if (!logoSrc) {
    logoSrc = `${ImagePaths.sponsors.base}/${sponsor.name.toLowerCase().replace(/\s+/g, '-')}.png`;
  }

  const Logo = (
    <div className={cn("relative", dimensions.height && `h-[${dimensions.height}px]`)}>
      <Image
        src={logoSrc}
        alt={`${sponsor.name} logo`}
        width={dimensions.width}
        height={dimensions.height}
        className={cn("w-auto max-h-full", className)}
        onError={() => toast.error(`Failed to load sponsor logo: ${sponsor.name}`)}
        unoptimized // Add for external logos that may not need optimization
      />
    </div>
  );

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

  return <div className="inline-block">{Logo}</div>;
};

export default SponsorLogo;
