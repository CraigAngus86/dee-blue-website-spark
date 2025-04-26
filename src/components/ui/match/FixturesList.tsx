
import React, { Suspense } from 'react';
import MatchCardNew from '../image/MatchCardNew';
import { getFixtures } from '@/lib/server/getFixtures';
import LoadingState from '../common/LoadingState';
import { getMatchesByMonth } from '@/mock-data/fixturesData';

interface FixturesListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

async function FixturesContent({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = '2024/25'
}) {
  const { matches } = await getFixtures('fixtures', selectedSeason);
  
  let filteredFixtures = matches;
  
  if (selectedCompetitions.length > 0) {
    filteredFixtures = filteredFixtures.filter(fixture => 
      selectedCompetitions.some(comp => fixture.competition.includes(comp))
    );
  }
  
  if (selectedMonth && selectedMonth !== 'all') {
    filteredFixtures = filteredFixtures.filter(fixture => {
      const date = new Date(fixture.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return monthYear === selectedMonth;
    });
  }
  
  const fixturesByMonthData = getMatchesByMonth(
    [...filteredFixtures].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
  );
  
  const sortedMonths = Object.keys(fixturesByMonthData).sort((a, b) => {
    const dateA = new Date(fixturesByMonthData[a][0]?.date || '');
    const dateB = new Date(fixturesByMonthData[b][0]?.date || '');
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-8">
      {sortedMonths.length > 0 ? (
        sortedMonths.map((month) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
            <div className="grid gap-4">
              {fixturesByMonthData[month].map((match) => (
                <MatchCardNew
                  key={match.id}
                  match={match}
                  variant="future"
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No upcoming fixtures found for the selected filters.
        </div>
      )}
    </div>
  );
}

export default function FixturesList(props: FixturesListProps) {
  return (
    <Suspense fallback={<LoadingState count={2} />}>
      <FixturesContent {...props} />
    </Suspense>
  );
}
