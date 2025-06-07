"use client";
import { useState, useEffect } from 'react';
import { MatchGallery, GalleryPhoto, CloudinaryImage } from '../types';

export function useGallery(galleryId?: string, matchId?: string) {
  const [gallery, setGallery] = useState<MatchGallery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOptimizedImageUrl = (photo: GalleryPhoto, transform = 'w_400,h_300,c_fill,q_auto') => {
    if (photo.image.public_id) {
      return `https://res.cloudinary.com/dlkpaw2a0/image/upload/${transform}/${photo.image.public_id}.${photo.image.format || 'jpg'}`;
    } else if (photo.image.url) {
      return photo.image.url;
    } else if (photo.image.secure_url) {
      return photo.image.secure_url;
    }
    return '';
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

  return { gallery, loading, error, getOptimizedImageUrl };
}
