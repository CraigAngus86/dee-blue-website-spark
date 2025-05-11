import { sanityClient } from '@/lib/sanity/client';
import { Person, Player, Staff, PersonType } from '../types';

// Query that matches the actual schema
const peopleQuery = `*[_type == "playerProfile"] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  supabaseId,
  personType,
  firstName,
  lastName,
  playerName,
  playerPosition,
  staffType,
  staffRole,
  nationality,
  profileImage,
  extendedBio,
  careerHistory,
  accolades,
  favoriteMoment,
  personalFacts,
  socialMedia,
  gallery,
  videoUrl
} | order(lastName asc)`;

export async function getTeamData(): Promise<{
  people: Person[];
  error: Error | null;
}> {
  try {
    // Add timestamp parameter for cache-busting
    const timestamp = Date.now();
    const people = await sanityClient.fetch(peopleQuery, { timestamp });
    
    return { people, error: null };
  } catch (err) {
    console.error('Error fetching team data:', err);
    return {
      people: [],
      error: err instanceof Error ? err : new Error('An unknown error occurred')
    };
  }
}

export function filterPeople(people: Person[], filter: string): Person[] {
  if (filter === 'all') {
    return people;
  }
  
  if (filter === 'players') {
    return people.filter(person => person.personType === 'player');
  }
  
  if (filter === 'management') {
    return people.filter(person => person.personType === 'staff');
  }
  
  // Position filters (apply to players only)
  if (['goalkeeper', 'defender', 'midfielder', 'forward'].includes(filter)) {
    return people.filter(person => 
      person.personType === 'player' && 
      (person as Player).playerPosition === filter
    );
  }
  
  return people;
}

export function getTeamFilterOptions() {
  return [
    { label: 'All', value: 'all', order: 0 },
    { label: 'Players', value: 'players', order: 1 },
    { label: 'Management & Staff', value: 'management', order: 2 },
    { label: 'Goalkeepers', value: 'goalkeeper', order: 3 },
    { label: 'Defenders', value: 'defender', order: 4 },
    { label: 'Midfielders', value: 'midfielder', order: 5 },
    { label: 'Forwards', value: 'forward', order: 6 },
  ];
}

export function groupPeopleByPosition(people: Person[]): Record<string, Person[]> {
  const grouped: Record<string, Person[]> = {
    management: [],
    goalkeeper: [],
    defender: [],
    midfielder: [],
    forward: []
  };
  
  people.forEach(person => {
    if (person.personType === 'staff') {
      grouped.management.push(person);
    } else if (person.personType === 'player' && person.playerPosition) {
      const position = person.playerPosition;
      if (grouped[position]) {
        grouped[position].push(person);
      }
    }
  });
  
  return grouped;
}
