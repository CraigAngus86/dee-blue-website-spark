"use client";
import React from 'react';
import { NewsArticle } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { getCloudinaryImageUrl, getContentType, getMosaicVariant } from '@/lib/cloudinary/imageTransforms';

interface NewsPageCardProps {
  article: NewsArticle & { contentType?: string };
  className?: string;
  cardSize?: string; // New prop for grid size
  isFeatured?: boolean;
  isGallery?: boolean;
  onClick?: (article: NewsArticle) => void;
}

const NewsPageCard: React.FC<NewsPageCardProps> = ({
  article,
  className,
  cardSize = '1x1', // Default to standard size
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
  
  // Get content type for Cloudinary transforms
  const contentType = getContentType(article.category);
  
  // Get the appropriate variant based on card size
  const variant = getMosaicVariant(cardSize);
  
  // Set width based on card size
  const getWidth = () => {
    switch(cardSize) {
      case '2x2': return 1200; // Largest
      case '2x1': return 800;  // Wide
      case '1x2': return 400;  // Tall but narrow
      case '1x1': return 600;  // Standard
      default: return 600;
    }
  };
  
  // Get optimized image URL using smart mosaic transforms
  const imageUrl = article.mainImage 
    ? getCloudinaryImageUrl(article.mainImage, {
        variant,
        contentType,
        width: getWidth()
      })
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
        {article.mainImage && imageUrl ? (
          <img 
            src={imageUrl}
            alt={article.mainImage.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              console.error(`Failed to load news page card image for ${article.title}`);
              // Set fallback in case of error
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNhM2E3YjAiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            }}
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
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/40 to-transparent"></div>
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 text-white">
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#00105A] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
            {categoryDisplay[article.category] || article.category}
          </span>
        </div>
        
        {/* Title - adjust size based on card size */}
        <h3 className={cn(
          "font-bold text-white font-montserrat leading-tight mb-2",
          cardSize === '2x2' ? "text-2xl md:text-3xl" : 
          cardSize === '2x1' ? "text-xl md:text-2xl" :
          "text-lg md:text-xl"
        )}>
          {article.title}
        </h3>
        
        {/* Date */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsPageCard;
