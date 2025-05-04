
import { supabase } from '@/lib/supabase/client';
import { sanityClient } from '@/lib/sanity/client';
import { ReferenceOptions } from './types';
import { referenceCache } from './cache';

/**
 * Interface for match details that can be resolved from both systems
 */
export interface CrossSystemMatch {
  id?: string;
  matchDate: string;
  matchTime?: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  competition: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
  status?: string;
  ticketLink?: string;
  matchReportLink?: string;
}

/**
 * Gets upcoming matches from Supabase
 */
export async function getUpcomingMatches(
  options: ReferenceOptions & {
    limit?: number;
    competitionId?: string;
    teamId?: string;
    days?: number;
  } = {}
): Promise<CrossSystemMatch[]> {
  const { limit = 5, competitionId, teamId, days = 30, skipCache = false } = options;
  
  // Create a cache key based on the query parameters
  const cacheKey = `supabase:upcoming-matches:${limit}:${competitionId || 'all'}:${teamId || 'all'}:${days}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        // Get today's date
        const today = new Date();
        
        // Calculate the end date (today + days)
        const endDate = new Date();
        endDate.setDate(today.getDate() + days);
        
        // Format dates for Supabase
        const formattedToday = today.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        
        // Start building the query
        let query = supabase
          .from('match')
          .select(`
            *,
            home_team:home_team_id(id, name, short_name, logo_url),
            away_team:away_team_id(id, name, logo_url),
            competition:competition_id(id, name, short_name)
          `)
          .gte('match_date', formattedToday)
          .lte('match_date', formattedEndDate)
          .order('match_date', { ascending: true });
        
        // Add competition filter if specified
        if (competitionId) {
          query = query.eq('competition_id', competitionId);
        }
        
        // Add team filter if specified
        if (teamId) {
          query = query.or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`);
        }
        
        // Execute the query with limit
        const { data, error } = await query.limit(limit);
        
        if (error) {
          console.error('Error fetching upcoming matches:', error);
          return [];
        }
        
        if (!data || !data.length) {
          return [];
        }
        
        // Map the data to our CrossSystemMatch interface
        return data.map(match => {
          // Extract competition data
          const competition = match.competition as any;
          
          // Extract team data
          const homeTeam = match.home_team as any;
          const awayTeam = match.away_team as any;
          
          return {
            id: match.id,
            matchDate: match.match_date,
            matchTime: match.match_time,
            competition: competition ? competition.name : 'Unknown Competition',
            homeTeam: homeTeam ? homeTeam.name : 'Unknown Team',
            awayTeam: awayTeam ? awayTeam.name : 'Unknown Team',
            homeTeamLogo: homeTeam ? homeTeam.logo_url : undefined,
            awayTeamLogo: awayTeam ? awayTeam.logo_url : undefined,
            venue: match.venue || 'Spain Park',
            status: match.status || 'scheduled',
            ticketLink: match.ticket_link,
          };
        });
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return [];
      }
    },
    skipCache
  );
}

/**
 * Gets recent results from Supabase
 */
export async function getRecentResults(
  options: ReferenceOptions & {
    limit?: number;
    competitionId?: string;
    teamId?: string;
    days?: number;
  } = {}
): Promise<CrossSystemMatch[]> {
  const { limit = 5, competitionId, teamId, days = 30, skipCache = false } = options;
  
  // Create a cache key based on the query parameters
  const cacheKey = `supabase:recent-results:${limit}:${competitionId || 'all'}:${teamId || 'all'}:${days}`;
  
  return referenceCache.getOrSet(
    cacheKey,
    async () => {
      try {
        // Get today's date
        const today = new Date();
        
        // Calculate the start date (today - days)
        const startDate = new Date();
        startDate.setDate(today.getDate() - days);
        
        // Format dates for Supabase
        const formattedToday = today.toISOString().split('T')[0];
        const formattedStartDate = startDate.toISOString().split('T')[0];
        
        // Start building the query
        let query = supabase
          .from('match')
          .select(`
            *,
            home_team:home_team_id(id, name, short_name, logo_url),
            away_team:away_team_id(id, name, logo_url),
            competition:competition_id(id, name, short_name)
          `)
          .lte('match_date', formattedToday)
          .gte('match_date', formattedStartDate)
          .not('home_score', 'is', null)
          .not('away_score', 'is', null)
          .order('match_date', { ascending: false });
        
        // Add competition filter if specified
        if (competitionId) {
          query = query.eq('competition_id', competitionId);
        }
        
        // Add team filter if specified
        if (teamId) {
          query = query.or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`);
        }
        
        // Execute the query with limit
        const { data, error } = await query.limit(limit);
        
        if (error) {
          console.error('Error fetching recent results:', error);
          return [];
        }
        
        if (!data || !data.length) {
          return [];
        }
        
        // Map the data to our CrossSystemMatch interface
        return data.map(match => {
          // Extract competition data
          const competition = match.competition as any;
          
          // Extract team data
          const homeTeam = match.home_team as any;
          const awayTeam = match.away_team as any;
          
          return {
            id: match.id,
            matchDate: match.match_date,
            matchTime: match.match_time,
            competition: competition ? competition.name : 'Unknown Competition',
            homeTeam: homeTeam ? homeTeam.name : 'Unknown Team',
            awayTeam: awayTeam ? awayTeam.name : 'Unknown Team',
            homeTeamLogo: homeTeam ? homeTeam.logo_url : undefined,
            awayTeamLogo: awayTeam ? awayTeam.logo_url : undefined,
            venue: match.venue || 'Spain Park',
            homeScore: match.home_score,
            awayScore: match.away_score,
            status: 'completed',
            matchReportLink: match.match_report_link,
          };
        });
      } catch (error) {
        console.error('Error fetching recent results:', error);
        return [];
      }
    },
    skipCache
  );
}
