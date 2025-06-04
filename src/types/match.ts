// Match type definitions matching database schema
export interface MatchTeam {
  id: string;
  name: string;
  logo_url: string;
  short_name?: string;
  score?: number;
}

export interface Competition {
  id: string;
  name: string;
  short_name?: string;
}

export interface Match {
  id: string;
  match_date: string;
  match_time?: string;
  competition: Competition;
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  home_team: MatchTeam;
  away_team: MatchTeam;
  ticket_link?: string;
  attendance?: number;
  referee?: string;
  highlights?: string;
  report?: string;
  gallery?: {
    id: string;
    images: MatchImage[];
  };
}

export interface MatchImage {
  src: string;
  thumbnail: string;
  alt: string;
  caption?: string;
  credit?: string;
  category?: 'action' | 'fans' | 'pre-match' | 'post-match' | 'highlights';
  featured?: boolean;
}

export interface LeagueStanding {
  position: number;
  team: string;
  teamLogo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: ('W' | 'L' | 'D')[];
}
