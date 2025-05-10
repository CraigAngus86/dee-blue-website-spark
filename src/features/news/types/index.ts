// Types for news features

/**
 * Represents a news article
 */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: 'matchReport' | 'clubNews' | 'teamNews' | 'communityNews' | 'commercialNews';
  mainImage?: {
    url: string;
    alt?: string;
  };
  excerpt?: string;
  body?: any; // Rich text content
  author?: string;
  isFeature?: boolean;
  matchId?: string; // For match reports
  relatedPlayers?: Array<{
    id: string;
    name: string;
    slug: string;
    profileImage?: {
      url: string;
    };
  }>;
  gallery?: {
    images: Array<{
      url: string;
      alt?: string;
      caption?: string;
    }>;
  };
}