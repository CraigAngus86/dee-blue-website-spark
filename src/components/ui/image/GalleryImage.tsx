import React from 'react';
import OptimizedImage, { OptimizedImageProps } from './OptimizedImage';
import { cn } from '@/lib/utils';

export interface GalleryImageProps extends Omit<OptimizedImageProps, 'transformations'> {
  variant: 'thumbnail' | 'fullsize';
}

const GalleryImage: React.FC<GalleryImageProps> = ({
  variant = 'thumbnail',
  className,
  containerClassName,
  ...props
}) => {
  // Define dimensions based on variant
  const dimensions = variant === 'thumbnail' 
    ? { width: 300, height: 300 } 
    : { width: 1280, height: 720 };
  
  // Build Cloudinary transformations
  let transformations = '';
  
  // Add appropriate cropping based on variant
  transformations += variant === 'thumbnail' 
    ? 'c_fill,g_auto,ar_1:1,' 
    : 'c_fill,g_auto,ar_16:9,';
  
  // Add quality settings
  transformations += variant === 'thumbnail' 
    ? 'q_auto:good,' 
    : 'q_auto:best,';

  return (
    <OptimizedImage
      {...props}
      {...dimensions}
      transformations={transformations}
      className={cn(
        variant === 'thumbnail' ? "rounded-md" : "rounded-lg",
        className
      )}
      containerClassName={containerClassName}
    />
  );
};

export default GalleryImage;
