
import { supabase } from '@/lib/supabase/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Interface for match details that can be resolved from both systems
 */
export interface CrossSystemMatch {
  id?: string | number;
  sanityId?: string;
  supabaseId?: number;
  home?: string;
  away?: string;
  homeTeam?: string;
  awayTeam?: string;
  date?: string;
  time?: string;
  venue?: string;
  competition?: string;
  status?: string;
  result?: {
    homeScore?: number;
    awayScore?: number;
    matchReportLink?: string | null;
  };
  ticketLink?: string | null;
}

/**
 * Resolves a match reference from Supabase
 */
export async function resolveSupabaseMatch(
  id: number | string | null | undefined,
  options: ReferenceOptions = {}
): Promise<CrossSystemMatch | null> {
  if (!id) return null;
  
  const cacheKey = `supabase:match:${id}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('match')
          .select(`
            id, match_date, match_time, venue, status, home_score, away_score, 
            match_report_link, ticket_link,
            home_team_id:teams!match_home_team_id_fkey(id, name, logo_url),
            away_team_id:teams!match_away_team_id_fkey(id, name, logo_url),
            competitions!match_competition_id_fkey(id, name, short_name, logo_url)
          `)
          .eq('id', id)
          .single();
          
        if (error) {
          console.error(`Error resolving Supabase match ${id}:`, error);
          return null;
        }
        
        if (!data) {
          return null;
        }
        
        return {
          id: data.id,
          supabaseId: data.id,
          home: data.home_team_id?.name,
          away: data.away_team_id?.name,
          homeTeam: data.home_team_id?.name,
          awayTeam: data.away_team_id?.name,
          date: data.match_date,
          time: data.match_time,
          venue: data.venue,
          competition: data.competitions?.name,
          status: data.status,
          result: data.home_score !== null && data.away_score !== null
            ? {
                homeScore: data.home_score,
                awayScore: data.away_score,
                matchReportLink: data.match_report_link
              }
            : undefined,
          ticketLink: data.ticket_link
        };
      } catch (error) {
        console.error(`Error resolving Supabase match ${id}:`, error);
        return null;
      }
    },
    options.skipCache
  );
}

/**
 * Get upcoming matches from Supabase, sorted by date
 */
export async function getUpcomingMatches(
  limit = 5,
  options: ReferenceOptions = {}
): Promise<CrossSystemMatch[]> {
  const cacheKey = `supabase:upcoming-matches:${limit}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('match')
          .select(`
            id, match_date, match_time, venue, status, ticket_link,
            home_team_id:teams!match_home_team_id_fkey(id, name, logo_url),
            away_team_id:teams!match_away_team_id_fkey(id, name, logo_url),
            competitions!match_competition_id_fkey(id, name, short_name, logo_url)
          `)
          .gte('match_date', today)
          .order('match_date', { ascending: true })
          .limit(limit);
          
        if (error) {
          console.error('Error fetching upcoming matches:', error);
          return [];
        }
        
        if (!data || !data.length) {
          return [];
        }
        
        return data.map(match => ({
          id: match.id,
          supabaseId: match.id,
          home: match.home_team_id?.name,
          away: match.away_team_id?.name,
          homeTeam: match.home_team_id?.name,
          awayTeam: match.away_team_id?.name,
          date: match.match_date,
          time: match.match_time,
          venue: match.venue,
          competition: match.competitions?.name,
          status: match.status,
          ticketLink: match.ticket_link
        }));
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return [];
      }
    },
    options.skipCache
  );
}
