import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Daily scrape cron started at', new Date().toISOString());
    
    // Step 1: Scrape BBC data
    console.log('📡 Scraping BBC Highland League table...');
    const scrapeResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/scrape-league-table`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const scrapeResult = await scrapeResponse.json();
    
    if (!scrapeResult.success) {
      console.error('❌ Scrape failed:', scrapeResult.error);
      return NextResponse.json({
        success: false,
        step: 'scrape',
        error: scrapeResult.error
      }, { status: 500 });
    }
    
    console.log('✅ Scrape successful:', scrapeResult.recordsProcessed, 'teams processed');
    
    // Step 2: Get staging data and validate
    console.log('🔍 Fetching staging data for validation...');
    const dataResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/league-tables`);
    const dataResult = await dataResponse.json();
    
    if (!dataResult.success) {
      console.error('❌ Failed to fetch staging data:', dataResult.error);
      return NextResponse.json({
        success: false,
        step: 'fetch_staging',
        error: dataResult.error
      }, { status: 500 });
    }
    
    // Step 3: Validate staging data
    const stagingData = dataResult.data.staging.data;
    const validationIssues = validateStagingData(stagingData);
    
    if (validationIssues.length > 0) {
      console.warn('⚠️ Validation issues found:', validationIssues);
      
      // TODO: Send email notification to admin
      console.log('📧 Email notification would be sent here for validation issues');
      
      return NextResponse.json({
        success: false,
        step: 'validation',
        issues: validationIssues,
        message: 'Validation failed - admin intervention required'
      });
    }
    
    console.log('✅ Validation passed - applying to live table');
    
    // Step 4: Apply staging to live table
    const applyResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/league-tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'apply_staging' })
    });
    
    const applyResult = await applyResponse.json();
    
    if (!applyResult.success) {
      console.error('❌ Apply failed:', applyResult.error);
      return NextResponse.json({
        success: false,
        step: 'apply',
        error: applyResult.error
      }, { status: 500 });
    }
    
    console.log('✅ Daily scrape completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Daily scrape completed successfully',
      teamsProcessed: scrapeResult.recordsProcessed,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Daily scrape cron error:', error);
    return NextResponse.json({
      success: false,
      step: 'unknown',
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}

// Validation function (copied from LeagueTablesTab logic)
function validateStagingData(stagingData: any[]): string[] {
  const issues: string[] = [];
  
  if (!stagingData) {
    issues.push('No staging data found');
    return issues;
  }
  
  // Check team count
  if (stagingData.length !== 18) {
    issues.push(`Expected 18 teams, found ${stagingData.length}`);
  }
  
  // Check for mathematical consistency
  stagingData.forEach((team: any) => {
    const expectedPoints = (team.wins * 3) + team.draws;
    const expectedGames = team.wins + team.draws + team.losses;
    
    if (team.points !== expectedPoints) {
      issues.push(`${team.team_name}: Points mismatch (${team.points} vs expected ${expectedPoints})`);
    }
    
    if (team.matches_played !== expectedGames) {
      issues.push(`${team.team_name}: Games played mismatch (${team.matches_played} vs expected ${expectedGames})`);
    }
  });
  
  return issues;
}

// GET endpoint for manual testing
export async function GET() {
  return NextResponse.json({
    message: 'Daily scrape cron endpoint',
    schedule: '7pm GMT/BST daily',
    manual_test: 'POST to this endpoint to run manually'
  });
}
