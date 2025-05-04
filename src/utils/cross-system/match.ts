
/**
 * Match-specific reference resolution utilities
 */

import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

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
  
  const { skipCache = false } = options;
  const cacheKey = `match:${matchDocument.supabaseId}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('match')
          .select(`
            *,
            home_team_id(*),
            away_team_id(*),
            competition_id(*)
          `)
          .eq('id', matchDocument.supabaseId)
          .single();
          
        if (error || !data) {
          console.error(`Error resolving match ${matchDocument.supabaseId}:`, error);
          return null;
        }
        
        return data;
      } catch (error) {
        console.error(`Error resolving match ${matchDocument.supabaseId}:`, error);
        return null;
      }
    },
    skipCache
  );
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
  
  const { skipCache = false } = options;
  const cacheKey = `matchDocument:${match.id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const query = `*[_type == "match" && supabaseId == $supabaseId][0]`;
        const params = { supabaseId: match.id };
        
        const document = await sanityClient.fetch(query, params);
        
        return document || null;
      } catch (error) {
        console.error(`Error resolving match document for ${match.id}:`, error);
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
            home_team_id(*),
            away_team_id(*),
            competition_id(*)
          `)
          .gte("match_date", today)
          .order("match_date", { ascending: true })
          .limit(limit);
          
        if (error || !matches) {
          console.error('Error fetching upcoming matches:', error);
          return [];
        }
        
        return matches.map(match => {
          return {
            id: match.id,
            match_date: match.match_date,
            match_time: match.match_time,
            venue: match.venue,
            status: match.status,
            ticket_link: match.ticket_link,
            home_team: match.home_team_id,
            away_team: match.away_team_id,
            competition: match.competition_id
          };
        });
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
            home_team_id(*),
            away_team_id(*),
            competition_id(*)
          `)
          .eq("status", "completed")
          .order("match_date", { ascending: false })
          .limit(limit);
          
        if (error || !matches) {
          console.error('Error fetching recent matches:', error);
          return [];
        }
        
        return matches.map(match => {
          return {
            id: match.id,
            match_date: match.match_date,
            match_time: match.match_time,
            venue: match.venue,
            status: match.status,
            home_score: match.home_score,
            away_score: match.away_score,
            match_report_link: match.match_report_link,
            home_team: match.home_team_id,
            away_team: match.away_team_id,
            competition: match.competition_id
          };
        });
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    return [];
  }
}
