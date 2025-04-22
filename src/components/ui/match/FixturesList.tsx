
import React, { useEffect, useState } from 'react';
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
  // Force a refresh of the data when props change
  const [allUpcomingFixtures, setAllUpcomingFixtures] = useState<Match[]>([]);
  
  useEffect(() => {
    // Re-fetch data when the component renders or filters change
    const fixtures = getUpcomingFixtures();
    console.log("Loaded upcoming fixtures:", fixtures.length);
    console.log("ALL UPCOMING FIXTURES:", fixtures.length);
    console.log("Date range:", fixtures.map(f => f.date).sort());
    console.log("Unique months:", [...new Set(fixtures.map(f => {
      const date = new Date(f.date);
      return `${date.getMonth()+1}/${date.getFullYear()}`;
    }))]);
    setAllUpcomingFixtures(fixtures);
  }, [selectedCompetitions, selectedMonth, selectedSeason]);
  
  // Apply filters
  let filteredFixtures = allUpcomingFixtures;
  
  if (selectedCompetitions.length > 0) {
    filteredFixtures = filteredFixtures.filter(fixture => 
      selectedCompetitions.some(comp => fixture.competition.includes(comp))
    );
  }
  
  if (selectedMonth && selectedMonth !== 'all') {
    filteredFixtures = filteredFixtures.filter(fixture => {
      const date = new Date(fixture.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      console.log(`Comparing ${monthYear} to ${selectedMonth}`);
      return monthYear === selectedMonth;
    });
  }
  
  console.log("FILTERED FIXTURES:", filteredFixtures.length);
  console.log("Filtered date range:", filteredFixtures.map(f => f.date).sort());
  
  // Make sure to sort fixtures first before grouping by month
  const sortedFixtures = [...filteredFixtures].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  const fixturesByMonth = getMatchesByMonth(sortedFixtures);
  const sortedMonths = Object.keys(fixturesByMonth).sort((a, b) => {
    // Sort months in ascending order (oldest first)
    const dateA = new Date(fixturesByMonth[a][0]?.date || '');
    const dateB = new Date(fixturesByMonth[b][0]?.date || '');
    return dateA.getTime() - dateB.getTime();
  });

  console.log("Fixtures rendered:", { 
    total: allUpcomingFixtures.length, 
    filtered: filteredFixtures.length,
    months: sortedMonths,
    monthsData: Object.keys(fixturesByMonth).map(month => ({
      month,
      count: fixturesByMonth[month].length
    }))
  });

  return (
    <div className="space-y-8">
      {sortedMonths.length > 0 ? (
        sortedMonths.map((month) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
            <div className="grid gap-4">
              {fixturesByMonth[month].map((match) => (
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
};

export default FixturesList;
