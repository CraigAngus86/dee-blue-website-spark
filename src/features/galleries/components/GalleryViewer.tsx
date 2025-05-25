"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { useGallery } from '../hooks/useGallery';

interface GalleryViewerProps {
  photo: GalleryPhoto;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  currentIndex: number;
  totalPhotos: number;
}

const GalleryViewer: React.FC<GalleryViewerProps> = ({
  photo,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  currentIndex,
  totalPhotos
}) => {
  const { getOptimizedImageUrl } = useGallery();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  
  // Reset loading state and trigger fade-in effect when photo changes
  useEffect(() => {
    setIsLoading(true);
    setFadeIn(false);
    
    // Small delay before fade-in to ensure animation works
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [photo]);
  
  // Handle image loading completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Failed to load gallery image");
    setIsLoading(false);
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full bg-gray-200 flex items-center justify-center';
    fallbackDiv.innerHTML = '<span class="text-gray-500 text-lg">Image could not be loaded</span>';
    
    if (target.parentNode) {
      target.parentNode.replaceChild(fallbackDiv, target);
    }
  };
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-[#00105A]/20 border-t-[#00105A] rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Main image with fade transition */}
      <div className={`relative w-full h-full max-h-[calc(90vh-150px)] flex items-center justify-center transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src={getOptimizedImageUrl(photo?.image, 'viewer')}
          alt={photo.caption || `Photo ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager" // Load current image eagerly
        />
        
        {/* Image counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} of {totalPhotos}
        </div>
        
        {/* Navigation buttons */}
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-r-md transition-opacity ${
            hasPrevious ? 'opacity-70 hover:opacity-100' : 'opacity-0 cursor-default'
          }`}
          aria-label="Previous photo"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
        
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-l-md transition-opacity ${
            hasNext ? 'opacity-70 hover:opacity-100' : 'opacity-0 cursor-default'
          }`}
          aria-label="Next photo"
        >
          <ChevronRight size={32} className="text-white" />
        </button>
      </div>
      
      {/* Caption if available */}
      {photo.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-white">
          {photo.caption}
        </div>
      )}
    </div>
  );
};

export default GalleryViewer;
