
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
    isCompleted: true
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
    isCompleted: true
  },
  // Add more fixtures following the same pattern...
  {
    id: '38',
    competition: 'Scottish Highland Football League',
    date: formatDate('12/04/2025'),
    time: '16:00',
    homeTeam: 'Forres',
    awayTeam: "Banks o' Dee",
    venue: 'Mosset Park',
    homeScore: 1,
    awayScore: 1,
    isCompleted: true
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

