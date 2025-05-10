"use client";
import { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { createClient } from 'next-sanity';

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
});

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
        
        // Build the query based on options
        let query = '*[_type == "newsArticle"';
        
        // Add category filter if provided
        if (category) {
          query += ` && category == "${category}"`;
        }
        
        // Add featured filter if requested
        if (featured) {
          query += ' && isFeature == true';
        }
        
        // Complete the query with ordering and limit
        query += `] | order(publishedAt desc)[0...${limit}] {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          category,
          excerpt,
          "mainImage": mainImage.asset->url,
          author,
          body,
          "matchId": relatedMatchId,
          isFeature,
          "gallery": gallery.images[]{
            "url": asset->url,
            alt,
            caption
          }
        }`;
        
        const results = await client.fetch(query);
        
        // Transform results to match our NewsArticle interface
        const newsArticles: NewsArticle[] = results.map((item: any) => ({
          id: item._id,
          title: item.title,
          slug: item.slug,
          publishedAt: item.publishedAt,
          category: item.category,
          mainImage: item.mainImage ? {
            url: item.mainImage,
            alt: item.title
          } : undefined,
          excerpt: item.excerpt,
          body: item.body,
          author: item.author,
          isFeature: item.isFeature,
          matchId: item.matchId,
          gallery: item.gallery ? {
            images: item.gallery
          } : undefined
        }));
        
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
