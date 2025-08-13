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
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset modal scroll position when it opens or person changes
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, person]);

  // Lock body scroll while modal is open (and avoid layout shift)
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow || '';
      document.body.style.paddingRight = prevPaddingRight || '';
    };
  }, [isOpen]);

  if (!isOpen || !person) return null;

  const fullName = person.playerName || `${person.firstName} ${person.lastName}`;
  const position =
    person.personType === 'player'
      ? person.playerPosition
      : person.staffRole?.replace('_', ' ');

  const capitalizedPosition = position
    ? position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()
    : '';

  // ROBUST boolean checks - treat empty strings as false
  const hasTwitter = !!(person.socialMedia?.twitter && person.socialMedia.twitter.trim() !== '');
  const hasFacebook = !!(person.socialMedia?.facebook && person.socialMedia.facebook.trim() !== '');
  const hasInstagram = !!(person.socialMedia?.instagram && person.socialMedia.instagram.trim() !== '');
  const hasLinkedin = !!(person.socialMedia?.linkedin && person.socialMedia.linkedin.trim() !== '');
  const hasWebsite = !!(person.socialMedia?.website && person.socialMedia.website.trim() !== '');

  const openSocialProfile = (url: string) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgb(var(--brand-black))/0.50] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${fullName} profile`}
    >
      <div className="relative w-full max-w-4xl bg-[rgb(var(--white))] rounded-xl shadow-xl overflow-hidden border border-[rgb(var(--medium-gray))]">
        {/* Header bar with social buttons and close button */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-[rgb(var(--white))] z-40 flex justify-between items-center px-4 border-b border-[rgb(var(--medium-gray))]">
          {/* Social buttons */}
          <div className="flex space-x-2">
            {/* Twitter */}
            <button
              onClick={() => (hasTwitter ? openSocialProfile(person.socialMedia!.twitter!) : null)}
              className={
                hasTwitter
                  ? 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--brand-gold)/0.15)] transition-all duration-200'
                  : 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--dark-gray)/0.40)]  cursor-default'
              }
              aria-label="Twitter Profile"
              disabled={!hasTwitter}
            >
              <Twitter size={18} />
            </button>

            {/* Facebook */}
            <button
              onClick={() => (hasFacebook ? openSocialProfile(person.socialMedia!.facebook!) : null)}
              className={
                hasFacebook
                  ? 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--brand-gold)/0.15)] transition-all duration-200'
                  : 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--dark-gray)/0.40)]  cursor-default'
              }
              aria-label="Facebook Profile"
              disabled={!hasFacebook}
            >
              <Facebook size={18} />
            </button>

            {/* Instagram */}
            <button
              onClick={() => (hasInstagram ? openSocialProfile(person.socialMedia!.instagram!) : null)}
              className={
                hasInstagram
                  ? 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--brand-gold)/0.15)] transition-all duration-200'
                  : 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--dark-gray)/0.40)]  cursor-default'
              }
              aria-label="Instagram Profile"
              disabled={!hasInstagram}
            >
              <Instagram size={18} />
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => (hasLinkedin ? openSocialProfile(person.socialMedia!.linkedin!) : null)}
              className={
                hasLinkedin
                  ? 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--brand-gold)/0.15)] transition-all duration-200'
                  : 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--dark-gray)/0.40)]  cursor-default'
              }
              aria-label="LinkedIn Profile"
              disabled={!hasLinkedin}
            >
              <Linkedin size={18} />
            </button>

            {/* Website */}
            <button
              onClick={() => (hasWebsite ? openSocialProfile(person.socialMedia!.website!) : null)}
              className={
                hasWebsite
                  ? 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--brand-gold)/0.15)] transition-all duration-200'
                  : 'w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--dark-gray)/0.40)]  cursor-default'
              }
              aria-label="Website"
              disabled={!hasWebsite}
            >
              <Link2 size={18} />
            </button>
          </div>

          {/* Close button */}
          <button
            className="text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--white))] rounded"
            onClick={onClose}
            aria-label="Close"
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
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[rgb(var(--warm-gray))] border border-[rgb(var(--medium-gray))]">
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
                <h1 className="text-h2 font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4 border-b border-[rgb(var(--brand-gold))] pb-3">
                  {fullName}
                </h1>

                {/* Details */}
                <div>
                  <div className="flex justify-between py-3 border-b border-b border-[rgb(var(--brand-gold))]">
                    <span className="font-body font-medium text-[rgb(var(--brand-black))]">Position</span>
                    <span className="font-body text-[rgb(var(--brand-black))]">{capitalizedPosition}</span>
                  </div>

                  <div className="flex justify-between py-3 border-b border-[rgb(var(--brand-gold))]">
                    <span className="font-body font-medium text-[rgb(var(--brand-black))]">Nationality</span>
                    <span className="font-body text-[rgb(var(--brand-black))]">{person.nationality}</span>
                  </div>
                </div>

                {/* Bio heading */}
                <h2 className="font-body text-xl font-semibold text-[rgb(var(--brand-black))] mt-4 mb-2">Bio</h2>

                {/* Scrollable bio that matches height of image */}
                <div className="overflow-y-auto pr-2" style={{ maxHeight: '350px' }}>
                  {person.extendedBio ? (
                    <div className="prose max-w-none font-body text-[rgb(var(--brand-black))]">
                      <PortableText value={person.extendedBio} />
                    </div>
                  ) : (
                    <p className="font-body text-[rgb(var(--dark-gray))]">No biography available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional sections below */}
            <div className="p-6">
              {/* Personal Facts */}
              {person.personalFacts && person.personalFacts.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4">Personal Facts</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {person.personalFacts.map((fact) => (
                      <div key={fact._key} className="bg-[rgb(var(--warm-gray))] p-4 rounded-lg shadow-sm border border-[rgb(var(--medium-gray))]">
                        <h3 className="font-body font-medium text-[rgb(var(--brand-black))]">{fact.question}</h3>
                        <p className="mt-1 font-body text-[rgb(var(--dark-gray))]">{fact.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career History */}
              {person.careerHistory && person.careerHistory.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4">Club History</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {person.careerHistory.map((item) => (
                      <div
                        key={item._key}
                        className="bg-[rgb(var(--warm-gray))] p-4 rounded-lg shadow-sm border border-[rgb(var(--medium-gray))] border-l-4 border-l-[rgb(var(--brand-gold))]"
                      >
                        <h3 className="font-body font-semibold text-[rgb(var(--brand-black))] text-lg">{item.club}</h3>
                        <p className="font-body text-[rgb(var(--dark-gray))]">
                          {item.startYear}
                          {item.endYear ? `-${item.endYear}` : '-Present'}
                        </p>
                        {(item.appearances || item.goals) && (
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {item.appearances && (
                              <div className="bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] px-2 py-1 rounded text-sm font-body font-medium">
                                {item.appearances} Appearances
                              </div>
                            )}
                            {item.goals && (
                              <div className="bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] px-2 py-1 rounded text-sm font-body font-medium">
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
                  <h2 className="text-2xl font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4">Achievements</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {person.accolades.map((accolade) => (
                      <div
                        key={accolade._key}
                        className="bg-[rgb(var(--warm-gray))] p-4 rounded-lg shadow-sm border border-[rgb(var(--medium-gray))] border-l-4 border-l-[rgb(var(--brand-gold))]"
                      >
                        <h3 className="font-body font-semibold text-[rgb(var(--brand-black))] text-lg">
                          {accolade.title}
                          {accolade.year && (
                            <span className="ml-2 font-body text-[rgb(var(--dark-gray))]">({accolade.year})</span>
                          )}
                        </h3>
                        {accolade.description && (
                          <p className="mt-2 font-body text-[rgb(var(--dark-gray))]">{accolade.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorite Moment */}
              {person.favoriteMoment && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4">
                    Favorite Baynounah SC Moment
                  </h2>
                  <div className="font-body text-lg text-[rgb(var(--brand-black))] border-l-4 border-l-[rgb(var(--brand-gold))] pl-4 py-2 bg-[rgb(var(--warm-gray))]">
                    {person.favoriteMoment}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {person.gallery && person.gallery.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {person.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-sm border border-[rgb(var(--medium-gray))]">
                        <img
                          src={image.secure_url || image.url}
                          alt={`${fullName} photo ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
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
