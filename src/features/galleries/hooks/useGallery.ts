"use client";
import { useState, useEffect } from 'react';
import { MatchGallery, GalleryPhoto, CloudinaryImage } from '../types';

export function useGallery(galleryId?: string, matchId?: string) {
  const [gallery, setGallery] = useState<MatchGallery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optimized transforms for quality + speed balance
  const getOptimizedImageUrl = (image: CloudinaryImage | undefined | null, transform = 'gallery') => {
    if (!image) {
      return '';
    }

    // If no public_id, fall back to direct URLs
    if (!image.public_id) {
      return image.secure_url || image.url || '';
    }

    // Balanced transforms: quality + speed
    const transforms = {
      // Main gallery: High quality, sized for displays, progressive loading
      gallery: 'w_1500,c_limit,q_auto:good,f_auto,fl_progressive',
      // Thumbnail grid: Small and fast (proven working)
      thumbnail: 'w_96,h_96,c_fill,q_auto:good,f_auto',
      // Preload: Slightly smaller for faster preloading
      preload: 'w_1200,c_limit,q_auto:good,f_auto,fl_progressive'
    };

    const transformString = transforms[transform as keyof typeof transforms] || transforms.gallery;

    // Extract version from secure_url if available
    let versionPart = '';
    if (image.secure_url && image.secure_url.includes('/v')) {
      const versionMatch = image.secure_url.match(/\/v(\d+)\//);
      if (versionMatch) {
        versionPart = `/v${versionMatch[1]}`;
      }
    }

    return `https://res.cloudinary.com/dlkpaw2a0/image/upload/${transformString}${versionPart}/${image.public_id}.${image.format || 'jpg'}`;
  };

  // Preload next and previous images for smooth navigation
  const preloadImages = (photos: GalleryPhoto[], currentIndex: number) => {
    if (!photos || photos.length === 0) return;

    // Preload next image
    if (currentIndex < photos.length - 1) {
      const nextImage = new Image();
      nextImage.src = getOptimizedImageUrl(photos[currentIndex + 1].image, 'preload');
    }

    // Preload previous image
    if (currentIndex > 0) {
      const prevImage = new Image();
      prevImage.src = getOptimizedImageUrl(photos[currentIndex - 1].image, 'preload');
    }
  };

  useEffect(() => {
    const fetchGallery = async () => {
      if (!galleryId && !matchId) {
        setGallery(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let response;
        
        if (galleryId) {
          response = await fetch(`/api/match-gallery/${galleryId}`);
        } else if (matchId) {
          throw new Error('Match ID lookup not implemented yet');
        }

        if (!response || !response.ok) {
          throw new Error(`Failed to fetch gallery: ${response?.status || 'Unknown error'}`);
        }

        const galleryData = await response.json();
        setGallery(galleryData);

        // Start preloading first few images immediately
        if (galleryData.photos && galleryData.photos.length > 0) {
          setTimeout(() => {
            preloadImages(galleryData.photos, 0);
          }, 100);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError(err instanceof Error ? err.message : 'Failed to load gallery');
        setGallery(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [galleryId, matchId]);

  return { gallery, loading, error, getOptimizedImageUrl, preloadImages };
}
