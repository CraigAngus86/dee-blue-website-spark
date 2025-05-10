import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { env } from '@/lib/env';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackSrc?: string;
  // Cloudinary specific
  transformations?: string;
  [key: string]: any;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 'auto',
  format = 'auto',
  objectFit = 'cover',
  className,
  containerClassName,
  priority = false,
  fallbackSrc = '/images/placeholder.jpg',
  transformations = '',
  ...props
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  // Check if this is a Cloudinary image or external URL
  const isCloudinary = src.includes('cloudinary.com') || !src.startsWith('http');
  
  // Format the Cloudinary URL if needed
  let formattedSrc = src;
  if (isCloudinary && !src.includes('cloudinary.com')) {
    // Building Cloudinary URL with transformations
    const baseTransformations = [];
    
    if (quality !== 'auto') baseTransformations.push(`q_${quality}`);
    if (format !== 'auto') baseTransformations.push(`f_${format}`);
    
    // Combine with custom transformations
    const allTransformations = transformations 
      ? `${baseTransformations.join(',')}${baseTransformations.length ? ',' : ''}${transformations}`
      : baseTransformations.join(',');
    
    // Form the Cloudinary URL
    formattedSrc = `https://res.cloudinary.com/${env.cloudinary.cloudName}/image/upload/${allTransformations ? allTransformations + '/' : ''}${src}`;
  }

  // Handle image loading error
  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className={cn(
      "relative overflow-hidden",
      containerClassName
    )}>
      <Image
        src={isError ? fallbackSrc : formattedSrc}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={cn(
          "transition-opacity duration-300",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain", 
          objectFit === 'fill' && "object-fill",
          objectFit === 'none' && "object-none",
          isError && "opacity-70",
          className
        )}
        priority={priority}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
