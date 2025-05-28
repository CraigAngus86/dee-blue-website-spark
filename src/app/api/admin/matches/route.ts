import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // Get recent matches (completed in last 30 days or upcoming in next 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const thirtyDaysAhead = new Date();
    thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 30);
    
    const { data, error } = await supabase
      .from('match')
      .select(`
        id,
        match_date,
        home_team_id,
        away_team_id,
        home_team:teams!home_team_id(id, name),
        away_team:teams!away_team_id(id, name)
      `)
      .gte('match_date', thirtyDaysAgo.toISOString().split('T')[0])
      .lte('match_date', thirtyDaysAhead.toISOString().split('T')[0])
      .order('match_date', { ascending: false })
      .limit(5);
    
    if (error) throw error;
    
    // Format for dropdown
    const matches = data.map(match => ({
      id: match.id,
      date: new Date(match.match_date).toLocaleDateString(),
      homeTeam: (match.home_team as any)?.name || 'Unknown',
      awayTeam: (match.away_team as any)?.name || 'Unknown',
      display: `${new Date(match.match_date).toLocaleDateString()} - ${(match.home_team as any)?.name || 'Unknown'} vs ${(match.away_team as any)?.name || 'Unknown'}`
    }));
    
    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json([], { status: 500 });
  }
}
