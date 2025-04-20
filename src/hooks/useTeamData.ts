
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type TeamMember = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  image_url: string;
  number: number | null;
  member_type: string;
};

export function useTeamData() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data: teamMembers, error } = await supabase
        .from('team_members')
        .select('*')
        .order('jersey_number', { ascending: true, nullsLast: true });

      if (error) {
        console.error('Error fetching team data:', error);
        throw error;
      }

      // Transform the data to match our expected format
      const transformedData = teamMembers.map(member => ({
        id: member.id,
        name: member.name,
        firstName: member.name.split(' ')[0],
        lastName: member.name.split(' ').slice(1).join(' ').toUpperCase(),
        position: member.position || '',
        nationality: member.nationality || 'Scotland',
        image_url: member.image_url || '/assets/images/players/headshot_dummy.jpg',
        number: member.jersey_number,
        member_type: member.member_type
      }));

      // Group by member type
      const management = transformedData.filter(m => m.member_type === 'management');
      const goalkeepers = transformedData.filter(m => m.position === 'Goalkeeper');
      const defenders = transformedData.filter(m => m.position === 'Defender');
      const midfielders = transformedData.filter(m => m.position === 'Midfielder');
      const forwards = transformedData.filter(m => m.position === 'Forward');

      return {
        management,
        goalkeepers,
        defenders,
        midfielders,
        forwards
      };
    }
  });
}
