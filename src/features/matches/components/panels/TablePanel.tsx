"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { DEFAULT_SEASON } from '../../constants';
import { TeamLogo } from "../TeamLogo";
import { MobileTableCard } from '../mobile/MobileTableCard';

export function TablePanel() {
  const searchParams = useSearchParams();
  const season = searchParams.get('season') || DEFAULT_SEASON;
  
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchTableData() {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching league table for season: ${season}`);
        
        // First get the season ID from name
        const { data: seasonData, error: seasonError } = await supabase
          .from('seasons')
          .select('id')
          .ilike('name', `%${season}%`) // Use partial match for season names
          .limit(1);
          
        if (seasonError) {
          console.error('Error fetching season ID:', seasonError);
          throw new Error(`Couldn't find season "${season}"`);
        }
        
        if (!seasonData || seasonData.length === 0) {
          throw new Error(`No season found matching "${season}"`);
        }
        
        const seasonId = seasonData[0]?.id;
        
        if (!seasonId) {
          throw new Error('Invalid season ID');
        }
        
        console.log(`Found season ID: ${seasonId} for season ${season}`);
        
        // Use our new view directly - this is the key change
        const { data, error } = await supabase
          .from('vw_league_table_by_season')
          .select('*')
          .eq('season_id', seasonId)
          .order('position');
          
        if (error) {
          console.error('Error fetching league table:', error);
          throw new Error('Failed to fetch league table data');
        }
        
        console.log(`Fetched ${data?.length || 0} league table entries`);
        setTableData(data || []);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : String(err));
        setTableData([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTableData();
  }, [season]);
  
  // Form indicator component for W/L/D
  const FormIndicator = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const bgColor = 
      result === 'W' ? 'bg-[#22c55e] text-white' : 
      result === 'D' ? 'bg-[#f59e0b] text-white' : 
      'bg-[#ef4444] text-white';
    
    return (
      <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center text-xs font-medium`}>
        {result}
      </div>
    );
  };
  
  if (loading) {
    return <div className="py-8 text-center">Loading league table...</div>;
  }
  
  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-[#ef4444] mb-2">{error}</p>
      </div>
    );
  }
  
  if (tableData.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-[#6b7280]">No league table data available for {season}</p>
      </div>
    );
  }
  
  return (
    <>
      {/* Desktop: Existing table */}
      <div className="hidden md:block">
        <div>
          <h3 className="text-xl font-bold mb-4">{season} League Table</h3>
          
          <div className="overflow-x-auto rounded-lg border border-[#e5e7eb] shadow-sm">
            <table className="min-w-full bg-white">
              <thead className="bg-[#00105A] text-white border-b">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">Pos</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">Team</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">P</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">W</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">D</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">L</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">GF</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">GA</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">GD</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">Pts</th>
                  <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {tableData.map((row, index) => {
                  const isBanksODee = row.team_name?.toLowerCase().includes("banks o' dee");
                  const isFirstPosition = row.position === 1;
                  const isLastPosition = row.position === tableData.length;
                  
                  // UPDATED: Standardized position-based coloring
                  let rowBg = '';
                  if (isBanksODee) {
                    rowBg = 'bg-[#f0f7ff]'; // Light blue for Banks o' Dee
                  } else if (isFirstPosition) {
                    rowBg = 'bg-[#f0fdf4]'; // Green for 1st position
                  } else if (isLastPosition) {
                    rowBg = 'bg-[#fef2f2]'; // Red for 18th position
                  } else {
                    rowBg = 'bg-white'; // White for all others
                  }
                  
                  return (
                    <tr 
                      key={row.id}
                      className={`${rowBg} hover:bg-[#e5e7eb] transition-colors duration-150`}
                    >
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center font-medium">{row.position}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <TeamLogo 
                            logoId={row.team_logo} 
                            teamName={row.team_name} 
                            size="sm" 
                            className="mr-2" 
                          />
                          <span className={isBanksODee ? "font-bold" : ""}>{row.team_name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.matches_played}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.wins}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.draws}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.losses}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.goals_for}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.goals_against}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-center">{row.goal_difference}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-bold text-center">{row.points}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex justify-center space-x-1">
                          {(row.form || []).slice(0, 5).map((result: string, i: number) => (
                            <FormIndicator key={i} result={result as 'W' | 'L' | 'D'} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile: Single table card */}
      <div className="block md:hidden">
        <MobileTableCard tableData={tableData} />
      </div>
    </>
  );
}
