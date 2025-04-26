
export interface Match {
  id: string;
  date: string;
  time: string;
  competition: string;
  round?: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  status: "upcoming" | "live" | "finished";
  isCompleted?: boolean;
  ticketLink?: string;
  matchReportLink?: string;
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

