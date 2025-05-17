"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function CompetitionChecker() {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [viewCompetitions, setViewCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkCompetitions() {
      try {
        // Get competitions from the competitions table
        const { data: tableData, error: tableError } = await supabase
          .from('competitions')
          .select('id, name, short_name')
          .order('name');
          
        if (tableError) throw tableError;
        
        // Get distinct competition names from the results view
        const { data: viewData, error: viewError } = await supabase
          .from('vw_latest_results')
          .select('competition, competition_short')
          .limit(100);
          
        if (viewError) throw viewError;
        
        // Extract unique competition names from the view
        const uniqueCompetitions = Array.from(
          new Set(viewData.map(r => `${r.competition} (${r.competition_short})`))
        );
        
        setCompetitions(tableData || []);
        setViewCompetitions(uniqueCompetitions);
      } catch (error) {
        console.error('Error checking competitions:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkCompetitions();
  }, []);
  
  if (loading) {
    return <div>Loading competition data...</div>;
  }
  
  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-lg text-sm">
      <div>
        <h3 className="font-bold mb-2">Competitions Table:</h3>
        <ul className="list-disc pl-4">
          {competitions.map((comp) => (
            <li key={comp.id}>
              {comp.name} (Short name: {comp.short_name}, ID: {comp.id})
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="font-bold mb-2">Competitions in View (Results):</h3>
        <ul className="list-disc pl-4">
          {viewCompetitions.map((comp, index) => (
            <li key={index}>{comp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
