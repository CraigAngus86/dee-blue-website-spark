
// Match types

export interface Match {
  id: string;
  match_date: string;  // YYYY-MM-DD format
  match_time?: string; // HH:MM:SS format
  home_team: Team;
  away_team: Team;
  competition: Competition;
  venue?: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  home_score?: number;
  away_score?: number;
  ticket_link?: string;
  match_report_link?: string;
}

export interface Team {
  id: string;
  name: string;
  short_name?: string;
  logo_url?: string;
}

export interface Competition {
  id: string;
  name: string;
  short_name?: string;
  logo_url?: string;
}
