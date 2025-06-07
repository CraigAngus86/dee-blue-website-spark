"use client";
import { useState, useEffect } from 'react';

interface GalleryPhoto {
  _id: string;
  url: string;
  public_id?: string;
  format?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

interface Gallery {
  _id: string;
  title: string;
  matchDate?: string;
  coverImage?: any;
  photos: GalleryPhoto[];
  photographer?: string;
  publishedAt?: string;
  supabaseMatchId?: string;
}

export function useGallery(galleryId?: string, matchId?: string) {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          // Fetch by gallery ID via API route (fixes CORS)
          response = await fetch(`/api/match-gallery/${galleryId}`);
        } else if (matchId) {
          // For match ID, we might need a different endpoint
          // For now, this will fail gracefully
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

  return { gallery, loading, error };
}
