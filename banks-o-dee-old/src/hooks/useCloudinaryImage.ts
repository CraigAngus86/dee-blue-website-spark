
import { useMemo, useState } from 'react';
import {
  transformImage,
  playerProfileSquare,
  playerProfileFeatured,
  playerAction,
  matchGalleryThumb,
  matchFeatured,
  newsFeatured,
  newsThumbnail,
  sponsorLogo,
  stadiumPanoramic,
  stadiumFacility,
  heroBanner,
  cardImage,
  createSilhouettePlaceholder,
  TransformOptions
} from '@/lib/cloudinary/transform';

/**
 * Hook for working with Cloudinary images in React components
 * 
 * @param publicId Cloudinary public ID (with folder path)
 * @param options Image transformation options
 * @returns The generated image URL and loading state
 */
export function useCloudinaryImage(publicId: string | undefined, options: TransformOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate the transformed image URL
  const imageUrl = useMemo(() => {
    if (!publicId) return '';
    try {
      return transformImage(publicId, options);
    } catch (error) {
      console.error('Error transforming Cloudinary image:', error);
      setHasError(true);
      return '';
    }
  }, [publicId, options]);

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleError = () => {
    console.error(`Failed to load Cloudinary image: ${publicId}`);
    setHasError(true);
  };

  return {
    imageUrl,
    isLoaded,
    hasError,
    handleLoad,
    handleError,
  };
}

/**
 * Hook for generating responsive image srcSet with Cloudinary
 * 
 * @param publicId Cloudinary public ID (with folder path)
 * @param widths Array of widths for the srcSet
 * @param options Additional transformation options
 * @returns The generated srcSet and sizes attributes
 */
export function useCloudinarySrcSet(
  publicId: string | undefined,
  widths: number[] = [640, 768, 1024, 1280, 1536, 1920],
  options: Omit<TransformOptions, 'width'> = {}
) {
  // Generate srcSet
  const srcSet = useMemo(() => {
    if (!publicId) return '';
    
    try {
      return widths
        .map(width => {
          const url = transformImage(publicId, { ...options, width });
          return `${url} ${width}w`;
        })
        .join(', ');
    } catch (error) {
      console.error('Error generating Cloudinary srcSet:', error);
      return '';
    }
  }, [publicId, widths, options]);

  // Default sizes attribute
  const sizes = useMemo(() => {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }, []);

  return {
    srcSet,
    sizes,
  };
}

/**
 * Hook for optimized player profile images
 * @param publicId Cloudinary public ID (with folder path)
 * @param options Additional options
 */
export function usePlayerProfileImage(publicId: string | undefined, options: {
  variant?: 'square' | 'featured';
  size?: number;
  name?: string;
  deviceSize?: 'sm' | 'md' | 'lg' | 'xl';
} = {}) {
  const { variant = 'square', size = 300, name, deviceSize } = options;
  
  const imageUrl = useMemo(() => {
    if (!publicId) {
      return createSilhouettePlaceholder(
        size, 
        variant === 'featured' ? Math.round(size * (4/3)) : size,
        name || ''  // Fixing argument type issue
      );
    }
    
    try {
      // Fixed function calls to match proper signatures
      if (variant === 'featured') {
        return playerProfileFeatured(publicId);
      }
      return playerProfileSquare(publicId);
    } catch (error) {
      console.error('Error generating player profile image:', error);
      return createSilhouettePlaceholder(
        size, 
        variant === 'featured' ? Math.round(size * (4/3)) : size,
        name || ''  // Fixing argument type issue
      );
    }
  }, [publicId, variant, size, name, deviceSize]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    console.error(`Failed to load player image: ${publicId}`);
    setHasError(true);
  };

  return {
    imageUrl,
    isLoaded,
    hasError,
    handleLoad,
    handleError,
  };
}
