
import { newsArticles } from '@/mock-data/newsData';

export async function getNews() {
  // In a production app, this would be an API call
  // For now, we'll use mock data directly
  return { articles: newsArticles };
}
