"use client";
import React from "react";
import { NewsCard } from "../../components";
import { NewsArticle } from "../../types";
import { cn } from "@/lib/utils";

interface OverlappingNewsCardsProps {
  articles: NewsArticle[];
  count?: number;
  className?: string;
  onArticleClick?: (article: NewsArticle) => void;
}

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles,
  count = 6,
  className,
  onArticleClick
}) => {
  // Take the specified number of articles
  const displayArticles = articles.slice(0, count);
  
  return (
    <div className="bg-light-gray py-16 relative">
      <div className="absolute inset-0 bg-repeat" 
        style={{ 
          backgroundImage: 'radial-gradient(#00105A 1px, transparent 2px)',
          backgroundSize: '20px 20px',
          opacity: 0.05
        }}>
      </div>
      <div className={cn(
        "container mx-auto px-4 relative z-10",
        "-mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40", // Responsive overlap with hero section
        className
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayArticles.map(article => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={onArticleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverlappingNewsCards;
