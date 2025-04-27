
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { teamData } from '@/mock-data/team';

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
  // Instead of querying Supabase, return the mock data directly
  return {
    data: teamData,
    isLoading: false,
    error: null
  };
}
