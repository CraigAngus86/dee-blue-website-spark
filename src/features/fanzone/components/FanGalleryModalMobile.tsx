"use client";
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface FanGalleryModalMobileProps {
  photo: any | null;
  photoUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FanGalleryModalMobile({
  photo,
  photoUrl,
  isOpen,
  onClose
}: FanGalleryModalMobileProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !photo || !photoUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 md:hidden">
      {/* Close button - top right corner */}
      <button
        className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors duration-200 z-10"
        onClick={onClose}
        aria-label="Close photo"
      >
        <X size={28} />
      </button>
      
      {/* Just the photo - no text, no caption */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={photoUrl}
          alt={`Photo by ${photo.fanName}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>
      
      {/* Tap anywhere to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close photo"
      />
    </div>
  );
}