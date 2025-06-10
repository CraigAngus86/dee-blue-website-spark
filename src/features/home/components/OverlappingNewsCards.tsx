"use client";
import React, { useState } from 'react';
import { NewsArticle } from '@/features/news/types';
import { NewsCard, NewsModal } from '@/features/news/components';
import { MatchGalleryModal } from '@/features/galleries';
import { cn } from '@/lib/utils';

interface OverlappingNewsCardsProps {
  articles: (NewsArticle & { contentType?: string })[];
  className?: string;
}

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles,
  className
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  if (!articles || articles.length === 0) {
    return null;
  }
  
  // Function to handle clicks on content (articles or galleries)
  const handleContentClick = async (content: NewsArticle & { contentType?: string }) => {
    try {
      setIsLoading(true);
      
      if (content.contentType === 'gallery') {
        // Handle gallery click - store gallery ID for modal
        setSelectedGalleryId(content._id);
      } else {
        // Handle article click - fetch complete article if needed
        if (Array.isArray(content.body) && content.body.length > 0) {
          // Article already has complete data
          setSelectedArticle(content);
        } else {
          // Fetch the complete article data by slug using the existing endpoint
          const response = await fetch(`/api/sanity-test/news?slug=${encodeURIComponent(content.slug)}`);
          
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
            setSelectedArticle(content);
          }
        }
      }
    } catch (error) {
      console.error('Error handling content click:', error);
      // If there's an error, still show the modal with original data
      if (content.contentType === 'gallery') {
        setSelectedGalleryId(content._id);
      } else {
        setSelectedArticle(content);
      }
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
          {articles.map(content => (
            <div key={content.id} className="h-full">
              <NewsCard
                article={content}
                onClick={handleContentClick}
                className="rounded-lg overflow-hidden"
              />
            </div>
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
      
      {/* Gallery Modal */}
      {selectedGalleryId && (
        <MatchGalleryModal
          galleryId={selectedGalleryId}
          isOpen={!!selectedGalleryId}
          onClose={() => setSelectedGalleryId(null)}
        />
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-[#00105A]">
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-[#00105A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading {selectedGalleryId ? 'gallery' : 'article'}...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlappingNewsCards;
