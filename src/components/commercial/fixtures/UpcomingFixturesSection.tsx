
import React from 'react';
import Section from '@/components/ui/layout/Section';
import { FixturesCard } from '@/components/ui/match/FixturesCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { Match } from '@/types/match';

interface UpcomingFixturesSectionProps {
  matches: Match[];
  title?: string;
  description?: string;
}

export function UpcomingFixturesSection({
  matches,
  title = 'Upcoming Fixtures',
  description = 'Our upcoming fixtures with hospitality packages available',
}: UpcomingFixturesSectionProps) {
  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <Section background="light" spacing="lg">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle>{match.competition.name}</CardTitle>
                <CardDescription>
                  <span className="font-medium">{match.home_team.name}</span> vs <span className="font-medium">{match.away_team.name}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6 pb-4">
                <div className="grid grid-cols-3 items-center mb-6">
                  {/* Home Team Logo */}
                  <div className="flex flex-col items-center">
                    {match.home_team.logo_url && (
                      <div className="h-16 w-16 mb-2">
                        <img 
                          src={match.home_team.logo_url} 
                          alt={match.home_team.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <p className="text-center text-sm font-medium">{match.home_team.name}</p>
                  </div>
                  
                  {/* VS */}
                  <div className="flex justify-center">
                    <span className="text-lg font-medium text-slate-400">VS</span>
                  </div>
                  
                  {/* Away Team Logo */}
                  <div className="flex flex-col items-center">
                    {match.away_team.logo_url && (
                      <div className="h-16 w-16 mb-2">
                        <img 
                          src={match.away_team.logo_url} 
                          alt={match.away_team.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <p className="text-center text-sm font-medium">{match.away_team.name}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    <span>{match.match_date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    <span>{match.match_time || 'TBA'}</span>
                  </div>
                  
                  {match.venue && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                      <span>{match.venue}</span>
                    </div>
                  )}
                  
                  {match.ticket_link && (
                    <div className="flex items-center text-primary">
                      <Ticket className="h-4 w-4 mr-2" />
                      <a 
                        href={match.ticket_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Buy tickets
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default UpcomingFixturesSection;
