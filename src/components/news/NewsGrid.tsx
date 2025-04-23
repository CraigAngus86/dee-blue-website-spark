
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import { newsArticles } from "@/mock-data/newsData";

const NewsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All News' },
    { id: 'match-report', label: 'Match Reports' },
    { id: 'club-news', label: 'Club News' },
    { id: 'community', label: 'Community' }
  ];

  // Filter news based on selected category
  const filteredNews = newsArticles.filter(article => {
    if (activeFilter === 'all') return true;
    
    // Convert category to kebab-case for comparison
    const categorySlug = article.category?.toLowerCase().replace(/\s+/g, "-");
    return categorySlug === activeFilter;
  });

  // Sort news by date (more recent first)
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="w-full">
      {/* Filter Buttons */}
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
      
      {/* News Grid - CSS Grid with explicit placement for featured articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedNews.map((article) => (
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
    </div>
  );
};

export default NewsGrid;
