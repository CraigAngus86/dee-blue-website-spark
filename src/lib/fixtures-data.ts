
import { Match } from "@/types/match";

// Convert date string (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Sample fixtures data based on the legacy code
export const allFixtures: Match[] = [
  // JULY 2024
  {
    id: '1',
    competition: 'Scottish Highland Football League',
    date: formatDate('27/07/2024'),
    time: '16:00',
    homeTeam: 'Formartine',
    awayTeam: "Banks o' Dee",
    venue: 'North Lodge Park',
    status: 'completed',
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
    status: 'completed',
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 0
    }
  },
  
  // AUGUST 2024
  {
    id: '3',
    competition: 'Scottish Highland Football League',
    date: formatDate('03/08/2024'),
    time: '16:00',
    homeTeam: "Banks o' Dee",
    awayTeam: 'Lossiemouth',
    venue: 'Spain Park',
    status: 'completed',
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
    status: 'completed',
    isCompleted: true,
    result: {
      homeScore: 1,
      awayScore: 2
    }
  },
  
  // More future fixtures
  {
    id: '38',
    competition: 'Scottish Highland Football League',
    date: formatDate('12/04/2025'),
    time: '16:00',
    homeTeam: 'Forres',
    awayTeam: "Banks o' Dee",
    venue: 'Mosset Park',
    status: 'upcoming',
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
    status: 'upcoming',
    isCompleted: false,
    ticketLink: "https://tickets.bankodee.com/cup-final"
  }
];

export const fixtures2025_26: Match[] = [
  // Sample data for 2025/26 season
  {
    "id": "1",
    "competition": "Pre-Season Friendly",
    "date": "2025-07-02",
    "time": "19:45",
    "homeTeam": "Banks o' Dee",
    "awayTeam": "Peterhead",
    "venue": "Spain Park, Aberdeen",
    "status": "upcoming",
    "isCompleted": false,
    "ticketLink": ""
  },
  {
    "id": "2",
    "competition": "Pre-Season Friendly",
    "date": "2025-07-04",
    "time": "19:45",
    "homeTeam": "Banks o' Dee",
    "awayTeam": "Elgin City",
    "venue": "Spain Park, Aberdeen",
    "status": "upcoming",
    "isCompleted": false,
    "ticketLink": ""
  }
];

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

// Get all fixtures (filtered by season if provided)
export const getAllFixtures = async (season?: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (season === '2025/26') {
    // For 2025/26, return only upcoming fixtures from that season
    return fixtures2025_26.filter(match => !match.isCompleted);
  } else if (season === '2024/25') {
    // For 2024/25, return only upcoming fixtures from that season
    return allFixtures.filter(match => !match.isCompleted);
  }
  
  // If no season specified, return all upcoming fixtures from both seasons
  return [...allFixtures, ...fixtures2025_26].filter(match => !match.isCompleted);
};

// Helper function to get completed matches (results)
export const getResults = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return allFixtures
    .filter(match => match.isCompleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Helper function to get upcoming fixtures
export const getUpcomingFixtures = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return allFixtures
    .filter(match => !match.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// League table data
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
  // Additional teams would go here...
];
