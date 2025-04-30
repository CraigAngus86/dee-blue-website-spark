/**
 * Format match data from Supabase to the format expected by the MatchCarousel component
 */
export function formatMatchData(matches: any[], isCompleted: boolean = false) {
  if (!matches) return [];
  
  return matches.map(match => ({
    id: match.id,
    date: match.match_date,
    time: match.match_time,
    competition: match.competition_id?.name || "",
    competitionShort: match.competition_id?.short_name || "",
    competitionImage: match.competition_id?.logo_url || "",
    homeTeam: match.home_team_id?.name || "TBC",
    awayTeam: match.away_team_id?.name || "TBC",
    homeTeamLogo: match.home_team_id?.logo_url || "",
    awayTeamLogo: match.away_team_id?.logo_url || "",
    venue: match.venue || "TBC",
    isCompleted: isCompleted,
    homeScore: match.home_score,
    awayScore: match.away_score,
    ticketLink: match.ticket_link || "",
    matchReportLink: match.match_report_link || "",
    ticketcoEventId: match.ticketco_event_id || ""
  }));
}

/**
 * Format a date to a readable string
 */
export function formatDate(dateString: string, includeYear: boolean = true) {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  };
  
  if (includeYear) {
    options.year = 'numeric';
  }
  
  return date.toLocaleDateString('en-GB', options);
}

/**
 * Format time from 24h format to 12h format
 */
export function formatTime(timeString: string) {
  if (!timeString) return "";
  
  // Handle both time string formats (HH:MM:SS and HH:MM)
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return `${displayHours}:${minutes} ${ampm}`;
}
