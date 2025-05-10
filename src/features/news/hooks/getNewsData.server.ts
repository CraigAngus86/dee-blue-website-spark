import { NewsArticle } from '../types';
import { createClient } from 'next-sanity';

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
});

interface GetNewsOptions {
  limit?: number;
  category?: string;
  featured?: boolean;
}

/**
 * Fetch news articles from Sanity
 */
export async function getNewsData(options: GetNewsOptions = {}): Promise<{
  data: NewsArticle[];
  error: Error | null;
}> {
  const { limit = 10, category, featured } = options;
  
  try {
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
      matchId,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": profileImage.asset->url
      },
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
      relatedPlayers: item.relatedPlayers ? item.relatedPlayers.map((player: any) => ({
        id: player._id,
        name: player.name,
        slug: player.slug,
        profileImage: player.profileImage ? {
          url: player.profileImage
        } : undefined
      })) : undefined,
      gallery: item.gallery ? {
        images: item.gallery
      } : undefined
    }));
    
    return {
      data: newsArticles,
      error: null
    };
  } catch (err) {
    console.error('Error fetching news:', err);
    return {
      data: [],
      error: err instanceof Error ? err : new Error('Failed to fetch news')
    };
  }
}

/**
 * Fetch a single news article by slug
 */
export async function getNewsArticleBySlug(slug: string): Promise<{
  data: NewsArticle | null;
  error: Error | null;
}> {
  try {
    const query = `*[_type == "newsArticle" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      excerpt,
      "mainImage": mainImage.asset->url,
      author,
      body,
      matchId,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": profileImage.asset->url
      },
      isFeature,
      "gallery": gallery.images[]{
        "url": asset->url,
        alt,
        caption
      }
    }`;
    
    const result = await client.fetch(query, { slug });
    
    if (!result) {
      return {
        data: null,
        error: null
      };
    }
    
    // Transform result to match our NewsArticle interface
    const newsArticle: NewsArticle = {
      id: result._id,
      title: result.title,
      slug: result.slug,
      publishedAt: result.publishedAt,
      category: result.category,
      mainImage: result.mainImage ? {
        url: result.mainImage,
        alt: result.title
      } : undefined,
      excerpt: result.excerpt,
      body: result.body,
      author: result.author,
      isFeature: result.isFeature,
      matchId: result.matchId,
      relatedPlayers: result.relatedPlayers ? result.relatedPlayers.map((player: any) => ({
        id: player._id,
        name: player.name,
        slug: player.slug,
        profileImage: player.profileImage ? {
          url: player.profileImage
        } : undefined
      })) : undefined,
      gallery: result.gallery ? {
        images: result.gallery
      } : undefined
    };
    
    return {
      data: newsArticle,
      error: null
    };
  } catch (err) {
    console.error(`Error fetching news article with slug ${slug}:`, err);
    return {
      data: null,
      error: err instanceof Error ? err : new Error(`Failed to fetch news article with slug ${slug}`)
    };
  }
}