
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { MatchCardNew } from '@/components/ui/image/MatchCardNew';
import { Fixture } from '@/lib/fixtures-data';
import { Match } from '@/types/match';

export interface MatchCarouselProps {
  fixtures?: Fixture[];
  matches?: Match[];
  type?: 'fixture' | 'result';
  title?: string;
}

export const MatchCarousel: React.FC<MatchCarouselProps> = ({ 
  fixtures, 
  matches, 
  type = 'fixture',
  title 
}) => {
  // Support both fixtures and matches props
  const displayFixtures = fixtures || [];
  const displayMatches = matches || [];
  
  // Determine which array to use based on which one has items
  const useMatches = displayMatches.length > 0;
  const itemsToDisplay = useMatches ? displayMatches : displayFixtures;

  if (itemsToDisplay.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No fixtures to display</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl font-bold mb-4">{title}</h2>
      )}
      
      <Carousel className="w-full">
        <CarouselContent>
          {useMatches ? (
            // Render matches
            displayMatches.map((match) => (
              <CarouselItem key={match.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <MatchCardNew
                    competition={match.competition.name}
                    date={match.match_date}
                    time={match.match_time?.toString() || ''}
                    venue={match.venue || ''}
                    home={match.home_team.name}
                    away={match.away_team.name}
                    result={type === 'result' ? `${match.home_score}-${match.away_score}` : undefined}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            // Render fixtures
            displayFixtures.map((fixture) => (
              <CarouselItem key={fixture.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <MatchCardNew
                    competition={fixture.competition}
                    date={fixture.date}
                    time={fixture.time}
                    venue={fixture.venue}
                    home={fixture.home.name}
                    away={fixture.away.name}
                    result={fixture.result}
                  />
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <div className="hidden sm:flex justify-end gap-2 mt-4">
          <CarouselPrevious className="relative inset-auto transform-none" />
          <CarouselNext className="relative inset-auto transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default MatchCarousel;
