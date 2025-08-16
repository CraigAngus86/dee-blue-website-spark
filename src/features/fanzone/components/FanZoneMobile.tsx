"use client";
import React, { useState } from 'react';
import FanSubmissionModal from './FanSubmissionModal';
import PhotoUploadModal from './PhotoUploadModal';
import PollCardMobile from './PollCardMobile';
import FanGalleryModalMobile from './FanGalleryModalMobile';
import { Camera, Star, Search, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

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
  const handleSubmitStoryClick = () => setFanSubmissionModalOpen(true);
  const handleUploadPhotoClick = () => setPhotoUploadModalOpen(true);
  const handleCloseFanSubmissionModal = () => setFanSubmissionModalOpen(false);
  const handleClosePhotoUploadModal = () => setPhotoUploadModalOpen(false);

  // Gallery modal handlers
  const handleGalleryPhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
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

  // Helpers
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
      {/* Section Header - Consistent with desktop */}
      <div className="flex items-start mb-8">
        <div className="w-1 h-8 bg-brand-gold mr-4 mt-1 rounded-sm"></div>
        <div>
          <h2 className="text-h2 font-heading text-brand-black mb-1" style={{letterSpacing: '0.02em'}}>Fan Zone</h2>
          <p className="text-base text-text-muted">Celebrating the Baynounah SC supporters</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Fan of the Month */}
        <div className="bg-white rounded-xl border border-separator shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="h-[72px] flex items-center justify-between px-4 border-b border-separator bg-gradient-to-r from-white to-[#F8F6F2]">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-brand-gold rounded-sm mr-3" />
              <div>
                <h3 className="text-h5 font-heading text-brand-black leading-none m-0" style={{letterSpacing: '0.02em'}}>
                  Fan of the Month
                </h3>
                <p className="text-xs text-text-muted leading-none m-0 mt-1">
                  Featured Supporter
                </p>
              </div>
            </div>
            <button
              onClick={handleSubmitStoryClick}
              className="text-xs px-3 py-1.5 bg-brand-gold text-brand-black border border-brand-gold rounded hover:bg-brand-black hover:text-brand-gold hover:border-brand-black transition-all duration-200"
            >
              Submit
            </button>
          </div>

          {fanOfMonth ? (
            <div className="relative">
              <div className="relative h-[280px] overflow-hidden">
                {fanOfMonth.photos?.[0]?.public_id ? (
                  <img
                    src={buildCloudinaryUrl(fanOfMonth.photos[0].public_id, 'fanOfMonth')}
                    alt={`${fanOfMonth.fanName}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-light-gray to-medium-gray" />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                <h4 className="text-xl font-bold mb-2 drop-shadow-lg">{fanOfMonth.fanName}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-brand-gold text-brand-black text-xs font-semibold px-2 py-0.5 shadow-md">
                    {formatCategory(fanOfMonth.category)}
                  </span>
                  {fanOfMonth.supporterSince && (
                    <span className="text-white/90 text-xs drop-shadow">
                      Since {fanOfMonth.supporterSince}
                    </span>
                  )}
                </div>
                <p className="text-white text-xs leading-relaxed drop-shadow">
                  {getStoryExcerpt(fanOfMonth.story)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-gold/70 rounded-full flex items-center justify-center mb-3 shadow-lg animate-pulse">
                <Star className="w-8 h-8 text-brand-black" />
              </div>
              <h4 className="text-brand-black text-base font-semibold mb-2">
                Become our first featured fan
              </h4>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                Share your Baynounah story and be featured on our website
              </p>
            </div>
          )}
        </div>

        {/* Mobile Poll Card */}
        <PollCardMobile activePoll={activePoll} />

        {/* Fan Gallery Section */}
        <div>
          {/* Header copied EXACTLY from Fan of the Month */}
          <div className="h-[72px] flex items-center justify-between px-4 border-b border-separator bg-gradient-to-r from-white to-[#F8F6F2]">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-brand-gold rounded-sm mr-3" />
              <div>
                <h3 className="text-h5 font-heading text-brand-black leading-none m-0" style={{letterSpacing: '0.02em'}}>
                  Fan Gallery
                </h3>
                <p className="text-xs text-text-muted leading-none m-0 mt-1">
                  Showcase your Baynounah Moments
                </p>
              </div>
            </div>
            <button 
              onClick={handleUploadPhotoClick}
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-gold text-brand-black border border-brand-gold rounded hover:bg-brand-black hover:text-brand-gold hover:border-brand-black transition-all duration-200"
            >
              <Camera className="w-3 h-3" />
              Upload
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 mb-4 px-0">
            {galleryPhotos.length > 0 ? (
              galleryPhotos.slice(0, 4).map((photo, index) => (
                <div 
                  key={index}
                  onClick={() => handleGalleryPhotoClick(photo)}
                  className="group relative aspect-[5/4] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-separator active:scale-95"
                >
                  {photo.photo?.public_id ? (
                    <>
                      <img 
                        src={buildCloudinaryUrl(photo.photo.public_id, 'gallery')}
                        alt={photo.context || `Photo by ${photo.fanName}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-gray to-medium-gray text-text-muted">
                      <Camera className="w-6 h-6 opacity-50" />
                    </div>
                  )}
                  
                  {/* Caption with consistent branding */}
                  <div className="absolute bottom-1 left-1 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium">
                    By {photo.fanName || "Fan"}
                  </div>
                  
                  {/* Zoom indicator */}
                  <div className="absolute top-1 right-1 w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Search className="w-3 h-3 text-brand-black" />
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 4 }, (_, i) => (
                <div 
                  key={i}
                  className="relative aspect-[5/4] bg-gradient-to-br from-white to-[#F8F6F2] rounded-lg flex flex-col items-center justify-center text-text-muted shadow-sm border border-separator"
                >
                  <Camera className="w-6 h-6 opacity-30" />
                  <span className="mt-2 text-[11px] font-medium text-text-muted">Coming Soon</span>
                </div>
              ))
            )}
          </div>

          <div className="text-center">
            <p className="text-text-muted text-xs mb-3">
              Share your match day photos and be featured
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="relative overflow-hidden rounded-xl border-2 border-separator hover:border-brand-gold shadow-sm transition-all duration-300 group" 
             style={{background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F2 100%)'}}>
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #FCC743 35px, #FCC743 36px)`,
            }} />
          </div>
          <div className="relative p-6 text-center">
            <h4 className="text-h5 font-heading text-brand-black mb-4" style={{letterSpacing: '0.02em'}}>
              Join Our Community
            </h4>
            <div className="flex justify-center gap-4 mb-4">
              <a href="https://instagram.com/baynounahsc" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors group/icon">
                <Instagram className="w-5 h-5 text-white group-hover/icon:text-brand-black" />
              </a>
              <a href="https://twitter.com/baynounahsc" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors group/icon">
                <Twitter className="w-5 h-5 text-white group-hover/icon:text-brand-black" />
              </a>
              <a href="https://facebook.com/baynounahsc" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors group/icon">
                <Facebook className="w-5 h-5 text-white group-hover/icon:text-brand-black" />
              </a>
              <a href="https://youtube.com/baynounahsc" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors group/icon">
                <Youtube className="w-5 h-5 text-white group-hover/icon:text-brand-black" />
              </a>
            </div>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 bg-black text-white text-[10px] font-medium rounded-full shadow-sm">#BaynounahSC</span>
              <span className="px-3 py-1 bg-brand-gold text-black text-[10px] font-medium rounded-full shadow-sm">#BePartOfTheJourney</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FanSubmissionModal isOpen={fanSubmissionModalOpen} onClose={handleCloseFanSubmissionModal} />
      <PhotoUploadModal isOpen={photoUploadModalOpen} onClose={handleClosePhotoUploadModal} />
      <FanGalleryModalMobile
        photo={selectedPhoto}
        photoUrl={selectedPhotoUrl}
        isOpen={galleryModalOpen}
        onClose={handleCloseGalleryModal}
      />
    </div>
  );
}
