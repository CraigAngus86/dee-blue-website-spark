
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/ui/typography/Heading';
import { Match } from '@/types/match';
import { Calendar } from 'lucide-react';

interface UpcomingFixturesSectionProps {
  fixtures?: Match[];
}

const UpcomingFixturesSection: React.FC<UpcomingFixturesSectionProps> = ({ 
  fixtures = [] 
}) => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Heading as="h2" size="2xl" className="mb-4">Upcoming Fixtures</Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plan your matchday hospitality for these upcoming fixtures at Spain Park
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures.length > 0 ? (
            fixtures.map((fixture) => (
              <Card key={fixture.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {fixture.competition}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      {fixture.homeTeamLogo && (
                        <img 
                          src={fixture.homeTeamLogo} 
                          alt={fixture.homeTeam} 
                          className="w-10 h-10 object-contain"
                        />
                      )}
                      <span className="font-medium">{fixture.homeTeam}</span>
                    </div>
                    <span className="font-bold">vs</span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{fixture.awayTeam}</span>
                      {fixture.awayTeamLogo && (
                        <img 
                          src={fixture.awayTeamLogo} 
                          alt={fixture.awayTeam} 
                          className="w-10 h-10 object-contain"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-1">
                    <span>{fixture.matchDate}</span>
                    {fixture.matchTime && <span> • {fixture.matchTime}</span>}
                  </div>
                  
                  <div className="text-sm font-medium">{fixture.venue}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No upcoming fixtures available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingFixturesSection;
