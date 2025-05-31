import { sanityClient } from '@/lib/sanity/client';
import { Person, Player, Staff, PersonType, StaffRole } from '../types';

// Query that matches the actual schema - now includes isYouthProduct
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
  isYouthProduct,
  profileImage{
    ...,
    asset{
      ...,
    }
  },
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
    
    // Log detailed information about image structure
    if (people && people.length > 0) {
      // Find a person with an image
      const personWithImage = people.find(p => p.profileImage);
      
      if (personWithImage) {
        console.log('===== SERVER-SIDE IMAGE STRUCTURE =====');
        console.log('Person name:', personWithImage.firstName, personWithImage.lastName);
        console.log('Profile image structure:', JSON.stringify(personWithImage.profileImage, null, 2));
        console.log('===== END SERVER-SIDE ANALYSIS =====');
      }
    }
    
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

// Staff role priority order (lower number = higher priority)
const staffRolePriorities: Record<StaffRole, number> = {
  'manager': 1,
  'assistant_manager': 2,
  'coach': 3,
  'gk_coach': 4,
  'fitness_coach': 5,
  'physio': 6,
  'doctor': 7,
  'kit_manager': 8,
  'chairman': 9,
  'director': 10,
  'secretary': 11,
  'other': 12
};

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
  
  // Sort management by role priority
  grouped.management.sort((a, b) => {
    const aRole = (a as Staff).staffRole || 'other';
    const bRole = (b as Staff).staffRole || 'other';
    
    const aPriority = staffRolePriorities[aRole] || 100;
    const bPriority = staffRolePriorities[bRole] || 100;
    
    return aPriority - bPriority;
  });
  
  return grouped;
}
