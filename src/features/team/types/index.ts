// Team member types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl?: string;
  number?: number;
  bio?: string;
  stats?: Record<string, number>;
  social?: Record<string, string>;
  isStaff?: boolean;
}
