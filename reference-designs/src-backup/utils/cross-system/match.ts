/**
 * Match-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { 
  SanityMatchGallery,
  SupabaseMatch,
  ReferenceOptions 
} from './types';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import { resolveSanityDocumentBySupabaseId } from './resolveSanityReference';
import { referenceCache } from './cache';

/**
 * Resolve a match from a Sanity match gallery
 * @param matchGallery Sanity match gallery document
 * @param options Resolution options
 * @returns Referenced match from Supabase
 */
export async function resolveMatchFromGallery(
  matchGallery: SanityMatchGallery | null,
  options: ReferenceOptions = {}
): Promise<SupabaseMatch | null> {
  return resolveSupabaseReference<SupabaseMatch>(matchGallery, 'match', options);
}

/**
 * Resolve a Sanity match gallery from a Supabase match record
 * @param match Supabase match record
 * @param options Resolution options
 * @returns Referenced Sanity match gallery
 */
export async function resolveMatchGalleryFromMatch(
  match: SupabaseMatch | null,
  options: ReferenceOptions = {}
): Promise<SanityMatchGallery | null> {
  if (!match) return null;
  
  // First try to find by sanity_id if present
  if (match.sanity_id) {
    const query = `*[_type == "matchGallery" && _id == $sanityId][0]`;
    const gallery = await sanityClient.fetch(query, { sanityId: match.sanity_id });
    
    if (gallery) return gallery as SanityMatchGallery;
  }
  
  // Otherwise find by supabaseId field
  return resolveSanityDocumentBySupabaseId<SanityMatchGallery>(match.id, 'matchGallery', options);
}

/**
 * Resolve news articles related to a match
 * @param match Supabase match record
 * @param options Resolution options
 * @returns Array of related news articles
 */
export async function resolveNewsArticlesForMatch(
  match: SupabaseMatch | null,
  options: ReferenceOptions = {}
): Promise<any[]> {
  if (!match) return [];
  
  const { skipCache = false } = options;
  const cacheKey = `match:relatedNews:${match.id}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const query = `*[_type == "newsArticle" && relatedMatchId == $matchId]`;
        const articles = await sanityClient.fetch(query, { matchId: match.id });
        
        return articles || [];
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching news articles for match:', error);
    return [];
  }
}

/**
 * Get a match with its associated Sanity content
 * @param matchId Supabase match ID
 * @param options Resolution options
 * @returns Match with related content
 */
export async function getMatchWithContent(
  matchId: string,
  options: ReferenceOptions = {}
): Promise<{ 
  match: SupabaseMatch | null, 
  gallery: SanityMatchGallery | null,
  newsArticles: any[]
}> {
  const { skipCache = false } = options;
  const cacheKey = `match:withContent:${matchId}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: match, error } = await supabase
          .from('match')
          .select('*')
          .eq('id', matchId)
          .single();
          
        if (error || !match) {
          return { match: null, gallery: null, newsArticles: [] };
        }
        
        const typedMatch = match as SupabaseMatch;
        const gallery = await resolveMatchGalleryFromMatch(typedMatch, options);
        const newsArticles = await resolveNewsArticlesForMatch(typedMatch, options);
        
        return { 
          match: typedMatch,
          gallery,
          newsArticles
        };
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching match with content:', error);
    return { match: null, gallery: null, newsArticles: [] };
  }
}
