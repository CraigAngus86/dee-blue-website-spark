
export interface Match {
  id: string;
  date: string;
  time: string;
  venue: string;
  homeTeam: {
    id: string;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
  };
  competition: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
  };
  result?: {
    homeScore: number;
    awayScore: number;
    matchReportLink: string;
  };
  ticketLink: string;
  status: string;
}
