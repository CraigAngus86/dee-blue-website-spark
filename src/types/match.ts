
// Match type definitions for the application

export interface MatchTeam {
  id: string;
  name: string;
  logo: string;
  shortName?: string;
  score?: number;
}

export interface Match {
  id: string;
  matchDate: string;
  date?: string; // Legacy support
  competition: string;
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  home?: { // Legacy support
    team: string;
    logo: string;
    score?: number;
  };
  away?: { // Legacy support
    team: string;
    logo: string;
    score?: number;
  };
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
