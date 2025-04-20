
import React from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { ButtonNew } from '../ButtonNew';
import { Filter } from 'lucide-react';
import { getResults } from '@/mock-data/fixturesData';

const ResultsList = () => {
  const recentResults = getResults();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Recent Results</h2>
        <ButtonNew 
          variant="secondary" 
          size="sm" 
          iconLeft={<Filter className="mr-2 h-4 w-4" />}
        >
          Filter
        </ButtonNew>
      </div>
      
      <div className="grid gap-4">
        {recentResults.map((match) => (
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
  );
};

export default ResultsList;
