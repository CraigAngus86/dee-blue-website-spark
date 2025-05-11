"use client";
import React from "react";
import { NewsCard } from "../../components";
import { NewsArticle } from "../../types";
import { cn } from "@/lib/utils";
import { NewsModal } from "../../components";

interface OverlappingNewsCardsProps {
  articles: NewsArticle[];
  count?: number;
  className?: string;
}

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles,
  count = 6,
  className
}) => {
  const [selectedArticle, setSelectedArticle] = React.useState<NewsArticle | null>(null);

  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
  
  // Take the specified number of articles
  const displayArticles = sortedArticles.slice(0, count);
  
  return (
    <div className="bg-white relative">
      <div className="absolute inset-0 bg-repeat" 
        style={{ 
          backgroundImage: 'radial-gradient(#00105A 1px, transparent 2px)',
          backgroundSize: '20px 20px',
          opacity: 0.05
        }}>
      </div>
      <div className={cn(
        "container mx-auto px-4 relative z-10 pb-16",
        "-mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40", // Responsive overlap with hero section
        className
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayArticles.map(article => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={(article) => setSelectedArticle(article)}
            />
          ))}
        </div>
      </div>
      
      {/* News Modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default OverlappingNewsCards;
