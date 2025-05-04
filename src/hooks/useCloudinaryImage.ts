
import { useState, useEffect } from 'react';
import { cloudinary } from '@/lib/cloudinary';

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'crop' | 'thumb';
  quality?: string;
}

/**
 * Custom hook to generate a Cloudinary URL with transformations
 * 
 * @param publicId Cloudinary public ID of the image
 * @param options Transformation options
 * @returns The transformed URL and loading state
 */
export const useCloudinaryImage = (
  publicId: string | null | undefined,
  options: CloudinaryImageOptions = {}
) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!publicId) {
      setLoading(false);
      setImageUrl('');
      return;
    }
    
    try {
      // Create a Cloudinary URL with the provided options
      let image = cloudinary.image(publicId);
      
      // Apply transformations based on provided options
      if (options.width || options.height) {
        const cropMode = options.crop || 'fill';
        const widthValue = options.width ? options.width.toString() : 'auto';
        const heightValue = options.height ? options.height.toString() : 'auto';
        
        image = image.resize(`${cropMode}_${widthValue}_${heightValue}`);
      }
      
      if (options.quality) {
        image = image.quality(options.quality);
      }
      
      // Generate the URL
      const url = image.toURL();
      setImageUrl(url);
    } catch (err) {
      console.error('Error generating Cloudinary URL:', err);
      setError(err instanceof Error ? err : new Error('Unknown error generating URL'));
    } finally {
      setLoading(false);
    }
  }, [publicId, options.width, options.height, options.crop, options.quality]);
  
  return { imageUrl, loading, error };
};
