import React from 'react';
import { NewsArticle } from '../types';
import NewsCard from './cards/NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  onArticleClick?: (article: NewsArticle) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  onArticleClick
}) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No news articles found</p>
      </div>
    );
  }
  
  // Create a Set to track IDs we've rendered to prevent duplicates
  const renderedIds = new Set<string>();
  
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
  });
  
  // Smart layout algorithm - arrange articles in balanced rows
  const rows: NewsArticle[][] = [];
  let currentRow: NewsArticle[] = [];
  let currentRowWidth = 0;
  
  // Process each article
  sortedArticles.forEach(article => {
    // Skip if we've already rendered this ID
    if (renderedIds.has(article.id)) {
      return;
    }
    
    // Calculate width (columns) for this article
    const articleWidth = article.isFeature ? 2 : 1;
    
    // Check if adding this article would exceed row width (4 columns max)
    if (currentRowWidth + articleWidth > 4) {
      // Current row is full, start a new row
      rows.push([...currentRow]);
      currentRow = [article];
      currentRowWidth = articleWidth;
    } else {
      // Add to current row
      currentRow.push(article);
      currentRowWidth += articleWidth;
    }
    
    // Mark this ID as rendered
    renderedIds.add(article.id);
  });
  
  // Add the last row if not empty
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }
  
  return (
    <div className="space-y-6">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-6">
          {row.map(article => (
            <div 
              key={article.id} 
              className={article.isFeature ? "col-span-2" : "col-span-1"}
            >
              <NewsCard
                article={article}
                onClick={onArticleClick}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
