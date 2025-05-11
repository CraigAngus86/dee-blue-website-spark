"use client";

import React from 'react';
import { NewsArticle } from '@/features/news/types';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, className }) => {
  // Calculate time ago
  const timeAgo = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: false })
    : '';
  
  // Map category values to display text
  const categoryDisplay: Record<string, string> = {
    matchReport: 'MATCH REPORT',
    clubNews: 'CLUB NEWS',
    teamNews: 'TEAM NEWS',
    commercialNews: 'COMMERCIAL NEWS'
  };
  
  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };
  
  return (
    <div 
      className={cn(
        "flex flex-col h-full bg-white overflow-hidden rounded-sm transition-all hover:shadow-lg hover:translate-y-[-4px]",
        "border border-gray-100 shadow",
        className
      )}
    >
      {/* Image with 16:9 aspect ratio */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {article.mainImage ? (
          <img 
            src={article.mainImage.url} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        
        {/* Category tag - positioned on the image */}
        <div className="absolute left-0 top-0 bg-[#00105A] text-white text-xs font-bold py-1 px-3">
          {categoryDisplay[article.category] || article.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-[#00105A]">
          {article.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        
        {/* Footer with date and read more */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {timeAgo ? `${timeAgo} ago` : ''}
          </span>
          
          <button 
            onClick={handleClick}
            className="flex items-center text-sm font-medium text-[#00105A] hover:text-[#FFD700] transition-colors"
          >
            Read More
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
