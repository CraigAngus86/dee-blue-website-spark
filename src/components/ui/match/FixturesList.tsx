
import React from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { getUpcomingFixtures, getMatchesByMonth } from '@/mock-data/fixturesData';

interface FixturesListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const FixturesList: React.FC<FixturesListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = '',
  selectedSeason = ''
}) => {
  const allUpcomingFixtures = getUpcomingFixtures();
  
  // Apply filters
  let filteredFixtures = allUpcomingFixtures;
  
  if (selectedCompetitions.length > 0) {
    filteredFixtures = filteredFixtures.filter(fixture => 
      selectedCompetitions.some(comp => fixture.competition.includes(comp))
    );
  }
  
  if (selectedMonth) {
    filteredFixtures = filteredFixtures.filter(fixture => {
      const date = new Date(fixture.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return monthYear === selectedMonth;
    });
  }
  
  const fixturesByMonth = getMatchesByMonth(filteredFixtures);

  return (
    <div className="space-y-8">
      {Object.entries(fixturesByMonth).map(([month, matches]) => (
        <div key={month}>
          <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
          <div className="grid gap-4">
            {matches.map((match) => (
              <MatchCardNew
                key={match.id}
                match={match}
                variant="future"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FixturesList;
