import React from 'react';
import Link from 'next/link';
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

  // Handle click events, either navigation or modal opening
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
        featured ? 'md:flex md:h-80' : ''
      }`}
      onClick={handleClick}
    >
      {/* Image container */}
      <div className={`relative ${featured ? 'md:w-1/2' : 'h-48'}`}>
        {article.mainImage ? (
          <img
            src={article.mainImage.url}
            alt={article.mainImage.alt || article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Category label */}
        <div className="absolute top-4 left-4 bg-blue-800 text-white px-3 py-1 text-sm font-semibold rounded">
          {categoryDisplay[article.category] || article.category}
        </div>
      </div>
      
      {/* Content container */}
      <div className={`p-4 ${featured ? 'md:w-1/2 md:p-6' : ''}`}>
        <h3 className={`font-bold text-gray-900 mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {article.title}
        </h3>
        
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{formattedDate}</span>
          <span className="text-blue-800 font-semibold">Read More</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
