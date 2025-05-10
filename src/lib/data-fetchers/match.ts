// Simple match data fetcher that follows our new architecture
// Using Supabase as the source of truth for match data

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define the types needed for our data fetcher
interface MatchTeam {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

export interface Match {
  id: string;
  matchDate: string;
  date?: string; // Legacy support
  match_date?: string; // For backward compatibility
  match_time?: string; // For backward compatibility
  competition: string;
  competition_id?: string; // For backward compatibility
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  home?: {
    team: string;
    logo: string;
    score?: number;
  };
  away?: {
    team: string;
    logo: string;
    score?: number;
  };
  report?: string;
  match_report_link?: string; // For backward compatibility
  is_highlighted?: boolean;
  ticket_link?: string;
  hospitality_available?: boolean;
}

/**
 * Fetch upcoming matches from Supabase
 */
export async function getUpcomingMatches(limit = 3): Promise<Match[]> {
  try {
    const { data, error } = await supabase
      .from('match')
      .select(`
        id,
        match_date,
        match_time,
        status,
        home_score,
        away_score,
        venue,
        is_highlighted,
        ticket_link,
        hospitality_available,
        competition_id,
        home_team_id,
        away_team_id
      `)
      .in('status', ['Scheduled', 'Confirmed'])
      .gte('match_date', new Date().toISOString().split('T')[0])
      .order('match_date', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching upcoming matches:', error);
      return [];
    }

    // If we got data, fetch the related team and competition information
    if (data && data.length > 0) {
      // Get unique team IDs and competition IDs
      const homeTeamIds = data.map(m => m.home_team_id).filter(Boolean);
      const awayTeamIds = data.map(m => m.away_team_id).filter(Boolean);
      const teamIds = Array.from(new Set([...homeTeamIds, ...awayTeamIds]));
      const competitionIds = Array.from(new Set(data.map(m => m.competition_id).filter(Boolean)));
      
      // Fetch teams
      const { data: teams, error: teamError } = await supabase
        .from('teams')
        .select('id, name, logo_url')
        .in('id', teamIds);
        
      if (teamError) {
        console.error('Error fetching team data:', teamError);
      }
      
      // Fetch competitions
      const { data: competitions, error: compError } = await supabase
        .from('competitions')
        .select('id, name')
        .in('id', competitionIds);
        
      if (compError) {
        console.error('Error fetching competition data:', compError);
      }
      
      // Create a lookup map for teams and competitions
      const teamMap = new Map(teams?.map(team => [team.id, team]) || []);
      const compMap = new Map(competitions?.map(comp => [comp.id, comp]) || []);
      
      // Transform the data to match the expected format in the homepage
      return data.map(match => ({
        id: match.id,
        matchDate: match.match_date,
        date: match.match_date, // Legacy support
        match_date: match.match_date, // Original property for backward compatibility
        match_time: match.match_time, // Keep original for backward compatibility
        competition: compMap.get(match.competition_id)?.name || 'Unknown',
        competition_id: match.competition_id, // Keep original for backward compatibility
        venue: match.venue || '',
        status: transformStatus(match.status),
        homeTeam: {
          id: match.home_team_id,
          name: teamMap.get(match.home_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.home_team_id)?.logo_url || '',
          score: match.home_score
        },
        awayTeam: {
          id: match.away_team_id,
          name: teamMap.get(match.away_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.away_team_id)?.logo_url || '',
          score: match.away_score
        },
        // Legacy support properties
        home: {
          team: teamMap.get(match.home_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.home_team_id)?.logo_url || '',
          score: match.home_score
        },
        away: {
          team: teamMap.get(match.away_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.away_team_id)?.logo_url || '',
          score: match.away_score
        },
        ticket_link: match.ticket_link,
        is_highlighted: match.is_highlighted,
        hospitality_available: match.hospitality_available
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error in getUpcomingMatches:', error);
    return [];
  }
}

/**
 * Fetch recent matches from Supabase
 */
export async function getRecentMatches(limit = 3): Promise<Match[]> {
  try {
    const { data, error } = await supabase
      .from('match')
      .select(`
        id,
        match_date,
        match_time,
        status,
        home_score,
        away_score,
        venue,
        is_highlighted,
        match_report_link,
        competition_id,
        home_team_id,
        away_team_id
      `)
      .eq('status', 'Completed')
      .lt('match_date', new Date().toISOString().split('T')[0])
      .order('match_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent matches:', error);
      return [];
    }

    // If we got data, fetch the related team and competition information
    if (data && data.length > 0) {
      // Get unique team IDs and competition IDs
      const homeTeamIds = data.map(m => m.home_team_id).filter(Boolean);
      const awayTeamIds = data.map(m => m.away_team_id).filter(Boolean);
      const teamIds = Array.from(new Set([...homeTeamIds, ...awayTeamIds]));
      const competitionIds = Array.from(new Set(data.map(m => m.competition_id).filter(Boolean)));
      
      // Fetch teams
      const { data: teams, error: teamError } = await supabase
        .from('teams')
        .select('id, name, logo_url')
        .in('id', teamIds);
        
      if (teamError) {
        console.error('Error fetching team data:', teamError);
      }
      
      // Fetch competitions
      const { data: competitions, error: compError } = await supabase
        .from('competitions')
        .select('id, name')
        .in('id', competitionIds);
        
      if (compError) {
        console.error('Error fetching competition data:', compError);
      }
      
      // Create a lookup map for teams and competitions
      const teamMap = new Map(teams?.map(team => [team.id, team]) || []);
      const compMap = new Map(competitions?.map(comp => [comp.id, comp]) || []);
      
      // Transform the data to match the expected format in the homepage
      return data.map(match => ({
        id: match.id,
        matchDate: match.match_date,
        date: match.match_date, // Legacy support
        match_date: match.match_date, // Original property for backward compatibility
        match_time: match.match_time, // Keep original for backward compatibility
        competition: compMap.get(match.competition_id)?.name || 'Unknown',
        competition_id: match.competition_id, // Keep original for backward compatibility
        venue: match.venue || '',
        status: transformStatus(match.status),
        homeTeam: {
          id: match.home_team_id,
          name: teamMap.get(match.home_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.home_team_id)?.logo_url || '',
          score: match.home_score
        },
        awayTeam: {
          id: match.away_team_id,
          name: teamMap.get(match.away_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.away_team_id)?.logo_url || '',
          score: match.away_score
        },
        // Legacy support properties
        home: {
          team: teamMap.get(match.home_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.home_team_id)?.logo_url || '',
          score: match.home_score
        },
        away: {
          team: teamMap.get(match.away_team_id)?.name || 'Unknown Team',
          logo: teamMap.get(match.away_team_id)?.logo_url || '',
          score: match.away_score
        },
        report: match.match_report_link,
        match_report_link: match.match_report_link, // Keep original for backward compatibility
        is_highlighted: match.is_highlighted
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error in getRecentMatches:', error);
    return [];
  }
}

/**
 * Helper function to transform Supabase status values to match the expected enum values
 */
function transformStatus(status: string): 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled' {
  switch (status?.toLowerCase()) {
    case 'scheduled':
    case 'confirmed':
      return 'scheduled';
    case 'completed':
    case 'fulltime':
    case 'full time':
      return 'completed';
    case 'live':
    case 'in progress':
      return 'live';
    case 'postponed':
      return 'postponed';
    case 'cancelled':
      return 'cancelled';
    default:
      return 'scheduled';
  }
}
