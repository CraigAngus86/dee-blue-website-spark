'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Player } from '../types';
import PlayerCard from './PlayerCard';
import SectionHeader from '@/components/ui/sections/SectionHeader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface PlayersSectionProps {
  players: Player[];
  title?: string;
  subtitle?: string;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({
  players,
  title = 'Our Squad',
  subtitle = 'Meet the Baynounah SC squad',
}) => {
  // Shuffle then cap at 6 (stable per prop change)
  const featured = useMemo(() => {
    const arr = Array.isArray(players) ? [...players] : [];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(arr.length, 6));
  }, [players]);

  const hasPlayers = featured.length > 0;

  return (
    <div>
      <div className="container mx-auto px-4">
        {/* Left-aligned + tight title spacing; constrain long subtitle width */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          align="left"
          titleClassName="mb-0"
          subtitleClassName="max-w-2xl md:max-w-3xl"
        />

        <div className="mt-8">
          <Carousel className="w-full" opts={{ align: 'start', loop: false }}>
            <CarouselContent className="-ml-2 md:-ml-3">
              {hasPlayers ? (
                featured.map((player, i) => (
                  <CarouselItem
                    key={player._id}
                    className="pl-2 md:pl-3 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <div className="w-full max-w-sm mx-auto">
                      <PlayerCard player={player} priority={i === 0} />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="pl-2 md:pl-3 basis-full">
                  <div className="rounded-2xl border border-separator bg-white px-6 py-12 text-center text-text-muted">
                    No players found.
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            {hasPlayers && (
              <>
                <CarouselPrevious
                  aria-label="Previous players"
                  className="-left-4 h-11 w-11 rounded-full bg-white text-black hover:text-brand-gold shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                />
                <CarouselNext
                  aria-label="Next players"
                  className="-right-4 h-11 w-11 rounded-full bg-white text-black hover:text-brand-gold shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                />
              </>
            )}
          </Carousel>
        </div>

        {hasPlayers && (
          <div className="mt-8 text-center">
            <Link
              href="/team"
              className="text-black hover:text-brand-gold font-medium transition-colors text-lg"
            >
              View Full Squad →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersSection;
