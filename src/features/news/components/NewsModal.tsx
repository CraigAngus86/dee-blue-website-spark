"use client";
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
    
  // Process image URL with improved transformations
  const getImageUrl = (image: any, size: 'main' | 'gallery' = 'main'): string => {
    if (!image) return '';
    
    // For Cloudinary assets from Sanity
    if (image._type === 'cloudinary.asset') {
      if (image.public_id) {
        const publicId = image.public_id;
        const format = image.format || 'jpg';
        const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload';
        
        // Different transformations based on usage
        let transformation = '';
        
        // Main article image - enhanced with progressive loading and auto improvement
        if (size === 'main') {
          if (article.category === 'matchReport') {
            // Special transformations for match report header images
            transformation = 'c_fill,g_auto:faces,y_-20,z_1.05,ar_16:9,w_auto,dpr_auto,q_auto:good,f_auto,fl_progressive,e_vibrance:20';
          } else {
            // Standard transformations for other article types
            transformation = 'c_fill,g_auto:subject,ar_16:9,w_auto,dpr_auto,q_auto:good,f_auto,fl_progressive,e_improve';
          }
        } 
        // Gallery images - square with enhanced quality and face detection
        else {
          transformation = 'c_fill,g_auto:faces,ar_1:1,w_auto,dpr_auto,q_auto:good,f_auto,e_improve';
        }
        
        return `${baseUrl}/${transformation}/${publicId}.${format}`;
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
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#f5f7fb] z-40 flex justify-between items-center px-4">
          {/* Social sharing buttons - improved hover states */}
          <div className="flex space-x-2">
            <button 
              onClick={shareOnTwitter}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} />
            </button>
            <button 
              onClick={shareOnFacebook}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} />
            </button>
            <button 
              onClick={shareOnLinkedin}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </button>
            <button 
              onClick={shareByEmail}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200"
              aria-label="Share by Email"
            >
              <Mail size={18} />
            </button>
            <button 
              onClick={copyLink}
              className="w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200"
              aria-label="Copy link"
            >
              <Copy size={18} />
            </button>
          </div>
          
          {/* Close button - enhanced hover state */}
          <button 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors duration-200"
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
                src={getImageUrl(article.mainImage, 'main')}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`Failed to load modal image for ${article.title}`);
                  // Set fallback in case of error
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'w-full h-full bg-[#00105A] flex items-center justify-center';
                  fallbackDiv.innerHTML = '<div class="w-1/3 h-1/3 opacity-50 text-white flex items-center justify-center">Banks o\' Dee FC</div>';
                  if (target.parentNode) {
                    target.parentNode.replaceChild(fallbackDiv, target);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-[#00105A] flex items-center justify-center">
                <div className="w-1/3 h-1/3 opacity-50 text-white flex items-center justify-center">
                  Banks o' Dee FC
                </div>
              </div>
            )}
            {/* FIXED: Much lighter gradient overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/60 via-[#00105A]/30 to-transparent"></div>
            
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
              <div className="mb-8 text-lg font-medium text-[#4b5563] border-l-4 border-[#00105A] pl-4 py-2 bg-[#f5f7fb]">
                {article.excerpt}
              </div>
            )}
            
            {/* Author if available */}
            {article.author && (
              <div className="mb-6 text-sm font-medium text-[#6b7280]">
                By {article.author}
              </div>
            )}
            
            {/* Main content - Updated to use PortableText with custom components */}
            <div className="prose max-w-none">
              {Array.isArray(article.body) && article.body.length > 0 ? (
                <PortableText 
                  value={article.body} 
                  components={portableTextComponents}
                />
              ) : typeof article.body === 'string' && article.body ? (
                <p className="text-[#1f2937]">{article.body}</p>
              ) : (
                <div>
                  <p className="text-[#1f2937]">Banks o' Dee FC is excited to announce summer trials for our expanding youth academy program. The trials will take place at our Spain Park facility, which features our FIFA-standard 3G artificial pitch.</p>
                  <p className="mt-4 text-[#f59e0b]">Note: Full article content is being loaded. The website is currently being updated to display rich text content correctly.</p>
                </div>
              )}
            </div>
            
            {/* Related players section if available */}
            {article.relatedPlayers && article.relatedPlayers.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#f5f7fb]">
                <h3 className="text-xl font-bold mb-4">Featured Players</h3>
                <div className="flex flex-wrap gap-4">
                  {article.relatedPlayers.map(player => (
                    <div key={player.id} className="flex items-center space-x-2 bg-[#f5f7fb] p-2 rounded">
                      {player.profileImage ? (
                        <img 
                          src={getImageUrl(player.profileImage, 'gallery')}
                          alt={player.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            const fallbackDiv = document.createElement('div');
                            fallbackDiv.className = 'w-12 h-12 rounded-full bg-[#00105A] flex items-center justify-center';
                            fallbackDiv.innerHTML = `<span class="text-white text-xs">${player.name.charAt(0)}</span>`;
                            if (target.parentNode) {
                              target.parentNode.replaceChild(fallbackDiv, target);
                            }
                          }}
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
            {article.gallery && article.gallery.images && article.gallery.images.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#f5f7fb]">
                <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.gallery.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-md">
                      <img 
                        src={getImageUrl(image, 'gallery')}
                        alt={image.alt || `Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'w-full h-full bg-[#f5f7fb] flex items-center justify-center';
                          fallbackDiv.innerHTML = '<span class="text-[#6b7280]">Image not available</span>';
                          if (target.parentNode) {
                            target.parentNode.replaceChild(fallbackDiv, target);
                          }
                        }}
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
