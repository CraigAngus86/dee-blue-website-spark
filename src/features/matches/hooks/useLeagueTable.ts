import { supabase } from '@/lib/supabase/client';
import { LeagueStanding } from '../types';

export async function getLeagueTable(seasonId?: string) {
  const query = supabase
    .from('vw_current_league_table')
    .select('*')
    .order('position');
    
  if (seasonId) {
    query.eq('season_id', seasonId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching league table:', error);
    return [];
  }
  
  return data;
}

export async function getCurrentSeason() {
  const { data, error } = await supabase
    .from('seasons')
    .select('*')
    .eq('is_current_season', true)
    .single();
    
  if (error) {
    console.error('Error fetching current season:', error);
    return null;
  }
  
  return data;
}

export async function getSeasons() {
  const { data, error } = await supabase
    .from('seasons')
    .select('*')
    .order('start_date', { ascending: false });
    
  if (error) {
    console.error('Error fetching seasons:', error);
    return [];
  }
  
  return data;
}
