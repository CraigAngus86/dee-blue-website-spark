import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '../../types';

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  onClick,
  featured = false
}) => {
  // Format the date as "X days ago"
  const formattedDate = article.publishedAt 
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : '';
  
  // Map category values to display text
  const categoryDisplay = {
    matchReport: 'Match Report',
    clubNews: 'Club News',
    teamNews: 'Team News',
    communityNews: 'Community News',
    commercialNews: 'Commercial News'
  };

  // Handle click events
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg cursor-pointer 
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  ${featured ? 'aspect-[2/1]' : 'aspect-square'} h-full w-full`}
      onClick={handleClick}
    >
      {/* Background image or placeholder */}
      {article.mainImage ? (
        <img
          src={article.mainImage.url}
          alt={article.mainImage.alt || article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-[#00105A] flex items-center justify-center">
          <img 
            src="/assets/images/logo/logo-white.png" 
            alt="Banks o' Dee FC" 
            className="w-1/3 h-1/3 object-contain opacity-30"
          />
        </div>
      )}
      
      {/* Blue hover overlay */}
      <div className="absolute inset-0 bg-[#00105A] opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-10"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/50 to-transparent z-20"></div>
      
      {/* Category label */}
      <div className="absolute top-4 left-4 bg-[#00105A] text-white px-3 py-1 text-xs font-bold rounded z-30">
        {categoryDisplay[article.category] || article.category}
      </div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
        <h3 className={`font-bold leading-tight mb-2 text-white 
                       ${featured ? 'text-2xl md:text-3xl' : 'text-xl'} line-clamp-2`}>
          {article.title}
        </h3>
        
        <div className="flex items-center">
          <span className="text-xs text-white/70">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;