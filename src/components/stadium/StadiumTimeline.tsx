import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/layout/Section';
import Container from '@/components/ui/layout/Container';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import TimelineEntry from './TimelineEntry';
import TimelineExpandedContent from './TimelineExpandedContent';
import TimelineImage from './TimelineImage';
import type { TimelineEntry as TimelineEntryType } from '@/types/timeline';

interface StadiumTimelineProps {
  items: TimelineEntryType[];
}

const StadiumTimeline: React.FC<StadiumTimelineProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const scrollToActive = (index: number) => {
    if (!timelineRef.current) return;
    const timelineElement = timelineRef.current;
    const itemWidth = timelineElement.scrollWidth / items.length;
    const scrollPosition = itemWidth * index - timelineElement.clientWidth / 2 + itemWidth / 2;
    timelineElement.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToActive(activeIndex);
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <Section background="light" spacing="sm">
      <Container>
        <div className="text-center mb-4">
          <Heading level={2} color="primary" className="mb-1.5">
            Stadium Timeline
          </Heading>
          <Text size="small" className="max-w-3xl mx-auto">
            Explore the history and development of Spain Park through the years
          </Text>
        </div>
        
        <div className="mb-4">
          <TimelineImage 
            src={items[activeIndex].imageUrl} 
            alt={items[activeIndex].title} 
          />
        </div>
        
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
          
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative py-3">
              <div className="absolute top-[1.25rem] left-0 right-0 h-[0.5px] bg-[#C5E7FF]"></div>
              
              <div 
                ref={timelineRef}
                className="flex space-x-3 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide relative"
              >
                {items.map((item, index) => (
                  <TimelineEntry
                    key={item.id}
                    entry={item}
                    isActive={index === activeIndex}
                    isExpanded={item.id === expandedId}
                    onClick={() => setActiveIndex(index)}
                    onExpandToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-3 md:hidden">
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

        <TimelineExpandedContent 
          entry={items.find(item => item.id === expandedId) || null} 
        />
      </Container>
    </Section>
  );
};

export default StadiumTimeline;
