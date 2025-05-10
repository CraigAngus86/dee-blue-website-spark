import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSlide } from '@/types/hero';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the client-side carousel component
const CarouselComponent = dynamic(
  () => import('@/components/home/HeroSlider'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[80vh] min-h-[500px] bg-gray-100 animate-pulse">
        <div className="w-full h-full bg-gradient-to-t from-primary/30 to-transparent flex items-center justify-center">
          <Skeleton className="h-20 w-3/4 max-w-2xl bg-gray-200" />
        </div>
      </div>
    )
  }
);

interface HeroSliderProps {
  slides: HeroSlide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  return (
    <section aria-labelledby="hero-heading">
      <div className="sr-only" id="hero-heading">Featured News and Matches</div>
      <CarouselComponent slides={slides} />
    </section>
  );
};

export default HeroSlider;