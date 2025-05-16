import { supabase } from '@/lib/supabase/client';
import { Match, GroupedMatches } from '../types';
import { format, parseISO } from 'date-fns';

export async function getUpcomingMatches(competitionId?: string) {
  const query = supabase
    .from('vw_upcoming_matches')
    .select('*');
    
  if (competitionId) {
    query.eq('competition_id', competitionId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
  
  return data as any[];
}

export async function getLatestResults(competitionId?: string) {
  const query = supabase
    .from('vw_latest_results')
    .select('*');
    
  if (competitionId) {
    query.eq('competition_id', competitionId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching latest results:', error);
    return [];
  }
  
  return data as any[];
}

export async function groupMatchesByMonth(matches: any[]): Promise<GroupedMatches> {
  const grouped: GroupedMatches = {};

  matches.forEach(match => {
    const date = parseISO(match.match_date);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(match);
  });

  return grouped;
}

export async function getCompetitions() {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching competitions:', error);
    return [];
  }
  
  return data;
}

export async function getHeadToHeadStats(team1Id: string, team2Id: string, limit = 5) {
  // Get all matches between these two teams
  const { data, error } = await supabase
    .from('match')
    .select(`
      id, match_date, match_time, venue, status, home_score, away_score, match_report_link,
      home_team:home_team_id(id, name, short_name, logo_url),
      away_team:away_team_id(id, name, short_name, logo_url),
      competition:competition_id(id, name, short_name)
    `)
    .or(`home_team_id.eq.${team1Id},away_team_id.eq.${team1Id}`)
    .or(`home_team_id.eq.${team2Id},away_team_id.eq.${team2Id}`)
    .eq('status', 'completed')
    .order('match_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching head to head stats:', error);
    return null;
  }
  
  // Filter to only include matches between the two teams
  const headToHeadMatches = data.filter(match => 
    (match.home_team.id === team1Id && match.away_team.id === team2Id) || 
    (match.home_team.id === team2Id && match.away_team.id === team1Id)
  );
  
  // Calculate stats
  let team1Wins = 0;
  let team2Wins = 0;
  let draws = 0;
  let team1Goals = 0;
  let team2Goals = 0;
  
  headToHeadMatches.forEach(match => {
    const isTeam1Home = match.home_team.id === team1Id;
    const team1Score = isTeam1Home ? match.home_score : match.away_score;
    const team2Score = isTeam1Home ? match.away_score : match.home_score;
    
    team1Goals += team1Score || 0;
    team2Goals += team2Score || 0;
    
    if (team1Score > team2Score) {
      team1Wins++;
    } else if (team2Score > team1Score) {
      team2Wins++;
    } else {
      draws++;
    }
  });
  
  return {
    totalMatches: headToHeadMatches.length,
    homeTeamWins: team1Wins,
    awayTeamWins: team2Wins,
    draws,
    homeTeamGoals: team1Goals,
    awayTeamGoals: team2Goals,
    lastMatches: headToHeadMatches.slice(0, limit)
  };
}
