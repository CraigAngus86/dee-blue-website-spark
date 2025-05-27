import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper function to parse BBC timestamp
function parseBBCTimestamp(bbcTimestamp: string): string {
  try {
    // Convert "3rd May 2025 at 16:49" to proper ISO format
    const cleanedTimestamp = bbcTimestamp
      .replace(/(\d+)(st|nd|rd|th)/, '$1') // Remove ordinal suffixes
      .replace(' at ', ' '); // Remove "at"
    
    const date = new Date(cleanedTimestamp);
    return date.toISOString();
  } catch (error) {
    console.warn('Failed to parse BBC timestamp:', bbcTimestamp);
    return new Date().toISOString(); // Fallback to current time
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 BBC Scraper API called');
    
    // Step 1: Get team mapping and season info
    const { data: teamMapping, error: mappingError } = await supabase
      .from('vw_scraper_team_mapping')
      .select('*')
      .limit(1);
    
    if (mappingError || !teamMapping?.length) {
      throw new Error(`Team mapping failed: ${mappingError?.message}`);
    }
    
    const seasonId = teamMapping[0].active_season_id;
    const competitionId = teamMapping[0].highland_league_competition_id;
    console.log('✅ Season ID:', seasonId);
    
    // Step 2: Get all team mappings
    const { data: allTeams, error: teamsError } = await supabase
      .from('vw_scraper_team_mapping')
      .select('*');
    
    if (teamsError) {
      throw new Error(`Teams fetch failed: ${teamsError.message}`);
    }
    
    // Step 3: Fetch and parse BBC table
    const bbcUrl = 'https://feeds.bbci.co.uk/sport/football/highland-league/table';
    const response = await fetch(bbcUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Banks o Dee FC League Scraper)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`BBC fetch failed: ${response.status}`);
    }
    
    const htmlContent = await response.text();
    const timestampMatch = htmlContent.match(/(\d+\w+\s+\w+\s+\d{4}\s+at\s+\d+:\d+)/i);
    const bbcTimestamp = timestampMatch ? timestampMatch[1].trim() : 'Unknown';
    const parsedBBCTimestamp = parseBBCTimestamp(bbcTimestamp);
    
    console.log('📅 BBC timestamp raw:', bbcTimestamp);
    console.log('📅 BBC timestamp parsed:', parsedBBCTimestamp);
    
    // Step 4: Parse complete table data
    const $ = cheerio.load(htmlContent);
    const tableRows = $('table tbody tr');
    const scrapeTimestamp = new Date().toISOString();
    
    const stagingData = [];
    
    tableRows.each((index, row) => {
      const $row = $(row);
      const cells = $row.find('td');
      
      if (cells.length >= 9) {
        const teamName = cells.eq(0).text().trim().replace(/^\d+/, '').trim();
        const teamMap = allTeams?.find(t => t.bbc_name === teamName);
        
        if (teamMap) {
          // Parse form data (last column)
          const formText = cells.eq(9).text().trim();
          const formArray = formText.split('').filter(char => ['W', 'D', 'L'].includes(char)).slice(-6);
          
          stagingData.push({
            scrape_timestamp: scrapeTimestamp,
            bbc_last_updated: parsedBBCTimestamp,
            season_id: seasonId,
            competition_id: competitionId,
            team_id: teamMap.team_uuid,
            team_bbc_name: teamName,
            position: index + 1,
            points: parseInt(cells.eq(8).text().trim()),
            matches_played: parseInt(cells.eq(1).text().trim()),
            wins: parseInt(cells.eq(2).text().trim()),
            draws: parseInt(cells.eq(3).text().trim()),
            losses: parseInt(cells.eq(4).text().trim()),
            goals_for: parseInt(cells.eq(5).text().trim()),
            goals_against: parseInt(cells.eq(6).text().trim()),
            goal_difference: parseInt(cells.eq(7).text().trim()),
            form: formArray,
            validation_status: 'success'
          });
        }
      }
    });
    
    // Step 5: Insert into staging table
    const { error: insertError } = await supabase
      .from('league_table_staging')
      .insert(stagingData);
    
    if (insertError) {
      throw new Error(`Staging insert failed: ${insertError.message}`);
    }
    
    console.log('✅ Successfully inserted', stagingData.length, 'records to staging');
    
    return NextResponse.json({
      success: true,
      message: 'BBC table scraped and staged successfully',
      timestamp: new Date().toISOString(),
      bbcTimestamp,
      parsedBBCTimestamp,
      recordsProcessed: stagingData.length,
      sampleRecord: stagingData[2] // Banks O' Dee record
    });
    
  } catch (error) {
    console.error('❌ Scraper error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
