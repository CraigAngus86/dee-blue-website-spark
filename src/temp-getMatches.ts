// TEMP: Add this to your page.tsx file to help with debugging

async function getMatches() {
  try {
    console.log("Starting getMatches function");
    
    const upcomingMatchesRaw = await getUpcomingMatches(5);
    console.log(`Raw upcoming matches fetched: ${upcomingMatchesRaw.length}`);
    
    // Simplified transformation for debugging
    const upcomingMatches = upcomingMatchesRaw.map(match => {
      return {
        id: match.id,
        match_date: match.match_date,
        match_time: match.match_time,
        venue: match.venue || '',
        status: match.status,
        ticket_link: match.ticket_link,
        home_team: match.homeTeam || match.home_team,
        away_team: match.awayTeam || match.away_team,
        competition: match.competition
      };
    });
    
    const recentMatchesRaw = await getRecentMatches(5);
    console.log(`Raw recent matches fetched: ${recentMatchesRaw.length}`);
    
    // Simplified transformation for debugging
    const recentMatches = recentMatchesRaw.map(match => {
      return {
        id: match.id,
        match_date: match.match_date,
        match_time: match.match_time,
        venue: match.venue || '',
        status: match.status,
        home_score: match.home_score,
        away_score: match.away_score,
        match_report_link: match.match_report_link,
        home_team: match.homeTeam || match.home_team,
        away_team: match.awayTeam || match.away_team,
        competition: match.competition
      };
    });
    
    console.log(`Final upcoming matches count: ${upcomingMatches.length}`);
    console.log(`Final recent matches count: ${recentMatches.length}`);
    
    return {
      upcoming: upcomingMatches,
      recent: recentMatches
    };
  } catch (error) {
    console.error("Error fetching matches:", error);
    return { upcoming: [], recent: [] };
  }
}
