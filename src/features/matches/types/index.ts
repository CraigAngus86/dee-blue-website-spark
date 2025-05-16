export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string | null;
}

export interface Competition {
  id: string;
  name: string;
  shortName: string;
  type: 'league' | 'cup' | 'friendly';
}

export interface Match {
  id: string;
  matchDate: string;
  matchTime: string | null;
  season: string;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
  ticketLink?: string;
  matchReportLink?: string;
  isHighlighted?: boolean;
}

export interface GroupedMatches {
  [yearMonth: string]: Match[];
}

export interface LeagueStanding {
  id: string;
  position: number;
  teamName: string;
  teamShortName: string;
  teamLogo: string | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'L' | 'D')[] | null;
}

export interface HeadToHead {
  totalMatches: number;
  homeTeamWins: number;
  awayTeamWins: number;
  draws: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  lastMatches: Match[];
}
