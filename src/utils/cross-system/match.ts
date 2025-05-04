
/**
 * Match-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';
import resolveSupabaseReference from './resolveSupabaseReference';
import resolveSanityReference from './resolveSanityReference';

/**
 * Resolve a match from Sanity match document
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
            home_team:home_team_id(*),
            away_team:away_team_id(*),
            competition:competition_id(*)
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
            home_team:home_team_id(*),
            away_team:away_team_id(*),
            competition:competition_id(*)
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
