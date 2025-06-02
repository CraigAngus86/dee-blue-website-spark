"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface UpcomingMatch {
  id: string;
  match_date: string;
  match_time: string;
  venue: string;
  hospitality_available: boolean;
  home_team: string;
  away_team: string;
  competition: string;
  competition_short: string;
  home_team_logo: string;
  away_team_logo: string;
}

interface UpcomingHospitalityProps {
  onEnquireClick: (matchId: string, homeTeam: string, awayTeam: string) => void;
}

export function UpcomingHospitality({ onEnquireClick }: UpcomingHospitalityProps) {
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcomingHospitalityMatches();
  }, []);

  const fetchUpcomingHospitalityMatches = async () => {
    try {
      const { data, error } = await supabase.rpc('get_hospitality_matches');
      
      if (error) throw error;
      
      console.log('Fetched hospitality matches:', data);
      setUpcomingMatches(data || []);
    } catch (error) {
      console.error('Error fetching upcoming hospitality matches:', error);
      setError('Failed to load upcoming matches');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    } catch (e) {
      return 'TBA';
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'TBC';
    return timeString.slice(0, 5);
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const buildLogoUrl = (publicId: string): string => {
    if (!publicId) return '';
    // Simple URL building without padding transformation
    return `https://res.cloudinary.com/dlkpaw2a0/image/upload/c_fit,w_64,h_64,q_auto:good,f_auto/${publicId}`;
  };

  const getAvailabilityBadge = (matchDate: string) => {
    const daysUntilMatch = Math.ceil((new Date(matchDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilMatch > 30) {
      return { text: 'Good Availability', color: 'bg-[#10b981] text-white' };
    } else if (daysUntilMatch > 14) {
      return { text: 'Limited Availability', color: 'bg-[#f59e0b] text-white' };
    } else {
      return { text: 'Few Spaces Left', color: 'bg-[#ef4444] text-white' };
    }
  };

  const handleViewAllFixtures = () => {
    window.location.href = '/matches';
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-[#e5e7eb] rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-[#e5e7eb] rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-6 font-montserrat">
              Upcoming Hospitality Opportunities
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
            <p className="text-lg text-[#ef4444] mb-6">
              Unable to load upcoming matches. Please try again later.
            </p>
            <button 
              onClick={handleViewAllFixtures}
              className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              View All Fixtures
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (upcomingMatches.length === 0) {
    return (
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-6 font-montserrat">
              Upcoming Hospitality Opportunities
            </h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
            <p className="text-lg text-[#4b5563] mb-6">
              No hospitality opportunities currently available. Please check back soon or contact us for future availability.
            </p>
            <button 
              onClick={handleViewAllFixtures}
              className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              View All Fixtures
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-6 font-montserrat">
            Upcoming Hospitality Opportunities
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-lg text-[#4b5563] max-w-3xl mx-auto leading-relaxed">
            Secure your place at our upcoming fixtures and experience the best matchday hospitality at Spain Park.
          </p>
        </div>

        {/* Match Cards Grid */}
        <div className={`grid gap-8 mb-12 justify-items-center ${
          upcomingMatches.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
          upcomingMatches.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
          upcomingMatches.length >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {upcomingMatches.map((match) => {
            const availability = getAvailabilityBadge(match.match_date);
            
            return (
              <div 
                key={match.id}
                className="bg-white rounded-md shadow-md border border-[#e5e7eb] overflow-hidden w-full max-w-md hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="bg-[#00105A] px-4 py-4 flex justify-between items-center">
                  <div className="text-xs font-medium text-white truncate">
                    {match.competition_short || match.competition}
                  </div>
                  <div className={`text-[10px] px-2 py-0.5 rounded font-medium ${availability.color}`}>
                    {availability.text}
                  </div>
                </div>
                
                {/* Teams - No background, proper URLs */}
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-center mb-10">
                    {/* Home team - No background */}
                    <div className="text-center w-5/12">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        {match.home_team_logo ? (
                          <img 
                            src={buildLogoUrl(match.home_team_logo)}
                            alt={match.home_team} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-[#6b7280] font-semibold text-sm">
                            {getInitials(match.home_team)}
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-sm text-[#00105A] leading-tight">{match.home_team}</div>
                    </div>
                    
                    {/* VS */}
                    <div className="text-center w-2/12">
                      <div className="text-xl font-bold text-[#6b7280]">VS</div>
                    </div>
                    
                    {/* Away team - No background */}
                    <div className="text-center w-5/12">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        {match.away_team_logo ? (
                          <img 
                            src={buildLogoUrl(match.away_team_logo)}
                            alt={match.away_team} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-[#6b7280] font-semibold text-sm">
                            {getInitials(match.away_team)}
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-sm text-[#00105A] leading-tight">{match.away_team}</div>
                    </div>
                  </div>

                  {/* Enquire Button */}
                  <button 
                    onClick={() => onEnquireClick(match.id, match.home_team, match.away_team)}
                    className="w-full bg-[#FFD700] text-[#00105A] hover:bg-[#f1c40f] py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm"
                  >
                    Enquire Now
                  </button>
                </div>
                
                {/* Footer */}
                <div className="px-4 py-4 bg-[#f9fafb] border-t border-[#e5e7eb] flex justify-between">
                  <div className="flex items-center text-[#6b7280] text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(match.match_date)}</span>
                    {match.match_time && <span> • {formatTime(match.match_time)}</span>}
                  </div>
                  
                  <div className="flex items-center text-[#6b7280] text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate max-w-[80px]">{match.venue || 'Spain Park'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Fixtures CTA */}
        <div className="text-center">
          <button 
            onClick={handleViewAllFixtures}
            className="bg-[#C5E7FF] text-[#00105A] hover:bg-[#00105A] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center"
          >
            View All Fixtures
            <Calendar className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
