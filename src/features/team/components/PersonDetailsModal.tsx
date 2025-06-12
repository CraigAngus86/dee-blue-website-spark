'use client';
import React, { useEffect, useRef } from 'react';
import { X, Twitter, Facebook, Instagram, Link2, Linkedin } from 'lucide-react';
import { Person } from '@/features/team/types';
import PlayerImage from './PlayerImage';
import { PortableText } from '@portabletext/react';

interface PersonDetailsModalProps {
  person: Person | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const PersonDetailsModal: React.FC<PersonDetailsModalProps> = ({
  person,
  isOpen = true,
  onClose
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, person]);

  if (!isOpen || !person) return null;

  const fullName = person.playerName || `${person.firstName} ${person.lastName}`;
  const position = person.personType === 'player' 
    ? person.playerPosition 
    : person.staffRole?.replace('_', ' ');
  
  // Capitalize first letter of position
  const capitalizedPosition = position 
    ? position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()
    : '';
  
  // ROBUST boolean checks - treat empty strings as false
  const hasTwitter = person.socialMedia?.twitter && person.socialMedia.twitter.trim() !== '';
  const hasFacebook = person.socialMedia?.facebook && person.socialMedia.facebook.trim() !== '';
  const hasInstagram = person.socialMedia?.instagram && person.socialMedia.instagram.trim() !== '';
  const hasLinkedin = person.socialMedia?.linkedin && person.socialMedia.linkedin.trim() !== '';
  const hasWebsite = person.socialMedia?.website && person.socialMedia.website.trim() !== '';

  // Social functions
  const openSocialProfile = (url: string) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header bar with social buttons and close button */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-white z-40 flex justify-between items-center px-4 border-b">
          {/* Social sharing buttons - Updated to match news modal hover effect */}
          <div className="flex space-x-2">
            {/* Twitter button */}
            <button 
              onClick={() => hasTwitter ? openSocialProfile(person.socialMedia.twitter) : null}
              className={hasTwitter 
                ? "w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200" 
                : "w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] cursor-default"
              }
              aria-label="Twitter Profile"
              disabled={!hasTwitter}
            >
              <Twitter size={18} />
            </button>
            
            {/* Facebook button */}
            <button 
              onClick={() => hasFacebook ? openSocialProfile(person.socialMedia.facebook) : null}
              className={hasFacebook 
                ? "w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200" 
                : "w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] cursor-default"
              }
              aria-label="Facebook Profile"
              disabled={!hasFacebook}
            >
              <Facebook size={18} />
            </button>
            
            {/* Instagram button */}
            <button 
              onClick={() => hasInstagram ? openSocialProfile(person.socialMedia.instagram) : null}
              className={hasInstagram 
                ? "w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200" 
                : "w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] cursor-default"
              }
              aria-label="Instagram Profile"
              disabled={!hasInstagram}
            >
              <Instagram size={18} />
            </button>
            
            {/* LinkedIn button */}
            <button 
              onClick={() => hasLinkedin ? openSocialProfile(person.socialMedia.linkedin) : null}
              className={hasLinkedin 
                ? "w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200" 
                : "w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] cursor-default"
              }
              aria-label="LinkedIn Profile"
              disabled={!hasLinkedin}
            >
              <Linkedin size={18} />
            </button>
            
            {/* Website button */}
            <button 
              onClick={() => hasWebsite ? openSocialProfile(person.socialMedia.website) : null}
              className={hasWebsite 
                ? "w-8 h-8 flex items-center justify-center rounded-md text-[#00105A] hover:bg-[#C5E7FF] hover:text-[#00105A] transition-all duration-200" 
                : "w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] cursor-default"
              }
              aria-label="Website"
              disabled={!hasWebsite}
            >
              <Link2 size={18} />
            </button>
          </div>
          
          {/* Close button */}
          <button 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors"
            onClick={onClose}
          >
            <X size={22} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Main content container */}
        <div ref={contentRef} className="overflow-y-auto max-h-[90vh] pt-12">
          <div className="flex flex-col">
            {/* Two-column layout for image and details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column - Player image */}
              <div className="p-6 pb-0">
                <div className="aspect-[3/4] rounded-md overflow-hidden bg-[#f3f4f6]">
                  <PlayerImage 
                    image={person.profileImage}
                    name={fullName}
                    size="modal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Right column - Basic info and scrollable bio */}
              <div className="p-6 pb-0 flex flex-col">
                {/* Player name */}
                <h1 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-4 border-b border-[#e5e7eb] pb-3">
                  {fullName}
                </h1>
                
                {/* Details */}
                <div>
                  <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                    <span className="font-medium">Position</span>
                    <span>{capitalizedPosition}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                    <span className="font-medium">Nationality</span>
                    <span>{person.nationality}</span>
                  </div>
                </div>
                
                {/* Bio heading */}
                <h2 className="text-xl font-bold text-[#00105A] mt-4 mb-2">Bio</h2>
                
                {/* Scrollable bio that matches height of image */}
                <div className="overflow-y-auto pr-2" style={{ maxHeight: "350px" }}>
                  {person.extendedBio ? (
                    <div className="prose max-w-none">
                      <PortableText value={person.extendedBio} />
                    </div>
                  ) : (
                    <p className="text-[#374151]">No biography available.</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Additional sections below */}
            <div className="p-6">
              {/* Personal Facts */}
              {person.personalFacts && person.personalFacts.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#00105A] mb-4">Personal Facts</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {person.personalFacts.map((fact) => (
                      <div key={fact._key} className="bg-[#f9fafb] p-4 rounded-lg shadow-sm">
                        <h3 className="font-medium text-[#00105A]">{fact.question}</h3>
                        <p className="mt-1 text-[#374151]">{fact.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Career History */}
              {person.careerHistory && person.careerHistory.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#00105A] mb-4">Club History</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {person.careerHistory.map((item) => (
                      <div key={item._key} className="bg-[#f9fafb] p-4 rounded-lg shadow-sm border-l-4 border-[#00105A]">
                        <h3 className="font-bold text-lg">{item.club}</h3>
                        <p className="text-[#4b5563]">
                          {item.startYear}{item.endYear ? `-${item.endYear}` : '-Present'}
                        </p>
                        {(item.appearances || item.goals) && (
                          <div className="mt-2 flex gap-4">
                            {item.appearances && (
                              <div className="bg-[#C5E7FF] text-[#00105A] px-2 py-1 rounded text-sm font-medium">
                                {item.appearances} Appearances
                              </div>
                            )}
                            {item.goals && (
                              <div className="bg-[#FFD700] text-[#00105A] px-2 py-1 rounded text-sm font-medium">
                                {item.goals} Goals
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Achievements */}
              {person.accolades && person.accolades.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#00105A] mb-4">Achievements</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {person.accolades.map((accolade) => (
                      <div key={accolade._key} className="bg-[#f9fafb] p-4 rounded-lg shadow-sm border-l-4 border-[#FFD700]">
                        <h3 className="font-bold text-lg">
                          {accolade.title} 
                          {accolade.year && <span className="ml-2 text-[#4b5563]">({accolade.year})</span>}
                        </h3>
                        {accolade.description && (
                          <p className="mt-2 text-[#374151]">{accolade.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Favorite Moment */}
              {person.favoriteMoment && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#00105A] mb-4">Favorite Banks o' Dee Moment</h2>
                  <div className="text-lg font-medium text-[#374151] border-l-4 border-[#00105A] pl-4 py-2 bg-[#f9fafb]">
                    {person.favoriteMoment}
                  </div>
                </div>
              )}
              
              {/* Gallery if available */}
              {person.gallery && person.gallery.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#00105A] mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {person.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-md">
                        <img 
                          src={image.secure_url || image.url}
                          alt={`${fullName} photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsModal;
