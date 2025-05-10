import { NewsArticle } from '../types';
import { fetchSanityData } from '@/lib/sanity/client';
import { env } from '@/lib/env';

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
  const { limit = 100, category, featured } = options;
  
  try {
    // Debug environment variables
    console.log('Server Environment check:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      altProjectId: env.sanity.projectId,
      altDataset: env.sanity.dataset
    });
    
    // Build the query based on options - now excluding drafts
    let query = '*[_type == "newsArticle" && !(_id in path("drafts.**"))]';
    
    // Add category filter if provided
    if (category) {
      query += ` && category == "${category}"`;
    }
    
    // Add featured filter if requested - check both field names
    if (featured) {
      query += ' && (featured == true || isFeature == true)';  // Check both field names
    }
    
    // Complete the query
    query += ` | order(publishedAt desc)[0...${limit}] {
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
      body[] {
        ...,
        "asset": asset->
      },
      "matchId": matchId,
      "relatedMatchId": relatedMatchId,  // Check both field names
      featured,
      isFeature,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": {
          "url": profileImage.asset->url
        }
      },
      "gallery": gallery.images[]{
        "url": asset->url,
        "alt": coalesce(alt, "Image"),
        caption
      }
    }`;
    
    // Add detailed Sanity config logging
    console.log('DETAILED SANITY CONFIG:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      query: query.substring(0, 100) + '...' // Just show the start of the query
    });
    
    console.log('Server fetching with query:', query);
    const results = await fetchSanityData(query);
    console.log('Server raw results count:', results?.length || 0);
    
    if (!results || results.length === 0) {
      console.warn('No results returned from Sanity query on server');
    }
    
    // Transform results to match our NewsArticle interface with defensive coding
    const newsArticles: NewsArticle[] = (results || []).map((item: any) => {
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
        relatedPlayers: item.relatedPlayers ? item.relatedPlayers.map((player: any) => ({
          id: player._id,
          name: player.name,
          slug: player.slug,
          profileImage: player.profileImage
        })) : undefined,
        gallery: item.gallery ? {
          images: item.gallery
        } : undefined
      };
    });
    
    console.log('Server processed news articles count:', newsArticles.length);
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
    const query = `*[_type == "newsArticle" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
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
      body[] {
        ...,
        "asset": asset->
      },
      "matchId": matchId,
      "relatedMatchId": relatedMatchId,
      featured,
      isFeature,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": {
          "url": profileImage.asset->url
        }
      },
      "gallery": gallery.images[]{
        "url": asset->url,
        "alt": coalesce(alt, "Image"),
        caption
      }
    }`;
    
    const result = await fetchSanityData(query, { slug });
    
    if (!result) {
      return {
        data: null,
        error: null
      };
    }
    
    // Transform result to match our NewsArticle interface
    const newsArticle: NewsArticle = {
      id: result._id || '',
      title: result.title || 'Untitled Article',
      slug: result.slug || '',
      publishedAt: result.publishedAt || new Date().toISOString(),
      category: result.category || 'clubNews',
      mainImage: result.mainImage ? {
        url: result.mainImage.url || '',
        alt: result.mainImage.alt || result.title || 'News image'
      } : {
        url: '',
        alt: result.title || 'News image'
      },
      excerpt: result.excerpt || '',
      body: result.body || '',
      author: result.author || 'Club Reporter',
      isFeature: result.featured || result.isFeature || false,
      matchId: result.matchId || result.relatedMatchId || '',
      relatedPlayers: result.relatedPlayers ? result.relatedPlayers.map((player: any) => ({
        id: player._id,
        name: player.name,
        slug: player.slug,
        profileImage: player.profileImage
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