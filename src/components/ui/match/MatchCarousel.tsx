
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

export interface MatchCarouselProps {
  fixtures: Fixture[];
  title?: string;
  matches?: any[]; // Added for backward compatibility
}

const MatchCarousel: React.FC<MatchCarouselProps> = ({ fixtures, matches, title }) => {
  // Support both fixtures and matches props for backward compatibility
  const displayFixtures = fixtures || matches || [];

  if (!displayFixtures || displayFixtures.length === 0) {
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
          {displayFixtures.map((fixture) => (
            <CarouselItem key={fixture.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <MatchCardNew
                  competition={fixture.competition}
                  date={fixture.date}
                  time={fixture.time}
                  venue={fixture.venue}
                  home={fixture.home}
                  away={fixture.away}
                  result={fixture.result}
                />
              </div>
            </CarouselItem>
          ))}
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
