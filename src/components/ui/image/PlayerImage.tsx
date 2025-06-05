import React from 'react';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import { CloudinaryAsset } from '@/features/team/types';

export interface PlayerImageProps {
  image?: CloudinaryAsset;
  name: string;
  size?: string;
  variant?: 'square' | 'portrait';
  removeBackground?: boolean;
  focusOnFace?: boolean;
  className?: string;
  containerClassName?: string;
}

const PlayerImage: React.FC<PlayerImageProps> = ({
  image,
  name,
  size = 'default',
  variant = 'square',
  removeBackground = true,
  focusOnFace = true,
  className,
  containerClassName,
}) => {
  // Extract URL from CloudinaryAsset
  const src = image?.secure_url || image?.url || '';
  const alt = `${name} - Banks o' Dee FC`;

  // Handle missing image
  if (!src) {
    return (
      <div className={cn(
        "bg-[#e5e7eb] flex items-center justify-center rounded-md",
        className
      )}>
        <span className="text-[#6b7280] text-sm">No Image</span>
      </div>
    );
  }

  // Define dimensions based on variant and size
  let dimensions = { width: 300, height: 300 };
  
  if (size === 'homepage') {
    dimensions = variant === 'square' 
      ? { width: 400, height: 400 } 
      : { width: 400, height: 600 };
  } else {
    dimensions = variant === 'square' 
      ? { width: 300, height: 300 } 
      : { width: 500, height: 750 };
  }
  
  // Build Cloudinary transformations
  let transformations = '';
  
  // Add face focus if enabled
  if (focusOnFace) {
    transformations += 'g_auto:face,';
  }
  
  // Add appropriate cropping based on variant
  transformations += variant === 'square' 
    ? 'c_fill,ar_1:1,' 
    : 'c_fill,ar_2:3,';
  
  // Add quality and format
  transformations += 'q_auto:good,f_auto';

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      {...dimensions}
      transformations={transformations}
      className={cn(
        "rounded-md", // Default rounded corners for player images
        className
      )}
      containerClassName={containerClassName}
    />
  );
};

export default PlayerImage;
