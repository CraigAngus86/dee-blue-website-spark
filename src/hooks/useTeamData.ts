
"use client";

import { useState, useEffect } from 'react';
import { useSanityTeamData } from './useSanityTeamData';
import { resolvePlayerFromProfile } from '@/utils/cross-system/player';

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
  // Add Supabase-specific fields
  appearances?: number;
  goals?: number;
  assists?: number;
  stats?: {
    [key: string]: any;
  };
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

  // Process Sanity data when it changes and integrate Supabase data
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

    // Set up async function to integrate Supabase data
    const integrateData = async () => {
      try {
        // Enrich Sanity data with Supabase data using cross-system utilities
        const enrichedMembers = await Promise.all(
          sanityData.map(async (member: TeamMember) => {
            // Only try to resolve Supabase data if we have a supabaseId
            if (member.id) {
              try {
                // Use cross-system utility to get player data from Supabase
                const supabasePlayer = await resolvePlayerFromProfile(
                  { _id: member.id.toString(), supabaseId: member.id.toString() },
                  { skipCache: false }
                );
                
                // If we found Supabase data, merge it with the Sanity data
                if (supabasePlayer) {
                  return {
                    ...member,
                    appearances: supabasePlayer.appearances || 0,
                    goals: supabasePlayer.goals || 0,
                    assists: supabasePlayer.assists || 0,
                    stats: {
                      matchesPlayed: supabasePlayer.appearances || 0,
                      goals: supabasePlayer.goals || 0,
                      assists: supabasePlayer.assists || 0,
                      cleanSheets: supabasePlayer.clean_sheets || 0,
                      yellowCards: supabasePlayer.yellow_cards || 0,
                      redCards: supabasePlayer.red_cards || 0,
                    }
                  };
                }
              } catch (error) {
                console.error(`Failed to get Supabase data for player ${member.name}:`, error);
                // Continue with just the Sanity data
              }
            }
            
            // Return the original member if no Supabase data was found
            return member;
          })
        );

        // Organize team members by category
        const management = enrichedMembers.filter((member: TeamMember) => 
          member.member_type === 'staff' || 
          member.position.toLowerCase().includes('manager') || 
          member.position.toLowerCase().includes('coach')
        );
        
        const players = enrichedMembers.filter((member: TeamMember) => 
          member.member_type !== 'staff' &&
          !member.position.toLowerCase().includes('manager') &&
          !member.position.toLowerCase().includes('coach')
        );
        
        // Categorize players by position - use more flexible matching
        const goalkeepers = players.filter((player: TeamMember) => 
          player.position.toLowerCase().includes('goalkeeper') ||
          player.position.toLowerCase().includes('keeper') ||
          player.position.toLowerCase() === 'gk'
        );
        
        const defenders = players.filter((player: TeamMember) => 
          player.position.toLowerCase().includes('defender') ||
          player.position.toLowerCase().includes('back') ||
          player.position.toLowerCase() === 'def' ||
          player.position.toLowerCase() === 'rb' ||
          player.position.toLowerCase() === 'lb' ||
          player.position.toLowerCase() === 'cb'
        );
        
        const midfielders = players.filter((player: TeamMember) => 
          player.position.toLowerCase().includes('midfielder') ||
          player.position.toLowerCase() === 'mid' ||
          player.position.toLowerCase() === 'cm' ||
          player.position.toLowerCase() === 'cdm' ||
          player.position.toLowerCase() === 'cam' ||
          player.position.toLowerCase() === 'rm' ||
          player.position.toLowerCase() === 'lm'
        );
        
        const forwards = players.filter((player: TeamMember) => 
          player.position.toLowerCase().includes('forward') ||
          player.position.toLowerCase().includes('striker') ||
          player.position.toLowerCase().includes('winger') ||
          player.position.toLowerCase() === 'fwd' ||
          player.position.toLowerCase() === 'st' ||
          player.position.toLowerCase() === 'cf' ||
          player.position.toLowerCase() === 'lw' ||
          player.position.toLowerCase() === 'rw'
        );

        // Update state with categorized data
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
    };

    // Execute the data integration
    integrateData();
  }, [sanityData, isSanityLoading, sanityError]);

  return state;
}
