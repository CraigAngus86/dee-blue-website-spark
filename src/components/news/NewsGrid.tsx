
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import { newsArticles } from "@/mock-data/newsData";
import Grid from "@/components/ui/layout/Grid";

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
      
      {/* Grid Container - Using CSS Grid directly for better control */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNews.map((article) => (
          <NewsCard
            key={article.id}
            image={article.image}
            title={article.title}
            category={article.category}
            date={article.date}
            excerpt={article.excerpt}
            isFeatured={article.isFeatured}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
