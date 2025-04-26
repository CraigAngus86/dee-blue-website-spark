
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Match } from '@/types/match';

export const useMatchData = () => {
  const { data: upcomingFixtures = [], isLoading, error } = useQuery({
    queryKey: ['upcomingFixtures'],
    queryFn: async (): Promise<Match[]> => {
      // Get current date in YYYY-MM-DD format for the query
      const today = new Date().toISOString().split('T')[0];
      
      // Get current season ID
      const { data: currentSeason } = await supabase
        .from('season')
        .select('id')
        .eq('is_current_season', true)
        .single();
      
      if (!currentSeason) {
        throw new Error('Current season not found');
      }
      
      // Get matches for current season
      const { data, error } = await supabase
        .from('match')
        .select(`
          id,
          match_date,
          match_time,
          venue,
          status,
          home_score,
          away_score,
          ticket_link,
          is_completed,
          home_team:home_team_id(name),
          away_team:away_team_id(name),
          season_competition:season_competition_id(
            competition:competition_id(name)
          )
        `)
        .gte('match_date', today)
        .in('status', ['scheduled', 'postponed'])
        .order('match_date', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Error fetching fixtures:', error);
        throw error;
      }
      
      // Transform the data to match our expected format
      return data.map(item => ({
        id: item.id,
        date: item.match_date,
        time: item.match_time,
        competition: item.season_competition.competition.name,
        homeTeam: item.home_team.name,
        awayTeam: item.away_team.name,
        venue: item.venue,
        status: item.status,
        isCompleted: item.is_completed,
        ticketLink: item.ticket_link,
        result: item.home_score !== null ? {
          homeScore: item.home_score,
          awayScore: item.away_score
        } : undefined
      }));
    }
  });
  
  return {
    upcomingFixtures,
    isLoading,
    error
  };
};
