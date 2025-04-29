
import { useQuery } from '@tanstack/react-query';
import { fetchSanityData } from '../../sanity-studio/client.js';
import { TeamMember } from '@/hooks/useTeamData';

const getTeamMembersQuery = `
  *[_type == "playerProfile"] | order(lastName asc) {
    _id,
    supabaseId,
    playerName as name,
    firstName,
    lastName,
    position,
    nationality,
    "image": profileImage.asset->url,
    number,
    member_type
  }
`;

export function useSanityTeamData() {
  return useQuery({
    queryKey: ['sanityTeamData'],
    queryFn: async () => {
      const teamMembers = await fetchSanityData(getTeamMembersQuery);
      
      // Map Sanity data to match our existing TeamMember type
      return (teamMembers || []).map((member: any) => ({
        id: member.supabaseId || member._id, // Use supabaseId if available, fall back to _id
        name: member.name,
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        position: member.position || '',
        nationality: member.nationality || '',
        image: member.image || '',
        number: member.number || null,
        member_type: member.member_type || '',
      })) as TeamMember[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
