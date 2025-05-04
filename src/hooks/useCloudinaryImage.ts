
"use client";

import { useMemo } from 'react';

interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'limit' | 'fit' | 'scale' | 'thumb' | 'crop';
  gravity?: 'auto' | 'face' | 'faces' | 'center' | 'north' | 'south' | 'east' | 'west';
  quality?: number;
  format?: 'auto' | 'webp' | 'png' | 'jpg' | 'gif';
  effect?: string;
  background?: string;
  secure?: boolean;
}

/**
 * Custom hook for generating optimized Cloudinary image URLs
 * @param imageUrl Original image URL or Cloudinary public ID
 * @param options Transformation options
 */
function useCloudinaryImage(
  imageUrl: string | null,
  options: CloudinaryTransformOptions = {}
): string | null {
  return useMemo(() => {
    if (!imageUrl) return null;

    // Check if already a Cloudinary URL
    const isCloudinaryUrl = imageUrl.includes('res.cloudinary.com');
    
    // If not a Cloudinary URL, return the original
    if (!isCloudinaryUrl) return imageUrl;

    try {
      // Parse the URL and extract components
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      
      // Default transformations
      const defaultOptions: CloudinaryTransformOptions = {
        quality: 'auto',
        format: 'auto',
        ...options
      };
      
      // Build the transformation string
      const transformations = [];
      
      if (defaultOptions.width || defaultOptions.height) {
        const dimensions = [];
        if (defaultOptions.width) dimensions.push(`w_${defaultOptions.width}`);
        if (defaultOptions.height) dimensions.push(`h_${defaultOptions.height}`);
        if (defaultOptions.crop) dimensions.push(`c_${defaultOptions.crop}`);
        if (defaultOptions.gravity) dimensions.push(`g_${defaultOptions.gravity}`);
        transformations.push(dimensions.join(','));
      }
      
      if (defaultOptions.quality) {
        transformations.push(`q_${defaultOptions.quality}`);
      }
      
      if (defaultOptions.format) {
        transformations.push(`f_${defaultOptions.format}`);
      }
      
      if (defaultOptions.effect) {
        transformations.push(`e_${defaultOptions.effect}`);
      }
      
      if (defaultOptions.background) {
        transformations.push(`b_${defaultOptions.background}`);
      }
      
      // Find where to insert the transformations in the URL path
      const insertIndex = pathParts.findIndex(part => part === 'upload') + 1;
      
      if (insertIndex > 0 && transformations.length > 0) {
        pathParts.splice(insertIndex, 0, transformations.join(','));
      }
      
      // Rebuild the URL
      url.pathname = pathParts.join('/');
      return url.toString();
    } catch (error) {
      console.error('Error transforming Cloudinary URL:', error);
      return imageUrl;
    }
  }, [imageUrl, options]);
}

export default useCloudinaryImage;
