import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import PlayerCard from "./PlayerCard";
import { Player } from "@/lib/types";

interface PlayersCarouselProps {
  players: Player[];
}

const PlayersCarousel: React.FC<PlayersCarouselProps> = ({ players }) => {
  return (
    <div className="relative w-full">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {players.map((player) => (
            <CarouselItem key={player.id} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3 pl-4">
              <PlayerCard player={player} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary border-primary" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary border-primary" />
      </Carousel>
    </div>
  );
};

export default PlayersCarousel;

