
import React, { Suspense } from 'react';
import MatchCardNew from '../image/MatchCardNew';
import { getFixtures } from '@/lib/server/getFixtures';
import LoadingState from '../common/LoadingState';
import { getMatchesByMonth } from '@/mock-data/fixturesData';

interface ResultsListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

async function ResultsContent({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = '2024/25'
}) {
  const { matches } = await getFixtures('results', selectedSeason);
  
  let filteredResults = matches;
  
  if (selectedCompetitions.length > 0) {
    filteredResults = filteredResults.filter(result => 
      selectedCompetitions.some(comp => result.competition.includes(comp))
    );
  }
  
  if (selectedMonth && selectedMonth !== 'all') {
    filteredResults = filteredResults.filter(result => {
      const date = new Date(result.date);
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return monthYear === selectedMonth;
    });
  }
  
  const resultsByMonthData = getMatchesByMonth(
    [...filteredResults].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
  );
  
  const sortedMonths = Object.keys(resultsByMonthData).sort((a, b) => {
    const dateA = new Date(resultsByMonthData[a][0]?.date || '');
    const dateB = new Date(resultsByMonthData[b][0]?.date || '');
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-8">
      {sortedMonths.length > 0 ? (
        sortedMonths.map((month) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-gray-600 mb-4">{month}</h3>
            <div className="grid gap-4">
              {resultsByMonthData[month].map((match) => (
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
}

export default function ResultsList(props: ResultsListProps) {
  return (
    <Suspense fallback={<LoadingState count={2} />}>
      <ResultsContent {...props} />
    </Suspense>
  );
}
