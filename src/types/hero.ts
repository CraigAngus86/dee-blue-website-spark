
export interface HeroSlide {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  publishedAt: string;
  slug?: {
    current: string;
  };
  category?: string;
}
