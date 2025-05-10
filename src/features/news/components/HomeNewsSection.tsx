"use client";
import React from 'react';
import { NewsArticle } from '../types';
import NewsCard from './cards/NewsCard';
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";
import { cn } from "@/lib/utils";

interface HomeNewsSectionProps {
  articles: NewsArticle[];
  className?: string;
}

const HomeNewsSection: React.FC<HomeNewsSectionProps> = ({
  articles,
  className
}) => {
  // Sort by date first
  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.publishedAt || '').getTime();
    const dateB = new Date(b.publishedAt || '').getTime();
    return dateB - dateA;
  });

  // Take first 6 articles
  const displayArticles = sortedArticles.slice(0, 6);
  
  console.log(`HomeNewsSection: Showing ${displayArticles.length} articles`);
  
  return (
    <div className="bg-light-gray py-16 relative">
      <PatternOverlay pattern="dots" opacity={0.05} color="dark" />
      <div className={cn(
        "container mx-auto px-4 relative z-10",
        "-mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40", // Responsive overlap with hero section
        className
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayArticles.map(article => (
            <div key={article.id}>
              <NewsCard
                article={article}
                className="shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeNewsSection;
