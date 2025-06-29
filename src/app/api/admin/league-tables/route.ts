import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Fetch staging and live league table data
export async function GET(request: NextRequest) {
 try {
   // Get current season
   const { data: currentSeason, error: seasonError } = await supabase
     .from('seasons')
     .select('id, name')
     .eq('is_current_season', true)
     .single();

   if (seasonError || !currentSeason) {
     throw new Error('Current season not found');
   }

   // Get staging data using view
   const { data: stagingData, error: stagingError } = await supabase
     .from('vw_league_table_staging')
     .select('*')
     .order('position');

   if (stagingError) {
     console.error('Staging table error:', stagingError);
   }

   // Get live data using view (current season only)
   const { data: liveData, error: liveError } = await supabase
     .from('vw_league_table_live')
     .select('*')
     .eq('season_id', currentSeason.id)
     .order('position');

   if (liveError) {
     console.error('Live table error:', liveError);
   }

   // Get latest scrape info
   let lastScrapeTime = null;
   let lastScrapeStatus = 'never';
   
   if (stagingData && stagingData.length > 0) {
     lastScrapeTime = stagingData[0].scrape_timestamp;
     lastScrapeStatus = 'success';
   }

   // Check if staging differs from live
   const hasStagingData = stagingData && stagingData.length > 0;
   const hasLiveData = liveData && liveData.length > 0;
   
   let stagingNeedsReview = false;
   if (hasStagingData) {
     if (!hasLiveData) {
       stagingNeedsReview = true; // No live data, staging is new
     } else {
       // Compare points to see if there are changes
       const stagingPoints = stagingData.map(s => s.points).join(',');
       const livePoints = liveData.map(l => l.points).join(',');
       stagingNeedsReview = stagingPoints !== livePoints;
     }
   }

   return NextResponse.json({
     success: true,
     data: {
       season: currentSeason,
       staging: {
         data: stagingData || [],
         count: stagingData?.length || 0,
         lastUpdated: lastScrapeTime,
         needsReview: stagingNeedsReview
       },
       live: {
         data: liveData || [],
         count: liveData?.length || 0,
         lastUpdated: liveData?.[0]?.updated_at || null
       },
       scraper: {
         lastScrapeTime,
         lastScrapeStatus,
         nextScheduled: '18:00 BST daily'
       }
     }
   });

 } catch (error) {
   console.error('GET league tables error:', error);
   return NextResponse.json({
     success: false,
     error: error instanceof Error ? error.message : 'Failed to fetch league table data'
   }, { status: 500 });
 }
}

// POST: Handle staging actions
export async function POST(request: NextRequest) {
 try {
   const { action } = await request.json();

   if (action === 'apply_staging') {
     // Get current season
     const { data: currentSeason } = await supabase
       .from('seasons')
       .select('id')
       .eq('is_current_season', true)
       .single();

     if (!currentSeason) {
       throw new Error('Current season not found');
     }

     // Get staging data
     const { data: stagingData, error: stagingError } = await supabase
       .from('league_table_staging')
       .select('*');

     if (stagingError || !stagingData || stagingData.length === 0) {
       throw new Error('No staging data to apply');
     }

     // Begin transaction: Delete current season live data, then insert staging data
     // First delete current season data only
     const { error: deleteError } = await supabase
       .from('league_table')
       .delete()
       .eq('season_id', currentSeason.id);

     if (deleteError) {
       throw new Error(`Failed to clear live table: ${deleteError.message}`);
     }

     // Prepare staging data for live table (remove staging-specific fields and auto-calculated fields)
     const liveTableData = stagingData.map(item => ({
       season_id: item.season_id,
       competition_id: item.competition_id,
       team_id: item.team_id,
       position: item.position,
       points: item.points,
       matches_played: item.matches_played,
       wins: item.wins,
       draws: item.draws,
       losses: item.losses,
       goals_for: item.goals_for,
       goals_against: item.goals_against,
       // goal_difference removed - auto-calculated by database
       form: item.form
     }));

     // Insert staging data into live table
     const { error: insertError } = await supabase
       .from('league_table')
       .insert(liveTableData);

     if (insertError) {
       throw new Error(`Failed to apply staging data: ${insertError.message}`);
     }

     return NextResponse.json({
       success: true,
       message: `Applied ${stagingData.length} teams to live table`
     });
   }

   if (action === 'reject_staging') {
     // Clear staging table
     const { error } = await supabase
       .from('league_table_staging')
       .delete()
       .neq('id', '00000000-0000-0000-0000-000000000000');

     if (error) throw error;

     return NextResponse.json({
       success: true,
       message: 'Staging data cleared successfully'
     });
   }

   return NextResponse.json({
     success: false,
     error: 'Invalid action'
   }, { status: 400 });

 } catch (error) {
   console.error('POST league tables error:', error);
   return NextResponse.json({
     success: false,
     error: error instanceof Error ? error.message : 'Failed to process request'
   }, { status: 500 });
 }
}
