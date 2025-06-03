import { supabase } from '@/lib/supabase/client';
export async function getHomepageUpcomingMatches(limit = 5) {
  const { data, error } = await supabase
    .from('vw_upcoming_matches')
    .select('*')
    .order('match_date', { ascending: true })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching homepage upcoming matches:', error);
    return [];
  }
  
  return data || [];
}
export async function getHomepageRecentMatches(limit = 5) {
  const { data, error } = await supabase
    .from('vw_latest_results')
    .select('*')
    .order('match_date', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching homepage recent matches:', error);
    return [];
  }
  
  return data || [];
}
export async function getHomepageLeagueTable() {
  const { data, error } = await supabase
    .from('vw_current_league_table')
    .select('*')
    .order('position', { ascending: true });
    
  if (error) {
    console.error('Error fetching homepage league table:', error);
    return [];
  }
  
  return data || [];
}
