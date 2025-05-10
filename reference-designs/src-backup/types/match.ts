
export interface Match {
  id: string;
  date: string;
  time: string;
  competition: string;
  round?: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  status: "upcoming" | "live" | "finished" | "scheduled" | "completed" | "postponed" | "cancelled";
  isCompleted?: boolean;
  ticketLink?: string;
  matchReportLink?: string;
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

export interface MatchDetails extends Match {
  seasonId?: string;
  seasonCompetitionId?: string;
  homeTeamId?: number;
  awayTeamId?: number;
  isHighlighted?: boolean;
}
