"use client";
import { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { fetchSanityData } from '@/lib/sanity/client';
import { env } from '@/lib/env';

interface UseNewsDataOptions {
  limit?: number;
  category?: string;
  featured?: boolean;
}

export function useNewsData(options: UseNewsDataOptions = {}) {
  const { limit = 10, category, featured } = options;
  
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        
        // Debug environment variables
        console.log('Environment check:', {
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          altProjectId: env.sanity.projectId,
          altDataset: env.sanity.dataset
        });
        
        // Build the query based on options
        let query = '*[_type == "newsArticle"';
        
        // Add category filter if provided
        if (category) {
          query += ` && category == "${category}"`;
        }
        
        // Add featured filter if requested - check both field names
        if (featured) {
          query += ' && (featured == true || isFeature == true)';  // Check both field names
        }
        
        // Complete the query
        query += `] | order(publishedAt desc)[0...${limit}] {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          category,
          excerpt,
          "mainImage": mainImage{
            "url": asset->url,
            "alt": coalesce(alt, "News image")
          },
          author,
          body,
          "matchId": matchId,
          "relatedMatchId": relatedMatchId,  // Check both field names
          featured,
          isFeature,
          "gallery": gallery.images[]{
            "url": asset->url,
            "alt": coalesce(alt, "Image"),
            caption
          }
        }`;
        
        console.log('Fetching with query:', query);
        const results = await fetchSanityData(query);
        console.log('Raw results from Sanity:', results);
        
        if (!results || results.length === 0) {
          console.warn('No results returned from Sanity query');
        }
        
        // Transform results to match our NewsArticle interface with defensive coding
        const newsArticles: NewsArticle[] = (results || []).map((item: any) => {
          console.log('Processing item:', item);
          return {
            id: item._id || '',
            title: item.title || 'Untitled Article',
            slug: item.slug || '',
            publishedAt: item.publishedAt || new Date().toISOString(),
            category: item.category || 'clubNews',
            mainImage: item.mainImage ? {
              url: item.mainImage.url || '',
              alt: item.mainImage.alt || item.title || 'News image'
            } : {
              url: '',
              alt: item.title || 'News image'
            },
            excerpt: item.excerpt || '',
            body: item.body || '',
            author: item.author || 'Club Reporter',
            isFeature: item.featured || item.isFeature || false,  // Try both field names
            matchId: item.matchId || item.relatedMatchId || '',   // Try both field names
            gallery: item.gallery ? {
              images: item.gallery
            } : undefined
          };
        });
        
        console.log('Processed news articles:', newsArticles);
        setNews(newsArticles);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch news'));
        setIsLoading(false);
      }
    }
    
    fetchNews();
  }, [limit, category, featured]);
  
  return {
    data: news,
    isLoading,
    error
  };
}