
import { useState, useEffect } from 'react';

interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: string;
  quality?: number;
  format?: string;
}

/**
 * Hook to optimize and transform Cloudinary images
 * @param imageUrl The original image URL (can be Cloudinary or other source)
 * @param options Cloudinary transformation options
 * @returns The optimized image URL
 */
export default function useCloudinaryImage(
  imageUrl: string | null,
  options: CloudinaryOptions = {}
): string | null {
  const [optimizedUrl, setOptimizedUrl] = useState<string | null>(imageUrl);

  useEffect(() => {
    if (!imageUrl) {
      setOptimizedUrl(null);
      return;
    }

    // Check if it's already a Cloudinary URL
    const isCloudinaryUrl = imageUrl.includes('res.cloudinary.com');
    
    if (!isCloudinaryUrl) {
      // If not a Cloudinary URL, just return the original
      setOptimizedUrl(imageUrl);
      return;
    }

    try {
      // For Cloudinary URLs, apply transformations
      const urlParts = imageUrl.split('/upload/');
      if (urlParts.length !== 2) {
        setOptimizedUrl(imageUrl);
        return;
      }

      // Build transformation string
      const transformations = [];
      
      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.crop) transformations.push(`c_${options.crop}`);
      if (options.quality) transformations.push(`q_${options.quality}`);
      if (options.format) transformations.push(`f_${options.format}`);
      
      // If no transformations, return original URL
      if (transformations.length === 0) {
        setOptimizedUrl(imageUrl);
        return;
      }
      
      // Create transformed URL
      const transformationString = transformations.join(',');
      const optimizedUrl = `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;
      
      setOptimizedUrl(optimizedUrl);
    } catch (error) {
      console.error('Error optimizing Cloudinary image:', error);
      setOptimizedUrl(imageUrl); // Fallback to original URL
    }
  }, [imageUrl, options.width, options.height, options.crop, options.quality, options.format]);

  return optimizedUrl;
}
