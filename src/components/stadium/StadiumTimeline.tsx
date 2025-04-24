
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/layout/Section';
import Container from '@/components/ui/layout/Container';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface StadiumTimelineProps {
  items: TimelineEntry[];
}

const StadiumTimeline: React.FC<StadiumTimelineProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  // Check if we're on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const scrollToActive = (index: number) => {
    if (!timelineRef.current) return;
    
    const timelineElement = timelineRef.current;
    const itemWidth = timelineElement.scrollWidth / items.length;
    const scrollPosition = itemWidth * index - timelineElement.clientWidth / 2 + itemWidth / 2;
    
    timelineElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Scroll to active item when it changes
  useEffect(() => {
    scrollToActive(activeIndex);
  }, [activeIndex]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If the touch movement is significant
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go next
        handleNext();
      } else {
        // Swipe right, go prev
        handlePrev();
      }
    }
  };

  return (
    <Section background="light" spacing="lg">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} color="primary" className="mb-4">Stadium Timeline</Heading>
          <Text size="large" className="max-w-3xl mx-auto">
            Explore the history and development of Spain Park through the years
          </Text>
        </div>
        
        {/* Desktop & Mobile Navigation Arrows */}
        <div className="relative">
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-16 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous timeline item"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={activeIndex === items.length - 1}
            className="absolute right-0 top-1/2 transform -translate-y-16 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next timeline item"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Timeline Content */}
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Current Timeline Image */}
            <div className="relative w-full h-64 md:h-80 mb-12 overflow-hidden rounded-lg shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                style={{ backgroundImage: `url(${items[activeIndex]?.imageUrl || '/placeholder.svg'})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00105A]/50" />
            </div>
            
            {/* Timeline Track */}
            <div className="relative py-8">
              {/* The timeline line */}
              <div className="absolute top-[2.5rem] left-0 right-0 h-1 bg-[#C5E7FF]"></div>
              
              {/* Timeline points with years */}
              <div 
                ref={timelineRef}
                className="flex space-x-4 md:space-x-8 overflow-x-auto pb-8 hide-scrollbar relative"
              >
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex-shrink-0 flex flex-col items-center transition-transform duration-300 ${
                      index === activeIndex ? 'scale-110' : 'opacity-70'
                    }`}
                    style={{ width: isMobile ? '80%' : '200px' }}
                  >
                    <button
                      onClick={() => setActiveIndex(index)}
                      className={`w-5 h-5 rounded-full mb-4 transition-all duration-300 flex items-center justify-center ${
                        index === activeIndex 
                          ? 'bg-accent border-2 border-accent scale-125' 
                          : 'bg-white border border-[#C5E7FF]'
                      }`}
                      aria-label={`Go to ${item.year}: ${item.title}`}
                    >
                      {index < activeIndex && <div className="w-2 h-2 rounded-full bg-[#00105A]" />}
                    </button>
                    
                    <div className="text-center">
                      <Text size="large" weight="bold" className="text-primary">
                        {item.year}
                      </Text>
                      <Heading level={4} className="mt-2 mb-3">
                        {item.title}
                      </Heading>
                      <Text size="small" color="muted" className="line-clamp-3">
                        {item.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicator Dots (Mobile/Tablet) */}
        <div className="flex justify-center mt-6 md:hidden">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === activeIndex ? 'bg-accent' : 'bg-[#C5E7FF]'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to timeline item ${index + 1}`}
            />
          ))}
        </div>
      </Container>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Section>
  );
};

export default StadiumTimeline;
