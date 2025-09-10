"use client";
import { useState, useEffect } from 'react';
import { MatchGallery, GalleryPhoto, CloudinaryImage } from '../types';

export function useGallery(galleryId?: string, matchId?: string) {
  const [gallery, setGallery] = useState<MatchGallery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optimized transforms for quality + speed balance
  const getOptimizedImageUrl = (image: CloudinaryImage | undefined | null, transform = 'gallery') => {
    if (!image) return '';

    if (!image.public_id) return image.secure_url || image.url || '';

    const transforms = {
      gallery: 'w_1500,c_limit,q_auto:good,f_auto,fl_progressive',
      thumbnail: 'w_96,h_96,c_fill,q_auto:good,f_auto',
      preload: 'w_1200,c_limit,q_auto:good,f_auto,fl_progressive'
    };

    const transformString = transforms[transform as keyof typeof transforms] || transforms.gallery;

    let versionPart = '';
    if (image.secure_url && image.secure_url.includes('/v')) {
      const versionMatch = image.secure_url.match(/\/v(\d+)\//);
      if (versionMatch) versionPart = `/v${versionMatch[1]}`;
    }

    return `https://res.cloudinary.com/dlkpaw2a0/image/upload/${transformString}${versionPart}/${image.public_id}.${image.format || 'jpg'}`;
  };

  // Preload the next 2 images for smoother navigation
  const preloadImages = (photos: GalleryPhoto[], currentIndex: number) => {
    if (!photos || photos.length === 0) return;

    for (let offset = 1; offset <= 2; offset++) {
      const nextIndex = currentIndex + offset;
      if (nextIndex < photos.length) {
        const img = new Image();
        img.src = getOptimizedImageUrl(photos[nextIndex].image, 'preload');
      }
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

        if (galleryId) response = await fetch(`/api/match-gallery/${galleryId}`);
        else if (matchId) throw new Error('Match ID lookup not implemented yet');

        if (!response?.ok) throw new Error(`Failed to fetch gallery: ${response?.status || 'Unknown error'}`);

        const galleryData = await response.json();
        setGallery(galleryData);

        // Preload first 3 images after a tiny delay
        if (galleryData.photos?.length) {
          setTimeout(() => preloadImages(galleryData.photos, 0), 100);
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
