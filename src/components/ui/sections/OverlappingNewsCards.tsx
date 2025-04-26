
import React from "react";
import NewsCard from "@/components/ui/image/NewsCard";
import { newsArticles } from "@/mock-data/newsData";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";
import { cn } from "@/lib/utils";

interface OverlappingNewsCardsProps {
  articles?: typeof newsArticles;
  count?: number;
  className?: string;
}

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles = newsArticles,
  count = 6,
  className
}) => {
  // Take the specified number of articles
  const displayArticles = articles.slice(0, count);
  
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
            <NewsCard
              key={article.id}
              article={{
                title: article.title,
                image: article.image,
                category: article.category,
                timestamp: article.date || '',
                excerpt: article.excerpt,
                url: `/news/${article.id}`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverlappingNewsCards;
