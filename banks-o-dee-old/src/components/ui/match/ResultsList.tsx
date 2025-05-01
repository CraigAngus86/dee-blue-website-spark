import React, { useState, useMemo } from 'react';
import { Match } from '@/types/match';
import { getResults } from '@/mock-data/fixturesData';
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
  const [isLoading, setIsLoading] = useState(true);
  const [allRecentResults, setAllRecentResults] = useState<Match[]>([]);
  
  React.useEffect(() => {
    const loadResults = async () => {
      // Pass the selected season to get the correct results
      const results = await getResults();
      setAllRecentResults(results);
      setIsLoading(false);
    };
    
    loadResults();
  }, [selectedSeason]);

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
