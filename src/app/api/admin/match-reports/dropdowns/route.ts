import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Dropdown data for match reports modal
export async function GET() {
  try {
    // Fetch recent completed matches from updated view (using short_name)
    const { data: recentMatches, error: matchesError } = await supabase
      .from('vw_recent_matches_admin')
      .select('*')
      .order('match_date', { ascending: false });

    if (matchesError) {
      console.error('Failed to fetch recent matches:', matchesError);
      throw matchesError;
    }

    // Format data for dropdown consumption
    const dropdownData = {
      recentMatches: recentMatches?.map(match => ({
        value: match.id,
        label: `${match.home_team_name} v ${match.away_team_name} Match Report`,
        matchDate: match.match_date,
        homeTeam: match.home_team_name,
        awayTeam: match.away_team_name,
        score: `${match.home_score}-${match.away_score}`,
        competition: match.competition_name
      })) || []
    };

    // Add summary for debugging
    const summary = {
      recentMatchesCount: dropdownData.recentMatches.length,
      oldestMatch: recentMatches?.[recentMatches.length - 1]?.match_date,
      newestMatch: recentMatches?.[0]?.match_date
    };

    return NextResponse.json({
      success: true,
      data: dropdownData,
      summary
    });

  } catch (error) {
    console.error('Match reports dropdown data fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dropdown data'
    }, { status: 500 });
  }
}
