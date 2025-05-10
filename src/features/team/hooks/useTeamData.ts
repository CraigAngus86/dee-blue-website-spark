"use client";
import { useState, useEffect } from 'react';
import { TeamMember } from '@/features/team/types';
import { useSanityTeamData } from '@/hooks/useSanityTeamData'; 

// This is a proper implementation that follows React's rules of hooks
export function useTeamData() {
  // Get Sanity data directly using the original hook
  const { data: sanityData, isLoading: isSanityLoading, error: sanityError } = useSanityTeamData();
  
  // Initialize state with the expected structure
  const [teamData, setTeamData] = useState<{
    management: TeamMember[],
    goalkeepers: TeamMember[],
    defenders: TeamMember[],
    midfielders: TeamMember[],
    forwards: TeamMember[]
  }>({
    management: [],
    goalkeepers: [],
    defenders: [],
    midfielders: [],
    forwards: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Process Sanity data when it changes
  useEffect(() => {
    if (isSanityLoading) {
      setIsLoading(true);
      return;
    }
    
    if (sanityError) {
      console.error('Error from useSanityTeamData:', sanityError);
      setError(sanityError instanceof Error ? sanityError : new Error('Failed to load team data'));
      setIsLoading(false);
      return;
    }
    
    if (!sanityData) {
      console.warn('No team data available from Sanity');
      setError(new Error('No team data available'));
      setIsLoading(false);
      return;
    }
    
    try {
      // Convert from the original format to our new TeamMember type
      const convertedMembers = sanityData.map((member: any): TeamMember => ({
        id: member.id.toString(),
        name: member.name,
        position: member.position,
        imageUrl: member.image,
        number: member.number,
        bio: member.bio,
        stats: {
          appearances: member.appearances || 0,
          goals: member.goals || 0,
          assists: member.assists || 0,
          ...(member.stats || {})
        },
        social: member.socialMedia || {},
        isStaff: member.member_type === 'staff' || 
                member.position.toLowerCase().includes('manager') || 
                member.position.toLowerCase().includes('coach')
      }));
      
      // Categorize using the same logic as the original hook
      const management = convertedMembers.filter(member => member.isStaff);
      
      const players = convertedMembers.filter(member => !member.isStaff);
      
      const goalkeepers = players.filter(player => 
        player.position.toLowerCase().includes('goalkeeper') ||
        player.position.toLowerCase().includes('keeper') ||
        player.position.toLowerCase() === 'gk'
      );
      
      const defenders = players.filter(player => 
        player.position.toLowerCase().includes('defender') ||
        player.position.toLowerCase().includes('back') ||
        player.position.toLowerCase() === 'def' ||
        player.position.toLowerCase() === 'rb' ||
        player.position.toLowerCase() === 'lb' ||
        player.position.toLowerCase() === 'cb'
      );
      
      const midfielders = players.filter(player => 
        player.position.toLowerCase().includes('midfielder') ||
        player.position.toLowerCase() === 'mid' ||
        player.position.toLowerCase() === 'cm' ||
        player.position.toLowerCase() === 'cdm' ||
        player.position.toLowerCase() === 'cam' ||
        player.position.toLowerCase() === 'rm' ||
        player.position.toLowerCase() === 'lm'
      );
      
      const forwards = players.filter(player => 
        player.position.toLowerCase().includes('forward') ||
        player.position.toLowerCase().includes('striker') ||
        player.position.toLowerCase().includes('winger') ||
        player.position.toLowerCase() === 'fwd' ||
        player.position.toLowerCase() === 'st' ||
        player.position.toLowerCase() === 'cf' ||
        player.position.toLowerCase() === 'lw' ||
        player.position.toLowerCase() === 'rw'
      );
      
      setTeamData({
        management,
        goalkeepers,
        defenders,
        midfielders,
        forwards
      });
      setIsLoading(false);
    } catch (err) {
      console.error('Error processing team data:', err);
      setError(err instanceof Error ? err : new Error('Failed to process team data'));
      setIsLoading(false);
    }
  }, [sanityData, isSanityLoading, sanityError]);

  return {
    data: teamData,
    isLoading,
    error
  };
}
