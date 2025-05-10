import React from 'react';
import { NewsArticle } from '../types';
import NewsCard from './cards/NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  onArticleClick?: (article: NewsArticle) => void;
  showFeatured?: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ 
  articles, 
  onArticleClick,
  showFeatured = true
}) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No news articles found</p>
      </div>
    );
  }

  // If showing featured, separate featured articles
  const featuredArticles = showFeatured ? articles.filter(article => article.isFeature) : [];
  const regularArticles = showFeatured ? articles.filter(article => !article.isFeature) : articles;

  return (
    <div className="space-y-8">
      {/* Featured articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-8">
          {featuredArticles.map(article => (
            <div key={article.id} className="mb-6">
              <NewsCard 
                article={article} 
                onClick={onArticleClick} 
                featured={true}
              />
            </div>
          ))}
        </div>
      )}

      {/* Regular articles in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.map(article => (
          <NewsCard 
            key={article.id} 
            article={article} 
            onClick={onArticleClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
