import React from 'react';
import { X, Twitter, Facebook, Linkedin, Mail, Copy } from 'lucide-react';
import { NewsArticle } from '../types';
import { PortableText } from '@portabletext/react';
import portableTextComponents from './portable-text/PortableTextComponents';

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
        day: 'numeric',
        month: 'long',
        year: 'numeric'
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
  
  const shareOnLinkedin = () => {
    const url = window.location.href;
    const title = article.title;
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  };
  
  const shareByEmail = () => {
    const url = window.location.href;
    const subject = article.title;
    const body = `I thought you might be interested in this article from Banks o' Dee FC: ${article.title}\n\n${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
      <div className="relative max-w-5xl w-full max-h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Light grey header bar with social buttons and close button */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-100 z-40 flex justify-between items-center px-4">
          {/* Social sharing buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={shareOnTwitter}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} className="text-[#00105A]" />
            </button>
            <button 
              onClick={shareOnFacebook}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} className="text-[#00105A]" />
            </button>
            <button 
              onClick={shareOnLinkedin}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} className="text-[#00105A]" />
            </button>
            <button 
              onClick={shareByEmail}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Share by Email"
            >
              <Mail size={18} className="text-[#00105A]" />
            </button>
            <button 
              onClick={copyLink}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Copy link"
            >
              <Copy size={18} className="text-[#00105A]" />
            </button>
          </div>
          
          {/* Close button - now navy */}
          <button 
            className="text-[#00105A] hover:text-[#001C8C]"
            onClick={onClose}
          >
            <X size={22} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        {/* Article content in a scrollable container */}
        <div className="overflow-y-auto max-h-[95vh] pt-12">
          {/* Main image with overlay */}
          <div className="relative w-full h-[50vh]">
            {article.mainImage ? (
              <img 
                src={article.mainImage.url} 
                alt={article.mainImage.alt || article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#00105A] flex items-center justify-center">
                <img 
                  src="/assets/images/logo/logo-white.png" 
                  alt="Banks o' Dee FC" 
                  className="w-1/3 h-1/3 object-contain opacity-50"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/60 to-transparent"></div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center flex-wrap gap-2">
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#C5E7FF] text-[#00105A] rounded">
                  {categoryDisplay[article.category] || article.category}
                </span>
                <span className="text-sm text-white/80">{formattedDate}</span>
              </div>
            </div>
          </div>
          
          {/* Article content */}
          <div className="px-6 py-8 bg-white">
            {/* Excerpt with special styling */}
            {article.excerpt && (
              <div className="mb-8 text-lg font-medium text-gray-700 border-l-4 border-[#00105A] pl-4 py-2 bg-gray-50">
                {article.excerpt}
              </div>
            )}
            
            {/* Author if available */}
            {article.author && (
              <div className="mb-6 text-sm font-medium text-gray-600">
                By {article.author}
              </div>
            )}
            
            {/* Main content - Updated to use PortableText with custom components */}
            <div className="prose max-w-none">
              {Array.isArray(article.body) ? (
                <PortableText 
                  value={article.body} 
                  components={portableTextComponents}
                />
              ) : typeof article.body === 'string' ? (
                <p className="text-gray-800">{article.body}</p>
              ) : (
                <div>
                  <p className="text-gray-800">Following the successful launch of our comprehensive youth academy program, Banks o' Dee FC is pleased to announce summer trials for young players aged 8-16. The trials will take place at our Spain Park facility, which features our FIFA-standard 3G artificial pitch.</p>
                  <p className="mt-4">Please see the Sanity Studio for full article content. The website is currently being updated to display rich text content.</p>
                </div>
              )}
            </div>
            
            {/* Related players section if available */}
            {article.relatedPlayers && article.relatedPlayers.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">Featured Players</h3>
                <div className="flex flex-wrap gap-4">
                  {article.relatedPlayers.map(player => (
                    <div key={player.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                      {player.profileImage ? (
                        <img 
                          src={player.profileImage.url} 
                          alt={player.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#00105A] flex items-center justify-center">
                          <span className="text-white text-xs">{player.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="font-medium">{player.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Gallery if available */}
            {article.gallery && article.gallery.images.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.gallery.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-md">
                      <img 
                        src={image.url} 
                        alt={image.alt || `Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
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
  );
};

export default NewsModal;
