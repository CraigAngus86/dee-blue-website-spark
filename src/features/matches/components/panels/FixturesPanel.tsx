"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { DEFAULT_SEASON, DEFAULT_COMPETITION, DEFAULT_MONTH } from '../../constants';
import { FixtureCard } from '../FixtureCard';
import { MobileFixtureCard } from '../mobile/MobileFixtureCard';

export function FixturesPanel() {
  const searchParams = useSearchParams();
  const season = searchParams.get('season') || DEFAULT_SEASON;
  const competition = searchParams.get('competition') || DEFAULT_COMPETITION;
  const month = searchParams.get('month') || DEFAULT_MONTH;
  
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [groupedFixtures, setGroupedFixtures] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchFixtures() {
      setLoading(true);
      try {
        let query = supabase
          .from('vw_upcoming_matches')
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
        
        console.log(`Fetched ${data?.length || 0} fixtures`);
        
        // Filter by month if not "all"
        let filteredData = data || [];
        
        if (month !== 'all') {
          const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'];
          const monthIndex = monthNames.indexOf(month.toLowerCase());
          
          if (monthIndex !== -1) {
            filteredData = filteredData.filter(fixture => {
              const fixtureDate = new Date(fixture.match_date);
              return fixtureDate.getMonth() === monthIndex;
            });
          }
        }
        
        setFixtures(filteredData);
        
        // Group fixtures by month
        const grouped = groupMatchesByMonth(filteredData);
        setGroupedFixtures(grouped);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFixtures();
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

  const handleTicketClick = (ticketUrl: string) => {
    window.open(ticketUrl, '_blank');
  };
  
  if (loading) {
    return <div className="py-8 text-center">Loading fixtures...</div>;
  }
  
  if (Object.keys(groupedFixtures).length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-[#6b7280]">No upcoming fixtures found</p>
        <p className="text-xs text-[#9ca3af] mt-2">
          Using filters: Season: {season},
          Competition: {competition},
          Month: {month}
        </p>
      </div>
    );
  }
  
  return (
    <>
      {/* Desktop: Existing layout */}
      <div className="hidden md:block">
        <div className="space-y-8">
          {Object.entries(groupedFixtures).map(([month, monthFixtures]) => (
            <div key={month}>
              <div className="bg-[#e5e7eb] py-3 px-4 rounded mb-6 border-b border-[#d1d5db]">
                <h3 className="text-xl font-bold text-[#1f2937]">{month}</h3>
              </div>
              
              <div className="grid gap-6">
                {monthFixtures.map(fixture => (
                  <FixtureCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Added grey backgrounds to match desktop */}
      <div className="block md:hidden">
        <div className="space-y-6">
          {Object.entries(groupedFixtures).map(([month, monthFixtures]) => (
            <div key={month}>
              <div className="bg-[#e5e7eb] py-3 px-4 rounded mb-6">
                <h3 className="text-lg font-bold text-[#1f2937]">{month}</h3>
              </div>
              
              <div className="space-y-4">
                {monthFixtures.map(fixture => (
                  <MobileFixtureCard 
                    key={fixture.id} 
                    fixture={fixture}
                    onTicketClick={handleTicketClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
