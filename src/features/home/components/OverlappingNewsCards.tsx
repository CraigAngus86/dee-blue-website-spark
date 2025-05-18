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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  if (!articles || articles.length === 0) {
    return null;
  }
  
  // Function to fetch the full article data when a card is clicked
  const handleArticleClick = async (article: NewsArticle) => {
    try {
      setIsLoading(true);
      
      // Only fetch complete article if we need to (if it doesn't have a body)
      if (Array.isArray(article.body) && article.body.length > 0) {
        // Article already has complete data
        setSelectedArticle(article);
      } else {
        // Fetch the complete article data by slug using the existing endpoint
        const response = await fetch(`/api/sanity-test/news?slug=${encodeURIComponent(article.slug)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Set the complete article
          setSelectedArticle(data.data);
        } else {
          // If fetch fails, use the original article data
          console.warn('Failed to fetch complete article, using limited data');
          setSelectedArticle(article);
        }
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      // If there's an error, still show the modal with original data
      setSelectedArticle(article);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white py-16 relative">
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
                onClick={handleArticleClick}
                className="rounded-lg overflow-hidden"
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
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-[#00105A]">
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-[#00105A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading article...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlappingNewsCards;
