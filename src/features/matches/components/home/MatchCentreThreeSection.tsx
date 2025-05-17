"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Calendar, MapPin } from 'lucide-react';
import { LeaguePositionSummary } from './LeaguePositionSummary';

interface MatchInfo {
  id: string;
  match_date: string;
  match_time?: string;
  venue: string;
  status: string;
  home_team: {
    id: string;
    name: string;
    logo_url?: string;
  };
  away_team: {
    id: string;
    name: string;
    logo_url?: string;
  };
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

interface MatchCentreThreeSectionProps {
  recentMatches: MatchInfo[];
  upcomingMatches: MatchInfo[];
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

export function MatchCentreThreeSection({
  recentMatches,
  upcomingMatches,
  leaguePosition
}: MatchCentreThreeSectionProps) {
  const recentMatch = recentMatches.length > 0 ? recentMatches[0] : null;
  const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;
  const upcomingMatch = upcomingMatches.length > 1 ? upcomingMatches[1] : null;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#00105A]">Match Centre</h2>
        <Link 
          href="/matches" 
          className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center gap-1"
        >
          <span>View All Matches</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FINAL RESULT Section */}
          {recentMatch && (
            <div className="flex flex-col">
              <div className="bg-[#00105A] rounded-t-md px-4 py-2">
                <div className="text-white font-semibold text-center uppercase text-sm">
                  Final Result
                </div>
              </div>
              <div className="bg-white rounded-b-md shadow-md border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-xs text-center text-gray-600 font-medium">
                    {recentMatch.competition.name}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center w-5/12">
                      <TeamLogo 
                        name={recentMatch.home_team.name} 
                        logoUrl={recentMatch.home_team.logo_url} 
                      />
                      <div className="mt-2 font-semibold">{recentMatch.home_team.name}</div>
                    </div>
                    
                    <div className="text-3xl font-bold text-center w-2/12">
                      <div className="flex justify-center gap-3">
                        <span>{recentMatch.home_score}</span>
                        <span>-</span>
                        <span>{recentMatch.away_score}</span>
                      </div>
                    </div>
                    
                    <div className="text-center w-5/12">
                      <TeamLogo 
                        name={recentMatch.away_team.name} 
                        logoUrl={recentMatch.away_team.logo_url} 
                      />
                      <div className="mt-2 font-semibold">{recentMatch.away_team.name}</div>
                    </div>
                  </div>
                  
                  <MatchDateVenue 
                    date={recentMatch.match_date} 
                    time={recentMatch.match_time} 
                    venue={recentMatch.venue} 
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* NEXT MATCH Section */}
          {nextMatch && (
            <div className="flex flex-col">
              <div className="bg-[#00105A] rounded-t-md px-4 py-2">
                <div className="text-white font-semibold text-center uppercase text-sm">
                  Next Match
                </div>
              </div>
              <div className="bg-white rounded-b-md shadow-md border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-xs text-center text-gray-600 font-medium">
                    {nextMatch.competition.name}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center w-5/12">
                      <TeamLogo 
                        name={nextMatch.home_team.name} 
                        logoUrl={nextMatch.home_team.logo_url} 
                      />
                      <div className="mt-2 font-semibold">{nextMatch.home_team.name}</div>
                    </div>
                    
                    <div className="text-2xl font-bold text-center w-2/12">
                      <span>VS</span>
                    </div>
                    
                    <div className="text-center w-5/12">
                      <TeamLogo 
                        name={nextMatch.away_team.name} 
                        logoUrl={nextMatch.away_team.logo_url} 
                      />
                      <div className="mt-2 font-semibold">{nextMatch.away_team.name}</div>
                    </div>
                  </div>
                  
                  <MatchDateVenue 
                    date={nextMatch.match_date} 
                    time={nextMatch.match_time} 
                    venue={nextMatch.venue} 
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* UPCOMING MATCH Section */}
          {upcomingMatch && (
            <div className="flex flex-col">
              <div className="bg-[#00105A] rounded-t-md px-4 py-2">
                <div className="text-white font-semibold text-center uppercase text-sm">
                  Upcoming Match
                </div>
              </div>
              <div className="bg-white rounded-b-md shadow-md border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-xs text-center text-gray-600 font-medium">
                    {upcomingMatch.competition.name}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center w-5/12">
                      <TeamLogo 
                        name={upcomingMatch.home_team.name} 
                        logoUrl={upcomingMatch.home_team.logo_url} 
                      />
                      <div className="mt-2 font-semibold">{upcomingMatch.home_team.name}</div>
                    </div>
                    
                    <div className="text-2xl font-bold text-center w-2/12">
                      <span>VS</span>
                    </div>
                    
                    <div className="text-center w-5/12">
                      <TeamLogo 
                        name={upcomingMatch.away_team.name} 
                        logoUrl={upcomingMatch.away_team.logo_url} 
                      />
                      <div className="mt-2 font-semibold">{upcomingMatch.away_team.name}</div>
                    </div>
                  </div>
                  
                  <MatchDateVenue 
                    date={upcomingMatch.match_date} 
                    time={upcomingMatch.match_time} 
                    venue={upcomingMatch.venue} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* League Position */}
        {leaguePosition && (
          <div className="lg:w-[300px] lg:flex-shrink-0">
            <LeaguePositionSummary {...leaguePosition} />
          </div>
        )}
      </div>
    </div>
  );
}

// Helper components
function TeamLogo({ name, logoUrl }: { name: string; logoUrl?: string }) {
  if (logoUrl) {
    return (
      <div className="w-16 h-16 mx-auto bg-white rounded-full border border-gray-200 flex items-center justify-center p-1 overflow-hidden">
        <img 
          src={logoUrl} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain" 
        />
      </div>
    );
  }
  
  // Fallback to initials if no logo
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center">
      <span className="text-gray-500 font-bold text-lg">{initials}</span>
    </div>
  );
}

function MatchDateVenue({ date, time, venue }: { date: string; time?: string; venue: string }) {
  // Format date: "Sat 12 Apr"
  let formattedDate = 'TBA';
  try {
    const dateObj = new Date(date);
    formattedDate = dateObj.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  } catch (e) {
    console.error('Error formatting date:', e);
  }
  
  return (
    <div className="flex justify-between">
      <div className="flex items-center text-gray-600 text-sm">
        <Calendar className="h-4 w-4 mr-2" />
        <span>
          {formattedDate}
          {time && ` • ${time}`}
        </span>
      </div>
      
      {venue && (
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{venue}</span>
        </div>
      )}
    </div>
  );
}
