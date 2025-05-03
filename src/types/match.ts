
export interface Match {
  id: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  result?: {
    homeScore: number;
    awayScore: number;
    matchReportLink?: string;
  };
  ticketLink?: string;
  home?: string;
  away?: string;
}

export interface SupabaseMatch {
  id: string;
  match_date: string;
  match_time: string;
  venue: string;
  status: string;
  ticketco_event_id?: string;
  ticket_link?: string;
  home_score?: number;
  away_score?: number;
  match_report_link?: string;
  home_team_id: {
    id: string;
    name: string;
    logo_url?: string;
  };
  away_team_id: {
    id: string;
    name: string;
    logo_url?: string;
  };
  competition_id: {
    id: string;
    name: string;
    short_name?: string;
    logo_url?: string;
  };
}

// Function to convert Supabase match data to our app's Match format
export function convertSupabaseMatchToMatch(match: SupabaseMatch): Match {
  return {
    id: match.id,
    competition: match.competition_id.name,
    date: match.match_date,
    time: match.match_time || "",
    venue: match.venue || "",
    homeTeam: match.home_team_id.name,
    awayTeam: match.away_team_id.name,
    home: match.home_team_id.name,
    away: match.away_team_id.name,
    result: match.home_score !== undefined && match.away_score !== undefined
      ? {
          homeScore: match.home_score,
          awayScore: match.away_score,
          matchReportLink: match.match_report_link
        }
      : undefined,
    ticketLink: match.ticket_link
  };
}
