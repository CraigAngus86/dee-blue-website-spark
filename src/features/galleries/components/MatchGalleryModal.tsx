"use client";
import React, { useState, useEffect } from 'react';
import { X, Twitter, Facebook, Linkedin, Mail, Link, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import { GalleryViewer } from './GalleryViewer';
import { GalleryThumbnailGrid } from './GalleryThumbnailGrid';

interface MatchGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryId?: string;
  matchId?: string;
}

export function MatchGalleryModal({ isOpen, onClose, galleryId, matchId }: MatchGalleryModalProps) {
  const { gallery, loading, error } = useGallery(galleryId, matchId);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Reset photo index when gallery changes
  useEffect(() => {
    if (gallery) {
      setCurrentPhotoIndex(0);
    }
  }, [gallery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || !gallery) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setCurrentPhotoIndex(prev => 
            prev > 0 ? prev - 1 : gallery.photos.length - 1
          );
          break;
        case 'ArrowRight':
          setCurrentPhotoIndex(prev => 
            prev < gallery.photos.length - 1 ? prev + 1 : 0
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, gallery, onClose]);

  const shareGallery = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this match gallery from Banks o' Dee FC`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  if (!isOpen) return null;
  
  // Handle loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 flex items-center justify-center">
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
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00105A] mx-auto mb-4"></div>
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
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 flex items-center justify-center">
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
              <div className="text-6xl mb-4">📷</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Gallery Not Available</h2>
              <p className="text-gray-600">
                {error ? 'Unable to load gallery' : 'No gallery found for this match'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Gallery found and loaded successfully
  const currentPhoto = gallery.photos[currentPhotoIndex];
  
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black/50 flex items-center justify-center">
      <div className="relative w-full max-w-6xl h-[85vh] mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Social sharing bar */}
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
              aria-label="Share via Email"
            >
              <Mail size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
            <button 
              onClick={() => shareGallery('copy')}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e5e7eb] transition-colors"
              aria-label="Copy Link"
            >
              <Link size={18} className="text-[#00105A] hover:text-[#FFD700]" />
            </button>
          </div>
          
          <button 
            className="text-[#00105A] hover:text-[#001C8C]"
            onClick={onClose}
          >
            <X size={22} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main photo viewer */}
          <div className="flex-1 bg-black relative overflow-hidden">
            <GalleryViewer 
              photos={gallery.photos}
              currentIndex={currentPhotoIndex}
              onIndexChange={setCurrentPhotoIndex}
            />
            
            {/* Navigation arrows */}
            {gallery.photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentPhotoIndex(prev => 
                    prev > 0 ? prev - 1 : gallery.photos.length - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setCurrentPhotoIndex(prev => 
                    prev < gallery.photos.length - 1 ? prev + 1 : 0
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            
            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentPhotoIndex + 1} of {gallery.photos.length}
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="h-24 bg-[#f5f7fb] border-t border-gray-200">
            <GalleryThumbnailGrid 
              photos={gallery.photos}
              currentIndex={currentPhotoIndex}
              onIndexChange={setCurrentPhotoIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchGalleryModal;
