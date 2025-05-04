
/**
 * Match-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Resolve a match from a Sanity match document
 * @param matchDocument Sanity match document
 * @param options Resolution options
 * @returns Referenced match from Supabase
 */
export async function resolveMatchFromDocument(
  matchDocument: any | null,
  options: ReferenceOptions = {}
): Promise<any | null> {
  if (!matchDocument || !matchDocument.supabaseId) {
    return null;
  }
  
  return resolveSupabaseReference('match', matchDocument.supabaseId, options);
}

/**
 * Resolve a Sanity match document from a Supabase match record
 * @param match Supabase match record
 * @param options Resolution options
 * @returns Referenced Sanity match document
 */
export async function resolveDocumentFromMatch(
  match: any | null,
  options: ReferenceOptions = {}
): Promise<any | null> {
  if (!match || !match.id) return null;
  
  return resolveSanityReference('match', match.id, options);
}

/**
 * Helper function to resolve Supabase references
 */
export async function resolveSupabaseReference<T = any>(
  tableName: string,
  id: string | null | undefined,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!id) return null;
  
  const { skipCache = false } = options;
  const cacheKey = `supabase:${tableName}:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        console.log(`Resolving Supabase reference: ${tableName} with ID ${id}`);
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error(`Error resolving Supabase reference for ${tableName}:${id}:`, error);
          return null;
        }
        
        return data as T;
      } catch (error) {
        console.error(`Exception resolving Supabase reference for ${tableName}:${id}:`, error);
        return null;
      }
    },
    skipCache
  );
}

/**
 * Helper function to resolve Sanity references
 */
export async function resolveSanityReference<T = any>(
  documentType: string,
  id: string | null | undefined,
  options: ReferenceOptions = {}
): Promise<T | null> {
  if (!id) return null;
  
  const { skipCache = false } = options;
  const cacheKey = `sanity:${documentType}:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        console.log(`Resolving Sanity reference: ${documentType} with ID ${id}`);
        
        // Determine if it's a direct _id reference or a field match
        const isDirectId = id.startsWith('drafts.') || id.includes('-');
        
        // Construct appropriate query
        const query = isDirectId
          ? `*[_type == $docType && _id == $id][0]`
          : `*[_type == $docType && supabaseId == $id][0]`;
        
        const params = {
          docType: documentType,
          id: id
        };
        
        const document = await sanityClient.fetch(query, params);
        return document || null;
      } catch (error) {
        console.error(`Error resolving Sanity reference for ${documentType}:${id}:`, error);
        return null;
      }
    },
    skipCache
  );
}

/**
 * Get upcoming matches with extended team and competition data
 * @param limit Number of matches to retrieve
 * @param options Resolution options
 * @returns Array of upcoming matches
 */
export async function getUpcomingMatches(
  limit = 5,
  options: ReferenceOptions = {}
): Promise<any[]> {
  const { skipCache = false } = options;
  const cacheKey = `matches:upcoming:${limit}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        // Get current date in ISO format
        const today = new Date().toISOString().split('T')[0];
        
        const { data: matches, error } = await supabase
          .from("match")
          .select(`
            id, match_date, match_time, venue, status, ticketco_event_id, ticket_link,
            home_team:home_team_id(id, name, short_name, logo_url),
            away_team:away_team_id(id, name, short_name, logo_url),
            competition:competition_id(id, name, short_name, logo_url)
          `)
          .gte("match_date", today)
          .order("match_date", { ascending: true })
          .limit(limit);
          
        if (error || !matches) {
          console.error('Error fetching upcoming matches:', error);
          return [];
        }
        
        return matches;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
}

/**
 * Get recent matches with extended team and competition data
 * @param limit Number of matches to retrieve
 * @param options Resolution options
 * @returns Array of recent matches
 */
export async function getRecentMatches(
  limit = 5,
  options: ReferenceOptions = {}
): Promise<any[]> {
  const { skipCache = false } = options;
  const cacheKey = `matches:recent:${limit}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data: matches, error } = await supabase
          .from("match")
          .select(`
            id, match_date, match_time, venue, status, home_score, away_score, match_report_link,
            home_team:home_team_id(id, name, short_name, logo_url),
            away_team:away_team_id(id, name, short_name, logo_url),
            competition:competition_id(id, name, short_name, logo_url)
          `)
          .eq("status", "completed")
          .order("match_date", { ascending: false })
          .limit(limit);
          
        if (error || !matches) {
          console.error('Error fetching recent matches:', error);
          return [];
        }
        
        return matches;
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    return [];
  }
}
