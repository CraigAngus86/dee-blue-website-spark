"use client";
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MatchCard } from '../common/MatchCard';
import { LeaguePositionSummary } from '../common/LeaguePositionSummary';

interface MatchInfo {
  id: string;
  match_date: string;
  match_time?: string;
  venue: string;
  status: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo?: string;
  away_team_logo?: string;
  home_score?: number;
  away_score?: number;
  competition: {
    id: string;
    name: string;
    short_name?: string;
  };
  ticket_link?: string;
  match_report_link?: string;
}

interface MatchCarouselProps {
  recentMatches: MatchInfo[];
  upcomingMatches: MatchInfo[];
  leagueData?: {
    position: number;
    points: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    form: ('W' | 'L' | 'D')[];
  };
  showHeader?: boolean;
}

export function MatchCarousel({ 
  recentMatches = [], 
  upcomingMatches = [], 
  leagueData,
  showHeader = false
}: MatchCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  // Track drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Organize matches with proper ordering (oldest to newest results, then next match, then upcoming)
  const getOrganizedMatches = () => {
    try {
      // Get recent matches (completed matches)
      let sortedRecent = [...recentMatches]
        .filter(match => !!match && (match.status === 'completed' || match.home_score !== undefined))
        .sort((a, b) => {
          if (!a.match_date || !b.match_date) return 0;
          // Sort by match date ASCENDING (oldest first)
          return new Date(a.match_date).getTime() - new Date(b.match_date).getTime();
        })
        .slice(0, 3);
        
      // Get upcoming matches (not completed matches)
      const sortedUpcoming = [...upcomingMatches]
        .filter(match => !!match && match.status !== 'completed' && match.home_score === undefined)
        .sort((a, b) => {
          if (!a.match_date || !b.match_date) return 0;
          // Sort by match date ascending (nearest future match first)
          return new Date(a.match_date).getTime() - new Date(b.match_date).getTime();
        });
      
      // The next match is the first upcoming match
      const nextMatch = sortedUpcoming.length > 0 ? [sortedUpcoming[0]] : [];
      
      // Additional upcoming matches (up to 3)
      const additionalUpcoming = sortedUpcoming.slice(1, 4);
      
      // Combine in order: older results, most recent result, next match, upcoming matches
      return {
        matches: [...sortedRecent, ...nextMatch, ...additionalUpcoming],
        nextMatchIndex: sortedRecent.length // Index of the next match in the combined array
      };
    } catch (error) {
      console.error("Error organizing matches:", error);
      return { matches: [], nextMatchIndex: -1 };
    }
  };
  
  const { matches: organizedMatches, nextMatchIndex } = getOrganizedMatches();
  
  // Get the match type for displaying badges
  const getMatchType = (match: MatchInfo, index: number) => {
    if (match.status === 'completed' || match.home_score !== undefined) {
      return 'FINAL RESULT';
    }
    
    // If this is the next match (right after the recent matches)
    if (index === nextMatchIndex) {
      return 'NEXT MATCH';
    }
    
    return 'UPCOMING MATCH';
  };
  
  // Handle carousel navigation
  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };
  
  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };
  
  // Check if we can scroll in either direction
  const checkScrollState = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      );
    }
  };
  
  // Center the next match card on initial load
  useEffect(() => {
    if (carouselRef.current && nextMatchIndex >= 0) {
      const cardWidth = 360; // Width of each card
      const spacing = 24;    // space-x-6 = 1.5rem = 24px
      const scrollTo = nextMatchIndex * (cardWidth + spacing);
      
      // Get the container width to center the card
      const containerWidth = carouselRef.current.offsetWidth;
      const centerOffset = (containerWidth - cardWidth) / 2;
      
      // Scroll to center the next match card
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = Math.max(0, scrollTo - centerOffset);
          checkScrollState();
        }
      }, 100);
    }
  }, [nextMatchIndex, organizedMatches]);
  
  // Add event listeners for scroll and resize
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('scroll', checkScrollState);
      window.addEventListener('resize', checkScrollState);
      
      return () => {
        carouselElement.removeEventListener('scroll', checkScrollState);
        window.removeEventListener('resize', checkScrollState);
      };
    }
  }, []);
  
  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current || e.touches.length === 0) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current || e.touches.length === 0) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      checkScrollState();
    }
  };
  
  // If we have no matches, show placeholder
  if (organizedMatches.length === 0) {
    return (
      <div className="w-full bg-white rounded-md shadow p-8 flex items-center justify-center">
        <p className="text-gray-500">No upcoming or recent matches to display</p>
      </div>
    );
  }
  
  return (
    <div>
      {showHeader && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-1.5 h-10 bg-[#00105A] mr-3"></div>
            <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
          </div>
          <Link 
            href="/matches" 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center gap-2"
          >
            <span className="text-sm font-medium">View All Matches</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
      
      <div className="relative w-full overflow-hidden">
        {/* Left navigation arrow */}
        <button
          onClick={handleScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 focus:outline-none
            ${canScrollLeft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!canScrollLeft}
          aria-label="Previous matches"
        >
          <ChevronLeft className="h-5 w-5 text-[#00105A]" />
        </button>
        
        {/* Match carousel with draggable functionality */}
        <div 
          ref={carouselRef} 
          className={`flex space-x-6 overflow-x-auto hide-scrollbar pb-6 pt-2 px-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {organizedMatches.map((match, index) => {
            const matchType = getMatchType(match, index);
            
            return (
              <div
                key={match.id || index} 
                className="min-w-[360px] w-[360px] flex-shrink-0"
              >
                <MatchCard 
                  match={match}
                  matchType={matchType as 'FINAL RESULT' | 'NEXT MATCH' | 'UPCOMING MATCH'}
                  isCurrentMatch={index === nextMatchIndex}
                />
              </div>
            );
          })}
        </div>
        
        {/* Right navigation arrow */}
        <button
          onClick={handleScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 focus:outline-none
            ${canScrollRight ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!canScrollRight}
          aria-label="Next matches"
        >
          <ChevronRight className="h-5 w-5 text-[#00105A]" />
        </button>
      </div>
      
      {/* League table summary section */}
      {leagueData && (
        <div className="mt-8">
          <LeaguePositionSummary
            position={leagueData.position}
            played={leagueData.played}
            won={leagueData.won}
            drawn={leagueData.drawn}
            lost={leagueData.lost}
            points={leagueData.points}
            form={leagueData.form}
          />
        </div>
      )}
    </div>
  );
}
