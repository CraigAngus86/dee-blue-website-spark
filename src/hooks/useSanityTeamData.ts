
"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchSanityData } from '@/lib/sanity/client';
import { TeamMember } from './useTeamData';

// Updated query to fetch player profiles from Sanity with more detailed fields
const getTeamMembersQuery = `
  *[_type == "playerProfile"] | order(lastName asc) {
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
    number,
    gallery
  }
`;

export function useSanityTeamData() {
  return useQuery({
    queryKey: ['sanityTeamData'],
    queryFn: async () => {
      try {
        const teamMembers = await fetchSanityData(getTeamMembersQuery);
        
        // Debug: Log the raw data from Sanity
        console.log('Raw Sanity team data:', teamMembers);
        
        // Process the data to match our TeamMember interface
        const processedMembers = (teamMembers || []).map((member: any): TeamMember => {
          // Debug: Log each member being processed
          console.log('Processing Sanity member:', member._id, member.playerName || `${member.firstName} ${member.lastName}`);
          
          // Determine position or role
          let position = '';
          // Default to 'player' if personType isn't specified
          let personType = member.staffType ? 'staff' : 'player';
          
          if (personType === 'staff') {
            position = member.staffRole || member.staffType || 'Staff';
          } else {
            position = member.playerPosition || 'Player';
          }
          
          // Create player name from firstName and lastName if playerName isn't provided
          const fullName = member.playerName || 
            (member.firstName && member.lastName 
              ? `${member.firstName} ${member.lastName}` 
              : 'Unknown Player');
          
          // Format the data to match our TeamMember type
          return {
            id: member.supabaseId || member._id,
            name: fullName,
            firstName: member.firstName || '',
            lastName: member.lastName || '',
            position: position,
            nationality: member.nationality || 'Scotland',
            image: member.image || '/assets/images/players/headshot_dummy.jpg',
            number: member.number || null,
            bio: member.extendedBio ? 
              (Array.isArray(member.extendedBio) && member.extendedBio[0]?.children?.[0]?.text 
                ? member.extendedBio[0].children[0].text 
                : member.extendedBio) 
              : '',
            joinedDate: member.careerHistory ? 
              member.careerHistory.find((club: any) => club.club === "Banks o' Dee")?.startYear || '' 
              : '',
            didYouKnow: member.favoriteMoment || member.personalFacts || '',
            member_type: personType
          };
        });
        
        console.log('Processed team members from Sanity:', processedMembers.length);
        return processedMembers;
      } catch (error) {
        console.error('Error fetching Sanity team data:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
