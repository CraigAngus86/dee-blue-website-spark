
/**
 * Cross-system utility for match data management
 */

import { supabase } from '@/lib/supabase/client'; 
import { fetchSanityData } from '@/lib/sanity/client';
import { referenceCache } from './cache';
import { resolveSupabaseReference } from './resolveSupabaseReference';
import { resolveSanityReference } from './resolveSanityReference';

// Match types
export interface MatchSupabase {
  id: string;
  match_date: string;
  match_time?: string;
  venue?: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  home_team_id: string;
  away_team_id: string;
  competition_id: string;
  home_score?: number;
  away_score?: number;
  ticket_link?: string;
  match_report_link?: string;
  sanity_id?: string;
}

export interface MatchSanity {
  _id: string;
  _type: 'match';
  date: string;
  time?: string;
  venue?: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  homeTeam: {
    _ref: string;
    _type: 'reference';
  };
  awayTeam: {
    _ref: string;
    _type: 'reference';
  };
  competition: {
    _ref: string;
    _type: 'reference';
  };
  homeScore?: number;
  awayScore?: number;
  ticketLink?: string;
  matchReport?: {
    _ref: string;
    _type: 'reference';
  };
  supabaseId?: string;
}

/**
 * Get a match from Supabase by ID
 */
export async function getMatchById(id: string): Promise<MatchSupabase | null> {
  try {
    const { data, error } = await supabase
      .from('match')
      .select(`
        *,
        home_team:teams!match_home_team_id_fkey(*),
        away_team:teams!match_away_team_id_fkey(*),
        competition:competitions!match_competition_id_fkey(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as unknown as MatchSupabase;
  } catch (error) {
    console.error('Error fetching match by ID:', error);
    return null;
  }
}

/**
 * Get a match from Sanity by ID
 */
export async function getMatchByIdFromSanity(id: string): Promise<MatchSanity | null> {
  try {
    const query = `*[_type == "match" && _id == $id][0]`;
    const match = await fetchSanityData(query, { id });
    return match as MatchSanity;
  } catch (error) {
    console.error('Error fetching match from Sanity by ID:', error);
    return null;
  }
}

/**
 * Get a match by either Supabase ID or Sanity ID
 */
export async function getMatchByAnyId(id: string, source?: 'supabase' | 'sanity'): Promise<MatchSupabase | MatchSanity | null> {
  if (source === 'supabase') {
    return getMatchById(id);
  } else if (source === 'sanity') {
    return getMatchByIdFromSanity(id);
  }

  // Try both if source is not specified
  const supabaseMatch = await getMatchById(id);
  if (supabaseMatch) return supabaseMatch;

  return getMatchByIdFromSanity(id);
}

/**
 * Resolve related Sanity match document from a Supabase match record
 */
export async function resolveMatchSanityDocument(
  supabaseMatch: MatchSupabase
): Promise<MatchSanity | null> {
  if (!supabaseMatch || !supabaseMatch.sanity_id) return null;
  
  return resolveSanityReference<MatchSanity>(
    { sanity_id: supabaseMatch.sanity_id },
    'match'
  );
}

/**
 * Resolve related Supabase match record from a Sanity match document
 */
export async function resolveMatchSupabaseRecord(
  sanityMatch: MatchSanity
): Promise<MatchSupabase | null> {
  if (!sanityMatch || !sanityMatch.supabaseId) return null;
  
  return resolveSupabaseReference<MatchSupabase>(
    { _id: sanityMatch._id, _type: 'match', supabaseId: sanityMatch.supabaseId },
    'match'
  );
}
