
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Ticket } from 'lucide-react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

export interface MatchResultData {
  homeScore: number;
  awayScore: number;
  matchReportLink?: string;
}

export interface Match {
  id: string;
  match_date: string;
  matchDate?: string; // Alternative property name
  matchTime?: string;
  competition?: string;
  homeTeam?: string;
  awayTeam?: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  venue?: string;
  ticketLink?: string;
  home_team: any;
  away_team: any;
  status: string;
  homeScore?: number;
  awayScore?: number;
  matchReport?: string;
}

interface MatchCarouselProps {
  matches: Match[];
  type?: 'fixture' | 'result';
}

const MatchCarousel: React.FC<MatchCarouselProps> = ({ matches, type = 'fixture' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!matches || matches.length === 0) {
    return (
      <div className="text-center p-12 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-500">No {type === 'fixture' ? 'upcoming fixtures' : 'recent results'} to display</p>
      </div>
    );
  }
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === matches.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? matches.length - 1 : prevIndex - 1
    );
  };
  
  const currentMatch = matches[currentIndex];
  
  // Get result data if this is a result type
  const resultData: MatchResultData | undefined = type === 'result' ? {
    homeScore: currentMatch.homeScore || 0,
    awayScore: currentMatch.awayScore || 0,
    matchReportLink: currentMatch.matchReport
  } : undefined;
  
  // Format date for display
  const matchDate = currentMatch.matchDate || currentMatch.match_date;
  const formattedDate = matchDate ? new Date(matchDate).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'TBA';
  
  return (
    <div className="relative">
      <Card className="border-primary/20">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left section - Match info */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
                {currentMatch.matchTime && <span>• {currentMatch.matchTime}</span>}
              </div>
              
              {currentMatch.competition && (
                <Badge variant="outline" className="mb-2">
                  {currentMatch.competition}
                </Badge>
              )}
              
              {currentMatch.venue && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{currentMatch.venue}</span>
                </div>
              )}
              
              {type === 'fixture' && currentMatch.ticketLink && (
                <div className="mt-4">
                  <Button asChild size="sm" className="mt-2">
                    <Link href={currentMatch.ticketLink}>
                      <Ticket className="mr-2 h-4 w-4" />
                      Buy Tickets
                    </Link>
                  </Button>
                </div>
              )}
              
              {type === 'result' && resultData?.matchReportLink && (
                <div className="mt-4">
                  <Button asChild size="sm" variant="outline" className="mt-2">
                    <Link href={resultData.matchReportLink}>
                      Match Report
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Center section - Teams and score */}
            <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gray-50 border-y md:border-y-0 md:border-x border-gray-200">
              <div className="w-full flex items-center justify-between mb-4">
                {/* Home Team */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full border border-gray-200 p-2 mb-2 flex items-center justify-center">
                    {currentMatch.homeTeamLogo ? (
                      <img
                        src={currentMatch.homeTeamLogo}
                        alt={currentMatch.homeTeam || 'Home Team'}
                        className="max-w-full max-h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        ?
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-sm">
                    {currentMatch.homeTeam || (currentMatch.home_team?.name || 'Home')}
                  </span>
                </div>
                
                {/* Score or vs */}
                <div className="flex items-center justify-center mx-4">
                  {type === 'result' && resultData ? (
                    <div className="text-2xl font-bold">
                      {resultData.homeScore} - {resultData.awayScore}
                    </div>
                  ) : (
                    <div className="text-lg font-medium text-gray-500">vs</div>
                  )}
                </div>
                
                {/* Away Team */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full border border-gray-200 p-2 mb-2 flex items-center justify-center">
                    {currentMatch.awayTeamLogo ? (
                      <img
                        src={currentMatch.awayTeamLogo}
                        alt={currentMatch.awayTeam || 'Away Team'}
                        className="max-w-full max-h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        ?
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-sm">
                    {currentMatch.awayTeam || (currentMatch.away_team?.name || 'Away')}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right section - Navigation */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              {/* Match number indicator */}
              <div className="text-center mb-6">
                <span className="text-sm text-muted-foreground">
                  Match {currentIndex + 1} of {matches.length}
                </span>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon" onClick={prevSlide} disabled={matches.length <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide} disabled={matches.length <= 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchCarousel;
