
import React from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { getUpcomingFixtures, getMatchesByMonth } from '@/mock-data/fixturesData';

interface FixturesListProps {
  selectedCompetitions?: string[];
}

const FixturesList: React.FC<FixturesListProps> = ({ selectedCompetitions = [] }) => {
  const allUpcomingFixtures = getUpcomingFixtures();
  
  // Filter fixtures by selected competitions if any are selected
  const upcomingFixtures = selectedCompetitions.length > 0
    ? allUpcomingFixtures.filter(fixture => 
        selectedCompetitions.some(comp => fixture.competition.includes(comp))
      )
    : allUpcomingFixtures;
  
  const fixturesByMonth = getMatchesByMonth(upcomingFixtures);

  return (
    <div>      
      <div className="space-y-8">
        {Object.entries(fixturesByMonth).map(([month, matches]) => (
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
                    status: 'upcoming',
                    ticketLink: match.ticketLink,
                  }}
                  variant="future"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixturesList;
