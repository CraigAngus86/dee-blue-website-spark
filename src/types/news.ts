
export interface NewsItem {
  id: string;
  title: string;
  slug?: string;
  date: string;
  author?: string;
  imageUrl?: string;
  category?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
}
