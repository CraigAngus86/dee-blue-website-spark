
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

  // Filter news based on category
  const filteredNews = newsArticles.filter(article => {
    if (activeFilter === 'all') return true;
    const categorySlug = article.category?.toLowerCase().replace(/\s+/g, "-");
    return categorySlug === activeFilter;
  });
  
  // Make sure we're showing featured articles first
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });
  
  // Organize articles into rows for better layout control
  const organizeArticlesInRows = (articles) => {
    const rows = [];
    let currentRow = [];
    let currentRowWidth = 0;
    
    // Each normal article takes 1 unit of width, featured takes 2
    articles.forEach(article => {
      const articleWidth = article.isFeatured ? 2 : 1;
      
      // If adding this article would exceed row width (3 units), start a new row
      if (currentRowWidth + articleWidth > 3) {
        rows.push([...currentRow]);
        currentRow = [article];
        currentRowWidth = articleWidth;
      } else {
        currentRow.push(article);
        currentRowWidth += articleWidth;
      }
    });
    
    // Add the last row if it has any articles
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    return rows;
  };
  
  const articleRows = organizeArticlesInRows(sortedNews);
  
  return (
    <div className="w-full">
      {/* Filters */}
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
      
      {/* Display articles row by row */}
      {articleRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
  );
};

export default NewsGrid;
