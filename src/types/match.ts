
export interface Match {
  id: string;
  competition: string;
  round?: string; // Added round property
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
  isCompleted?: boolean;
  ticketLink?: string;
  matchReportLink?: string;
  result?: { // Added result object
    homeScore: number;
    awayScore: number;
  };
}
