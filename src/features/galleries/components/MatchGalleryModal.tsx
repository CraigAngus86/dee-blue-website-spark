"use client";
import React, { useState, useEffect } from 'react';
import { X, Twitter, Facebook, Linkedin, Mail, Link } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import GalleryViewer from './GalleryViewer';
import GalleryThumbnailGrid from './GalleryThumbnailGrid';

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
    setCurrentPhotoIndex(0);
  }, [gallery]);

  // Handle sharing functionality
  const shareGallery = (platform: string) => {
    const url = window.location.href;
    const title = gallery?.title || 'Photo Gallery';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  // Navigation handlers for GalleryViewer
  const handleNext = () => {
    setCurrentPhotoIndex(prev => Math.min(prev + 1, gallery!.photos.length - 1));
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex(prev => Math.max(prev - 1, 0));
  };

  // Don't render if not open
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

  // Handle error state OR empty photos array
  if (error || !gallery || !gallery.photos || gallery.photos.length === 0) {
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
                {error ? 'Unable to load gallery' : 'No photos available for this match'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gallery found and loaded successfully with photos
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
          {/* Main photo viewer - GalleryViewer handles its own navigation */}
          <div className="flex-1 bg-black relative overflow-hidden">
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
