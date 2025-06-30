import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanityClient } from '@/lib/sanity/client';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Dropdown data for sponsor modal
export async function GET() {
  try {
    // Fetch upcoming matches from Supabase (for match sponsor linking)
    const { data: upcomingMatches, error: matchesError } = await supabase
      .from('vw_upcoming_matches')
      .select('*')
      .order('match_date', { ascending: true });

    if (matchesError) {
      console.error('Failed to fetch upcoming matches:', matchesError);
      throw matchesError;
    }

    // Fetch active players from Sanity (for player sponsor linking)
    const activePlayers = await sanityClient.fetch(`
      *[_type == "playerProfile" && personType == "player"] {
        _id,
        firstName,
        lastName,
        playerPosition,
        profileImage
      } | order(lastName asc)
    `);

    // Format data for dropdown consumption
    const dropdownData = {
      upcomingMatches: upcomingMatches?.map(match => ({
        value: match.id,
        label: `${match.home_team} v ${match.away_team} - ${new Date(match.match_date).toLocaleDateString('en-GB')}`,
        matchDate: match.match_date,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        competition: match.competition,
        venue: match.venue
      })) || [],
      
      activePlayers: activePlayers?.map((player: any) => ({
        value: player._id,
        label: `${player.firstName} ${player.lastName}`,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.playerPosition,
        hasImage: !!player.profileImage
      })) || []
    };

    // Add summary for debugging
    const summary = {
      upcomingMatchesCount: dropdownData.upcomingMatches.length,
      activePlayersCount: dropdownData.activePlayers.length,
      nextMatch: upcomingMatches?.[0]?.match_date,
      lastMatch: upcomingMatches?.[upcomingMatches.length - 1]?.match_date
    };

    return NextResponse.json({
      success: true,
      data: dropdownData,
      summary
    });

  } catch (error) {
    console.error('Sponsor dropdown data fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dropdown data'
    }, { status: 500 });
  }
}
