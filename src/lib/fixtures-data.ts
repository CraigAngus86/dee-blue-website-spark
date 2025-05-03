
// Fixture data type
export interface Fixture {
  id: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  home: string;
  away: string;
  result?: {
    homeScore: number;
    awayScore: number;
  };
  ticketLink?: string;
}

// Sample fixtures data
export const fixtures: Fixture[] = [
  {
    id: "1",
    competition: "Highland League",
    date: "2023-10-15",
    time: "15:00",
    venue: "Spain Park",
    home: "Banks o' Dee",
    away: "Buckie Thistle",
    result: {
      homeScore: 2,
      awayScore: 1
    }
  },
  {
    id: "2",
    competition: "Highland League",
    date: "2023-10-22",
    time: "15:00",
    venue: "Spain Park",
    home: "Banks o' Dee",
    away: "Formartine United"
  },
  {
    id: "3",
    competition: "North of Scotland Cup",
    date: "2023-10-29",
    time: "15:00",
    venue: "Victoria Park",
    home: "Fraserburgh",
    away: "Banks o' Dee",
    result: {
      homeScore: 0,
      awayScore: 2
    }
  },
  {
    id: "4",
    competition: "Highland League",
    date: "2023-11-05",
    time: "15:00",
    venue: "Spain Park",
    home: "Banks o' Dee",
    away: "Keith"
  },
  {
    id: "5", 
    competition: "Scottish Cup",
    date: "2023-11-12",
    time: "15:00",
    venue: "Spain Park",
    home: "Banks o' Dee",
    away: "Brechin City",
    ticketLink: "https://tickets.banksofdeefc.co.uk"
  },
  {
    id: "6",
    competition: "Highland League",
    date: "2023-10-08",
    time: "15:00",
    venue: "Princess Royal Park",
    home: "Deveronvale",
    away: "Banks o' Dee",
    result: {
      homeScore: 1,
      awayScore: 3
    }
  },
  {
    id: "7",
    competition: "Highland League",
    date: "2023-10-01",
    time: "15:00",
    venue: "Mosset Park",
    home: "Forres Mechanics",
    away: "Banks o' Dee",
    result: {
      homeScore: 0,
      awayScore: 2
    }
  }
];
