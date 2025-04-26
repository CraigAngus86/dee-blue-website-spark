
import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import LoadingState from '../common/LoadingState';

interface FixturesListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const FixturesList: React.FC<FixturesListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = '2024/25'
}) => {
  const { data: allUpcomingFixtures = [], isLoading } = useQuery({
    queryKey: ['upcomingFixtures', selectedSeason],
    queryFn: async (): Promise<Match[]> => {
      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Build the query
      let query = supabase
        .from('match')
        .select(`
          id,
          match_date,
          match_time,
          venue,
          status,
          is_completed,
          home_score,
          away_score,
          ticket_link,
          home_team:home_team_id(name),
          away_team:away_team_id(name),
          season_competition:season_competition_id(
            season:season_id(name),
            competition:competition_id(name)
          )
        `)
        .gte('match_date', today)
        .not('status', 'eq', 'completed')
        .order('match_date', { ascending: true });
      
      // Filter by season if provided
      if (selectedSeason !== 'all') {
        query = query.eq('season_competition.season.name', selectedSeason);
      }
      
      const { data, error } = await query;

      if (error) {
        console.error("Error loading fixtures:", error);
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
        status: 'upcoming',
        isCompleted: item.is_completed,
        ticketLink: item.ticket_link,
        result: item.home_score !== null ? {
          homeScore: item.home_score,
          awayScore: item.away_score
        } : undefined
      }));
    }
  });
  
  const filteredFixtures = useMemo(() => {
    let filtered = allUpcomingFixtures;
    
    if (selectedCompetitions.length > 0) {
      filtered = filtered.filter(fixture => 
        selectedCompetitions.some(comp => fixture.competition.includes(comp))
      );
    }
    
    if (selectedMonth && selectedMonth !== 'all') {
      filtered = filtered.filter(fixture => {
        const date = new Date(fixture.date);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        return monthYear === selectedMonth;
      });
    }
    
    return filtered;
  }, [allUpcomingFixtures, selectedCompetitions, selectedMonth]);
  
  // Group fixtures by month
  const getMatchesByMonth = (matches: Match[]) => {
    const matchesByMonth: Record<string, Match[]> = {};
    
    matches.forEach((match) => {
      const date = new Date(match.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      
      if (!matchesByMonth[monthYear]) {
        matchesByMonth[monthYear] = [];
      }
      
      matchesByMonth[monthYear].push(match);
    });
    
    return matchesByMonth;
  };
  
  const fixturesByMonthData = useMemo(() => {
    const sortedFixtures = [...filteredFixtures].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    return getMatchesByMonth(sortedFixtures);
  }, [filteredFixtures]);
  
  const sortedMonths = useMemo(() => {
    return Object.keys(fixturesByMonthData).sort((a, b) => {
      const dateA = new Date(fixturesByMonthData[a][0]?.date || '');
      const dateB = new Date(fixturesByMonthData[b][0]?.date || '');
      return dateA.getTime() - dateB.getTime();
    });
  }, [fixturesByMonthData]);

  if (isLoading) {
    return <LoadingState count={2} />;
  }

  return (
    <div className="space-y-8">
      {sortedMonths.length > 0 ? (
        sortedMonths.map((month) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
            <div className="grid gap-4">
              {fixturesByMonthData[month].map((match) => (
                <MatchCardNew
                  key={match.id}
                  match={match}
                  variant="future"
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No upcoming fixtures found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default React.memo(FixturesList);
