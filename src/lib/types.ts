export interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  score?: string;
  competition: string;
  location: string;
  report?: string;
  attendance?: number;
  homeLogo?: string;
  awayLogo?: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export interface MatchPhoto {
  id: string;
  url: string;
  caption?: string;
  matchId: string;
  date: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier: string;
}

export interface Competitor {
  id: string;
  name: string;
  logo: string;
  shortName?: string;
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
  points: number;
  form: string[];
}

export interface PlayerStats {
  goals?: number;
  assists?: number;
  appearances?: number;
  cleanSheets?: number;
}

export interface Player {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  number?: number;
  isAcademy?: boolean;
  image?: string;
  stats?: PlayerStats;
}
