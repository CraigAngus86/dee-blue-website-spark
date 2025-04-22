
import React, { useEffect, useState } from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { getResults, getMatchesByMonth } from '@/mock-data/fixturesData';

interface ResultsListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const ResultsList: React.FC<ResultsListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = '',
  selectedSeason = ''
}) => {
  // Force a refresh of the data when props change
  const [allRecentResults, setAllRecentResults] = useState<Match[]>([]);
  
  useEffect(() => {
    // Re-fetch data when the component renders or filters change
    const results = getResults();
    console.log("Loaded past results:", results.length);
    setAllRecentResults(results);
  }, [selectedCompetitions, selectedMonth, selectedSeason]);
  
  // Apply filters
  let filteredResults = allRecentResults;
  
  if (selectedCompetitions.length > 0) {
    filteredResults = filteredResults.filter(result => 
      selectedCompetitions.some(comp => result.competition.includes(comp))
    );
  }
  
  if (selectedMonth && selectedMonth !== 'all') {
    filteredResults = filteredResults.filter(result => {
      const date = new Date(result.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return monthYear === selectedMonth;
    });
  }
  
  const resultsByMonth = getMatchesByMonth(filteredResults);
  const sortedMonths = Object.keys(resultsByMonth).sort((a, b) => {
    // Sort months in descending order (newest first)
    const dateA = new Date(resultsByMonth[a][0]?.date || '');
    const dateB = new Date(resultsByMonth[b][0]?.date || '');
    return dateB.getTime() - dateA.getTime();
  });

  console.log("Results rendered:", { 
    total: allRecentResults.length, 
    filtered: filteredResults.length,
    months: sortedMonths,
    monthsData: Object.keys(resultsByMonth).map(month => ({
      month,
      count: resultsByMonth[month].length
    }))
  });

  return (
    <div className="space-y-8">
      {sortedMonths.length > 0 ? (
        sortedMonths.map((month) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
            <div className="grid gap-4">
              {resultsByMonth[month].map((match) => (
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

export default ResultsList;
