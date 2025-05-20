"use client";

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity/client';
import { MatchGallery } from '../types';

/**
 * Hook to fetch gallery data from Sanity CMS
 */
export function useGallery(galleryId?: string, matchId?: string) {
  const [gallery, setGallery] = useState<MatchGallery | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!galleryId && !matchId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        let query = '';
        let params = {};
        
        if (galleryId) {
          // Fetch by gallery ID if provided
          query = `*[_type == "matchGallery" && _id == $galleryId][0] {
            _id,
            title,
            description,
            supabaseId,
            matchDate,
            coverImage,
            galleryImages,
            photographer,
            publishedAt
          }`;
          params = { galleryId };
        } else if (matchId) {
          // Fetch by match ID if gallery ID not provided
          query = `*[_type == "matchGallery" && supabaseId == $matchId][0] {
            _id,
            title,
            description,
            supabaseId,
            matchDate,
            coverImage,
            galleryImages,
            photographer,
            publishedAt
          }`;
          params = { matchId };
        }
        
        const data = await sanityClient.fetch(query, params);
        
        if (data) {
          // Transform galleryImages to photos to match the expected interface
          // For each galleryImage, create a photo object with the image property
          const photos = (data.galleryImages || []).map((image: any) => ({
            image: image,
            caption: '',
            category: undefined
          }));
          
          const transformedData = {
            ...data,
            photos: photos
          };
          setGallery(transformedData);
        } else {
          setError(new Error('Gallery not found'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred fetching the gallery'));
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGallery();
  }, [galleryId, matchId]);
  
  // Helper function to get optimized Cloudinary URL
  const getOptimizedImageUrl = (
    image: any, 
    type: 'thumbnail' | 'viewer' | 'cover' = 'viewer'
  ) => {
    if (!image) return '';
    
    // For Cloudinary assets from Sanity
    if (image._type === 'cloudinary.asset' || image._type === 'image') {
      if (image.public_id) {
        const publicId = image.public_id;
        const format = image.format || 'jpg';
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dlkpaw2a0';
        const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
        
        // Different transformations based on usage
        let transformation = '';
        
        if (type === 'thumbnail') {
          // Larger thumbnails with face detection and good quality
          transformation = 'c_fill,g_auto:faces,ar_1:1,w_250,h_250,q_auto:good,f_auto,dl_2';
        } else if (type === 'viewer') {
          // Main viewer - preserve aspect ratio, good quality, progressive loading
          // Responsive sizing and dpr_auto for device-appropriate resolution
          transformation = 'c_limit,w_1200,h_800,q_auto:good,f_auto,fl_progressive,dl_5';
        } else if (type === 'cover') {
          // Cover images - 16:9 ratio for consistency with news
          transformation = 'c_fill,g_auto:faces,ar_16:9,w_800,q_auto:good,f_auto';
        }
        
        return `${baseUrl}/${transformation}/${publicId}.${format}`;
      } else if (image.secure_url) {
        return image.secure_url;
      }
    } 
    // Handle regular URLs
    else if (image.url) {
      return image.url;
    }
    // Handle direct string URLs
    else if (typeof image === 'string') {
      return image;
    }
    
    return '';
  };
  
  return {
    gallery,
    loading,
    error,
    getOptimizedImageUrl
  };
}
