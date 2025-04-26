import { Match } from "@/types/match";
import { fixtures2025_26 } from "./fixturesData2025_26";

// Convert date string (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const allFixtures: Match[] = [
  // JULY 2024
  {
    id: "1",
    competition: "Scottish Highland Football League",
    date: "2024-07-27",
    time: "16:00",
    homeTeam: "Formartine United",
    awayTeam: "Banks o' Dee",
    venue: "North Lodge Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 2
    }
  },
  {
    id: "2",
    competition: "Scottish Challenge Cup",
    date: "2024-07-30",
    time: "20:45",
    homeTeam: "Banks o' Dee",
    awayTeam: "Aberdeen",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  
  // AUGUST 2024
  {
    id: "3",
    competition: "Scottish Highland Football League",
    date: "2024-08-03",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Lossiemouth",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 0
    }
  },
  {
    id: "4",
    competition: "Scottish Highland Football League",
    date: "2024-08-07",
    time: "21:00",
    homeTeam: "Keith",
    awayTeam: "Banks o' Dee",
    venue: "Kynoch Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 2
    }
  },
  {
    id: "5",
    competition: "Scottish Highland Football League",
    date: "2024-08-10",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Nairn County",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 4,
      awayScore: 0
    }
  },
  {
    id: "6",
    competition: "Scottish Challenge Cup",
    date: "2024-08-13",
    time: "20:45",
    homeTeam: "Elgin City",
    awayTeam: "Banks o' Dee",
    venue: "Borough Briggs",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 1
    }
  },
  {
    id: "7",
    competition: "Scottish Highland Football League",
    date: "2024-08-17",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Inverurie Loco Works",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 1
    }
  },
  {
    id: "8",
    competition: "Scottish Highland Football League",
    date: "2024-08-24",
    time: "16:00",
    homeTeam: "Fraserburgh",
    awayTeam: "Banks o' Dee",
    venue: "Bellslea Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  {
    id: "9",
    competition: "Scottish Highland Football League",
    date: "2024-08-28",
    time: "21:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Huntly",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 3
    }
  },
  {
    id: "10",
    competition: "Scottish Highland Football League",
    date: "2024-08-31",
    time: "16:00",
    homeTeam: "Wick Academy",
    awayTeam: "Banks o' Dee",
    venue: "Harmsworth Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 6
    }
  },
  
  // SEPTEMBER 2024
  {
    id: "11",
    competition: "Scottish Highland Football League",
    date: "2024-09-06",
    time: "20:30",
    homeTeam: "Banks o' Dee",
    awayTeam: "Deveronvale",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  {
    id: "12",
    competition: "Scottish Highland Football League",
    date: "2024-09-14",
    time: "16:00",
    homeTeam: "Buckie Thistle",
    awayTeam: "Banks o' Dee",
    venue: "Victoria Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 1
    }
  },
  {
    id: "13",
    competition: "Scottish Highland Football League",
    date: "2024-09-18",
    time: "21:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Brechin City",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 3
    }
  },
  {
    id: "14",
    competition: "Scottish Highland Football League",
    date: "2024-09-21",
    time: "16:00",
    homeTeam: "Clachnacuddin",
    awayTeam: "Banks o' Dee",
    venue: "Grant Street Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 3
    }
  },
  {
    id: "15",
    competition: "Scottish FA Cup",
    date: "2024-09-28",
    time: "16:00",
    homeTeam: "Gala Fairydean Rovers",
    awayTeam: "Banks o' Dee",
    venue: "Netherdale",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 1
    }
  },
  
  // OCTOBER 2024
  {
    id: "16",
    competition: "Scottish Highland Football League",
    date: "2024-10-05",
    time: "16:00",
    homeTeam: "Strathspey Thistle",
    awayTeam: "Banks o' Dee",
    venue: "Seafield Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 4
    }
  },
  {
    id: "17",
    competition: "Scottish Highland Football League",
    date: "2024-10-12",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Rothes",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 7,
      awayScore: 1
    }
  },
  {
    id: "18",
    competition: "Scottish Highland Football League",
    date: "2024-10-19",
    time: "16:00",
    homeTeam: "Turriff United",
    awayTeam: "Banks o' Dee",
    venue: "The Haughs",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 3
    }
  },
  {
    id: "19",
    competition: "Scottish FA Cup",
    date: "2024-10-26",
    time: "16:00",
    homeTeam: "East Fife",
    awayTeam: "Banks o' Dee",
    venue: "Bayview Stadium",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 1
    }
  },
  
  // NOVEMBER 2024
  {
    id: "20",
    competition: "Scottish Highland Football League",
    date: "2024-11-02",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Brora Rangers",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 2
    }
  },
  {
    id: "21",
    competition: "Scottish Highland Football League",
    date: "2024-11-23",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Formartine United",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  {
    id: "22",
    competition: "Scottish FA Cup",
    date: "2024-11-30",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Hamilton Academical",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 2
    }
  },
  
  // DECEMBER 2024
  {
    id: "23",
    competition: "Scottish Highland Football League",
    date: "2024-12-13",
    time: "21:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Keith",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 5,
      awayScore: 0
    }
  },
  {
    id: "24",
    competition: "Scottish Highland Football League",
    date: "2024-12-21",
    time: "16:00",
    homeTeam: "Nairn County",
    awayTeam: "Banks o' Dee",
    venue: "Station Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 4
    }
  },
  {
    id: "25",
    competition: "Scottish Highland Football League",
    date: "2024-12-28",
    time: "16:00",
    homeTeam: "Inverurie Loco Works",
    awayTeam: "Banks o' Dee",
    venue: "Harlaw Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 0
    }
  },
  
  // JANUARY 2025
  {
    id: "26",
    competition: "Scottish Highland Football League",
    date: "2025-01-18",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Wick Academy",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 4,
      awayScore: 0
    }
  },
  {
    id: "27",
    competition: "Scottish Highland Football League",
    date: "2025-01-25",
    time: "16:00",
    homeTeam: "Deveronvale",
    awayTeam: "Banks o' Dee",
    venue: "Princess Royal Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 0,
      awayScore: 2
    }
  },
  
  // FEBRUARY 2025
  {
    id: "28",
    competition: "Scottish Highland Football League",
    date: "2025-02-01",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Buckie Thistle",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 0
    }
  },
  {
    id: "29",
    competition: "Scottish Highland Football League",
    date: "2025-02-08",
    time: "16:00",
    homeTeam: "Brechin City",
    awayTeam: "Banks o' Dee",
    venue: "Glebe Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 2
    }
  },
  {
    id: "30",
    competition: "Scottish Highland Football League",
    date: "2025-02-15",
    time: "15:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Forres Mechanics",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 3
    }
  },
  {
    id: "31",
    competition: "Scottish Highland Football League",
    date: "2025-02-22",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Clachnacuddin",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 3,
      awayScore: 0
    }
  },
  
  // MARCH 2025
  {
    id: "32",
    competition: "Scottish Highland Football League",
    date: "2025-03-05",
    time: "21:00",
    homeTeam: "Huntly",
    awayTeam: "Banks o' Dee",
    venue: "Christie Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 1
    }
  },
  {
    id: "33",
    competition: "Scottish Highland Football League",
    date: "2025-03-08",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Strathspey Thistle",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 1
    }
  },
  {
    id: "34",
    competition: "Scottish Highland Football League",
    date: "2025-03-15",
    time: "16:00",
    homeTeam: "Rothes",
    awayTeam: "Banks o' Dee",
    venue: "Mackessack Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 5
    }
  },
  {
    id: "35",
    competition: "Scottish Highland Football League",
    date: "2025-03-22",
    time: "16:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Turriff United",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  {
    id: "36",
    competition: "Scottish Highland Football League",
    date: "2025-03-29",
    time: "16:00",
    homeTeam: "Brora Rangers",
    awayTeam: "Banks o' Dee",
    venue: "Dudgeon Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 2,
      awayScore: 0
    }
  },
  
  // APRIL 2025
  {
    id: "37",
    competition: "Scottish Highland Football League",
    date: "2025-04-02",
    time: "21:00",
    homeTeam: "Banks o' Dee",
    awayTeam: "Fraserburgh",
    venue: "Spain Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 3,
      awayScore: 1
    }
  },
  {
    id: "38",
    competition: "Scottish Highland Football League",
    date: "2025-04-05",
    time: "16:00",
    homeTeam: "Lossiemouth",
    awayTeam: "Banks o' Dee",
    venue: "Grant Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 2
    }
  },
  {
    id: "39",
    competition: "Scottish Highland Football League",
    date: "2025-04-12",
    time: "16:00",
    homeTeam: "Forres Mechanics",
    awayTeam: "Banks o' Dee",
    venue: "Mosset Park",
    status: "finished",
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 1
    }
  },
  {
    id: "40",
    competition: "Highland League Cup - Final",
    date: "2025-05-30",
    time: "19:45",
    homeTeam: "Banks o' Dee",
    awayTeam: "Fraserburgh",
    venue: "Spain Park",
    status: "upcoming",
    isCompleted: false,
    ticketLink: "https://tickets.bankodee.com/cup-final"
  }
];

// Update the April 12, 2025 match to show a 1-1 draw as requested
const forresMatchIndex = allFixtures.findIndex(
  match => match.date === "2025-04-12" && 
  match.homeTeam === "Forres Mechanics" && 
  match.awayTeam === "Banks o' Dee"
);

if (forresMatchIndex !== -1) {
  allFixtures[forresMatchIndex].result = {
    homeScore: 1,
    awayScore: 1
  };
  allFixtures[forresMatchIndex].isCompleted = true;
  allFixtures[forresMatchIndex].status = "finished";
}

// Export available seasons
export const getAvailableSeasons = () => {
  return ['2024/25', '2025/26'];
};

// Get all available competitions from all fixtures
export const getAvailableCompetitions = () => {
  const allCompetitionsSet = new Set<string>();
  
  [...allFixtures, ...fixtures2025_26].forEach(fixture => {
    allCompetitionsSet.add(fixture.competition);
  });
  
  return Array.from(allCompetitionsSet);
};

// Get all available month-year combinations from all fixtures
export const getAvailableMonths = () => {
  const monthsSet = new Set<string>();
  
  [...allFixtures, ...fixtures2025_26].forEach(match => {
    const date = new Date(match.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    monthsSet.add(monthYear);
  });
  
  return Array.from(monthsSet).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
};

// Get all matches grouped by month
export const getMatchesByMonth = (matches: Match[]) => {
  const matchesByMonth: Record<string, Match[]> = {};
  
  matches.forEach((match) => {
    const date = new Date(match.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!matchesByMonth[monthYear]) {
      matchesByMonth[monthYear] = [];
    }
    
    matchesByMonth[monthYear].push(match);
  });
  
  return matchesByMonth;
};

// Get all fixtures (from all seasons)
export const getAllFixtures = () => {
  return [...allFixtures, ...fixtures2025_26];
};

// Helper function to get fixtures by season
const getFixturesBySeason = (season: string): Match[] => {
  switch (season) {
    case '2025/26':
      return fixtures2025_26;
    case '2024/25':
    default:
      return allFixtures;
  }
};

// Helper function to get completed matches (results)
export const getResults = (season?: string) => {
  const fixtures = season ? getFixturesBySeason(season) : getAllFixtures();
  return fixtures
    .filter(match => match.isCompleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Helper function to get upcoming fixtures
export const getUpcomingFixtures = (season?: string) => {
  const fixtures = season ? getFixturesBySeason(season) : getAllFixtures();
  return fixtures
    .filter(match => !match.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Helper to get matches for the match center carousel
export const getMatchCenterMatches = () => {
  // Get the most recent completed matches (last 2)
  const pastMatches = getResults().slice(0, 2);
  
  // Get all upcoming fixtures across both seasons
  const futureMatches = getUpcomingFixtures();
  
  // The next match is the first upcoming match
  const nextMatch = futureMatches[0];
  
  // Get the next two upcoming matches after the "next" match
  const upcomingMatches = futureMatches.slice(1, 3);
  
  console.log("Match Center Data:", {
    pastMatches: pastMatches.length,
    nextMatch: nextMatch ? "Yes" : "No",
    upcomingMatches: upcomingMatches.length
  });
  
  // Combine past matches, next match, and upcoming matches
  return [...pastMatches, nextMatch, ...upcomingMatches].filter(Boolean);
};

// Keep existing league table data
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
