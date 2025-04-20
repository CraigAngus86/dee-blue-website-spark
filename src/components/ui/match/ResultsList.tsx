
import React from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { getResults, getMatchesByMonth } from '@/mock-data/fixturesData';

interface ResultsListProps {
  selectedCompetitions?: string[];
}

const ResultsList: React.FC<ResultsListProps> = ({ selectedCompetitions = [] }) => {
  const allRecentResults = getResults();
  
  // Filter results by selected competitions if any are selected
  const recentResults = selectedCompetitions.length > 0
    ? allRecentResults.filter(result => 
        selectedCompetitions.some(comp => result.competition.includes(comp))
      )
    : allRecentResults;
  
  const resultsByMonth = getMatchesByMonth(recentResults);

  return (
    <div>      
      <div className="space-y-8">
        {Object.entries(resultsByMonth).reverse().map(([month, matches]) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
            <div className="grid gap-4">
              {matches.map((match) => (
                <MatchCardNew
                  key={match.id}
                  match={{
                    id: match.id,
                    competition: match.competition,
                    date: match.date,
                    time: match.time,
                    homeTeam: match.homeTeam,
                    awayTeam: match.awayTeam,
                    venue: match.venue || '',
                    status: 'completed',
                    result: {
                      homeScore: match.homeScore || 0,
                      awayScore: match.awayScore || 0,
                    },
                    matchReportLink: match.matchReportLink,
                  }}
                  variant="past"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
