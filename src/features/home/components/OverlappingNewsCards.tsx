"use client";
import React, { useState } from 'react';
import { NewsArticle } from '@/features/news/types';
import { NewsCard, NewsModal } from '@/features/news/components';
import { cn } from '@/lib/utils';

interface OverlappingNewsCardsProps {
  articles: NewsArticle[];
  className?: string;
}

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles,
  className
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  
  if (!articles || articles.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-gray-100 py-16 relative">
      {/* Dotted pattern background */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#00105A 1px, transparent 2px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
      </div>
      
      {/* Content with negative margin */}
      <div className={cn(
        "container mx-auto px-4 relative z-10",
        "-mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40", // Exact negative margins from reference
        className
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {articles.map(article => (
            <div key={article.id} className="h-full">
              <NewsCard
                article={article}
                onClick={setSelectedArticle}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal */}
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
