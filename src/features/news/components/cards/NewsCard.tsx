"use client";
import React from 'react';
import { NewsArticle } from '@/features/news/types';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CloudinaryImage from '@/components/ui/cloudinary/CloudinaryImage';

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, className }) => {
  const timeAgo = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: false })
    : '';
  
  const categoryDisplay: Record<string, string> = {
    matchReport: 'MATCH REPORT',
    clubNews: 'CLUB NEWS',
    teamNews: 'TEAM NEWS',
    commercialNews: 'COMMERCIAL NEWS',
    matchGallery: 'MATCH GALLERY'
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };
  
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col",
        "transform hover:scale-[1.02]",
        className
      )}
      onClick={handleClick}
    >
      {/* Updated to use aspect ratio container with CloudinaryImage */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        {article.mainImage ? (
          <>
            <CloudinaryImage
              image={article.mainImage}
              variant="card"
              alt={article.mainImage?.alt || article.title}
              category={article.category}
              className="transition-transform duration-300 hover:scale-105"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/40 via-transparent to-transparent"></div>
        
        <div className="absolute left-4 top-4 bg-[#00105A] text-white text-xs font-bold py-1 px-3 rounded">
          {categoryDisplay[article.category] || article.category}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold mb-2 text-[#00105A]">
          {article.title}
        </h3>
        
        {article.excerpt && (
          <p className="text-[#6b7280] mb-4 flex-grow text-sm leading-relaxed">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-[#6b7280] mt-auto">
          <span>{timeAgo} ago</span>
          <div className="flex items-center text-[#00105A] font-medium">
            Read More
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
