import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { teamData } from '@/mock-data/team';
import { useSanityTeamData } from './useSanityTeamData';

export type TeamMember = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  image: string;
  number: number | null;
  member_type: string;
};

export function useTeamData() {
  // Try to get data from Sanity
  const sanityQuery = useSanityTeamData();
  
  // If Sanity data is available and not in error state, use it
  if (sanityQuery.data && !sanityQuery.error) {
    return {
      data: sanityQuery.data,
      isLoading: sanityQuery.isLoading,
      error: null
    };
  }
  
  // Otherwise fall back to mock data
  return {
    data: teamData,
    isLoading: false,
    error: sanityQuery.error
  };
}
