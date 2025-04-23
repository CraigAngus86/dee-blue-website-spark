
import React, { useEffect } from 'react';
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
  const nextMatchIndex = matches.findIndex(match => !match.isCompleted);
  
  return (
    <div className="relative">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
          startIndex: Math.max(0, nextMatchIndex),
          dragFree: true
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {matches.map((match, index) => (
            <CarouselItem key={match.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <MatchCardNew
                match={match}
                variant={match.status === "upcoming" ? 
                  (index === nextMatchIndex ? "next" : "future") : 
                  "past"
                }
                className="h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-white hover:bg-gray-100" />
        <CarouselNext className="hidden md:flex -right-4 bg-white hover:bg-gray-100" />
      </Carousel>
    </div>
  );
};

export default MatchCarousel;
