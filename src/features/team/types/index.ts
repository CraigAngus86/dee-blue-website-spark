export type PersonType = 'player' | 'staff';
export type PlayerPosition = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';
export type StaffType = 'manager' | 'coach' | 'staff';
export type StaffRole = 'manager' | 'assistant_manager' | 'coach' | 'gk_coach' | 'physio' | 
                        'fitness_coach' | 'doctor' | 'kit_manager' | 'director' | 
                        'chairman' | 'secretary' | 'other';

export interface CloudinaryAsset {
  _type: 'cloudinary.asset';
  url: string;
  secure_url?: string;
  public_id?: string;
  alt?: string;
}

export interface SocialMedia {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export interface CareerHistoryItem {
  _key: string;
  club: string;
  startYear?: number;
  endYear?: number;
  appearances?: number;
  goals?: number;
}

export interface Accolade {
  _key: string;
  title: string;
  year?: number;
  description?: string;
}

export interface PersonalFact {
  _key: string;
  question: string;
  answer: string;
}

export interface PersonBase {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
  supabaseId?: string;
  personType: PersonType;
  firstName: string;
  lastName: string;
  playerName?: string;
  nationality?: string;
  profileImage?: CloudinaryAsset;
  extendedBio?: any; // PortableText content
  favoriteMoment?: string;
  socialMedia?: SocialMedia;
  gallery?: CloudinaryAsset[];
  videoUrl?: string;
  careerHistory?: CareerHistoryItem[];
  accolades?: Accolade[];
  personalFacts?: PersonalFact[];
}

export interface Player extends PersonBase {
  personType: 'player';
  playerPosition: PlayerPosition;
}

export interface Staff extends PersonBase {
  personType: 'staff';
  staffType: StaffType;
  staffRole: StaffRole;
}

export type Person = Player | Staff;

export interface TeamFilterOption {
  label: string;
  value: string;
  order: number;
}
