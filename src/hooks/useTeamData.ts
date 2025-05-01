
"use client";

import { useState, useEffect } from 'react';

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

// Mock team data - this would ideally come from an API in a real implementation
export function useTeamData() {
  const [state, setState] = useState<{
    data: TeamData | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll use the mock data from the banks-o-dee-old project
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // This is mock data structure, similar to what was in the banks-o-dee-old project
        const teamData: TeamData = {
          management: [
            {
              id: 101,
              name: 'Paul Lawson',
              firstName: 'Paul',
              lastName: 'LAWSON',
              position: 'Manager',
              nationality: 'Scotland',
              image: '/assets/images/players/Laws_Headshot.jpg',
              number: null,
            },
            {
              id: 103,
              name: 'Aggie Gray',
              firstName: 'Aggie',
              lastName: 'GRAY',
              position: 'Assistant Manager',
              nationality: 'Scotland',
              image: '/assets/images/players/Aggie_Headshot.jpg',
              number: null,
            },
            {
              id: 105,
              name: 'Gordon Milne',
              firstName: 'Gordon',
              lastName: 'MILNE',
              position: 'Goalkeeping Coach',
              nationality: 'Scotland',
              image: '/assets/images/players/Gordo_Headshot.jpg',
              number: null,
            }
          ],
          goalkeepers: [
            {
              id: 1,
              name: 'Kyle Irvine',
              firstName: 'Kyle',
              lastName: 'IRVINE',
              position: 'Goalkeeper',
              nationality: 'Scotland',
              image: '/assets/images/players/Kyle_Headshot.jpg',
              number: 1
            },
            {
              id: 2,
              name: 'Andy Shearer',
              firstName: 'Andy',
              lastName: 'SHEARER',
              position: 'Goalkeeper',
              nationality: 'Scotland',
              image: '/assets/images/players/Andy_Headshot.jpg',
              number: 13
            }
          ],
          defenders: [
            {
              id: 4,
              name: 'Jevan Anderson',
              firstName: 'Jevan',
              lastName: 'ANDERSON',
              position: 'Defender',
              nationality: 'Scotland',
              image: '/assets/images/players/Jevan_Headshot.jpg',
              number: 2,
              bio: "Jevan is a talented defender who joined Banks o' Dee in 2021. Known for his strong tackling and aerial ability.",
              joinedDate: "2021"
            },
            {
              id: 5,
              name: 'Ramsay Davidson',
              firstName: 'Ramsay',
              lastName: 'DAVIDSON',
              position: 'Defender',
              nationality: 'Scotland',
              image: '/assets/images/players/Ramsay_Headshot.jpg',
              number: 3
            }
          ],
          midfielders: [
            {
              id: 14,
              name: 'Max Alexander',
              firstName: 'Max',
              lastName: 'ALEXANDER',
              position: 'Midfielder',
              nationality: 'Scotland',
              image: '/assets/images/players/Maxy.jpg',
              number: 6
            },
            {
              id: 15,
              name: 'Chris Antoniazzi',
              firstName: 'Chris',
              lastName: 'ANTONIAZZI',
              position: 'Midfielder',
              nationality: 'Scotland',
              image: '/assets/images/players/Canto_Headshot.jpg',
              number: 7
            }
          ],
          forwards: [
            {
              id: 24,
              name: 'Lachie Macleod',
              firstName: 'Lachie',
              lastName: 'MACLEOD',
              position: 'Forward',
              nationality: 'Scotland',
              image: '/assets/images/players/Lachie Test.jpg',
              number: 9,
              bio: "Lachie is a talented forward who joined Banks o' Dee in 2020. Known for his pace and finishing ability, he has been a consistent goal-scorer for the club.",
              joinedDate: "2020",
              didYouKnow: "Lachie scored on his debut for Banks o' Dee and went on to net 15 goals in his first season with the club."
            },
            {
              id: 25,
              name: 'Scott Milne',
              firstName: 'Scott',
              lastName: 'MILNE',
              position: 'Forward',
              nationality: 'Scotland',
              image: '/assets/images/players/headshot_dummy.jpg',
              number: 10
            }
          ]
        };

        setState({
          data: teamData,
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

    fetchData();
  }, []);

  return state;
}
