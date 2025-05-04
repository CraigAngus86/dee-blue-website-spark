/**
 * Match-specific reference resolution utilities
 */

import { supabase } from '@/integrations/supabase/client';
import { fetchSanity } from '@/lib/sanity';
import { referenceCache } from './cache';
import { SanityDocument, SupabaseRecord, ReferenceOptions } from './types';

// Define types specific to matches
export interface SanityMatch extends SanityDocument {
  _type: 'match';
  title?: string;
  date?: string;
  result?: string;
  homeTeam?: {
    _ref: string;
    _type: 'reference';
  };
  awayTeam?: {
    _ref: string;
    _type: 'reference';
  };
  competition?: {
    _ref: string;
    _type: 'reference';
  };
  supabaseId?: string;
}

export interface SupabaseMatch extends SupabaseRecord {
  season_id: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  match_time?: string;
  venue?: string;
  home_score?: number;
  away_score?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'postponed' | 'cancelled';
  home_scorers?: string[];
  away_scorers?: string[];
  attendance?: number;
  is_highlighted?: boolean;
  match_report_link?: string;
  sanity_id?: string;
}

/**
 * Resolve a match in Supabase from a Sanity match document
 */
export async function resolveMatchSupabaseRecord(
  match: SanityMatch | null,
  options: ReferenceOptions = {}
): Promise<SupabaseMatch | null> {
  if (!match || !match.supabaseId) {
    return null;
  }

  const { supabaseId } = match;
  const cacheKey = `supabase:match:${supabaseId}`;
  const { skipCache = false } = options;

  try {
    return await referenceCache.getOrSet<SupabaseMatch | null>(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from('match')
          .select('*')
          .eq('id', supabaseId)
          .single();

        if (error) {
          console.error(`Error fetching match record:`, error);
          return null;
        }

        return data as SupabaseMatch;
      },
      skipCache
    );
  } catch (error) {
    console.error(`Error resolving Supabase match for Sanity match document:`, error);
    return null;
  }
}

/**
 * Resolve a match in Sanity from a Supabase match record
 */
export async function resolveMatchSanityDocument(
  match: SupabaseMatch | null,
  options: ReferenceOptions = {}
): Promise<SanityMatch | null> {
  if (!match) return null;
  
  // First try to find by sanity_id if present
  if (match.sanity_id) {
    const query = `*[_type == "match" && _id == $sanityId][0]`;
    const sanityMatch = await fetchSanity(query, { sanityId: match.sanity_id });
    
    if (sanityMatch) return sanityMatch as SanityMatch;
  }
  
  // Otherwise find by supabaseId field
  const query = `*[_type == "match" && supabaseId == $supabaseId][0]`;
  const sanityMatch = await fetchSanity(query, { supabaseId: match.id });
  
  return sanityMatch as SanityMatch | null;
}

/**
 * Get upcoming matches from Supabase
 */
export async function getUpcomingMatches(
  limit: number = 5,
  options: ReferenceOptions = {}
): Promise<SupabaseMatch[]> {
  const { skipCache = false } = options;
  const cacheKey = `matches:upcoming:${limit}`;
  
  try {
    return await referenceCache.getOrSet(
      cacheKey,
      async () => {
        const { data, error } = await supabase
          .from('match')
          .select('*')
          .gte('match_date', new Date().toISOString().split('T')[0])
          .order('match_date', { ascending: true })
          .limit(limit);
          
        if (error) {
          console.error('Error fetching upcoming matches:', error);
          return [];
        }
        
        return data as SupabaseMatch[];
      },
      skipCache
    );
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
}
