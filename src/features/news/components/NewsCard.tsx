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
  
  // Process Cloudinary image with improved transformations
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    
    // For Cloudinary assets from Sanity
    if (image._type === 'cloudinary.asset') {
      // Use either secure_url or construct from public_id
      if (image.public_id) {
        const publicId = image.public_id;
        const format = image.format || 'jpg';
        const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
        
        // Check if it's a match report (likely to have people/action)
        if (article.category === 'matchReport') {
          // Improved transformation for match reports/action shots:
          // 1. y_-20: shifts the crop area upward to include faces
          // 2. z_1.05: slight zoom to enlarge the subjects
          // 3. g_auto:faces: focuses on faces but with the offset
          return `${baseUrl}/c_fill,g_auto:faces,y_-20,z_1.05,ar_16:9,w_800,h_450,q_auto:good,f_auto/${publicId}.${format}`;
        } else {
          // Standard transformation for other news categories
          return `${baseUrl}/c_fill,g_auto:subject,ar_16:9,w_800,h_450,q_auto:good,f_auto/${publicId}.${format}`;
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
        "flex flex-col h-full bg-white overflow-hidden rounded-lg transition-all hover:shadow-lg hover:translate-y-[-4px]",
        "border border-[#f5f7fb] shadow",
        className
      )}
    >
      {/* Image with 16:9 aspect ratio */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {article.mainImage ? (
          <>
            <img 
              src={getImageUrl(article.mainImage)}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                console.error(`Failed to load card image for ${article.title}`);
                console.error('Image data:', article.mainImage);
                // Set fallback in case of error
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNhM2E3YjAiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
              }}
            />
            {/* Subtle gradient overlay - lighter than the hero */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/40 to-transparent opacity-70"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        
        {/* Category tag - repositioned to have some margin from the edge */}
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
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        
        {/* Footer with date and read more */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-[#f5f7fb]">
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
