// Fixture data types for Banks o' Dee FC website

interface Team {
  name: string;
  logo: string;
}

export interface Fixture {
  id: string;
  date: string;
  time?: string;
  home: Team;
  away: Team;
  competition: string;
  venue?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: {
    homeScore: number;
    awayScore: number;
    matchReportLink?: string;
  };
}

// Export empty array as fallback
export const fixtures: Fixture[] = [];
