
export interface Match {
  id: string;
  competition: string;
  round?: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue: string; // Making venue required
  status: string;
  homeScore?: number;
  awayScore?: number;
  isCompleted?: boolean;
  ticketLink?: string;
  matchReportLink?: string;
  result?: {
    homeScore: number;
    awayScore: number;
  };
}
