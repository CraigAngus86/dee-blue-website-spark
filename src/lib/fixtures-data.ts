// Fixture data types for Banks o' Dee FC website

export interface Fixture {
  id: string;
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  venue?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

// Export empty array as fallback
export const fixtures: Fixture[] = [];
