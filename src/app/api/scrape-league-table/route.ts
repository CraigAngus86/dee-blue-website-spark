// SIMPLE TEST: Try multiple SofaScore URLs with proper embedding headers
// Super methodical - test each URL and see what actually works

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Methodical SofaScore URL Testing');
    
    // Try multiple URLs to see what works
    const urlsToTest = [
      // Original widget URL
      'https://widgets.sofascore.com/embed/tournament/115432/season/78996/standings/UAE%202nd%20Division%2025%2F26?widgetTitle=UAE%202nd%20Division%2025%2F26&showCompetitionLogo=true',
      
      // Simpler widget URL
      'https://widgets.sofascore.com/embed/tournament/115432/season/78996/standings',
      
      // Main tournament page
      'https://www.sofascore.com/tournament/football/united-arab-emirates/division-2/20434'
    ];
    
    for (let i = 0; i < urlsToTest.length; i++) {
      const testUrl = urlsToTest[i];
      console.log(`📡 Test ${i + 1}: ${testUrl}`);
      
      try {
        const response = await fetch(testUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://example.com/', // Simulate being embedded on a website
            'Sec-Fetch-Dest': 'iframe',        // Indicate this is for iframe
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'no-cache'
          }
        });
        
        console.log(`📊 URL ${i + 1} - Status:`, response.status);
        
        if (response.ok) {
          const content = await response.text();
          console.log(`✅ URL ${i + 1} SUCCESS - Content length:`, content.length);
          
          const preview = content.substring(0, 500);
          
          return NextResponse.json({
            success: true,
            workingUrl: testUrl,
            status: response.status,
            statusText: response.statusText,
            contentType: response.headers.get('content-type'),
            contentLength: content.length,
            contentPreview: preview,
            hasTableData: content.includes('<table>') || content.includes('table'),
            hasStandingsData: content.includes('standings') || content.includes('position'),
            hasTeamData: content.includes('Baynounah') || content.includes('team'),
            message: `URL ${i + 1} worked! Found content.`
          });
        } else {
          console.log(`❌ URL ${i + 1} - Status: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`❌ URL ${i + 1} - Error:`, error);
      }
    }
    
    // If we get here, all URLs failed
    return NextResponse.json({
      success: false,
      message: 'All SofaScore URLs failed with 403 or errors',
      testedUrls: urlsToTest.length,
      note: 'SofaScore appears to have strong anti-bot protection'
    });
    
  } catch (error) {
    console.error('❌ All SofaScore tests failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'All SofaScore URL tests failed'
    });
  }
}