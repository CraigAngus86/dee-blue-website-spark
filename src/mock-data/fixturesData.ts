
import { Match } from "@/types/match";

// Convert date string (DD/MM/YYYY) to ISO format (YYYY-MM-DD)
const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Extract round information from competition if available
const extractRound = (competition: string): { competition: string, round: string | undefined } => {
  const parts = competition.split(' - ');
  if (parts.length > 1) {
    return { competition: parts[0].trim(), round: parts[1].trim() };
  }
  return { competition, round: undefined };
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
  // Add more completed matches
  {
    id: '38',
    competition: 'Scottish Highland Football League',
    date: formatDate('12/04/2025'),
    time: '16:00',
    homeTeam: 'Forres',
    awayTeam: "Banks o' Dee",
    venue: 'Mosset Park',
    isCompleted: false
  }
];

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

// Export all fixtures if needed
export const getAllFixtures = () => allFixtures;
