"use client";
import React, { useState } from 'react';
import FanSubmissionModal from './FanSubmissionModal';
import PhotoUploadModal from './PhotoUploadModal';
import PollCard from './PollCard';
import FanZoneMobile from './FanZoneMobile';

interface FanZoneSectionProps {
  fanOfMonth?: any;
  galleryPhotos?: any[];
  activePoll?: any;
}

export function FanZoneSection({ fanOfMonth, galleryPhotos = [], activePoll }: FanZoneSectionProps) {
  // Mobile: Use optimized mobile component
  return (
    <>
      {/* Desktop: Existing functionality */}
      <div className="hidden md:block">
        <FanZoneDesktop fanOfMonth={fanOfMonth} galleryPhotos={galleryPhotos} activePoll={activePoll} />
      </div>

      {/* Mobile: Optimized experience */}
      <div className="block md:hidden">
        <FanZoneMobile fanOfMonth={fanOfMonth} galleryPhotos={galleryPhotos} activePoll={activePoll} />
      </div>
    </>
  );
}

// Desktop Component (Current FanZoneSection logic)
function FanZoneDesktop({ fanOfMonth, galleryPhotos = [], activePoll }: FanZoneSectionProps) {
  // Modal state management (following your established patterns)
  const [fanSubmissionModalOpen, setFanSubmissionModalOpen] = useState(false);
  const [photoUploadModalOpen, setPhotoUploadModalOpen] = useState(false);

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

  // Helper function to get story excerpt - EXPANDED
  const getStoryExcerpt = (story: string, maxWords = 40) => {
    if (!story) return '';
    const words = story.split(' ');
    if (words.length <= maxWords) return story;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Helper function to format category display
  const formatCategory = (category: string) => {
    if (!category) return '';
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Enhanced Cloudinary URL builder with face detection and optimization
  const buildCloudinaryUrl = (publicId: string, type: 'gallery' | 'fanOfMonth' | 'fanPhoto' = 'gallery') => {
    const baseUrl = 'https://res.cloudinary.com/dlkpaw2a0/image/upload/';
    
    let transformation = '';
    
    switch (type) {
      case 'gallery':
        // Gallery photos: face detection, high quality, aspect ratio preserved
        transformation = 'g_auto:faces,c_fill,ar_5:4,q_auto:good,f_auto,e_sharpen,w_500,h_400';
        break;
      case 'fanOfMonth':
        // Fan of month background: larger image with face detection
        transformation = 'g_auto:faces,c_fill,ar_4:3,q_auto:best,f_auto,e_sharpen,w_480,h_360';
        break;
      case 'fanPhoto':
        // Small fan photo: face detection for portraits
        transformation = 'g_auto:faces,c_fill,ar_3:4,q_auto:good,f_auto,w_96,h_128';
        break;
    }
    
    return `${baseUrl}${transformation}/${publicId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header with Navy Line - Fixed alignment */}
      <div className="flex items-start mb-8">
        <div className="w-1 h-8 bg-[#00105A] mr-4 mt-1"></div>
        <div>
          <h2 className="text-[1.875rem] font-bold text-[#00105A] mb-1">Fan Zone</h2>
          <p className="text-[1rem] text-[#6b7280]">Celebrating the Banks o' Dee supporters</p>
        </div>
      </div>

      {/* Top Row: Fan of Month + Poll - PERFECTLY ALIGNED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Fan of the Month - ALIGNED HEADER */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl border border-[#f3f4f6] overflow-hidden h-[480px] transition-all duration-300 hover:-translate-y-1">
          
          {/* White Header Row - EXACT HEIGHT MATCH */}
          <div className="p-6 border-b border-[#f3f4f6] h-[88px] flex items-center justify-between">
            <h3 className="text-[1.125rem] font-semibold text-[#00105A]">Fan of the Month</h3>
            <button 
              onClick={handleSubmitStoryClick}
              className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-3 py-1.5 rounded text-sm font-medium transition-all duration-300"
            >
              Submit Your Story
            </button>
          </div>
          
          {fanOfMonth ? (
            /* Featured Fan Display - LARGER IMAGE */
            <div className="relative h-[392px]">
              {/* Background Image - Larger */}
              <div className="absolute inset-0 transition-transform duration-300 hover:scale-105">
                {fanOfMonth.photos?.[0]?.public_id ? (
                  <img 
                    src={buildCloudinaryUrl(fanOfMonth.photos[0].public_id, 'fanOfMonth')}
                    alt={`${fanOfMonth.fanName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#00105A] to-[#C5E7FF]"></div>
                )}
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,16,90,0.85)] via-[rgba(0,16,90,0.4)] to-[rgba(0,16,90,0.2)] transition-opacity duration-300"></div>
              
              {/* Content Overlay at Bottom */}
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
                
                {/* Expanded Story Text */}
                <p className="text-white text-sm leading-relaxed">
                  {getStoryExcerpt(fanOfMonth.story)}
                </p>
              </div>
            </div>
          ) : (
            /* No Featured Fan - Placeholder */
            <div className="flex flex-col items-center justify-center text-center h-[392px]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C5E7FF] to-[#00105A] rounded-full flex items-center justify-center text-[2rem] mb-4 shadow-lg transition-all duration-300 hover:scale-110">
                ⭐
              </div>
              <h4 className="text-[#00105A] text-lg font-semibold mb-3">Become our first featured fan</h4>
              <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs">Share your Banks o' Dee story and be featured on our website</p>
            </div>
          )}
        </div>

        {/* Custom Poll Card - REPLACES TYPEFORM */}
        <PollCard activePoll={activePoll} />
      </div>

      {/* Fan Gallery Section - CONSISTENT COLORS */}
      <div className="mb-8">
        <div className="flex items-start mb-6">
          <div className="w-1 h-6 bg-[#00105A] mr-4 mt-1"></div>
          <h3 className="text-[1.125rem] font-semibold text-[#00105A]">Fan Gallery</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {galleryPhotos.length > 0 ? (
            /* Real Gallery Photos - SIMPLIFIED HOVER */
            galleryPhotos.slice(0, 4).map((photo, index) => (
              <div 
                key={index}
                className="aspect-[5/4] bg-[#f8f9fa] rounded-lg relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-[#f3f4f6] group"
              >
                {photo.photo?.public_id ? (
                  <img 
                    src={buildCloudinaryUrl(photo.photo.public_id, 'gallery')}
                    alt={photo.context || `Photo by ${photo.fanName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#6b7280] text-xl">
                    📸
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-[rgba(0,16,90,0.8)] text-white px-2 py-1 rounded text-xs transition-all duration-300">
                  By {photo.fanName}
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[rgba(0,16,90,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))
          ) : (
            /* Placeholder Gallery */
            [1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className="aspect-[5/4] bg-[#f8f9fa] rounded-lg flex items-center justify-center text-[#6b7280] text-sm text-center relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-[#f3f4f6] group"
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

      {/* Social Media Section - CONSISTENT STYLING */}
      <div className="text-center py-6 bg-[#f9fafb] rounded-lg border border-[#f3f4f6] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="text-[1.25rem] font-semibold text-[#00105A] mb-1">#BanksODeeFC</div>
        <p className="text-[#6b7280] text-sm">Join the conversation on social media</p>
      </div>

      {/* Fan Submission Modal */}
      <FanSubmissionModal 
        isOpen={fanSubmissionModalOpen}
        onClose={handleCloseFanSubmissionModal}
      />

      {/* Photo Upload Modal */}
      <PhotoUploadModal 
        isOpen={photoUploadModalOpen}
        onClose={handleClosePhotoUploadModal}
      />
    </div>
  );
}

export default FanZoneSection;
