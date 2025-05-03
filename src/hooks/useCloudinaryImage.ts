
import { useState, useEffect } from 'react';

interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'limit' | 'mfit' | 'pad';
  quality?: number;
  format?: 'auto' | 'webp' | 'png' | 'jpg';
  effect?: string;
}

/**
 * Hook for transforming Cloudinary image URLs
 * @param publicId The Cloudinary public ID of the image
 * @param options Options for image transformation
 * @returns The transformed Cloudinary URL
 */
const useCloudinaryImage = (
  publicId: string | null | undefined,
  options: CloudinaryImageOptions = {}
): string | null => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  
  useEffect(() => {
    if (!publicId) {
      setImageUrl(null);
      return;
    }
    
    // Build transformation string
    const transformations: string[] = [];
    
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);
    if (options.effect) transformations.push(`e_${options.effect}`);
    
    // Default quality if not specified
    if (!options.quality) transformations.push('q_auto');
    
    // Default format if not specified
    if (!options.format) transformations.push('f_auto');
    
    const transformationString = transformations.length > 0 
      ? transformations.join(',') + '/'
      : '';
    
    // Construct the URL
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
    setImageUrl(url);
  }, [publicId, options, cloudName]);
  
  return imageUrl;
};

export default useCloudinaryImage;
