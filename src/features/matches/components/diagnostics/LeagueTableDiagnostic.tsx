"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function LeagueTableDiagnostic() {
  const [viewData, setViewData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTables() {
      try {
        // Check the view structure
        const { data: viewSample, error: viewError } = await supabase
          .from('vw_current_league_table')
          .select('*')
          .limit(1);
          
        if (viewError) throw new Error(`View error: ${viewError.message}`);
        
        // Check the actual league_table table
        const { data: tableData, error: tableError } = await supabase
          .from('league_table')
          .select(`
            id, position, points, matches_played, wins, draws, losses, 
            goals_for, goals_against, goal_difference, form,
            team:team_id(id, name, short_name, logo_url),
            season:season_id(id, name),
            competition:competition_id(id, name)
          `)
          .limit(1);
          
        if (tableError) throw new Error(`Table error: ${tableError.message}`);
        
        // Get unique seasons in league_table
        const { data: seasonData, error: seasonError } = await supabase
          .from('league_table')
          .select('season_id')
          .limit(100);
          
        if (seasonError) throw new Error(`Season query error: ${seasonError.message}`);
        
        // Get unique season names
        const { data: seasonNames, error: namesError } = await supabase
          .from('seasons')
          .select('id, name')
          .in('id', seasonData.map(row => row.season_id).filter(Boolean))
          .limit(100);
          
        if (namesError) throw new Error(`Season names error: ${namesError.message}`);
        
        setViewData({
          sample: viewSample?.[0] || null,
          columns: viewSample?.[0] ? Object.keys(viewSample[0]) : []
        });
        
        setTableData({
          sample: tableData?.[0] || null,
          seasons: seasonNames || []
        });
      } catch (error) {
        console.error('Diagnostic error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkTables();
  }, []);
  
  if (loading) {
    return <div>Loading league table information...</div>;
  }
  
  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-lg text-sm">
      <div>
        <h3 className="font-bold mb-2">League Table View Structure:</h3>
        {viewData?.sample ? (
          <>
            <div className="mb-2">
              <h4 className="font-medium">Columns:</h4>
              <ul className="list-disc pl-4">
                {viewData.columns.map((column: string) => (
                  <li key={column}>{column}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Sample:</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(viewData.sample, null, 2)}
              </pre>
            </div>
          </>
        ) : (
          <p>No view data available</p>
        )}
      </div>
      
      <div>
        <h3 className="font-bold mb-2">League Table Data Structure:</h3>
        {tableData?.sample ? (
          <>
            <div>
              <h4 className="font-medium">Sample Data:</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(tableData.sample, null, 2)}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium">Available Seasons:</h4>
              <ul className="list-disc pl-4">
                {tableData.seasons.map((season: any) => (
                  <li key={season.id}>{season.name} (ID: {season.id})</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>No table data available</p>
        )}
      </div>
    </div>
  );
}
