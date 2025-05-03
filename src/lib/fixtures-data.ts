
export interface Fixture {
  id: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  home: {
    name: string;
    logo: string;
  };
  away: {
    name: string;
    logo: string;
  };
  result?: {
    homeScore: number;
    awayScore: number;
    matchReportLink?: string;
  };
  ticketLink?: string;
}

// Mock data to help with development and testing
export const fixtures: Fixture[] = [
  {
    id: "1",
    competition: "Highland League",
    date: "2024-10-15",
    time: "15:00",
    venue: "Spain Park",
    home: {
      name: "Banks o' Dee",
      logo: "/assets/images/logos/BOD_Logo_Navy_square.png"
    },
    away: {
      name: "Buckie Thistle",
      logo: "/assets/images/competitors/Buckie.png"
    }
  },
  {
    id: "2",
    competition: "Highland League",
    date: "2024-10-22",
    time: "15:00",
    venue: "Harmsworth Park",
    home: {
      name: "Wick Academy",
      logo: "/assets/images/competitors/Wick.png"
    },
    away: {
      name: "Banks o' Dee",
      logo: "/assets/images/logos/BOD_Logo_Navy_square.png"
    }
  }
];

export const results: Fixture[] = [
  {
    id: "3",
    competition: "Highland League",
    date: "2024-10-08",
    time: "15:00",
    venue: "Spain Park",
    home: {
      name: "Banks o' Dee",
      logo: "/assets/images/logos/BOD_Logo_Navy_square.png"
    },
    away: {
      name: "Formartine United",
      logo: "/assets/images/competitors/Formartine.png"
    },
    result: {
      homeScore: 2,
      awayScore: 1,
      matchReportLink: "/news/banks-o-dee-2-1-formartine-united"
    }
  },
  {
    id: "4",
    competition: "Highland League",
    date: "2024-10-01",
    time: "15:00",
    venue: "Kynoch Park",
    home: {
      name: "Keith",
      logo: "/assets/images/competitors/Keith.png"
    },
    away: {
      name: "Banks o' Dee",
      logo: "/assets/images/logos/BOD_Logo_Navy_square.png"
    },
    result: {
      homeScore: 0,
      awayScore: 3
    }
  }
];
