"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsArticle } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
  onClick?: (article: NewsArticle) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  className,
  onClick
}) => {
  // Map category values to display text
  const categoryDisplay: Record<string, string> = {
    matchReport: 'MATCH REPORT',
    clubNews: 'CLUB NEWS',
    teamNews: 'TEAM NEWS',
    communityNews: 'COMMUNITY NEWS',
    commercialNews: 'COMMERCIAL NEWS'
  };

  // Format date for display
  const formattedDate = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : '';
  
  // Prepare truncated excerpt
  const truncatedExcerpt = article.excerpt?.substring(0, 120) + (article.excerpt?.length > 120 ? '...' : '');

  return (
    <div 
      className={cn(
        "group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer",
        className
      )}
      onClick={() => onClick?.(article)}
    >
      {/* Image section (top half) */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {article.mainImage ? (
          <img 
            src={article.mainImage.url} 
            alt={article.mainImage.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#00105A]/10 flex items-center justify-center">
            <span className="text-[#00105A]/40">No image available</span>
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#00105A] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
            {categoryDisplay[article.category] || article.category}
          </span>
        </div>
      </div>
      
      {/* Content section (bottom half) */}
      <div className="p-4 md:p-5 bg-[#F4F7FB] flex flex-col h-[calc(100%-56.25%)]">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#00105A] mb-2.5 line-clamp-2 font-montserrat leading-tight">
          {article.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {truncatedExcerpt || 'Read the full article for details.'}
        </p>
        
        {/* Footer with date and read more */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <span className="text-xs text-gray-500">
            {formattedDate}
          </span>
          
          <span className="text-sm text-[#00105A] font-medium flex items-center group-hover:text-primary-light transition-colors">
            Read More 
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1.5 rounded-full bg-[#00105A]/10 group-hover:bg-[#00105A]/20 transition-colors">
              <ArrowRight className="w-3 h-3" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
