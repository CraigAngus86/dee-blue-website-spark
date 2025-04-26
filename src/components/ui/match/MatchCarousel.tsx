'use client';

import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MatchCardNew from "@/components/ui/image/MatchCardNew";

interface MatchCarouselProps {
  matches: Array<any>;
}

const MatchCarousel: React.FC<MatchCarouselProps> = ({ matches }) => {
  // Find the index of the next match (first upcoming match)
  const nextMatchIndex = matches.findIndex(match => !match.isCompleted);
  
  return (
    <div className="relative">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: false, // Disable looping
          startIndex: Math.max(0, nextMatchIndex),
        }}
      >
        <CarouselContent>
          {matches.map((match, index) => (
            <CarouselItem key={match.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <MatchCardNew
                  match={match}
                  variant={match.isCompleted ? "past" : 
                    (index === nextMatchIndex ? "next" : "future")}
                  className="h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-1 bg-white hover:bg-gray-100" />
        <CarouselNext className="hidden md:flex right-1 bg-white hover:bg-gray-100" />
      </Carousel>
    </div>
  );
};

export default MatchCarousel;
