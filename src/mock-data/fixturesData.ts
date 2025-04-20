import { Match } from "@/types/match";

// Convert date string (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const allFixtures: Match[] = [
  {
    id: '1',
    competition: 'Scottish Highland Football League',
    date: formatDate('27/07/2024'),
    time: '16:00',
    homeTeam: 'Formartine',
    awayTeam: "Banks o' Dee",
    venue: 'North Lodge Park',
    homeScore: 0,
    awayScore: 2,
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 2
    }
  },
  {
    id: '2',
    competition: 'Scottish Challenge Cup',
    date: formatDate('30/07/2024'),
    time: '20:45',
    homeTeam: "Banks o' Dee",
    awayTeam: 'Aberdeen FC B',
    venue: 'Spain Park',
    homeScore: 1,
    awayScore: 0,
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  {
    id: '3',
    competition: 'Scottish Highland Football League',
    date: formatDate('03/08/2024'),
    time: '16:00',
    homeTeam: "Banks o' Dee",
    awayTeam: 'Lossiemouth',
    venue: 'Spain Park',
    homeScore: 0,
    awayScore: 0,
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 0
    }
  },
  {
    id: '4',
    competition: 'Scottish Highland Football League',
    date: formatDate('07/08/2024'),
    time: '21:00',
    homeTeam: "Keith FC",
    awayTeam: "Banks o' Dee",
    venue: 'Kynoch Park',
    homeScore: 1,
    awayScore: 2,
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 2
    }
  },
  {
    id: '5',
    competition: 'Scottish Highland Football League',
    date: formatDate('10/08/2024'),
    time: '16:00',
    homeTeam: "Banks o' Dee",
    awayTeam: 'Nairn County',
    venue: 'Spain Park',
    homeScore: 4,
    awayScore: 0,
    isCompleted: true,
    result: {
      homeScore: 4,
      awayScore: 0
    }
  },
  {
    id: '6',
    competition: 'Scottish Challenge Cup',
    date: formatDate('13/08/2024'),
    time: '20:45',
    homeTeam: 'Elgin City',
    awayTeam: "Banks o' Dee",
    venue: 'Borough Briggs',
    homeScore: 2,
    awayScore: 1,
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 1
    }
  },
  {
    id: '7',
    competition: 'Scottish Highland Football League',
    date: formatDate('17/08/2024'),
    time: '16:00',
    homeTeam: "Banks o' Dee",
    awayTeam: 'Inverurie Locos',
    venue: 'Spain Park',
    homeScore: 1,
    awayScore: 1,
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 1
    }
  },
  {
    id: '8',
    competition: 'Scottish Highland Football League',
    date: formatDate('24/08/2024'),
    time: '16:00',
    homeTeam: 'Fraserburgh',
    awayTeam: "Banks o' Dee",
    venue: 'Bellslea Park',
    homeScore: 1,
    awayScore: 0,
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  {
    id: '38',
    competition: 'Scottish Highland Football League',
    date: formatDate('12/04/2025'),
    time: '16:00',
    homeTeam: 'Forres',
    awayTeam: "Banks o' Dee",
    venue: 'Mosset Park',
    isCompleted: false
  },
  {
    id: '39',
    competition: 'Highland League Cup - Final',
    date: formatDate('30/05/2025'),
    time: '19:45',
    homeTeam: "Banks o' Dee",
    awayTeam: 'Fraserburgh',
    venue: 'Spain Park',
    isCompleted: false,
    ticketLink: 'https://tickets.bankodee.com/cup-final'
  }
];

// Helper function to get dates as options for filter
export const getAvailableMonths = () => {
  const months = new Set();
  allFixtures.forEach(fixture => {
    const date = new Date(fixture.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    months.add(monthYear);
  });
  return Array.from(months);
};

// Helper function to get competitions as options for filter
export const getAvailableCompetitions = () => {
  const competitions = new Set();
  allFixtures.forEach(fixture => {
    competitions.add(fixture.competition.split(' - ')[0]); // Split to handle cases like "Cup - Final"
  });
  return Array.from(competitions);
};

// Helper function to get seasons as options for filter
export const getAvailableSeasons = () => {
  return ['2024/25'];
};

// Helper function to group matches by month
export const getMatchesByMonth = (matches: Match[]) => {
  return matches.reduce((acc, match) => {
    const date = new Date(match.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(match);
    return acc;
  }, {} as Record<string, Match[]>);
};

// Helper function to get completed matches (results)
export const getResults = () => {
  const now = new Date();
  return allFixtures
    .filter(match => match.isCompleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Helper function to get upcoming fixtures
export const getUpcomingFixtures = () => {
  const now = new Date();
  return allFixtures
    .filter(match => !match.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Helper to get matches for the match center carousel (2 past, 1 next, 2 future)
export const getMatchCenterMatches = () => {
  const pastMatches = getResults().slice(0, 2);
  const futureMatches = getUpcomingFixtures();
  const nextMatch = futureMatches[0];
  const upcomingMatches = futureMatches.slice(1, 3);
  
  return [...pastMatches, nextMatch, ...upcomingMatches].filter(Boolean);
};

// Export all fixtures if needed
export const getAllFixtures = () => allFixtures;

// Export league table data
export const leagueTableData = [
  {
    position: 1,
    team: "Brora Rangers",
    played: 34,
    won: 27,
    drawn: 1,
    lost: 6,
    goalsFor: 117,
    goalsAgainst: 31,
    goalDifference: 86,
    points: 82,
    form: ["W", "W", "W", "W", "W", "W"]
  },
  {
    position: 2,
    team: "Brechin City",
    played: 34,
    won: 25,
    drawn: 7,
    lost: 2,
    goalsFor: 84,
    goalsAgainst: 29,
    goalDifference: 55,
    points: 82,
    form: ["L", "W", "W", "W", "W", "W"]
  },
  {
    position: 3,
    team: "Banks o' Dee",
    played: 34,
    won: 22,
    drawn: 6,
    lost: 6,
    goalsFor: 77,
    goalsAgainst: 28,
    goalDifference: 49,
    points: 72,
    form: ["W", "W", "L", "W", "W", "D"]
  },
  {
    position: 4,
    team: "Inverurie Loco Works",
    played: 34,
    won: 22,
    drawn: 6,
    lost: 6,
    goalsFor: 74,
    goalsAgainst: 33,
    goalDifference: 41,
    points: 72,
    form: ["W", "W", "D", "W", "W", "W"]
  },
  {
    position: 5,
    team: "Fraserburgh",
    played: 34,
    won: 17,
    drawn: 12,
    lost: 5,
    goalsFor: 71,
    goalsAgainst: 36,
    goalDifference: 35,
    points: 63,
    form: ["W", "D", "W", "L", "W", "W"]
  },
  {
    position: 6,
    team: "Clachnacuddin",
    played: 34,
    won: 18,
    drawn: 5,
    lost: 11,
    goalsFor: 74,
    goalsAgainst: 42,
    goalDifference: 32,
    points: 59,
    form: ["W", "W", "L", "L", "W", "D"]
  },
  {
    position: 7,
    team: "Buckie Thistle",
    played: 34,
    won: 17,
    drawn: 7,
    lost: 10,
    goalsFor: 75,
    goalsAgainst: 44,
    goalDifference: 31,
    points: 58,
    form: ["W", "D", "W", "D", "W", "W"]
  },
  {
    position: 8,
    team: "Formartine United",
    played: 34,
    won: 16,
    drawn: 7,
    lost: 11,
    goalsFor: 59,
    goalsAgainst: 46,
    goalDifference: 13,
    points: 55,
    form: ["D", "W", "D", "L", "W", "D"]
  },
  {
    position: 9,
    team: "Huntly",
    played: 34,
    won: 15,
    drawn: 3,
    lost: 16,
    goalsFor: 66,
    goalsAgainst: 60,
    goalDifference: 6,
    points: 48,
    form: ["L", "L", "L", "L", "L", "L"]
  },
  {
    position: 10,
    team: "Forres Mechanics",
    played: 34,
    won: 13,
    drawn: 7,
    lost: 14,
    goalsFor: 69,
    goalsAgainst: 80,
    goalDifference: -11,
    points: 46,
    form: ["D", "L", "L", "W", "W", "D"]
  },
  {
    position: 11,
    team: "Deveronvale",
    played: 34,
    won: 13,
    drawn: 4,
    lost: 17,
    goalsFor: 49,
    goalsAgainst: 77,
    goalDifference: -28,
    points: 43,
    form: ["L", "L", "W", "W", "W", "D"]
  },
  {
    position: 12,
    team: "Turriff United",
    played: 34,
    won: 12,
    drawn: 4,
    lost: 18,
    goalsFor: 48,
    goalsAgainst: 56,
    goalDifference: -8,
    points: 40,
    form: ["L", "L", "W", "L", "L", "W"]
  },
  {
    position: 13,
    team: "Nairn County",
    played: 34,
    won: 10,
    drawn: 7,
    lost: 17,
    goalsFor: 49,
    goalsAgainst: 63,
    goalDifference: -14,
    points: 37,
    form: ["L", "L", "W", "L", "L", "D"]
  },
  {
    position: 14,
    team: "Wick Academy",
    played: 34,
    won: 11,
    drawn: 3,
    lost: 20,
    goalsFor: 47,
    goalsAgainst: 77,
    goalDifference: -30,
    points: 36,
    form: ["D", "W", "W", "W", "W", "L"]
  },
  {
    position: 15,
    team: "Keith",
    played: 34,
    won: 10,
    drawn: 2,
    lost: 22,
    goalsFor: 33,
    goalsAgainst: 74,
    goalDifference: -41,
    points: 32,
    form: ["W", "L", "W", "L", "L", "L"]
  },
  {
    position: 16,
    team: "Lossiemouth",
    played: 34,
    won: 6,
    drawn: 2,
    lost: 26,
    goalsFor: 28,
    goalsAgainst: 79,
    goalDifference: -51,
    points: 20,
    form: ["D", "W", "L", "L", "L", "L"]
  },
  {
    position: 17,
    team: "Strathspey Thistle",
    played: 34,
    won: 4,
    drawn: 5,
    lost: 25,
    goalsFor: 40,
    goalsAgainst: 112,
    goalDifference: -72,
    points: 17,
    form: ["W", "L", "L", "L", "W", "L"]
  },
  {
    position: 18,
    team: "Rothes",
    played: 34,
    won: 3,
    drawn: 2,
    lost: 29,
    goalsFor: 34,
    goalsAgainst: 127,
    goalDifference: -93,
    points: 11,
    form: ["D", "L", "L", "L", "L", "L"]
  }
];
