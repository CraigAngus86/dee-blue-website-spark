"use client";
import React, { useState } from 'react';
import FanSubmissionModal from './FanSubmissionModal';
import PhotoUploadModal from './PhotoUploadModal';
import PollCardMobile from './PollCardMobile';
import FanGalleryModalMobile from './FanGalleryModalMobile';
import { Camera, Star } from 'lucide-react';

interface FanZoneMobileProps {
  fanOfMonth?: any;
  galleryPhotos?: any[];
  activePoll?: any;
}

export default function FanZoneMobile({ 
  fanOfMonth, 
  galleryPhotos = [], 
  activePoll 
}: FanZoneMobileProps) {
  // Modal state management
  const [fanSubmissionModalOpen, setFanSubmissionModalOpen] = useState(false);
  const [photoUploadModalOpen, setPhotoUploadModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);

  // Modal handlers
  const handleSubmitStoryClick = () => {
    setFanSubmissionModalOpen(true);
  };

  const handleUploadPhotoClick = () => {
    setPhotoUploadModalOpen(true);
  };

  const handleCloseFanSubmissionModal = () => {
    setFanSubmissionModalOpen(false);
  };

  const handleClosePhotoUploadModal = () => {
    setPhotoUploadModalOpen(false);
  };

  // Gallery modal handlers
  const handleGalleryPhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
    // Use the same buildCloudinaryUrl approach for modal
    if (photo.photo?.public_id) {
      const modalUrl = buildCloudinaryUrl(photo.photo.public_id, 'gallery');
      setSelectedPhotoUrl(modalUrl);
    }
    setGalleryModalOpen(true);
  };

  const handleCloseGalleryModal = () => {
    setGalleryModalOpen(false);
    setSelectedPhoto(null);
    setSelectedPhotoUrl(null);
  };

  // Helper functions
  const getStoryExcerpt = (story: string, maxWords = 40) => {
    if (!story) return '';
    const words = story.split(' ');
    if (words.length <= maxWords) return story;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const formatCategory = (category: string) => {
    if (!category) return '';
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Cloudinary URL builder
  const buildCloudinaryUrl = (publicId: string, type: 'gallery' | 'fanOfMonth' | 'fanPhoto' = 'gallery') => {
    const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload/';
    
    let transformation = '';
    
    switch (type) {
      case 'gallery':
        transformation = 'g_auto:faces,c_fill,ar_5:4,q_auto:good,f_auto,e_sharpen,w_500,h_400';
        break;
      case 'fanOfMonth':
        transformation = 'g_auto:faces,c_fill,ar_4:3,q_auto:best,f_auto,e_sharpen,w_480,h_360';
        break;
      case 'fanPhoto':
        transformation = 'g_auto:faces,c_fill,ar_3:4,q_auto:good,f_auto,w_96,h_128';
        break;
    }
    
    return `${baseUrl}${transformation}/${publicId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header - Baynounah branded */}
      <div className="flex items-start mb-8">
        <div className="w-1 h-8 bg-brand-gold mr-4 mt-1 rounded-sm"></div>
        <div>
          <h2 className="text-h2 font-heading text-brand-black mb-1" style={{letterSpacing: '0.02em'}}>Fan Zone</h2>
          <p className="text-base text-text-muted">Celebrating the Baynounah SC supporters</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Fan of the Month - Baynounah branded */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-separator overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="p-6 border-b border-separator flex items-center">
            <h3 className="text-h4 font-heading text-brand-black" style={{letterSpacing: '0.02em'}}>Fan of the Month</h3>
          </div>
          
          {fanOfMonth ? (
            <div className="relative">
              <div className="relative min-h-[300px] transition-transform duration-300 hover:scale-105">
                {fanOfMonth.photos?.[0]?.public_id ? (
                  <img 
                    src={buildCloudinaryUrl(fanOfMonth.photos[0].public_id, 'fanOfMonth')}
                    alt={`${fanOfMonth.fanName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full min-h-[300px] bg-gradient-to-br from-brand-gold to-brand-black"></div>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="mb-4">
                  <h4 className="text-2xl font-bold mb-3">{fanOfMonth.fanName}</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-medium">
                      {formatCategory(fanOfMonth.category)}
                    </div>
                    {fanOfMonth.supporterSince && (
                      <span className="text-white/90 text-sm">Supporter since {fanOfMonth.supporterSince}</span>
                    )}
                  </div>
                </div>
                
                <p className="text-white text-sm leading-relaxed">
                  {getStoryExcerpt(fanOfMonth.story)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-gold to-brand-gold/70 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all duration-300 hover:scale-110">
                <Star className="w-10 h-10 text-brand-black" />
              </div>
              <h4 className="text-brand-black text-lg font-semibold mb-3">Become our first featured fan</h4>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">Share your Baynounah story and be featured on our website</p>
            </div>
          )}
          
          <div className="p-6 border-t border-separator text-center">
            <button 
              onClick={handleSubmitStoryClick}
              className="bg-brand-gold text-brand-black hover:bg-brand-black hover:text-brand-gold border-2 border-brand-gold hover:border-brand-black px-4 py-2 rounded font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              Submit Your Story
            </button>
          </div>
        </div>

        {/* Mobile Poll Card */}
        <PollCardMobile activePoll={activePoll} />

        {/* Fan Gallery Section - Baynounah branded */}
        <div>
          <div className="flex items-start mb-6">
            <div className="w-1 h-6 bg-brand-gold mr-4 mt-1 rounded-sm"></div>
            <h3 className="text-h4 font-heading text-brand-black" style={{letterSpacing: '0.02em'}}>Fan Gallery</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {galleryPhotos.length > 0 ? (
              galleryPhotos.slice(0, 4).map((photo, index) => (
                <div 
                  key={index}
                  onClick={() => handleGalleryPhotoClick(photo)}
                  className="aspect-[5/4] bg-surface-2 rounded-lg relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-separator group active:scale-95"
                >
                  {photo.photo?.public_id ? (
                    <img 
                      src={buildCloudinaryUrl(photo.photo.public_id, 'gallery')}
                      alt={photo.context || `Photo by ${photo.fanName}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                  
                  {/* Caption with Baynounah black background */}
                  <div className="absolute bottom-2 left-2 bg-brand-black/80 text-white px-2 py-1 rounded text-xs transition-all duration-300">
                    By {photo.fanName}
                  </div>
                  
                  {/* Subtle zoom icon */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                    <span className="text-brand-black text-xs">🔍</span>
                  </div>
                </div>
              ))
            ) : (
              [1, 2, 3, 4].map((num) => (
                <div 
                  key={num}
                  className="aspect-[5/4] bg-surface-2 rounded-lg flex items-center justify-center text-text-muted text-sm text-center relative overflow-hidden shadow-md border border-separator"
                >
                  <Camera className="w-8 h-8 opacity-50" />
                  <div className="absolute bottom-2 left-2 bg-brand-black/80 text-white px-2 py-1 rounded text-xs">
                    Photo {num}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center">
            <p className="text-text-muted text-sm mb-3">Share your match day photos and be featured on our website</p>
            <button 
              onClick={handleUploadPhotoClick}
              className="bg-brand-gold text-brand-black hover:bg-brand-black hover:text-brand-gold border-2 border-brand-gold hover:border-brand-black px-4 py-2 rounded font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Camera className="w-4 h-4" />
              Upload Photo
            </button>
          </div>
        </div>

        {/* Social Media Section - Baynounah branded */}
        <div className="text-center py-6 bg-surface-2 rounded-lg border border-separator shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="text-h5 font-heading text-brand-black mb-1" style={{letterSpacing: '0.02em'}}>#BaynounahSC</div>
          <p className="text-text-muted text-sm">Join the conversation on social media</p>
        </div>
      </div>

      {/* Modals */}
      <FanSubmissionModal 
        isOpen={fanSubmissionModalOpen}
        onClose={handleCloseFanSubmissionModal}
      />

      <PhotoUploadModal 
        isOpen={photoUploadModalOpen}
        onClose={handleClosePhotoUploadModal}
      />

      <FanGalleryModalMobile
        photo={selectedPhoto}
        photoUrl={selectedPhotoUrl}
        isOpen={galleryModalOpen}
        onClose={handleCloseGalleryModal}
      />
    </div>
  );
}