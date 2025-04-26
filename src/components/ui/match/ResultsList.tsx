
'use client';

import React, { useState, useEffect } from 'react';
import MatchCardNew from '../image/MatchCardNew';
import LoadingState from '../common/LoadingState';
import { getMatchesByMonth } from '@/mock-data/fixturesData';

interface ResultsListProps {
  selectedCompetitions?: string[];
  selectedMonth?: string;
  selectedSeason?: string;
}

const ResultsList: React.FC<ResultsListProps> = ({ 
  selectedCompetitions = [],
  selectedMonth = 'all',
  selectedSeason = '2024/25'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [resultsByMonth, setResultsByMonth] = useState<Record<string, any[]>>({});
  const [sortedMonths, setSortedMonths] = useState<string[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll import from mock data
        const { results } = require('@/mock-data/fixturesData').resultsData;
        
        let filteredResults = results;
        
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
        
        setResults(filteredResults);
        
        const resultsByMonthData = getMatchesByMonth(
          [...filteredResults].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
        );
        
        setResultsByMonth(resultsByMonthData);
        
        const months = Object.keys(resultsByMonthData).sort((a, b) => {
          const dateA = new Date(resultsByMonthData[a][0]?.date || '');
          const dateB = new Date(resultsByMonthData[b][0]?.date || '');
          return dateB.getTime() - dateA.getTime();
        });
        
        setSortedMonths(months);
        
        // Simulate loading delay
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error('Error fetching results:', error);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchResults();
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
              {resultsByMonth[month].map((match) => (
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
};

export default ResultsList;
