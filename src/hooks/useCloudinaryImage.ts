
import { useState, useEffect } from 'react';
import { cloudinary } from '@/lib/cloudinary';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { Quality } from '@cloudinary/url-gen/actions/delivery';

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
        const width = options.width;
        const height = options.height;
        
        // Use the proper Cloudinary SDK methods
        switch(cropMode) {
          case 'fill':
            image = image.resize(Resize.fill(width, height));
            break;
          case 'scale':
            image = image.resize(Resize.scale(width, height));
            break;
          case 'crop':
            image = image.resize(Resize.crop(width, height));
            break;
          case 'thumb':
            image = image.resize(Resize.thumbnail(width, height));
            break;
        }
      }
      
      if (options.quality) {
        image = image.delivery(Quality.level(options.quality));
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
