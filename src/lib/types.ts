export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: string;
  tags?: string[];
  category?: string;
  date?: string;
  match?: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  logoLight?: string;
  website?: string;
  tier: 'main' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
}

export interface Competitor {
  name: string;
  logo: string;
  shortName?: string;
  website?: string;
  logoVariant?: 'rect' | 'square' | 'circle';
}

export interface MatchPhoto {
  src: string;
  thumbnail: string;
  alt: string;
  caption?: string;
  credit?: string;
  category?: 'action' | 'fans' | 'pre-match' | 'post-match' | 'highlights';
  featured?: boolean;
}

export interface Match {
  id: string;
  date: string;
  competition: string;
  home: {
    team: string;
    logo: string;
    score?: number;
  };
  away: {
    team: string;
    logo: string;
    score?: number;
  };
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed';
  photos?: MatchPhoto[];
}

export interface LeagueTableData {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
}

export interface Player {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  position: string;
  image: string;
  isAcademy?: boolean;
  stats?: PlayerStats;
}
