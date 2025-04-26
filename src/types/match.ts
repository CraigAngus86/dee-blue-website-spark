
export interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  score?: string;
  competition: string;
  location: string;
  venue?: string;
  report?: string;
  attendance?: number;
  homeLogo?: string;
  awayLogo?: string;
  round?: string;
  ticketLink?: string;
  status?: 'upcoming' | 'live' | 'finished';
}
