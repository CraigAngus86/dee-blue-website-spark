import React from 'react';
import { Player } from '../types';
import PlayerBadge from './PlayerBadge';
import PlayerImage from './PlayerImage';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  const fullName = player.playerName || `${player.firstName} ${player.lastName}`;
  const position = player.playerPosition?.charAt(0).toUpperCase() + player.playerPosition?.slice(1);
  
  // Check available social media
  const socialMedia = player.socialMedia || {};
  const hasTwitter = !!socialMedia.twitter;
  const hasFacebook = !!socialMedia.facebook;
  const hasInstagram = !!socialMedia.instagram;
  const hasLinkedin = !!socialMedia.linkedin;
  
  const handleSocialClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    window.open(url, '_blank');
  };

  return (
    <div 
      className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <PlayerImage 
          image={player.profileImage}
          name={fullName}
          size="homepage"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00105A] via-transparent to-transparent opacity-90" />
      
      {/* Youth Product Badge */}
      <PlayerBadge isYouthProduct={player.isYouthProduct} />
      
      {/* Default State - Name at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-16">
        <h3 className="text-white font-bold text-2xl leading-tight">
          {fullName}
        </h3>
      </div>
      
      {/* Hover State - Details Below Name */}
      <div className="absolute bottom-0 left-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Gold line separator */}
        <div className="w-full h-px bg-[#FFD700] mb-4" />
        
        {/* Position and Nationality on same line */}
        <div className="text-white text-base font-medium mb-3 leading-relaxed">
          {position} • {player.nationality || 'Scotland'}
        </div>
        
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <button
            onClick={hasTwitter ? (e) => handleSocialClick(socialMedia.twitter!, e) : undefined}
            className={`transition-colors ${
              hasTwitter 
                ? 'text-white hover:text-[#FFD700]' 
                : 'text-[#9ca3af] cursor-default'
            }`}
            disabled={!hasTwitter}
          >
            <Twitter size={20} />
          </button>
          
          <button
            onClick={hasFacebook ? (e) => handleSocialClick(socialMedia.facebook!, e) : undefined}
            className={`transition-colors ${
              hasFacebook 
                ? 'text-white hover:text-[#FFD700]' 
                : 'text-[#9ca3af] cursor-default'
            }`}
            disabled={!hasFacebook}
          >
            <Facebook size={20} />
          </button>
          
          <button
            onClick={hasInstagram ? (e) => handleSocialClick(socialMedia.instagram!, e) : undefined}
            className={`transition-colors ${
              hasInstagram 
                ? 'text-white hover:text-[#FFD700]' 
                : 'text-[#9ca3af] cursor-default'
            }`}
            disabled={!hasInstagram}
          >
            <Instagram size={20} />
          </button>
          
          <button
            onClick={hasLinkedin ? (e) => handleSocialClick(socialMedia.linkedin!, e) : undefined}
            className={`transition-colors ${
              hasLinkedin 
                ? 'text-white hover:text-[#FFD700]' 
                : 'text-[#9ca3af] cursor-default'
            }`}
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
