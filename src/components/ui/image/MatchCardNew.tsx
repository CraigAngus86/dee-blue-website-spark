
"use client";

import React from 'react';
import { Match } from '@/types/match';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

interface MatchCardNewProps {
  match: Match;
  variant: 'past' | 'future' | 'next';
  className?: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

const CompetitorLogo = ({ name, size = "md", className = "" }) => {
  // Simplified version of CompetitorLogo component
  const getTeamImage = () => {
    // Convert team name to a filename format (simple version)
    const normalizedName = name.replace(/[^\w\s]/g, '').replace(/\s+/g, '');
    
    // Try to find the team logo or use a placeholder
    try {
      return `/assets/images/competitors/${normalizedName}.png`;
    } catch (e) {
      return `/assets/images/competitors/placeholder.png`;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src={getTeamImage()}
          alt={name}
          width={size === "sm" ? 48 : 64}
          height={size === "sm" ? 48 : 64}
          className="object-contain"
          onError={(e) => {
            // Fallback for missing images - show a placeholder or text
            e.currentTarget.src = `/assets/images/logos/BOD_Logo_Navy_square.png`;
          }}
        />
      </div>
    </div>
  );
};

const MatchCardNew: React.FC<MatchCardNewProps> = ({ match, variant, className = "" }) => {
  const isPast = match.isCompleted || variant === 'past';
  const isNext = variant === 'next';
  const isMobile = false; // In a real app, this would use a hook like useIsMobile()

  return (
    <div 
      className={`relative ${className} bg-white rounded-lg shadow overflow-hidden transition-all hover:shadow-md`}
    >
      <div className={`p-3 text-center font-semibold text-sm uppercase ${isNext ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
        {isPast ? 'FINAL RESULT' : isNext ? 'NEXT MATCH' : 'UPCOMING MATCH'}
      </div>
      
      <div className="p-3 text-center text-xs font-medium text-gray-500 uppercase">
        {match.competition}
      </div>
      
      <div className="flex items-center justify-between px-3 sm:px-6 py-4">
        <div className="flex flex-col items-center text-center w-[35%] sm:w-5/12">
          <CompetitorLogo
            name={match.homeTeam}
            size={isMobile ? "sm" : "md"}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <span className={`mt-2 text-xs sm:text-sm ${match.homeTeam.includes("Banks o' Dee") ? "font-bold" : ""}`}>
            {match.homeTeam}
          </span>
        </div>
        
        <div className="text-center w-[30%] sm:w-2/12">
          {isPast && match.result ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="text-lg sm:text-2xl font-bold">
                {match.result.homeScore}
              </div>
              <div className="text-sm sm:text-lg text-gray-400">-</div>
              <div className="text-lg sm:text-2xl font-bold">
                {match.result.awayScore}
              </div>
            </div>
          ) : (
            <div className="text-base sm:text-xl font-bold text-gray-700">
              VS
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center text-center w-[35%] sm:w-5/12">
          <CompetitorLogo
            name={match.awayTeam}
            size={isMobile ? "sm" : "md"}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <span className={`mt-2 text-xs sm:text-sm ${match.awayTeam.includes("Banks o' Dee") ? "font-bold" : ""}`}>
            {match.awayTeam}
          </span>
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-center mb-1">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">
            {formatDate(match.date)} • {match.time}
          </span>
        </div>
        
        <div className="flex items-center justify-center">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">{match.venue}</span>
        </div>
      </div>
      
      {isNext && match.ticketLink && (
        <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
          <a 
            href={match.ticketLink} 
            className="text-sm text-primary font-medium hover:underline"
          >
            MATCH DETAILS
          </a>
        </div>
      )}
    </div>
  );
};

export default MatchCardNew;
