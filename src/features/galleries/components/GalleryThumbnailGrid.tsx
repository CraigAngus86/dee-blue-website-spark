"use client";
import React, { useRef, useEffect } from 'react';
import { useGallery } from '../hooks/useGallery';
import { GalleryPhoto } from '../types';

interface GalleryThumbnailGridProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const GalleryThumbnailGrid: React.FC<GalleryThumbnailGridProps> = ({
  photos,
  currentIndex,
  onIndexChange
}) => {
  const { getOptimizedImageUrl } = useGallery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to keep the active thumbnail visible
  useEffect(() => {
    if (scrollContainerRef.current && currentIndex >= 0) {
      const container = scrollContainerRef.current;
      const thumbnails = container.querySelectorAll('.thumbnail-item');
      
      if (thumbnails.length > currentIndex) {
        const activeThumb = thumbnails[currentIndex] as HTMLElement;
        if (activeThumb) {
          // Calculate scroll position to center the active thumbnail
          const containerWidth = container.clientWidth;
          const thumbLeft = activeThumb.offsetLeft;
          const thumbWidth = activeThumb.clientWidth;
          const targetScroll = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
          
          container.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: 'smooth'
          });
        }
      }
    }
  }, [currentIndex]);
  
  // Handle thumbnail error
  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full bg-gray-200 flex items-center justify-center';
    fallbackDiv.innerHTML = '<span class="text-gray-500 text-xs">Image error</span>';
    
    if (target.parentNode) {
      target.parentNode.replaceChild(fallbackDiv, target);
    }
  };
  
  return (
    <div className="h-full relative">
      {/* Left gradient scroll indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f5f7fb] to-transparent z-10 pointer-events-none"></div>
      
      {/* Thumbnails in a scrollable row with reduced spacing */}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-1 overflow-x-auto pb-2 h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-6"
      >
        {photos.map((photo, idx) => {
          const isActive = currentIndex === idx;
          
          return (
            <div 
              key={idx} 
              className={`
                h-full aspect-square cursor-pointer relative overflow-hidden rounded 
                thumbnail-item transition-all duration-150 flex-shrink-0
                ${isActive ? 'ring-3 ring-[#FFD700]' : 'ring-1 ring-gray-200 hover:ring-[#C5E7FF]'}
              `}
              onClick={() => onIndexChange(idx)}
            >
              <img
                src={getOptimizedImageUrl(photo.image, 'thumbnail')}
                alt={photo.caption || `Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
                onError={handleThumbnailError}
                loading="lazy" // Lazy load thumbnails for performance
              />
              {isActive && (
                <div className="absolute inset-0 bg-[#00105A]/20 border-2 border-[#FFD700]"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Right gradient scroll indicator */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f5f7fb] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default GalleryThumbnailGrid;
