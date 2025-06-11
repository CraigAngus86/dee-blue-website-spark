"use client";
import React from 'react';
import { NewsArticle } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

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

  // ✅ FIXED: Format date for display (ensure it works for galleries too)
  const formattedDate = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : '';

  // ✅ RESTORED: Original working transforms
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
          // Responsive sizing, vibrance enhancement, face detection with position adjustment
          return `${baseUrl}/c_fill,g_auto:faces,y_-20,z_1.05,ar_16:9,w_auto,dpr_auto,q_auto:good,f_auto,e_vibrance:20/${publicId}.${format}`;
        } else {
          // Enhanced transformation for other news categories:
          // Responsive sizing, improved sharpness
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
        "group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full",
        className
      )}
      onClick={() => onClick?.(article)}
    >
      {/* Image with full overlay */}
      <div className="absolute inset-0">
        {article.mainImage ? (
          <img 
            src={getImageUrl(article.mainImage)}
            alt={article.mainImage.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load news page card image for ${article.title}`);
              console.error('Image data:', article.mainImage);
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
        
        {/* ✅ FIXED: Lighter gradient overlay (matching homepage NewsCard) */}
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
        
        {/* Title */}
        <h3 className={cn(
          "font-bold text-white font-montserrat leading-tight mb-2",
          isFeatured ? "text-2xl md:text-3xl" : "text-xl"
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
