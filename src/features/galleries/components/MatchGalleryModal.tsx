"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { X, Twitter, Facebook, Linkedin, Mail, Copy, Camera } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import GalleryViewer from './GalleryViewer';
import GalleryThumbnailGrid from './GalleryThumbnailGrid';

interface MatchGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryId?: string;
  matchId?: string;
}

const MatchGalleryModal: React.FC<MatchGalleryModalProps> = ({
  isOpen,
  onClose,
  galleryId,
  matchId
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const { gallery, loading, error, getOptimizedImageUrl } = useGallery(galleryId, matchId);
  
  // Reset to first photo when gallery changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [galleryId, matchId]);
  
  // Reset when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentPhotoIndex(0);
    }
  }, [isOpen]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !gallery) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (currentPhotoIndex > 0) {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (currentPhotoIndex < gallery?.photos?.length - 1) {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gallery, currentPhotoIndex, onClose]);
  
  // Navigate to previous photo
  const handlePrevious = useCallback(() => {
    if (!gallery || currentPhotoIndex <= 0) return;
    setCurrentPhotoIndex(currentPhotoIndex - 1);
  }, [gallery, currentPhotoIndex]);
  
  // Navigate to next photo
  const handleNext = useCallback(() => {
    if (!gallery || currentPhotoIndex >= gallery?.photos?.length - 1) return;
    setCurrentPhotoIndex(currentPhotoIndex + 1);
  }, [gallery, currentPhotoIndex]);
  
  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentPhotoIndex(index);
  };
  
  // Social sharing functions
  const shareGallery = (platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'copy') => {
    if (!gallery) return;
    
    const url = window.location.href;
    const title = gallery.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        const body = `Check out this gallery from Banks o' Dee FC: ${title}\n\n${url}`;
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Gallery link copied to clipboard!');
        break;
    }
  };
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Handle loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
        <div className="relative max-w-5xl w-full max-h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-12 bg-[#f5f7fb] z-40 flex justify-between items-center px-4">
            <div></div>
            <button 
              className="text-[#00105A] hover:text-[#001C8C]"
              onClick={onClose}
            >
              <X size={22} />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="h-[80vh] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00105A] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle error state
  if (error || !gallery) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
        <div className="relative max-w-5xl w-full max-h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-12 bg-[#f5f7fb] z-40 flex justify-between items-center px-4">
            <div></div>
            <button 
              className="text-[#00105A] hover:text-[#001C8C]"
              onClick={onClose}
            >
              <X size={22} />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="h-[80vh] flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gallery not found</h3>
              <p className="text-gray-600 mb-4">
                {error?.message || "Gallery not found"}
              </p>
              <button 
                className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#001C8C] transition-colors"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Gallery found and loaded successfully
  const currentPhoto = gallery.photos[currentPhotoIndex];
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 flex items-center justify-center">
      <div className="relative w-full max-w-6xl h-[85vh] mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Social sharing bar - keeping exactly the same as requested */}
        <div className="h-12 bg-[#f5f7fb] flex justify-between items-center px-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => shareGallery('twitter')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e5e7eb] transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
            <button 
              onClick={() => shareGallery('facebook')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e5e7eb] transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
            <button 
              onClick={() => shareGallery('linkedin')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e5e7eb] transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
            <button 
              onClick={() => shareGallery('email')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e5e7eb] transition-colors"
              aria-label="Share by Email"
            >
              <Mail size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
            <button 
              onClick={() => shareGallery('copy')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e5e7eb] transition-colors"
              aria-label="Copy link"
            >
              <Copy size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
          </div>
          
          <button 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors"
            onClick={onClose}
          >
            <X size={22} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        {/* Gallery title bar with reduced height and shadow */}
        <div className="bg-[#00105A] py-2 px-6 text-white flex justify-between items-center shadow-md">
          {/* Left-aligned title with proper font weight */}
          <h2 className="text-2xl font-bold">{gallery.title}</h2>
          
          {/* Date and photographer on right, stacked vertically */}
          <div className="flex flex-col items-end text-sm">
            {gallery.matchDate && (
              <div>
                {new Date(gallery.matchDate).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long', 
                  year: 'numeric'
                })}
              </div>
            )}
            {gallery.photographer && (
              <div className="text-white/90 mt-1 flex items-center">
                <Camera size={14} className="mr-1 text-[#FFD700]" />
                <span>Photos by: {gallery.photographer}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Main photo viewer with fade transitions */}
        <div className="flex-grow bg-black overflow-hidden flex items-center justify-center">
          <GalleryViewer 
            photo={currentPhoto}
            onNext={handleNext}
            onPrevious={handlePrevious}
            hasNext={currentPhotoIndex < gallery.photos.length - 1}
            hasPrevious={currentPhotoIndex > 0}
            currentIndex={currentPhotoIndex}
            totalPhotos={gallery.photos.length}
          />
        </div>
        
        {/* Thumbnail grid showing all thumbnails */}
        <div className="h-32 bg-[#f5f7fb] p-2">
          <GalleryThumbnailGrid
            photos={gallery.photos}
            currentIndex={currentPhotoIndex}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchGalleryModal;
