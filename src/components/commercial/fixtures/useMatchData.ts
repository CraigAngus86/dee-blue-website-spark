
import { getUpcomingFixtures } from '@/mock-data/fixturesData';

export const useMatchData = () => {
  const upcomingFixtures = getUpcomingFixtures();
  
  return {
    upcomingFixtures
  };
};
