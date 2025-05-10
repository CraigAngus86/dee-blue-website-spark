
/**
 * Core type definitions for the Banks o' Dee FC website
 */

/**
 * Sponsor information
 */
export interface Sponsor {
  id: string;
  name: string;
  tier?: 'main' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  logo: string;
  logoLight?: string;
  website?: string;
  featured?: boolean;
  description?: string;
}

/**
 * Match photo information
 */
export interface MatchPhoto {
  src: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;
  credit?: string;
  category?: string;
  tags?: string[];
}

/**
 * Match information
 */
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  isCompleted?: boolean;
  result?: {
    homeScore: number;
    awayScore: number;
  };
  ticketLink?: string;
  matchReportLink?: string;
}

/**
 * Player information
 */
export interface Player {
  id: string;
  name: string;
  position: string;
  number?: number;
  imageUrl?: string;
  nationality?: string;
  joined?: string;
  biography?: string;
}

/**
 * News article
 */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  date: string;
  author?: string;
  category: string;
  tags?: string[];
  featuredImage?: string;
  isHighlighted?: boolean;
}

/**
 * Commercial/Hospitality package
 */
export interface HospitalityPackage {
  id: string;
  name: string;
  description: string;
  headlinePrice: string;
  pricePerPerson?: number;
  totalPrice?: number;
  maxGuests: number;
  imageUrl?: string;
  features?: Array<{
    name: string;
    value: string;
    included: boolean;
  }>;
}
