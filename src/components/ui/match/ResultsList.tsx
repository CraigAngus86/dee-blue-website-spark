
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
    console.log("ALL RESULTS:", results.length);
    console.log("Date range:", results.map(f => f.date).sort());
    console.log("Unique months:", [...new Set(results.map(f => {
      const date = new Date(f.date);
      return `${date.getMonth()+1}/${date.getFullYear()}`;
    }))]);
    
    // Log each result's status to debug completion status issues
    results.forEach(result => {
      console.log(`Result ${result.id}: status=${result.status}, date=${result.date}, isCompleted=${result.isCompleted}`);
    });
    
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
      console.log(`Comparing ${monthYear} to ${selectedMonth}`);
      return monthYear === selectedMonth;
    });
  }
  
  console.log("FILTERED RESULTS:", filteredResults.length);
  console.log("Filtered date range:", filteredResults.map(f => f.date).sort());
  
  // Sort results by date before grouping by month
  const sortedResults = [...filteredResults].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Note: descending for results
  });
  
  const resultsByMonth = getMatchesByMonth(sortedResults);
  const sortedMonths = Object.keys(resultsByMonth).sort((a, b) => {
    // Sort months in descending order (newest first)
    const dateA = new Date(resultsByMonth[a][0]?.date || '');
    const dateB = new Date(resultsByMonth[b][0]?.date || '');
    return dateB.getTime() - dateA.getTime();
  });

  console.log("Results Tab Render:");
  console.log("- All results available:", allRecentResults.length);
  console.log("- Filtered results:", filteredResults.length);
  console.log("- Number of months:", Object.keys(resultsByMonth || {}).length);
  console.log("- Months:", Object.keys(resultsByMonth || {}));
  
  // Check for fixture distribution across months
  if (resultsByMonth) {
    Object.entries(resultsByMonth).forEach(([month, fixtures]) => {
      console.log(`  - ${month}: ${fixtures.length} fixtures`);
    });
  }

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
