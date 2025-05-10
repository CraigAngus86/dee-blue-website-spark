import React from 'react';
import { X, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({
  article,
  isOpen,
  onClose
}) => {
  if (!isOpen || !article) return null;

  // Map category values to display text
  const categoryDisplay = {
    matchReport: 'Match Report',
    clubNews: 'Club News',
    teamNews: 'Team News',
    communityNews: 'Community News',
    commercialNews: 'Commercial News'
  };

  // Format date for display
  const formattedDate = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';
    
  // Social sharing functions
  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = `${article.title} | Banks o' Dee FC`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };
  
  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            onClick={onClose}
          >
            <X size={24} />
            <span className="sr-only">Close</span>
          </button>

          {/* Article content */}
          <div className="max-h-[90vh] overflow-y-auto">
            {/* Hero image */}
            {article.mainImage && (
              <div className="relative h-60 sm:h-72 md:h-80 lg:h-96 w-full">
                <img 
                  src={article.mainImage.url} 
                  alt={article.mainImage.alt || article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
              </div>
            )}

            {/* Article header */}
            <div className="p-6">
              {/* Improved category and date display */}
              <div className="mb-3">
                <span className="inline-block bg-blue-800 text-white px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide">
                  {categoryDisplay[article.category] || article.category}
                </span>
                <span className="text-gray-500 text-sm ml-3">{formattedDate}</span>
              </div>

              {/* Improved title styling */}
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-heading">
                {article.title}
              </h2>

              {/* Author with improved styling */}
              {article.author && (
                <div className="mb-6 text-sm font-medium text-gray-600">
                  By {article.author}
                </div>
              )}
              
              {/* Social sharing buttons */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-sm font-medium text-gray-600">Share:</div>
                <button 
                  onClick={shareOnTwitter}
                  className="p-2 bg-[#1DA1F2] text-white rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} />
                </button>
                <button 
                  onClick={shareOnFacebook}
                  className="p-2 bg-[#4267B2] text-white rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} />
                </button>
                <button 
                  onClick={copyLink}
                  className="p-2 bg-gray-600 text-white rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Copy link"
                >
                  <LinkIcon size={16} />
                </button>
              </div>

              {/* Article excerpt with improved styling */}
              {article.excerpt && (
                <div className="mb-8 text-lg text-gray-700 font-medium border-l-4 border-blue-800 pl-4 py-2 bg-blue-50 rounded-r">
                  {article.excerpt}
                </div>
              )}

              {/* Article body - with improved styling */}
              <div className="prose max-w-none">
                {/* 
                  This is a placeholder for the rich text content
                  In a real implementation, we would use a rich text renderer
                  such as the Portable Text component from Sanity
                */}
                <p className="text-gray-700 leading-relaxed">{article.body || 'No content available'}</p>
              </div>
              
              {/* Related players section */}
              {article.relatedPlayers && article.relatedPlayers.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold mb-4">Related Players</h3>
                  <div className="flex flex-wrap gap-4">
                    {article.relatedPlayers.map(player => (
                      <div key={player.id} className="flex items-center space-x-2">
                        {player.profileImage && (
                          <img 
                            src={player.profileImage.url} 
                            alt={player.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <span>{player.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery images if available - improved layout */}
              {article.gallery && article.gallery.images.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {article.gallery.images.map((image, index) => (
                      <div key={index} className="relative h-40 overflow-hidden rounded-lg shadow-md">
                        <img 
                          src={image.url} 
                          alt={image.alt || `Gallery image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
