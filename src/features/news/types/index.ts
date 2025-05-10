// Types for news features

/**
 * Represents a news article
 */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  mainImage?: {
    url: string;
    alt: string;
  };
  excerpt?: string;
  body: any; // Change from string to any to support Portable Text blocks
  author?: string;
  isFeature?: boolean;
  matchId?: string;
  relatedPlayers?: {
    id: string;
    name: string;
    slug: string;
    profileImage?: {
      url: string;
    };
  }[];
  gallery?: {
    images: {
      url: string;
      alt?: string;
      caption?: string;
    }[];
  };
}