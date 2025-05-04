
import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

interface MatchTeam {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
}

export interface CrossSystemMatch {
  id: string;
  competitionId?: string;
  competitionName?: string;
  competitionShortName?: string;
  matchDate: string;
  matchTime?: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore?: number;
  awayScore?: number;
  venue?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'postponed' | 'cancelled';
  ticketLink?: string;
  matchReportLink?: string;
  attendance?: number;
  isHighlighted?: boolean;
}

/**
 * Fetches the latest upcoming matches from Supabase
 */
export async function getUpcomingMatches(
  options: ReferenceOptions & {
    limit?: number;
    homeOnly?: boolean;
    competitionId?: string;
  } = {}
): Promise<CrossSystemMatch[]> {
  const { limit = 5, homeOnly = false, competitionId } = options;
  const cacheKey = `supabase:upcoming-matches:${limit}:${homeOnly}:${competitionId || 'all'}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        let query = supabase
          .from('match')
          .select(`
            id, match_date, match_time, venue, ticket_link, status,
            home_team_id, away_team_id, competition_id,
            competitions!match_competition_id_fkey (id, name, short_name),
            home_team:home_team_id (id, name, short_name, logo_url),
            away_team:away_team_id (id, name, logo_url)
          `)
          .eq('status', 'scheduled')
          .order('match_date', { ascending: true })
          .limit(limit);
          
        if (homeOnly) {
          // Fetch the Banks o' Dee team ID
          const { data: bodTeam } = await supabase
            .from('teams')
            .select('id')
            .eq('name', 'Banks o\' Dee')
            .single();
          
          if (bodTeam) {
            query = query.eq('home_team_id', bodTeam.id);
          }
        }
        
        if (competitionId) {
          query = query.eq('competition_id', competitionId);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching upcoming matches:', error);
          return [];
        }
        
        return data.map(match => {
          const competition = match.competitions; 
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          
          return {
            id: match.id,
            competitionId: match.competition_id,
            competitionName: competition?.name,
            competitionShortName: competition?.short_name,
            matchDate: match.match_date,
            matchTime: match.match_time,
            homeTeam: {
              id: homeTeam.id,
              name: homeTeam.name,
              shortName: homeTeam.short_name,
              logoUrl: homeTeam.logo_url
            },
            awayTeam: {
              id: awayTeam.id,
              name: awayTeam.name,
              logoUrl: awayTeam.logo_url
            },
            venue: match.venue,
            status: match.status,
            ticketLink: match.ticket_link
          };
        });
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return [];
      }
    },
    options.skipCache
  );
}

/**
 * Fetches the latest completed matches
 */
export async function getLatestResults(
  options: ReferenceOptions & {
    limit?: number;
  } = {}
): Promise<CrossSystemMatch[]> {
  const { limit = 5 } = options;
  const cacheKey = `supabase:latest-results:${limit}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        const { data, error } = await supabase
          .from('match')
          .select(`
            id, match_date, match_time, venue, home_score, away_score,
            match_report_link, status, attendance, 
            home_team_id, away_team_id, competition_id,
            competitions!match_competition_id_fkey (id, name, short_name),
            home_team:home_team_id (id, name, short_name, logo_url),
            away_team:away_team_id (id, name, logo_url)
          `)
          .eq('status', 'completed')
          .order('match_date', { ascending: false })
          .limit(limit);
          
        if (error) {
          console.error('Error fetching match results:', error);
          return [];
        }
        
        return data.map(match => {
          const competition = match.competitions;
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          
          return {
            id: match.id,
            competitionId: match.competition_id,
            competitionName: competition?.name,
            competitionShortName: competition?.short_name,
            matchDate: match.match_date,
            matchTime: match.match_time,
            homeTeam: {
              id: homeTeam.id,
              name: homeTeam.name,
              shortName: homeTeam.short_name,
              logoUrl: homeTeam.logo_url
            },
            awayTeam: {
              id: awayTeam.id,
              name: awayTeam.name,
              logoUrl: awayTeam.logo_url
            },
            homeScore: match.home_score,
            awayScore: match.away_score,
            venue: match.venue,
            status: match.status,
            matchReportLink: match.match_report_link,
            attendance: match.attendance
          };
        });
      } catch (error) {
        console.error('Error fetching match results:', error);
        return [];
      }
    },
    options.skipCache
  );
}
