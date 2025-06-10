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
    commercialNews: 'COMMERCIAL NEWS',
    matchGallery: 'MATCH GALLERY'
  };
  
  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };
  
  // COPY EXACT image processing from NewsPageCard (which works with galleries)
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    
    // For Cloudinary assets from Sanity
    if (image._type === 'cloudinary.asset') {
      if (image.public_id) {
        const publicId = image.public_id;
        const format = image.format || 'jpg';
        const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
        
        // Check if it's a match report (likely to have people/action)
        if (article.category === 'matchReport') {
          // Enhanced transformation for match reports/action shots:
          return `${baseUrl}/c_fill,g_auto:faces,y_-20,z_1.05,ar_16:9,w_auto,dpr_auto,q_auto:good,f_auto,e_vibrance:20/${publicId}.${format}`;
        } else {
          // Enhanced transformation for other news categories:
          return `${baseUrl}/c_fill,g_auto:subject,ar_16:9,w_auto,dpr_auto,q_auto:good,f_auto,e_sharpen/${publicId}.${format}`;
        }
      } else if (image.secure_url) {
        return image.secure_url;
      }
    } 
    // Handle regular URLs
    else if (image.url) {
      return image.url;
    }
    // Handle direct string URLs
    else if (typeof image === 'string') {
      return image;
    }
    
    return '';
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
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        {article.mainImage ? (
          <img 
            src={getImageUrl(article.mainImage)}
            alt={article.mainImage?.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              console.error(`Failed to load image for ${article.title}`);
              console.error('Image data:', article.mainImage);
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNhM2E3YjAiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/40 via-transparent to-transparent"></div>
        
        {/* Category tag */}
        <div className="absolute left-4 top-4 bg-[#00105A] text-white text-xs font-bold py-1 px-3 rounded">
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
        {article.excerpt && (
          <p className="text-[#6b7280] mb-4 flex-grow text-sm leading-relaxed">
            {article.excerpt}
          </p>
        )}
        
        {/* Footer with time and read more */}
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
