
import React from 'react';
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
  const allRecentResults = getResults();
  
  // Apply filters
  let filteredResults = allRecentResults;
  
  if (selectedCompetitions.length > 0) {
    filteredResults = filteredResults.filter(result => 
      selectedCompetitions.some(comp => result.competition.includes(comp))
    );
  }
  
  if (selectedMonth) {
    filteredResults = filteredResults.filter(result => {
      const date = new Date(result.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return monthYear === selectedMonth;
    });
  }
  
  const resultsByMonth = getMatchesByMonth(filteredResults);

  return (
    <div className="space-y-8">
      {Object.entries(resultsByMonth).reverse().map(([month, matches]) => (
        <div key={month}>
          <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
          <div className="grid gap-4">
            {matches.map((match) => (
              <MatchCardNew
                key={match.id}
                match={match}
                variant="past"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
