"use client";
import React from 'react';
import { NewsArticle } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Camera, ChevronRight } from 'lucide-react';
interface NewsPageCardProps {
  article: NewsArticle & { contentType?: string };
  className?: string;
  isFeatured?: boolean;
  isGallery?: boolean;
  onClick?: (article: NewsArticle) => void;
}
const NewsPageCard: React.FC<NewsPageCardProps> = ({
  article,
  className,
  isFeatured = false,
  isGallery = false,
  onClick
}) => {
  // Map category values to display text
  const categoryDisplay: Record<string, string> = {
    matchReport: 'MATCH REPORT',
    clubNews: 'CLUB NEWS',
    teamNews: 'TEAM NEWS',
    communityNews: 'COMMUNITY NEWS',
    commercialNews: 'COMMERCIAL NEWS',
    matchGallery: 'MATCH GALLERY'
  };
  // Format date for display
  const formattedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : '';
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full",
        className
      )}
      onClick={() => onClick?.(article)}
    >
      {/* Image with full overlay */}
      <div className="absolute inset-0">
        {article.mainImage ? (
          <img
            src={article.mainImage.url}
            alt={article.mainImage.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#00105A] flex items-center justify-center">
            <img
              src="/assets/logo.svg"
              alt="Banks o' Dee FC"
              className="w-1/3 h-1/3 opacity-20"
            />
          </div>
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/50 to-transparent"></div>
      </div>
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 text-white">
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#00105A] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded flex items-center">
            {isGallery && <Camera className="w-3 h-3 mr-1" />}
            {categoryDisplay[article.category] || article.category}
          </span>
        </div>
        {/* Title */}
        <h3 className={cn(
          "font-bold text-white font-montserrat leading-tight mb-2",
          isFeatured ? "text-2xl md:text-3xl" : "text-xl"
        )}>
          {article.title}
        </h3>
        {/* Gallery icon or date */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">
            {formattedDate}
          </p>
          {isGallery && (
            <div className="flex items-center text-white/90 text-sm">
              <span>View Gallery</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NewsPageCard;
