"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface MatchInfo {
  id: string;
  match_date: string;
  match_time?: string;
  venue: string;
  status: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo: string;
  away_team_logo: string;
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
}

export function MatchCarousel({ recentMatches = [], upcomingMatches = [], leagueData }: MatchCarouselProps) {
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
  
  // Function to build the full Cloudinary URL from the logo ID
  const getFullLogoUrl = (logoId: string) => {
    // Use the correct cloud name
    const cloudName = 'dlkpaw2a0';
    
    // Build the URL using just the ID (no v1747324466 version number needed)
    return `https://res.cloudinary.com/${cloudName}/image/upload/${logoId}`;
  };
  
  // Fallback to team initials if logo fails to load
  const getTeamInitials = (teamName: string): string => {
    return teamName.substring(0, 1).toUpperCase();
  };
  
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="relative w-full overflow-hidden">
        {/* Left navigation arrow */}
        <button
          onClick={handleScrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 focus:outline-none
            ${canScrollLeft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!canScrollLeft}
          aria-label="Previous matches"
        >
          <ChevronLeft className="h-5 w-5 text-[#00105A]" />
        </button>
        
        {/* Match carousel with draggable functionality */}
        <div 
          ref={carouselRef} 
          className={`flex space-x-6 overflow-x-auto hide-scrollbar pb-6 pt-2 px-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
            const isNextMatch = matchType === 'NEXT MATCH';
            const isResult = matchType === 'FINAL RESULT';
            
            // Get team names directly from the match data
            const homeTeamName = match.home_team_name || '';
            const awayTeamName = match.away_team_name || '';
            
            // Get logo URLs using the Cloudinary IDs
            const homeTeamLogo = match.home_team_logo ? getFullLogoUrl(match.home_team_logo) : '';
            const awayTeamLogo = match.away_team_logo ? getFullLogoUrl(match.away_team_logo) : '';
            
            return (
              <div
                key={match.id || index}
                className={`flex-shrink-0 w-[360px] rounded-lg overflow-hidden shadow
                  ${isNextMatch ? 'border-[#FFD700] border-2' : 'border border-gray-200'}
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                {/* Match card */}
                <div className="h-full bg-white">
                  {/* Header with proper styling */}
                  <div className={`px-4 py-4 text-center 
                    ${isNextMatch ? 'bg-[#00105A]' : ''}`}
                  >
                    <div className={`text-sm font-bold tracking-wide uppercase
                      ${isNextMatch ? 'text-white' : 'text-[#00105A]'}`}
                    >
                      {matchType}
                    </div>
                  </div>
                  
                  {/* Competition name */}
                  <div className="px-4 py-3 text-center border-b border-gray-200">
                    <div className="text-xs text-gray-600 font-medium truncate">
                      {match.competition?.name || "SCOTTISH HIGHLAND FOOTBALL LEAGUE"}
                    </div>
                  </div>
                  
                  {/* Teams and score/vs */}
                  <div className="p-6 pt-8 pb-8">
                    <div className="flex justify-between items-center">
                      {/* Home team */}
                      <div className="text-center w-5/12">
                        <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-transparent">
                          {homeTeamLogo ? (
                            <img 
                              src={homeTeamLogo}
                              alt={`${homeTeamName} logo`} 
                              className="w-16 h-16 object-contain" 
                              onError={(e) => {
                                // On error, replace with team initial
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.style.display = 'none';
                                // Create a span with the initial
                                const parent = target.parentElement;
                                if (parent) {
                                  const span = document.createElement('span');
                                  span.className = 'text-gray-700 font-semibold text-xl';
                                  span.textContent = getTeamInitials(homeTeamName);
                                  parent.appendChild(span);
                                }
                              }}
                            />
                          ) : (
                            <span className="text-gray-700 font-semibold text-xl">
                              {getTeamInitials(homeTeamName)}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {homeTeamName}
                        </div>
                      </div>
                      
                      {/* Score or VS */}
                      <div className="text-center text-2xl font-bold w-2/12">
                        {isResult ? (
                          <div>
                            {match.home_score || 0} - {match.away_score || 0}
                          </div>
                        ) : (
                          <div className="text-gray-700">
                            VS
                          </div>
                        )}
                      </div>
                      
                      {/* Away team */}
                      <div className="text-center w-5/12">
                        <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-transparent">
                          {awayTeamLogo ? (
                            <img 
                              src={awayTeamLogo}
                              alt={`${awayTeamName} logo`} 
                              className="w-16 h-16 object-contain" 
                              onError={(e) => {
                                // On error, replace with team initial
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.style.display = 'none';
                                // Create a span with the initial
                                const parent = target.parentElement;
                                if (parent) {
                                  const span = document.createElement('span');
                                  span.className = 'text-gray-700 font-semibold text-xl';
                                  span.textContent = getTeamInitials(awayTeamName);
                                  parent.appendChild(span);
                                }
                              }}
                            />
                          ) : (
                            <span className="text-gray-700 font-semibold text-xl">
                              {getTeamInitials(awayTeamName)}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {awayTeamName}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Match details - date and venue now in vertical layout */}
                  <div className="px-5 py-4 border-t border-gray-200">
                    {/* Date and time row */}
                    <div className="flex items-center justify-center text-gray-600 text-xs mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {formatDate(match.match_date)}
                        {match.match_time && ` • ${formatTime(match.match_time)}`}
                      </span>
                    </div>
                    
                    {/* Venue row */}
                    {match.venue && (
                      <div className="flex items-center justify-center text-gray-600 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{match.venue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right navigation arrow */}
        <button
          onClick={handleScrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 focus:outline-none
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
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#00105A]">Highland League Table</h2>
            <Link href="/table" className="text-[#00105A] hover:text-[#FFD700] font-medium text-sm flex items-center">
              View Full Table <span className="ml-1">›</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-[#00105A] text-white font-bold h-12 w-12 rounded-full flex items-center justify-center text-xl">
                  {leagueData.position}
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-[#00105A]">Banks o' Dee</h3>
                <div className="grid grid-cols-5 gap-4 mt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.points}</div>
                    <div className="text-xs text-gray-500">POINTS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.won}</div>
                    <div className="text-xs text-gray-500">WON</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.drawn}</div>
                    <div className="text-xs text-gray-500">DRAWN</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00105A]">{leagueData.lost}</div>
                    <div className="text-xs text-gray-500">LOST</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">FORM</div>
                    <div className="flex space-x-1">
                      {leagueData.form.map((result, i) => (
                        <div 
                          key={i} 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white 
                            ${result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-amber-500' : 'bg-red-500'}`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to format the date (e.g., "Sat 12 Apr")
function formatDate(dateString: string): string {
  try {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    
    // Get day of the month
    const day = date.getDate();
    
    // Get short month name
    const month = date.toLocaleString('en-GB', { month: 'short' });
    
    // Get short day name
    const weekday = date.toLocaleString('en-GB', { weekday: 'short' });
    
    return `${weekday} ${day} ${month}`;
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'TBA';
  }
}

// Helper function to format the time (e.g., "15:00")
function formatTime(timeString: string): string {
  if (!timeString) return '';
  // If it's already in HH:MM format, return it directly
  if (timeString.includes(':')) {
    return timeString.substring(0, 5); // Get first 5 chars (HH:MM)
  }
  return timeString;
}
