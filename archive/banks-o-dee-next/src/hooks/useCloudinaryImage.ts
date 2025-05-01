
import { useState, useEffect } from 'react';
import { transformImage } from '@/lib/cloudinary/transform';

/**
 * Custom hook for loading player profile images with fallbacks
 */
export function usePlayerProfileImage(publicId: string, options: {
  variant?: 'square' | 'featured';
  size?: number;
  name?: string;
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Generate the initial image URL
    try {
      // Default to a sensible configuration
      const defaultOptions = {
        width: options.size || 128,
        height: options.variant === 'featured' ? options.size ? options.size * 1.25 : 160 : options.size || 128,
        crop: 'fill',
        focus: 'face'
      };
      
      // Generate image URL using Cloudinary transform
      const url = transformImage(publicId, defaultOptions);
      setImageUrl(url);
    } catch (error) {
      console.error('Error generating player image URL:', error);
      setHasError(true);
      
      // Generate a fallback URL
      const fallbackName = options.name || 'Player';
      const encodedName = encodeURIComponent(fallbackName);
      setImageUrl(`https://placehold.co/${options.size || 128}/${options.size || 128}/CCCCCC/333333?text=${encodedName}`);
    }
  }, [publicId, options]);

  // Handlers for image load events
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    
    // Generate a fallback URL
    const fallbackName = options.name || 'Player';
    const encodedName = encodeURIComponent(fallbackName);
    setImageUrl(`https://placehold.co/${options.size || 128}/${options.size || 128}/CCCCCC/333333?text=${encodedName}`);
  };

  return { imageUrl, isLoaded, hasError, handleLoad, handleError };
}

/**
 * Custom hook for loading news images with transformations
 */
export function useNewsImage(publicId: string, size: 'thumbnail' | 'full' = 'thumbnail') {
  const [imageUrl, setImageUrl] = useState<string>('');
  
  useEffect(() => {
    try {
      const width = size === 'thumbnail' ? 400 : 1200;
      const height = size === 'thumbnail' ? 225 : 675;
      
      const url = transformImage(publicId, {
        width,
        height,
        crop: 'fill',
        quality: size === 'thumbnail' ? 70 : 80
      });
      setImageUrl(url);
    } catch (error) {
      console.error('Error generating news image URL:', error);
      setImageUrl(`https://placehold.co/${size === 'thumbnail' ? '400x225' : '1200x675'}/CCCCCC/333333?text=News+Image`);
    }
  }, [publicId, size]);
  
  return { imageUrl };
}
