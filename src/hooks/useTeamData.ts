
"use client";

import { useState, useEffect } from 'react';
import { useSanityTeamData } from './useSanityTeamData';

// Define types for team members and team data
export type TeamMember = {
  id: string | number;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality?: string;
  image: string;
  number: number | null;
  bio?: string;
  joinedDate?: string;
  didYouKnow?: string;
  member_type?: string;
};

export type TeamData = {
  management: TeamMember[];
  goalkeepers: TeamMember[];
  defenders: TeamMember[];
  midfielders: TeamMember[];
  forwards: TeamMember[];
};

export function useTeamData() {
  // Get data from Sanity
  const { data: sanityData, isLoading: isSanityLoading, error: sanityError } = useSanityTeamData();
  
  // State for team data
  const [state, setState] = useState<{
    data: TeamData | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: null,
    isLoading: true,
    error: null
  });

  // Process Sanity data when it changes
  useEffect(() => {
    if (isSanityLoading) {
      setState(prev => ({ ...prev, isLoading: true }));
      return;
    }

    if (sanityError) {
      setState({
        data: null,
        isLoading: false,
        error: sanityError as Error
      });
      return;
    }

    if (!sanityData) {
      setState({
        data: null,
        isLoading: false,
        error: new Error('No team data available')
      });
      return;
    }

    try {
      // Organize team members by category
      const management = sanityData.filter((member: TeamMember) => 
        member.member_type === 'staff' || 
        member.position.toLowerCase().includes('manager') || 
        member.position.toLowerCase().includes('coach')
      );
      
      const players = sanityData.filter((member: TeamMember) => 
        member.member_type !== 'staff' &&
        !member.position.toLowerCase().includes('manager') &&
        !member.position.toLowerCase().includes('coach')
      );
      
      const goalkeepers = players.filter((player: TeamMember) => 
        player.position.toLowerCase().includes('goalkeeper') ||
        player.position.toLowerCase() === 'gk'
      );
      
      const defenders = players.filter((player: TeamMember) => 
        player.position.toLowerCase().includes('defender') ||
        player.position.toLowerCase() === 'def'
      );
      
      const midfielders = players.filter((player: TeamMember) => 
        player.position.toLowerCase().includes('midfielder') ||
        player.position.toLowerCase() === 'mid'
      );
      
      const forwards = players.filter((player: TeamMember) => 
        player.position.toLowerCase().includes('forward') ||
        player.position.toLowerCase().includes('striker') ||
        player.position.toLowerCase() === 'fwd'
      );

      setState({
        data: {
          management,
          goalkeepers,
          defenders,
          midfielders,
          forwards
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error
      });
    }
  }, [sanityData, isSanityLoading, sanityError]);

  return state;
}
