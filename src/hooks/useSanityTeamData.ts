
"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchSanityData } from '@/lib/sanity/client';
import { TeamMember } from './useTeamData';

// Query to fetch player profiles from Sanity
const getTeamMembersQuery = `
  *[_type == "playerProfile"] {
    _id,
    supabaseId,
    firstName,
    lastName,
    playerName,
    playerPosition,
    staffType,
    staffRole,
    nationality,
    "image": profileImage.asset->url,
    "imagePublicId": profileImage.asset->public_id,
    extendedBio,
    careerHistory,
    accolades,
    favoriteMoment,
    personalFacts,
    socialMedia,
    cloudinaryId,
    gallery
  }
`;

export function useSanityTeamData() {
  return useQuery({
    queryKey: ['sanityTeamData'],
    queryFn: async () => {
      try {
        const teamMembers = await fetchSanityData(getTeamMembersQuery);
        
        // Process the data to match our TeamMember interface
        const processedMembers = (teamMembers || []).map((member: any): TeamMember => {
          // Determine position or role
          let position = '';
          let personType = member.personType || 'player';
          
          if (personType === 'staff') {
            position = member.staffRole || member.staffType || 'Staff';
          } else {
            position = member.playerPosition || 'Player';
          }
          
          // Format the data to match our TeamMember type
          return {
            id: member._id,
            name: member.playerName || `${member.firstName} ${member.lastName}`,
            firstName: member.firstName || '',
            lastName: member.lastName || '',
            position: position,
            nationality: member.nationality || 'Scotland',
            image: member.image || '/assets/images/players/headshot_dummy.jpg',
            number: null, // Add jersey number if available
            bio: member.extendedBio ? member.extendedBio[0]?.children[0]?.text : '',
            joinedDate: member.careerHistory ? 
              member.careerHistory.find((club: any) => club.club === "Banks o' Dee")?.startYear : '',
            didYouKnow: member.favoriteMoment || '',
            member_type: personType
          };
        });
        
        return processedMembers;
      } catch (error) {
        console.error('Error fetching Sanity team data:', error);
        throw error;
      }
    },
    staleTime: 60 * 1000, // 1 minute
  });
}
