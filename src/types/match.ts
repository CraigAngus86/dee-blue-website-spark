
export interface Match {
  id: string;
  competition: string;
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
}

