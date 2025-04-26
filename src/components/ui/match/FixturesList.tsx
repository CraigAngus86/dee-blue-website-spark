import React, { useEffect, useState, useMemo } from 'react';
import { Match } from '@/types/match';
import MatchCardNew from '../image/MatchCardNew';
import { getUpcomingFixtures, getMatchesByMonth } from '@/mock-data/fixturesData';
import LoadingState from '../common/LoadingState';

interface FixturesListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const FixturesList: React.FC<FixturesListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = '2024/25'
}) => {
  const [allUpcomingFixtures, setAllUpcomingFixtures] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadFixtures = () => {
      setIsLoading(true);
      try {
        const fixtures = getUpcomingFixtures(selectedSeason);
        setAllUpcomingFixtures(fixtures);
      } catch (error) {
        console.error("Error loading fixtures:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFixtures();
  }, [selectedCompetitions, selectedMonth, selectedSeason]);
  
  const filteredFixtures = useMemo(() => {
    let filtered = allUpcomingFixtures;
    
    if (selectedCompetitions.length > 0) {
      filtered = filtered.filter(fixture => 
        selectedCompetitions.some(comp => fixture.competition.includes(comp))
      );
    }
    
    if (selectedMonth && selectedMonth !== 'all') {
      filtered = filtered.filter(fixture => {
        const date = new Date(fixture.date);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        return monthYear === selectedMonth;
      });
    }
    
    return filtered;
  }, [allUpcomingFixtures, selectedCompetitions, selectedMonth]);
  
  const fixturesByMonthData = useMemo(() => {
    const sortedFixtures = [...filteredFixtures].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    return getMatchesByMonth(sortedFixtures);
  }, [filteredFixtures]);
  
  const sortedMonths = useMemo(() => {
    return Object.keys(fixturesByMonthData).sort((a, b) => {
      const dateA = new Date(fixturesByMonthData[a][0]?.date || '');
      const dateB = new Date(fixturesByMonthData[b][0]?.date || '');
      return dateA.getTime() - dateB.getTime();
    });
  }, [fixturesByMonthData]);

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
};

export default React.memo(FixturesList);
