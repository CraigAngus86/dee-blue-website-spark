// PlayerCard.tsx
'use client';

import React from 'react';
import { Player } from '../types';
import PlayerBadge from './PlayerBadge';
import PlayerImage from './PlayerImage';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
  priority?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick, priority = false }) => {
  const fullName =
    (player as any).playerName ||
    [ (player as any).firstName, (player as any).lastName ].filter(Boolean).join(' ') ||
    (player as any).name ||
    'Player';

  const rawPos =
    (player as any).playerPosition ??
    (player as any).position ??
    (player as any).primaryPosition ??
    '';

  const position =
    typeof rawPos === 'string' && rawPos.length
      ? rawPos.charAt(0).toUpperCase() + rawPos.slice(1)
      : '';

  const nationality = (player as any).nationality || (player as any).country || '';

  const social = (player as any).socialMedia || {};
  const hasTwitter = !!social.twitter;
  const hasFacebook = !!social.facebook;
  const hasInstagram = !!social.instagram;
  const hasLinkedin = !!social.linkedin;

  const handleSocialClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const container =
    'relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden group bg-[rgb(var(--white))] shadow-sm transition-shadow ' +
    (onClick ? 'cursor-pointer motion-safe:hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--light-gray))]' : '');

  return (
    <div
      className={container}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <PlayerImage
          image={(player as any).profileImage || (player as any).image_url || (player as any).imageUrl}
          name={fullName}
          size="homepage"
          className="w-full h-full object-cover object-top"
          />
      </div>

      {/* Gradient overlay — tokens only */}
      <div
        className="
          pointer-events-none absolute inset-0 z-10
          bg-[linear-gradient(to_top,rgb(var(--brand-black)_/_0.72)_0%,rgb(var(--brand-black)_/_0.72)_20%,rgb(var(--brand-black)_/_0)_40%,rgb(var(--brand-black)_/_0)_100%)]
        "
        aria-hidden="true"
      />

      {/* Youth Product Badge */}
      <PlayerBadge isYouthProduct={(player as any).isYouthProduct} />

      {/* Default state — Name only, lifts on hover */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 transform transition-transform duration-500 motion-safe:group-hover:-translate-y-12">
        <h3 className="text-[rgb(var(--white))] text-lg md:text-xl font-bold leading-tight">
          {fullName}
        </h3>
      </div>

      {/* Hover state — details + socials */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100">
        {/* Gold separator */}
        <div className="w-full h-px bg-brand-gold mb-3" />

        {(position || nationality) && (
          <div className="text-[rgb(var(--white)_/_0.9)] text-sm md:text-[15px] font-medium mb-3 leading-relaxed">
            {position}
            {position && nationality ? ' • ' : ''}
            {nationality}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={hasTwitter ? (e) => handleSocialClick(social.twitter!, e) : undefined}
            aria-label="Twitter"
            className={hasTwitter ? 'text-[rgb(var(--white))] hover:text-brand-gold transition-colors' : 'text-gray pointer-events-none opacity-50'}
            disabled={!hasTwitter}
          >
            <Twitter size={20} />
          </button>
          <button
            onClick={hasFacebook ? (e) => handleSocialClick(social.facebook!, e) : undefined}
            aria-label="Facebook"
            className={hasFacebook ? 'text-[rgb(var(--white))] hover:text-brand-gold transition-colors' : 'text-gray pointer-events-none opacity-50'}
            disabled={!hasFacebook}
          >
            <Facebook size={20} />
          </button>
          <button
            onClick={hasInstagram ? (e) => handleSocialClick(social.instagram!, e) : undefined}
            aria-label="Instagram"
            className={hasInstagram ? 'text-[rgb(var(--white))] hover:text-brand-gold transition-colors' : 'text-gray pointer-events-none opacity-50'}
            disabled={!hasInstagram}
          >
            <Instagram size={20} />
          </button>
          <button
            onClick={hasLinkedin ? (e) => handleSocialClick(social.linkedin!, e) : undefined}
            aria-label="LinkedIn"
            className={hasLinkedin ? 'text-[rgb(var(--white))] hover:text-brand-gold transition-colors' : 'text-gray pointer-events-none opacity-50'}
            disabled={!hasLinkedin}
          >
            <Linkedin size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
