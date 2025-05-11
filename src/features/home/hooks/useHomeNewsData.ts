import { useMemo } from 'react';
import { NewsArticle } from '@/features/news/types';

export function useHomeNewsData(allNews: NewsArticle[]) {
  return useMemo(() => {
    if (!allNews || allNews.length === 0) {
      return {
        featuredArticles: [],
        regularArticles: []
      };
    }

    // First, sort all news by date
    const sortedNews = [...allNews].sort((a, b) => {
      const dateA = new Date(a.publishedAt || '').getTime();
      const dateB = new Date(b.publishedAt || '').getTime();
      return dateB - dateA;
    });
    
    // Find featured articles (either with featured or isFeature flag)
    const featuredArticles = sortedNews
      .filter(article => article.isFeature)
      .slice(0, 3); // Take max 3 featured articles
    
    // If we don't have 3 featured articles, add the most recent ones 
    if (featuredArticles.length < 3) {
      const featuredIds = new Set(featuredArticles.map(article => article.id));
      const additionalArticles = sortedNews
        .filter(article => !featuredIds.has(article.id))
        .slice(0, 3 - featuredArticles.length);
      
      featuredArticles.push(...additionalArticles);
    }
    
    // Get IDs of all articles in the hero section
    const heroArticleIds = new Set(featuredArticles.map(article => article.id));
    
    // Get regular articles (not in hero) for the cards section
    const regularArticles = sortedNews
      .filter(article => !heroArticleIds.has(article.id))
      .slice(0, 6); // Take max 6 articles for the grid
    
    return {
      featuredArticles,
      regularArticles
    };
  }, [allNews]);
}
