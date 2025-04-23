
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
    return article.category.toLowerCase().replace(" ", "-") === activeFilter;
  });
  
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
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article, index) => (
          <NewsCard
            key={article.id}
            image={article.image}
            title={article.title}
            category={article.category}
            date={article.date}
            excerpt={article.excerpt}
            isFeatured={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
