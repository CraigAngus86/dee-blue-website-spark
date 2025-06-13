"use client";
import React, { useState, useEffect } from 'react';
import { 
  getCloudinaryImageUrl, 
  getAspectRatioClass, 
  getContentType,
  ImageVariant 
} from '@/lib/cloudinary/imageTransforms';
import { cn } from '@/lib/utils';

interface CloudinaryImageProps {
  image: any;
  variant: ImageVariant;
  alt: string;
  category?: string; // For news articles
  isPlayer?: boolean; // For player images
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  responsive?: boolean; // Enable mobile/desktop different aspects
  onError?: () => void;
}

export default function CloudinaryImage({
  image,
  variant,
  alt,
  category,
  isPlayer = false,
  className,
  containerClassName,
  priority = false,
  responsive = false,
  onError
}: CloudinaryImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (responsive) {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [responsive]);
  
  // Determine content type
  const contentType = getContentType(category, isPlayer);
  
  // Get image URL with transforms
  const imageUrl = getCloudinaryImageUrl(image, { 
    variant, 
    contentType, 
    isMobile 
  });
  
  // Get aspect ratio class
  const aspectClass = getAspectRatioClass(variant, isMobile);
  
  // Handle image error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image load error:', alt, imageUrl);
    setHasError(true);
    if (onError) onError();
    
    // Set a data URL fallback
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
  };
  
  return (
    <div className={cn('relative overflow-hidden', aspectClass, containerClassName)}>
      <img
        src={imageUrl}
        alt={alt}
        className={cn('w-full h-full', className)} // NO object-cover!
        loading={priority ? 'eager' : 'lazy'}
        onError={handleError}
      />
    </div>
  );
}
