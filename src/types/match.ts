
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
  ticketLink?: string;
  matchReportLink?: string;
  isCompleted?: boolean;
}
