"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function MatchDebug() {
  const [debug, setDebug] = useState<any>({
    loading: true,
    matchFields: [],
    sampleMatch: null,
    matchCount: 0,
    error: null
  });

  useEffect(() => {
    async function runDebug() {
      try {
        // Get table definition to see field names
        const { data: matchDef, error: defError } = await supabase
          .rpc('debug_get_table_info', { table_name: 'match' });

        if (defError) throw new Error(`Could not get table definition: ${defError.message}`);

        // Get sample match
        const { data: sampleMatch, error: sampleError } = await supabase
          .from('match')
          .select('*')
          .limit(1)
          .single();

        if (sampleError && sampleError.code !== 'PGRST116') {
          throw new Error(`Error fetching sample: ${sampleError.message}`);
        }

        // Count total matches
        const { count, error: countError } = await supabase
          .from('match')
          .select('*', { count: 'exact', head: true });

        if (countError) throw new Error(`Error counting matches: ${countError.message}`);

        // Try a simple future matches query
        const now = new Date().toISOString().split('T')[0];
        const { data: futureMatches, error: futureError } = await supabase
          .from('match')
          .select('match_date, season, home_team_id(name), away_team_id(name)')
          .gt('match_date', now)
          .limit(5);

        if (futureError) throw new Error(`Error fetching future matches: ${futureError.message}`);

        // Test season field specifically
        const { data: seasonTest, error: seasonError } = await supabase
          .from('match')
          .select('id, match_date, season')
          .eq('season', '2024-2025')
          .limit(5);

        if (seasonError) throw new Error(`Error with season filter: ${seasonError.message}`);

        setDebug({
          loading: false,
          matchFields: matchDef || [],
          sampleMatch,
          matchCount: count || 0,
          futureMatches,
          seasonTest,
          error: null
        });
      } catch (error) {
        console.error('Debug error:', error);
        setDebug(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : String(error)
        }));
      }
    }

    runDebug();
  }, []);

  if (debug.loading) {
    return <div>Loading debug info...</div>;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Database Debug Info</h3>
      
      {debug.error && (
        <div className="bg-red-50 text-red-700 p-2 rounded mb-3">
          Error: {debug.error}
        </div>
      )}
      
      <div className="mb-3">
        <p className="font-medium">Match Table Fields:</p>
        <pre className="bg-gray-100 p-2 rounded overflow-auto text-xs max-h-40">
          {JSON.stringify(debug.matchFields, null, 2)}
        </pre>
      </div>
      
      <div className="mb-3">
        <p className="font-medium">Total Matches: {debug.matchCount}</p>
      </div>
      
      <div className="mb-3">
        <p className="font-medium">Sample Match:</p>
        <pre className="bg-gray-100 p-2 rounded overflow-auto text-xs max-h-40">
          {JSON.stringify(debug.sampleMatch, null, 2)}
        </pre>
      </div>
      
      <div className="mb-3">
        <p className="font-medium">Future Matches Test:</p>
        <pre className="bg-gray-100 p-2 rounded overflow-auto text-xs max-h-40">
          {JSON.stringify(debug.futureMatches, null, 2)}
        </pre>
      </div>
      
      <div>
        <p className="font-medium">Season '2024-2025' Filter Test:</p>
        <pre className="bg-gray-100 p-2 rounded overflow-auto text-xs max-h-40">
          {JSON.stringify(debug.seasonTest, null, 2)}
        </pre>
      </div>
    </div>
  );
}
