"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Match } from '@/features/matches/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MatchCard } from './MatchCard';
import { LeaguePositionSummary } from './LeaguePositionSummary';

interface MatchCentreCarouselProps {
  upcomingMatches: Match[];
  recentMatches: Match[];
  leaguePosition?: {
    position: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    points: number;
    form?: ('W' | 'D' | 'L')[];
  };
}

export function MatchCentreCarousel({ 
  upcomingMatches = [], 
  recentMatches = [],
  leaguePosition 
}: MatchCentreCarouselProps) {
  const [displayedMatches, setDisplayedMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Organize matches: 2 prior, 1 current, 2 future matches
  useEffect(() => {
    // Sort recent matches in descending order (newest first)
    const sortedRecent = [...recentMatches].sort((a, b) => {
      const dateA = new Date(a.match_date || a.matchDate || '');
      const dateB = new Date(b.match_date || b.matchDate || '');
      return dateB.getTime() - dateA.getTime();
    });
    
    // Sort upcoming matches in ascending order (nearest first)
    const sortedUpcoming = [...upcomingMatches].sort((a, b) => {
      const dateA = new Date(a.match_date || a.matchDate || '');
      const dateB = new Date(b.match_date || b.matchDate || '');
      return dateA.getTime() - dateB.getTime();
    });
    
    // Get 2 most recent results
    const recentToShow = sortedRecent.slice(0, 2);
    
    // Get the next upcoming match as the "current" match
    const currentMatch = sortedUpcoming.length > 0 ? [sortedUpcoming[0]] : [];
    
    // Get the next 2 upcoming matches after the current one
    const upcomingToShow = sortedUpcoming.slice(1, 3);
    
    // If we don't have enough upcoming matches, add more recent ones
    let finalMatches = [...recentToShow, ...currentMatch, ...upcomingToShow];
    
    // If we still have fewer than 5 matches, add more from either recent or upcoming
    if (finalMatches.length < 5) {
      const neededMatches = 5 - finalMatches.length;
      
      if (recentToShow.length < sortedRecent.length) {
        // Add more recent matches
        const additionalRecent = sortedRecent.slice(recentToShow.length, recentToShow.length + neededMatches);
        finalMatches = [...additionalRecent, ...finalMatches];
      } else if (upcomingToShow.length < sortedUpcoming.length - 1) {
        // Add more upcoming matches
        const additionalUpcoming = sortedUpcoming.slice(currentMatch.length + upcomingToShow.length, currentMatch.length + upcomingToShow.length + neededMatches);
        finalMatches = [...finalMatches, ...additionalUpcoming];
      }
    }
    
    // Ensure we only show at most 5 matches
    finalMatches = finalMatches.slice(0, 5);
    
    setDisplayedMatches(finalMatches);
  }, [recentMatches, upcomingMatches]);
  
  // Handle carousel navigation
  const scrollToNext = () => {
    if (carouselRef.current && displayedMatches.length > 0) {
      const cardWidth = carouselRef.current.offsetWidth / Math.min(3, displayedMatches.length);
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      
      if (currentIndex < displayedMatches.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
  };
  
  const scrollToPrev = () => {
    if (carouselRef.current && displayedMatches.length > 0) {
      const cardWidth = carouselRef.current.offsetWidth / Math.min(3, displayedMatches.length);
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
        <a 
          href="/matches" 
          className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center space-x-1"
        >
          <span>View All Matches</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Match carousel */}
        <div className="relative flex-1">
          <div 
            ref={carouselRef} 
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          >
            {displayedMatches.map((match, index) => (
              <div 
                key={match.id || index} 
                className="min-w-[260px] w-[260px] snap-center flex-shrink-0"
              >
                <MatchCard 
                  match={match} 
                  isCurrentMatch={index === Math.floor(displayedMatches.length / 2)}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation buttons - only show if we have multiple matches */}
          {displayedMatches.length > 3 && (
            <>
              <button 
                onClick={scrollToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
                aria-label="Previous matches"
              >
                <ChevronLeft className="h-5 w-5 text-[#00105A]" />
              </button>
              
              <button 
                onClick={scrollToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex >= displayedMatches.length - 3}
                aria-label="Next matches"
              >
                <ChevronRight className="h-5 w-5 text-[#00105A]" />
              </button>
            </>
          )}
        </div>
        
        {/* League position summary */}
        {leaguePosition && (
          <div className="md:w-[280px] flex-shrink-0">
            <LeaguePositionSummary 
              position={leaguePosition.position}
              played={leaguePosition.played}
              won={leaguePosition.won}
              drawn={leaguePosition.drawn}
              lost={leaguePosition.lost}
              points={leaguePosition.points}
              form={leaguePosition.form}
            />
          </div>
        )}
      </div>
    </div>
  );
}
