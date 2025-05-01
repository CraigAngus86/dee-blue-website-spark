
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import SectionHeader from './SectionHeader';

interface PlayersSectionProps {
  players: any[];
}

const PlayersSection: React.FC<PlayersSectionProps> = ({ players = [] }) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Featured Players" 
          subtitle="Meet the Banks o' Dee squad" 
        />
        
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {players.length > 0 ? players.map((player) => (
              <CarouselItem key={player.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Link href={`/team/player/${player.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden m-1 transform transition-transform hover:scale-105">
                    <div className="h-64 relative overflow-hidden">
                      <Image
                        src={player.image_url || "/placeholder.svg"}
                        alt={player.name}
                        fill
                        className="object-cover object-top"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-bold text-lg">{player.name}</h3>
                            <p className="text-gray-200 text-sm">{player.player_position || player.position}</p>
                          </div>
                          {player.jersey_number && (
                            <div className="bg-primary text-white font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center">
                              {player.jersey_number}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            )) : (
              <CarouselItem className="basis-full">
                <div className="p-8 text-center text-gray-500">
                  No players found
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="mr-2" />
            <CarouselNext />
          </div>
        </Carousel>
        
        <div className="text-center mt-8">
          <Link 
            href="/team" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all"
          >
            View Full Squad
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayersSection;
