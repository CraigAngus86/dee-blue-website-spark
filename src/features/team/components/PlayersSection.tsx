import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SectionHeader from '@/components/ui/sections/SectionHeader';

interface PlayersSectionProps {
  title: string;
  subtitle?: string;
  players: Array<{
    id: string;
    name: string;
    position: string;
    imageUrl?: string;
  }>;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({
  title,
  subtitle,
  players
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={title}
          subtitle={subtitle}
        />
        
        <div className="mt-8">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {players.map((player) => (
                <CarouselItem key={player.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Link href={`/team/player/${player.id}`}>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square relative bg-gray-100">
                        {player.imageUrl ? (
                          <Image
                            src={player.imageUrl}
                            alt={player.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{player.name}</h3>
                        <p className="text-sm text-gray-500">{player.position}</p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/team" 
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            View All Players
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlayersSection;
