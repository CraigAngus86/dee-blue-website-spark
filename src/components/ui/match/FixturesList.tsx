
'use client';

import React, { useState, useEffect } from 'react';
import MatchCardNew from '../image/MatchCardNew';
import LoadingState from '../common/LoadingState';
import { getMatchesByMonth } from '@/mock-data/fixturesData';

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
  const [isLoading, setIsLoading] = useState(true);
  const [fixtures, setFixtures] = useState([]);
  const [fixturesByMonth, setFixturesByMonth] = useState<Record<string, any[]>>({});
  const [sortedMonths, setSortedMonths] = useState<string[]>([]);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll import from mock data
        const { matches } = require('@/mock-data/fixturesData').fixturesData;
        
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
        
        setFixtures(filteredFixtures);
        
        const fixturesByMonthData = getMatchesByMonth(
          [...filteredFixtures].sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
        );
        
        setFixturesByMonth(fixturesByMonthData);
        
        const months = Object.keys(fixturesByMonthData).sort((a, b) => {
          const dateA = new Date(fixturesByMonthData[a][0]?.date || '');
          const dateB = new Date(fixturesByMonthData[b][0]?.date || '');
          return dateA.getTime() - dateB.getTime();
        });
        
        setSortedMonths(months);
        
        // Simulate loading delay
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchFixtures();
  }, [selectedCompetitions, selectedMonth, selectedSeason]);

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
