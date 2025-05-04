
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { Match } from '@/types/match';
import { formatDate } from '@/lib/utils';

interface UpcomingFixturesSectionProps {
  matches: Match[];
}

const UpcomingFixturesSection: React.FC<UpcomingFixturesSectionProps> = ({ matches }) => {
  if (matches.length === 0) return null;
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Upcoming Fixtures</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Perfect opportunities for match sponsorships, hospitality packages, and promotional activities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matches.slice(0, 3).map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gray-50 p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {formatDate(match.match_date)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{match.match_time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col items-center">
                      <img 
                        src={match.home_team?.logo_url || '/images/logos/placeholder.png'} 
                        alt={match.home_team?.name || 'Home Team'} 
                        className="w-12 h-12 object-contain mb-2"
                      />
                      <span className="text-sm font-medium text-center">{match.home_team?.name}</span>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded font-medium">VS</span>
                      <div className="mt-1 text-xs text-gray-500">{match.competition?.short_name}</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <img 
                        src={match.away_team?.logo_url || '/images/logos/placeholder.png'} 
                        alt={match.away_team?.name || 'Away Team'} 
                        className="w-12 h-12 object-contain mb-2"
                      />
                      <span className="text-sm font-medium text-center">{match.away_team?.name}</span>
                    </div>
                  </div>
                  
                  {match.venue && (
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{match.venue}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="text-sm" size="sm">
                      Match Sponsorship
                    </Button>
                    {match.ticket_link ? (
                      <Button className="text-sm flex items-center justify-center" size="sm">
                        <Ticket className="h-4 w-4 mr-1" />
                        Buy Tickets
                      </Button>
                    ) : (
                      <Button className="text-sm" size="sm">
                        Hospitality
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {matches.length > 3 && (
          <div className="text-center mt-8">
            <Button variant="outline">View All Fixtures</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingFixturesSection;
