import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import { newsArticles } from "@/mock-data/newsData";

const NewsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All News' },
    { id: 'match-reports', label: 'Match Reports' },
    { id: 'club-news', label: 'Club News' },
    { id: 'community', label: 'Community' }
  ];

  const filteredNews = newsArticles.filter(article => {
    if (activeFilter === 'all') return true;
    const categorySlug = article.category?.toLowerCase().replace(/\s+/g, "-");
    return categorySlug === activeFilter;
  });
  
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });
  
  const organizeArticlesInRows = (articles) => {
    const rows = [];
    let currentRow = [];
    let currentRowWidth = 0;
    
    articles.forEach((article, index) => {
      const articleWidth = article.isFeatured ? 2 : 1;
      
      if (currentRow.length === 0) {
        currentRow.push(article);
        currentRowWidth = articleWidth;
      }
      else if (currentRowWidth + articleWidth === 3) {
        currentRow.push(article);
        rows.push([...currentRow]);
        currentRow = [];
        currentRowWidth = 0;
      }
      else if (currentRowWidth + articleWidth > 3) {
        rows.push([...currentRow]);
        currentRow = [article];
        currentRowWidth = articleWidth;
      }
      else {
        currentRow.push(article);
        currentRowWidth += articleWidth;
      }
      
      if (index === articles.length - 1 && currentRow.length > 0) {
        rows.push(currentRow);
      }
    });
    
    return rows;
  };
  
  const articleRows = organizeArticlesInRows(sortedNews);
  
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.id)}
            size="lg"
            className="font-medium"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <div className="space-y-6">
        {articleRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {row.map((article) => (
              <div 
                key={article.id}
                className={article.isFeatured ? "md:col-span-2" : ""}
              >
                <NewsCard
                  image={article.image}
                  title={article.title}
                  category={article.category}
                  date={article.date}
                  excerpt={article.excerpt}
                  isFeatured={article.isFeatured}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
