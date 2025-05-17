"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MatchCard } from './MatchCard';
import { LeaguePositionSummary } from './LeaguePositionSummary';

interface MatchCentreCarouselProps {
  upcomingMatches: any[];
  recentMatches: any[];
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
  const [displayedMatches, setDisplayedMatches] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("MatchCentreCarousel - Upcoming matches:", upcomingMatches?.length);
    console.log("MatchCentreCarousel - Recent matches:", recentMatches?.length);
    
    // Check if we have any real matches
    const hasRealMatches = upcomingMatches.length > 0 || recentMatches.length > 0;
    
    if (hasRealMatches) {
      // Use real data if available
      let allMatches = [...recentMatches, ...upcomingMatches].slice(0, 5);
      setDisplayedMatches(allMatches);
    } else {
      // Use test data if no real matches
      console.log("No real matches found, using test data");
      setDisplayedMatches([
        createTestRecentMatch('test-recent-1', 'Banks o\' Dee', 'Inverurie Locos', 1, 1),
        createTestRecentMatch('test-recent-2', 'Banks o\' Dee', 'Formartine Utd', 2, 0),
        createTestUpcomingMatch('test-upcoming-1', 'Forres', 'Banks o\' Dee'),
        createTestUpcomingMatch('test-upcoming-2', 'Banks o\' Dee', 'Fraserburgh'),
        createTestUpcomingMatch('test-upcoming-3', 'Keith', 'Banks o\' Dee')
      ]);
    }
  }, [recentMatches, upcomingMatches]);
  
  // Handle carousel navigation
  const scrollToNext = () => {
    if (carouselRef.current && displayedMatches.length > 0) {
      carouselRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };
  
  const scrollToPrev = () => {
    if (carouselRef.current && displayedMatches.length > 0) {
      carouselRef.current.scrollBy({ left: -280, behavior: 'smooth' });
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
          {displayedMatches.length === 0 ? (
            <div className="bg-white rounded-md shadow p-4 text-center text-gray-500">
              No upcoming or recent matches to display
            </div>
          ) : (
            <>
              <div 
                ref={carouselRef} 
                className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar"
              >
                {displayedMatches.map((match, index) => (
                  <div 
                    key={match.id || index} 
                    className="min-w-[260px] w-[260px] flex-shrink-0"
                  >
                    <MatchCard 
                      match={match} 
                      isCurrentMatch={index === Math.floor(displayedMatches.length / 2)}
                    />
                  </div>
                ))}
              </div>
              
              {displayedMatches.length > 1 && (
                <>
                  <button 
                    onClick={scrollToPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10"
                    aria-label="Previous matches"
                  >
                    <ChevronLeft className="h-5 w-5 text-[#00105A]" />
                  </button>
                  
                  <button 
                    onClick={scrollToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 z-10"
                    aria-label="Next matches"
                  >
                    <ChevronRight className="h-5 w-5 text-[#00105A]" />
                  </button>
                </>
              )}
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

// Create a test upcoming match for fallback
function createTestUpcomingMatch(id: string, homeTeam: string, awayTeam: string) {
  return {
    id: id,
    match_date: '2025-05-30',
    match_time: '19:45',
    venue: 'Spain Park',
    status: 'scheduled',
    ticket_link: '#',
    home_team: {
      id: 'home-' + id,
      name: homeTeam,
      logo_url: ''
    },
    away_team: {
      id: 'away-' + id,
      name: awayTeam,
      logo_url: ''
    },
    competition: {
      id: 'highland-league',
      name: 'Scottish Highland Football League',
      short_name: 'HL',
      logo_url: ''
    }
  };
}

// Create a test recent match for fallback
function createTestRecentMatch(id: string, homeTeam: string, awayTeam: string, homeScore: number, awayScore: number) {
  return {
    id: id,
    match_date: '2025-05-10',
    match_time: '15:00',
    venue: 'Spain Park',
    status: 'completed',
    home_score: homeScore,
    away_score: awayScore,
    match_report_link: '#',
    home_team: {
      id: 'home-' + id,
      name: homeTeam,
      logo_url: ''
    },
    away_team: {
      id: 'away-' + id,
      name: awayTeam,
      logo_url: ''
    },
    competition: {
      id: 'highland-league',
      name: 'Scottish Highland Football League',
      short_name: 'HL',
      logo_url: ''
    }
  };
}
