import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Dropdown data for news modal
export async function GET() {
  try {
    // Static categories from schema
    const categories = [
      { value: 'matchReport', label: 'Match Report' },
      { value: 'clubNews', label: 'Club News' },
      { value: 'teamNews', label: 'Team News' },
      { value: 'communityNews', label: 'Community News' },
      { value: 'commercialNews', label: 'Commercial News' }
    ];

    // Fetch recent completed matches (last 5 before today)
    const { data: recentMatches, error: matchesError } = await supabase
      .from('vw_match_admin')
      .select('id, home_team_name, away_team_name, match_date, home_score, away_score')
      .eq('status', 'completed')
      .lt('match_date', new Date().toISOString().split('T')[0]) // Before today
      .order('match_date', { ascending: false })
      .limit(5);

    if (matchesError) {
      console.warn('Failed to fetch recent matches:', matchesError);
    }

    // Format data for dropdown consumption
    const dropdownData = {
      categories,
      recentMatches: recentMatches?.map(match => ({
        value: match.id,
        label: `${match.home_team_name} ${match.home_score}-${match.away_score} ${match.away_team_name}`,
        matchDate: match.match_date
      })) || []
    };

    // Add summary for debugging
    const summary = {
      categoriesCount: dropdownData.categories.length,
      recentMatchesCount: dropdownData.recentMatches.length
    };

    return NextResponse.json({
      success: true,
      data: dropdownData,
      summary
    });

  } catch (error) {
    console.error('News dropdown data fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dropdown data'
    }, { status: 500 });
  }
}
