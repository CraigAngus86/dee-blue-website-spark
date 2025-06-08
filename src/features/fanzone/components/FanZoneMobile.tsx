"use client";
import React, { useState } from 'react';
import FanSubmissionModal from './FanSubmissionModal';
import PhotoUploadModal from './PhotoUploadModal';
import PollCardMobile from './PollCardMobile';
import FanGalleryModalMobile from './FanGalleryModalMobile';

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

  // Helper functions - SAME AS BEFORE
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

  // EXACT SAME buildCloudinaryUrl as main gallery
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
      {/* Section Header - SAME AS BEFORE */}
      <div className="flex items-start mb-8">
        <div className="w-1 h-8 bg-[#00105A] mr-4 mt-1"></div>
        <div>
          <h2 className="text-[1.875rem] font-bold text-[#00105A] mb-1">Fan Zone</h2>
          <p className="text-[1rem] text-[#6b7280]">Celebrating the Banks o' Dee supporters</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Fan of the Month - SAME AS BEFORE */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-[#f3f4f6] overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="p-6 border-b border-[#f3f4f6] flex items-center">
            <h3 className="text-[1.125rem] font-semibold text-[#00105A]">Fan of the Month</h3>
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
                  <div className="w-full min-h-[300px] bg-gradient-to-br from-[#00105A] to-[#C5E7FF]"></div>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,16,90,0.85)] via-[rgba(0,16,90,0.4)] to-[rgba(0,16,90,0.2)] transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="mb-4">
                  <h4 className="text-2xl font-bold mb-3">{fanOfMonth.fanName}</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#FFD700] text-[#00105A] px-3 py-1 rounded-full text-sm font-medium">
                      {formatCategory(fanOfMonth.category)}
                    </div>
                    {fanOfMonth.supporterSince && (
                      <span className="text-[#C5E7FF] text-sm">Supporter since {fanOfMonth.supporterSince}</span>
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
              <div className="w-20 h-20 bg-gradient-to-br from-[#C5E7FF] to-[#00105A] rounded-full flex items-center justify-center text-[2rem] mb-4 shadow-lg transition-all duration-300 hover:scale-110">
                ⭐
              </div>
              <h4 className="text-[#00105A] text-lg font-semibold mb-3">Become our first featured fan</h4>
              <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs">Share your Banks o' Dee story and be featured on our website</p>
            </div>
          )}
          
          <div className="p-6 border-t border-[#f3f4f6] text-center">
            <button 
              onClick={handleSubmitStoryClick}
              className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-4 py-2 rounded font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              Submit Your Story
            </button>
          </div>
        </div>

        {/* Mobile Poll Card */}
        <PollCardMobile activePoll={activePoll} />

        {/* Fan Gallery Section - REMOVED HINT TEXT, KEPT MAG GLASSES */}
        <div>
          <div className="flex items-start mb-6">
            <div className="w-1 h-6 bg-[#00105A] mr-4 mt-1"></div>
            <h3 className="text-[1.125rem] font-semibold text-[#00105A]">Fan Gallery</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {galleryPhotos.length > 0 ? (
              galleryPhotos.slice(0, 4).map((photo, index) => (
                <div 
                  key={index}
                  onClick={() => handleGalleryPhotoClick(photo)}
                  className="aspect-[5/4] bg-[#f8f9fa] rounded-lg relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-[#f3f4f6] group active:scale-95"
                >
                  {photo.photo?.public_id ? (
                    <img 
                      src={buildCloudinaryUrl(photo.photo.public_id, 'gallery')}
                      alt={photo.context || `Photo by ${photo.fanName}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#6b7280] text-xl">
                      📸
                    </div>
                  )}
                  
                  {/* Always visible caption */}
                  <div className="absolute bottom-2 left-2 bg-[rgba(0,16,90,0.8)] text-white px-2 py-1 rounded text-xs transition-all duration-300">
                    By {photo.fanName}
                  </div>
                  
                  {/* Subtle zoom icon - always visible */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                    <span className="text-[#00105A] text-xs">🔍</span>
                  </div>
                </div>
              ))
            ) : (
              [1, 2, 3, 4].map((num) => (
                <div 
                  key={num}
                  className="aspect-[5/4] bg-[#f8f9fa] rounded-lg flex items-center justify-center text-[#6b7280] text-sm text-center relative overflow-hidden shadow-md border border-[#f3f4f6]"
                >
                  <span className="text-xl">📸</span>
                  <div className="absolute bottom-2 left-2 bg-[rgba(0,16,90,0.8)] text-white px-2 py-1 rounded text-xs">
                    Photo {num}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center">
            <p className="text-[#6b7280] text-sm mb-3">Share your match day photos and be featured on our website</p>
            <button 
              onClick={handleUploadPhotoClick}
              className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-4 py-2 rounded font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>📷</span>
              Upload Photo
            </button>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center py-6 bg-[#f9fafb] rounded-lg border border-[#f3f4f6] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="text-[1.25rem] font-semibold text-[#00105A] mb-1">#BanksODeeFC</div>
          <p className="text-[#6b7280] text-sm">Join the conversation on social media</p>
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

      {/* FIXED: Modal now gets pre-built URL using same Cloudinary approach */}
      <FanGalleryModalMobile
        photo={selectedPhoto}
        photoUrl={selectedPhotoUrl}
        isOpen={galleryModalOpen}
        onClose={handleCloseGalleryModal}
      />
    </div>
  );
}
