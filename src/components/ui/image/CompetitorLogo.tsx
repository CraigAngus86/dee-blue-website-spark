
import React from 'react';
import { cn } from '@/lib/utils';
import Image from "next/image";
import { ImagePaths } from '@/lib/constants/imagePaths';
import { toast } from "sonner";

interface CompetitorLogoProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'default' | 'alternate';
  className?: string;
  logoSrc?: string;
  containerClassName?: string;
  showName?: boolean;
  href?: string;
}

const CompetitorLogo: React.FC<CompetitorLogoProps> = ({
  name,
  size = 'md',
  variant = 'default',
  className,
  logoSrc,
  containerClassName,
  showName = false,
  href,
}) => {
  const logoPath = logoSrc || `${ImagePaths.competitors.base}/${name}.png`;
  
  const sizeMap = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };
  
  const actualSize = typeof size === 'number' ? size : sizeMap[size];
  
  const LogoComponent = (
    <>
      <div 
        className={cn(
          "relative overflow-hidden",
          containerClassName
        )}
        style={{
          width: `${actualSize}px`, 
          height: `${actualSize}px`,
        }}
      >
        <Image
          src={logoPath}
          alt={`${name} logo`}
          width={actualSize}
          height={actualSize}
          className="object-contain"
          onError={() => toast.error(`Failed to load competitor logo: ${name}`)}
        />
      </div>
      
      {showName && (
        <span className="mt-1 text-xs font-medium text-center block">
          {name}
        </span>
      )}
    </>
  );
  
  if (href) {
    return (
      <a 
        href={href} 
        className="inline-flex flex-col items-center" 
        title={name}
      >
        {LogoComponent}
      </a>
    );
  }
  
  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      {LogoComponent}
    </div>
  );
};

export default CompetitorLogo;
