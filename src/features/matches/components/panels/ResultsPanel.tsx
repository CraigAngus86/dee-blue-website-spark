"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { DEFAULT_SEASON, DEFAULT_COMPETITION, DEFAULT_MONTH } from '../../constants';
import { ResultCard } from '../ResultCard';

export function ResultsPanel() {
  const searchParams = useSearchParams();
  const season = searchParams.get('season') || DEFAULT_SEASON;
  const competition = searchParams.get('competition') || DEFAULT_COMPETITION;
  const month = searchParams.get('month') || DEFAULT_MONTH;
  
  const [results, setResults] = useState<any[]>([]);
  const [groupedResults, setGroupedResults] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        let query = supabase
          .from('vw_latest_results')
          .select('*');
        
        // Add season filter
        if (season) {
          query = query.eq('season', season);
        }
        
        // Add competition filter if not "all"
        if (competition !== 'all') {
          // Filter by the full competition name
          query = query.eq('competition', competition);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        console.log(`Fetched ${data?.length || 0} results`);
        
        // Filter by month if not "all"
        let filteredData = data || [];
        
        if (month !== 'all') {
          const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                             'july', 'august', 'september', 'october', 'november', 'december'];
          const monthIndex = monthNames.indexOf(month.toLowerCase());
          
          if (monthIndex !== -1) {
            filteredData = filteredData.filter(result => {
              const resultDate = new Date(result.match_date);
              return resultDate.getMonth() === monthIndex;
            });
          }
        }
        
        setResults(filteredData);
        
        // Group results by month
        const grouped = groupMatchesByMonth(filteredData);
        setGroupedResults(grouped);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchResults();
  }, [season, competition, month]);
  
  function groupMatchesByMonth(matches: any[]) {
    const grouped: Record<string, any[]> = {};
    
    matches.forEach(match => {
      const date = new Date(match.match_date);
      const monthYear = format(date, 'MMMM yyyy');
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(match);
    });
    
    return grouped;
  }
  
  if (loading) {
    return <div className="py-8 text-center">Loading results...</div>;
  }
  
  if (Object.keys(groupedResults).length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No recent results found</p>
        <p className="text-xs text-gray-400 mt-2">
          Using filters: Season: {season}, 
          Competition: {competition}, 
          Month: {month}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {Object.entries(groupedResults).map(([month, monthResults]) => (
        <div key={month}>
          <div className="bg-gray-200 py-3 px-4 rounded mb-6 border-b border-gray-300">
            <h3 className="text-xl font-bold text-gray-800">{month}</h3>
          </div>
          
          <div className="grid gap-6">
            {monthResults.map(result => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
