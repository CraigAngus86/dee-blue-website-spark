'use client';
import React from 'react';
import Link from 'next/link';
import { Player } from '../types';
import PlayerCard from './PlayerCard';
import SectionHeader from '@/components/ui/sections/SectionHeader';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface PlayersSectionProps {
  players: Player[];
  title?: string;
  subtitle?: string;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({
  players,
  title = "Our Squad",
  subtitle = "Meet the players representing Banks o' Dee FC"
}) => {
  const handlePlayerClick = (player: Player) => {
    // TODO: Open PersonDetailsModal or navigate to player page
    console.log('Player clicked:', player.firstName, player.lastName);
  };

  return (
    <section className="py-20 bg-[#f5f7fb]">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={title}
          subtitle={subtitle}
        />
        
        <div className="mt-16">
          <Carousel className="w-full">
            <CarouselContent className="-ml-6">
              {players.map((player) => (
                <CarouselItem 
                  key={player._id} 
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="w-full max-w-sm mx-auto">
                    <PlayerCard 
                      player={player}
                      onClick={() => handlePlayerClick(player)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-[#00105A] hover:text-[#FFD700] -left-4" />
            <CarouselNext className="text-[#00105A] hover:text-[#FFD700] -right-4" />
          </Carousel>
        </div>
        
        {/* Simple CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/team" 
            className="text-[#00105A] hover:text-[#FFD700] font-medium transition-colors text-lg"
          >
            View Full Squad →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlayersSection;
