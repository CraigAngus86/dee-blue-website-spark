
import React from "react";
import NewsCard from "@/components/ui/image/NewsCard";
import { newsArticles } from "@/mock-data/newsData";

interface OverlappingNewsCardsProps {
  articles?: typeof newsArticles;
  count?: number;
  className?: string;
}

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles = newsArticles,
  count = 6, // Updated default to 6 cards
  className
}) => {
  // Take the specified number of articles
  const displayArticles = articles.slice(0, count);
  
  return (
    <div className={`container mx-auto px-4 relative -mt-20 mb-16 z-10 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayArticles.map(article => (
          <NewsCard
            key={article.id}
            image={article.image}
            title={article.title}
            category={article.category}
            timestamp={article.timestamp}
            excerpt={article.excerpt}
            elevation="lg"
            className="border border-white/20"
          />
        ))}
      </div>
    </div>
  );
};

export default OverlappingNewsCards;
