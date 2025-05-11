import { NewsArticle } from '../types';
import { sanityClient } from '@/lib/sanity/client';

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
    
    // Complete the query - Following the pattern that worked for player profiles
    // Direct access to properties rather than projections
    query += ` | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      excerpt,
      mainImage,
      author,
      body,
      "matchId": matchId,
      "relatedMatchId": relatedMatchId,
      featured,
      isFeature,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": profileImage
      },
      gallery
    }`;
    
    console.log('[getNewsData] Fetching with query:', query);
    const results = await sanityClient.fetch(query);
    
    // Log the first result for debugging
    if (results && results.length > 0) {
      console.log('[getNewsData] First result mainImage:', JSON.stringify(results[0].mainImage, null, 2));
    } else {
      console.warn('[getNewsData] No results returned from Sanity query');
    }
    
    // Map results to NewsArticle type
    const newsArticles: NewsArticle[] = (results || []).map((item: any) => {
      // Debug logging for each item
      console.log(`[getNewsData] Processing article: "${item.title}", mainImage:`, 
        item.mainImage ? 'present' : 'missing');
      
      return {
        id: item._id || '',
        title: item.title || 'Untitled Article',
        slug: item.slug || '',
        publishedAt: item.publishedAt || new Date().toISOString(),
        category: item.category || 'clubNews',
        mainImage: item.mainImage || null,
        excerpt: item.excerpt || '',
        body: item.body || '',
        author: item.author || 'Club Reporter',
        isFeature: item.featured || item.isFeature || false,
        matchId: item.matchId || item.relatedMatchId || '',
        relatedPlayers: item.relatedPlayers ? item.relatedPlayers.map((player: any) => ({
          id: player._id,
          name: player.name,
          slug: player.slug,
          profileImage: player.profileImage
        })) : undefined,
        gallery: item.gallery || undefined
      };
    });
    
    return {
      data: newsArticles,
      error: null
    };
  } catch (err) {
    console.error('[getNewsData] Error fetching news:', err);
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
    console.log(`[getNewsArticleBySlug] Fetching article with slug: ${slug}`);
    
    const query = `*[_type == "newsArticle" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      excerpt,
      mainImage,
      author,
      body,
      "matchId": matchId,
      "relatedMatchId": relatedMatchId,
      featured,
      isFeature,
      "relatedPlayers": relatedPlayers[]-> {
        "_id": _id,
        "name": name,
        "slug": slug.current,
        "profileImage": profileImage
      },
      gallery
    }`;
    
    const result = await sanityClient.fetch(query, { slug });
    
    if (!result) {
      console.warn(`[getNewsArticleBySlug] No article found with slug: ${slug}`);
      return {
        data: null,
        error: null
      };
    }
    
    // Debug logging
    console.log(`[getNewsArticleBySlug] Found article: "${result.title}"`);
    console.log(`[getNewsArticleBySlug] mainImage present:`, !!result.mainImage);
    if (result.mainImage) {
      console.log(`[getNewsArticleBySlug] mainImage data:`, JSON.stringify(result.mainImage, null, 2));
    }
    
    // Create NewsArticle from result
    const newsArticle: NewsArticle = {
      id: result._id || '',
      title: result.title || 'Untitled Article',
      slug: result.slug || '',
      publishedAt: result.publishedAt || new Date().toISOString(),
      category: result.category || 'clubNews',
      mainImage: result.mainImage || null,
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
      gallery: result.gallery || undefined
    };
    
    return {
      data: newsArticle,
      error: null
    };
  } catch (err) {
    console.error(`[getNewsArticleBySlug] Error fetching article with slug ${slug}:`, err);
    return {
      data: null,
      error: err instanceof Error ? err : new Error(`Failed to fetch news article with slug ${slug}`)
    };
  }
}
