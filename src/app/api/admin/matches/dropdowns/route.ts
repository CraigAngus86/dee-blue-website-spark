import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Dropdown data for match modal
export async function GET() {
  try {
    // Fetch all dropdown data in parallel for efficiency
    const [teamsResult, competitionsResult, seasonsResult] = await Promise.all([
      // Teams: All teams ordered by name for easy selection
      supabase
        .from('teams')
        .select('id, name, short_name, logo_url')
        .order('name'),
      
      // Competitions: All competitions ordered by type then name
      supabase
        .from('competitions')
        .select('id, name, short_name, type')
        .order('type', { ascending: true })
        .order('name', { ascending: true }),
      
      // Seasons: All seasons ordered by most recent first
      supabase
        .from('seasons')
        .select('id, name, start_date, end_date, is_current_season')
        .order('start_date', { ascending: false })
    ]);

    // Check for errors
    if (teamsResult.error) throw new Error(`Teams fetch failed: ${teamsResult.error.message}`);
    if (competitionsResult.error) throw new Error(`Competitions fetch failed: ${competitionsResult.error.message}`);
    if (seasonsResult.error) throw new Error(`Seasons fetch failed: ${seasonsResult.error.message}`);

    // Format data for dropdown consumption
    const dropdownData = {
      teams: teamsResult.data?.map(team => ({
        value: team.id,
        label: team.name,
        shortName: team.short_name,
        logoUrl: team.logo_url
      })) || [],
      
      competitions: competitionsResult.data?.map(comp => ({
        value: comp.id,
        label: comp.name,
        shortName: comp.short_name,
        type: comp.type
      })) || [],
      
      seasons: seasonsResult.data?.map(season => ({
        value: season.id,
        label: season.name,
        isCurrent: season.is_current_season,
        startDate: season.start_date,
        endDate: season.end_date
      })) || []
    };

    // Add summary for debugging
    const summary = {
      teamsCount: dropdownData.teams.length,
      competitionsCount: dropdownData.competitions.length,
      seasonsCount: dropdownData.seasons.length,
      currentSeason: dropdownData.seasons.find(s => s.isCurrent)?.label || 'None'
    };

    return NextResponse.json({
      success: true,
      data: dropdownData,
      summary
    });

  } catch (error) {
    console.error('Dropdown data fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dropdown data'
    }, { status: 500 });
  }
}
