
import { useQuery } from '@tanstack/react-query';
import { Match } from '@/types/match';
import { getUpcomingFixtures } from '@/mock-data/fixturesData';

export const useMatchData = () => {
  const { data: upcomingFixtures = [], isLoading, error } = useQuery({
    queryKey: ['upcomingFixtures'],
    queryFn: async (): Promise<Match[]> => {
      return getUpcomingFixtures();
    }
  });
  
  return {
    upcomingFixtures,
    isLoading,
    error
  };
};
