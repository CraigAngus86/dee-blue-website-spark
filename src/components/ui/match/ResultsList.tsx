
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import LoadingState from '../common/LoadingState';

interface ResultsListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const ResultsList: React.FC<ResultsListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = '2024/25'
}) => {
  const { data: allRecentResults = [], isLoading } = useQuery({
    queryKey: ['matchResults', selectedSeason],
    queryFn: async (): Promise<Match[]> => {
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
          match_report_link,
          home_team:home_team_id(name),
          away_team:away_team_id(name),
          season_competition:season_competition_id(
            season:season_id(name),
            competition:competition_id(name)
          )
        `)
        .eq('status', 'completed')
        .not('home_score', 'is', null)
        .order('match_date', { ascending: false });
      
      // Filter by season if provided
      if (selectedSeason !== 'all') {
        query = query.eq('season_competition.season.name', selectedSeason);
      }
      
      const { data, error } = await query;

      if (error) {
        console.error("Error loading results:", error);
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
        status: 'finished',
        isCompleted: true,
        ticketLink: item.ticket_link,
        matchReportLink: item.match_report_link,
        result: {
          homeScore: item.home_score,
          awayScore: item.away_score
        }
      }));
    }
  });
  
  const filteredResults = useMemo(() => {
    let filtered = allRecentResults;
    
    if (selectedCompetitions.length > 0) {
      filtered = filtered.filter(result => 
        selectedCompetitions.some(comp => result.competition.includes(comp))
      );
    }
    
    if (selectedMonth && selectedMonth !== 'all') {
      filtered = filtered.filter(result => {
        const date = new Date(result.date);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        return monthYear === selectedMonth;
      });
    }
    
    return filtered;
  }, [allRecentResults, selectedCompetitions, selectedMonth]);
  
  // Group results by month
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
  
  const resultsByMonthData = useMemo(() => {
    const sortedResults = [...filteredResults].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return getMatchesByMonth(sortedResults);
  }, [filteredResults]);
  
  const sortedMonths = useMemo(() => {
    return Object.keys(resultsByMonthData).sort((a, b) => {
      const dateA = new Date(resultsByMonthData[a][0]?.date || '');
      const dateB = new Date(resultsByMonthData[b][0]?.date || '');
      return dateB.getTime() - dateA.getTime();
    });
  }, [resultsByMonthData]);

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
              {resultsByMonthData[month].map((match) => (
                <MatchCardNew
                  key={match.id}
                  match={match}
                  variant="past"
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No results found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default React.memo(ResultsList);
