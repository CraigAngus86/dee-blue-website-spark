import React from 'react';
import OptimizedImage, { OptimizedImageProps } from './OptimizedImage';
import { cn } from '@/lib/utils';

export interface PlayerImageProps extends Omit<OptimizedImageProps, 'transformations'> {
  variant?: 'square' | 'portrait';
  removeBackground?: boolean;
  focusOnFace?: boolean;
}

const PlayerImage: React.FC<PlayerImageProps> = ({
  variant = 'square',
  removeBackground = true,
  focusOnFace = true,
  className,
  containerClassName,
  ...props
}) => {
  // Define dimensions based on variant
  const dimensions = variant === 'square' 
    ? { width: 300, height: 300 } 
    : { width: 500, height: 750 };
  
  // Build Cloudinary transformations
  let transformations = '';
  
  if (removeBackground) {
    transformations += 'e_background_removal,';
  }
  
  if (focusOnFace) {
    transformations += 'g_face,';
  }
  
  // Add appropriate cropping based on variant
  transformations += variant === 'square' 
    ? 'c_fill,ar_1:1,' 
    : 'c_fill,ar_2:3,';

  return (
    <OptimizedImage
      {...props}
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
