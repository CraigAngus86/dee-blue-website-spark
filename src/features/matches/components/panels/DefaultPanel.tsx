"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useDefaultSeason() {
  const [defaultSeason, setDefaultSeason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchDefaultSeason() {
      try {
        // Try to get the current season
        const { data, error } = await supabase
          .from('seasons')
          .select('id')
          .eq('is_current_season', true)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          // If no current season, get the most recent one
          const { data: seasons, error: seasonsError } = await supabase
            .from('seasons')
            .select('id')
            .order('start_date', { ascending: false })
            .limit(1);
            
          if (seasonsError) throw seasonsError;
          
          if (seasons && seasons.length > 0) {
            setDefaultSeason(seasons[0].id);
          }
        } else if (data) {
          setDefaultSeason(data.id);
        }
      } catch (error) {
        console.error('Error fetching default season:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDefaultSeason();
  }, []);
  
  return { defaultSeason, loading };
}
