"use client";
import React, { useState } from 'react';
import FanSubmissionModal from './FanSubmissionModal';

interface FanZoneSectionProps {
  fanOfMonth?: any; // Keep existing prop for now
}

export function FanZoneSection({ fanOfMonth }: FanZoneSectionProps) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-[1.875rem] font-bold text-[#00105A] mb-2">Fan Zone</h2>
        <p className="text-[1rem] text-[#6b7280]">Celebrating the Banks o' Dee supporters</p>
      </div>

      {/* Top Row: Fan of Month + Poll */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Fan of the Month */}
        <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-6 min-h-[320px] flex flex-col">
          <div className="bg-[#00105A] text-white px-4 py-3 rounded-lg text-[1.125rem] font-semibold text-center mb-6">
            Fan of the Month
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="w-16 h-16 bg-[#C5E7FF] rounded-full flex items-center justify-center text-[1.5rem] mb-4">
              👤
            </div>
            <h3 className="text-[#00105A] text-lg font-semibold mb-2">Become our first featured fan</h3>
            <p className="text-[#6b7280] text-sm mb-4">Share your Banks o' Dee story and be featured on our website</p>
            <button 
              onClick={handleSubmitStoryClick}
              className="bg-[#FFD700] text-[#00105A] px-6 py-3 rounded-lg font-semibold hover:bg-[#f3d54a] transition-colors"
            >
              Submit Your Story
            </button>
          </div>
        </div>

        {/* Interactive Poll - TYPEFORM INTEGRATION */}
        <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-6 min-h-[320px] flex flex-col">
          <div className="bg-[#00105A] text-white px-4 py-3 rounded-lg text-[1.125rem] font-semibold text-center mb-6">
            Join the Conversation
          </div>
          
          <div className="flex-1">
            {/* TYPEFORM EMBED - Replace the HTML form */}
            <div 
              dangerouslySetInnerHTML={{
                __html: '<div data-tf-live="01JW962WTWGM6HA3M6H5XWT165"></div><script src="//embed.typeform.com/next/embed.js"></script>'
              }}
            />
          </div>
          
          <div className="flex justify-between items-center text-sm text-[#6b7280] mt-4">
            <span>Voting closes: May 31st</span>
            <a href="#" className="text-[#00105A] hover:underline">View Past Polls</a>
          </div>
        </div>
      </div>

      {/* Fan Gallery Section */}
      <div className="mb-8">
        <div className="bg-[#00105A] text-white px-4 py-3 rounded-lg text-[1.125rem] font-semibold text-center mb-6">
          Fan Gallery
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((num) => (
            <div 
              key={num}
              className="aspect-[5/4] bg-[#e5e7eb] rounded-lg flex items-center justify-center text-[#6b7280] text-sm text-center relative overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="text-2xl">📸</span>
              <div className="absolute bottom-2 left-2 bg-[rgba(0,16,90,0.8)] text-white px-2 py-1 rounded text-xs">
                Photo {num}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-[#6b7280] mb-4">Share your match day photos and be featured on our website</p>
          <button 
            onClick={handleUploadPhotoClick}
            className="bg-[#FFD700] text-[#00105A] px-6 py-3 rounded-lg font-semibold hover:bg-[#f3d54a] transition-colors"
          >
            📷 Upload Photo
          </button>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="text-center p-8 bg-[#f9fafb] rounded-xl border border-[#e5e7eb]">
        <div className="text-[1.5rem] font-bold text-[#00105A] mb-2">#BanksODeeFC</div>
        <p className="text-[#6b7280]">Join the conversation on social media</p>
      </div>

      {/* Fan Submission Modal */}
      <FanSubmissionModal 
        isOpen={fanSubmissionModalOpen}
        onClose={handleCloseFanSubmissionModal}
      />

      {/* Photo Upload Modal - Still placeholder */}
      {photoUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden p-8">
            <h2 className="text-2xl font-bold text-[#00105A] mb-4">Photo Upload - Coming Soon!</h2>
            <p className="text-[#6b7280] mb-6">Modal will be implemented next...</p>
            <button 
              onClick={handleClosePhotoUploadModal}
              className="bg-[#00105A] text-white px-4 py-2 rounded hover:bg-[#001C8C] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FanZoneSection;
