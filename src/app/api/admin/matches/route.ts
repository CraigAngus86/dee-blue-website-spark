import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Single match by ID OR paginated matches with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE MATCH FETCHING (for EDIT mode)
    if (id) {
      const { data, error } = await supabase
        .from('vw_match_admin')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json({
            success: false,
            error: 'Match not found'
          }, { status: 404 });
        }
        throw error;
      }

      return NextResponse.json({
        success: true,
        matches: [data], // AdminModal expects matches array
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED MATCHES FETCHING (for table view)
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const season = searchParams.get('season');
    const competition = searchParams.get('competition');
    const month = searchParams.get('month');

    // Start with view query
    let query = supabase
      .from('vw_match_admin')
      .select('*', { count: 'exact' });

    // Apply filters
    if (season && season !== 'all') {
      query = query.eq('season_id', season);
    }
    if (competition && competition !== 'all') {
      query = query.eq('competition_id', competition);
    }
    if (month && month !== 'all') {
      query = query.eq('match_month', parseInt(month));
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    // Order by date ASCENDING (soonest first)
    query = query.order('match_date', { ascending: true });

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      matches: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        hasMore: count ? count > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET matches error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch matches'
    }, { status: 500 });
  }
}

// POST: Create new match
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const requiredFields = ['home_team_id', 'away_team_id', 'match_date', 'competition_id', 'season_id'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Check teams are different
    if (body.home_team_id === body.away_team_id) {
      return NextResponse.json({
        success: false,
        error: 'Home and away teams must be different'
      }, { status: 400 });
    }

    // Create match
    const { data, error } = await supabase
      .from('match')
      .insert([{
        home_team_id: body.home_team_id,
        away_team_id: body.away_team_id,
        match_date: body.match_date,
        match_time: body.match_time || null,
        venue: body.venue || 'Spain Park',
        competition_id: body.competition_id,
        season_id: body.season_id,
        status: 'scheduled', // Default status
        hospitality_available: body.hospitality_available || false,
        is_highlighted: body.is_highlighted || false,
        ticket_link: body.ticket_link || null,
        match_report_link: body.match_report_link || null,
        gallery_idsanity: body.gallery_idsanity || null,
        match_sponsor_id: body.match_sponsor_id || null
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Match created successfully'
    });

  } catch (error) {
    console.error('POST match error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create match'
    }, { status: 500 });
  }
}

// PUT: Update existing match
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Match ID is required'
      }, { status: 400 });
    }

    // Frozen fields protection - these cannot be changed in edit mode
    const frozenFields = ['home_team_id', 'away_team_id', 'match_date', 'match_time', 'venue', 'competition_id', 'season_id'];
    const attemptedFrozenUpdates = Object.keys(updateData).filter(key => frozenFields.includes(key));
    
    if (attemptedFrozenUpdates.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Cannot update frozen fields: ${attemptedFrozenUpdates.join(', ')}`
      }, { status: 400 });
    }

    // Update match
    const { data, error } = await supabase
      .from('match')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Match updated successfully'
    });

  } catch (error) {
    console.error('PUT match error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to update match'
    }, { status: 500 });
  }
}

// DELETE: Delete match with dependency warnings
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Match ID is required'
      }, { status: 400 });
    }

    // Check for dependent records
    const { data: matchData } = await supabase
      .from('match')
      .select('gallery_idsanity, match_report_link')
      .eq('id', id)
      .single();

    const warnings = [];
    if (matchData?.gallery_idsanity) warnings.push('Gallery will lose connection');
    if (matchData?.match_report_link) warnings.push('Match report will lose connection');

    // Delete match
    const { error } = await supabase
      .from('match')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Match deleted successfully',
      warnings: warnings.length > 0 ? warnings : undefined
    });

  } catch (error) {
    console.error('DELETE match error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete match'
    }, { status: 500 });
  }
}
