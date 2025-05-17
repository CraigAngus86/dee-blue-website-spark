"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function LeagueTableDetailedDiagnostic() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  useEffect(() => {
    async function fetchSeasons() {
      try {
        // Get all seasons
        const { data: seasonsData, error: seasonsError } = await supabase
          .from('seasons')
          .select('id, name')
          .order('name', { ascending: false });
          
        if (seasonsError) throw new Error(`Seasons error: ${seasonsError.message}`);
        
        setSeasons(seasonsData || []);
        
        // Set first season as default if available
        if (seasonsData && seasonsData.length > 0) {
          setSelectedSeason(seasonsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching seasons:', error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    }
    
    fetchSeasons();
  }, []);

  useEffect(() => {
    async function fetchLeagueTable() {
      if (!selectedSeason) return;
      
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching league table for season ID: ${selectedSeason}`);
        
        // Query directly with the selected season ID
        const { data, error } = await supabase
          .from('league_table')
          .select(`
            id, position, points, matches_played, wins, draws, losses, 
            goals_for, goals_against, goal_difference, form,
            team:team_id(id, name, short_name, logo_url),
            season:season_id(id, name),
            competition:competition_id(id, name)
          `)
          .eq('season_id', selectedSeason)
          .order('position');
          
        if (error) throw new Error(`Table query error: ${error.message}`);
        
        console.log(`Found ${data?.length || 0} league table entries for this season`);
        
        setTableData(data || []);
      } catch (error) {
        console.error('Error fetching league table:', error);
        setError(error instanceof Error ? error.message : String(error));
        setTableData([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLeagueTable();
  }, [selectedSeason]);
  
  // Check if league_table exists at all
  useEffect(() => {
    async function checkTableExists() {
      try {
        const { count, error } = await supabase
          .from('league_table')
          .select('*', { count: 'exact', head: true });
          
        console.log(`Total league_table rows: ${count}`);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error checking league_table:', error);
      }
    }
    
    checkTableExists();
  }, []);
  
  if (loading && !seasons.length) {
    return <div>Loading league table diagnostic...</div>;
  }
  
  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-lg text-sm">
      <div>
        <h3 className="font-bold mb-2">League Table Diagnostic:</h3>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-2 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Available Seasons:</h4>
          <select 
            value={selectedSeason} 
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="border rounded px-2 py-1 w-full max-w-md"
          >
            {seasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.name} (ID: {season.id})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">League Table Data for Selected Season:</h4>
          {loading ? (
            <div>Loading table data...</div>
          ) : tableData.length > 0 ? (
            <div>
              <div className="mb-2 text-green-600">Found {tableData.length} rows</div>
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1 border">Pos</th>
                    <th className="px-2 py-1 border">Team</th>
                    <th className="px-2 py-1 border">Points</th>
                    <th className="px-2 py-1 border">Competition</th>
                    <th className="px-2 py-1 border">Season</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(row => (
                    <tr key={row.id}>
                      <td className="px-2 py-1 border">{row.position}</td>
                      <td className="px-2 py-1 border">{row.team?.name || 'Unknown'}</td>
                      <td className="px-2 py-1 border">{row.points}</td>
                      <td className="px-2 py-1 border">{row.competition?.name || 'Unknown'}</td>
                      <td className="px-2 py-1 border">{row.season?.name || 'Unknown'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-orange-500">
              No league table data found for this season. Try selecting a different season.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
