
import React, { useEffect, useState, useMemo } from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { getResults, getMatchesByMonth } from '@/mock-data/fixturesData';
import LoadingState from '../common/LoadingState';

interface ResultsListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const ResultsList: React.FC<ResultsListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = ''
}) => {
  const [allRecentResults, setAllRecentResults] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Re-fetch data when the component renders or filters change
    const loadResults = () => {
      setIsLoading(true);
      try {
        const results = getResults();
        setAllRecentResults(results);
      } catch (error) {
        console.error("Error loading results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResults();
  }, [selectedCompetitions, selectedMonth, selectedSeason]);
  
  // Apply filters using useMemo for performance
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
  
  // Get results by month with useMemo for performance
  const resultsByMonthData = useMemo(() => {
    // Sort results by date before grouping by month
    const sortedResults = [...filteredResults].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Note: descending for results
    });
    
    return getMatchesByMonth(sortedResults);
  }, [filteredResults]);
  
  // Sort months for display
  const sortedMonths = useMemo(() => {
    return Object.keys(resultsByMonthData).sort((a, b) => {
      // Sort months in descending order (newest first)
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
