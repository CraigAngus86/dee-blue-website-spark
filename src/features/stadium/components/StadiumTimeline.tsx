"use client";
import React, { useState, useEffect } from 'react';
import { StadiumData, TimelineMilestone } from '../hooks/useStadiumData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StadiumTimelineProps {
  data: StadiumData | null;
}

export function StadiumTimeline({ data }: StadiumTimelineProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Initialize activeYear when data loads
  useEffect(() => {
    if (data?.timeline && !activeYear) {
      setActiveYear(data.timeline[0]?.year || 1902);
      // Preload first few images
      preloadImages();
    }
  }, [data, activeYear]);

  // Preload images for smooth transitions
  const preloadImages = () => {
    if (!data?.timeline) return;
    
    data.timeline.slice(0, 3).forEach(milestone => {
      const img = new Image();
      img.src = buildTimelineImageUrl(milestone.heroImage.asset.public_id);
      img.onload = () => {
        setPreloadedImages(prev => new Set([...Array.from(prev), milestone.heroImage.asset.public_id]));
      };
    });
  };

  if (!data?.timeline || data.timeline.length === 0) {
    return (
      <section className="py-16 bg-[#f9fafb]">
        <div className="text-center">
          <p>No timeline data available</p>
        </div>
      </section>
    );
  }

  const activeMilestone = data.timeline.find(m => m.year === activeYear);
  const currentIndex = data.timeline.findIndex(m => m.year === activeYear);
  const hoveredMilestone = data.timeline.find(m => m.year === hoveredYear);

  // Build Cloudinary URL with timeline-specific transformation - REVERTED to working version
  const buildTimelineImageUrl = (publicId: string, transformation?: string): string => {
    const baseUrl = "https://res.cloudinary.com/dlkpaw2a0/image/upload";
    const defaultTransform = "c_fill,g_auto:subject,ar_21:9,q_auto:good,f_auto,e_sharpen";
    return `${baseUrl}/${transformation || defaultTransform}/${publicId}`;
  };

  // Enhanced navigation with image preloading
  const goToPrevious = () => {
    const currentIdx = data.timeline.findIndex(m => m.year === activeYear);
    if (currentIdx > 0) {
      handleYearTransition(data.timeline[currentIdx - 1].year);
    }
  };

  const goToNext = () => {
    const currentIdx = data.timeline.findIndex(m => m.year === activeYear);
    if (currentIdx < data.timeline.length - 1) {
      handleYearTransition(data.timeline[currentIdx + 1].year);
    }
  };

  const handleYearTransition = (year: number) => {
    setImageLoading(true);
    setIsExpanded(false);
    
    // Smooth transition delay
    setTimeout(() => {
      setActiveYear(year);
      setImageLoading(false);
    }, 300);

    // Preload next image
    const yearIndex = data.timeline.findIndex(m => m.year === year);
    if (yearIndex < data.timeline.length - 1) {
      const nextMilestone = data.timeline[yearIndex + 1];
      const img = new Image();
      img.src = buildTimelineImageUrl(nextMilestone.heroImage.asset.public_id);
    }
  };

  // Calculate progress line position
  const calculateProgressPosition = () => {
    const totalDots = data.timeline.length;
    const activeIndex = data.timeline.findIndex(m => m.year === activeYear);
    return (activeIndex / (totalDots - 1)) * 100;
  };

  if (!activeMilestone) {
    return null;
  }

  return (
    <section className="py-16 bg-[#f9fafb] overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#00105A] mb-4 animate-fade-in">
          Stadium Timeline
        </h2>
        <p className="text-lg text-[#374151] max-w-3xl mx-auto animate-fade-in-delay">
          Explore the history and development of Spain Park through the years
        </p>
      </div>

      {/* Enhanced Hero Image Area with Crossfade & Ken Burns */}
      <div className="relative h-[400px] mb-12 overflow-hidden rounded-xl shadow-2xl mx-4 md:mx-8">
        {/* Background Images with Crossfade - REVERTED to working version */}
        <div className="absolute inset-0">
          {data.timeline.map((milestone) => (
            <div
              key={milestone.year}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                milestone.year === activeYear 
                  ? 'opacity-100 scale-105' 
                  : 'opacity-0 scale-100'
              }`}
              style={{
                backgroundImage: `url(${buildTimelineImageUrl(milestone.heroImage.asset.public_id)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: milestone.year === activeYear ? 'kenBurns 20s ease-out infinite alternate' : 'none'
              }}
            />
          ))}
        </div>

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/40 via-transparent to-[#00105A]/20"></div>
        
        {/* Loading Overlay */}
        {imageLoading && (
          <div className="absolute inset-0 bg-[#00105A]/20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Enhanced Navigation Arrows */}
        <button 
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 backdrop-blur-sm bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30 ${
            currentIndex === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:shadow-xl'
          }`}
        >
          <ChevronLeft className="w-7 h-7 text-white drop-shadow-lg" />
        </button>

        <button 
          onClick={goToNext}
          disabled={currentIndex === data.timeline.length - 1}
          className={`absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 backdrop-blur-sm bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/30 ${
            currentIndex === data.timeline.length - 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:shadow-xl'
          }`}
        >
          <ChevronRight className="w-7 h-7 text-white drop-shadow-lg" />
        </button>

        {/* Hover Preview */}
        {hoveredMilestone && hoveredYear !== activeYear && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
            {hoveredMilestone.year}: {hoveredMilestone.title}
          </div>
        )}
      </div>

      {/* Premium Timeline Navigation with Animated Progress Line */}
      <div className="relative px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Track */}
          <div className="relative">
            <div className="absolute top-2 left-0 right-0 h-0.5 bg-[#e5e7eb] rounded-full"></div>
            
            {/* Animated Progress Line */}
            <div 
              className="absolute top-2 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#fbbf24] rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${calculateProgressPosition()}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#FFD700] rounded-full shadow-lg animate-pulse"></div>
            </div>
          </div>

          {/* Timeline Dots */}
          <div className="flex justify-between items-center relative">
            {data.timeline.map((milestone, index) => (
              <div key={milestone.year} className="flex flex-col items-center relative">
                <button 
                  onClick={() => handleYearTransition(milestone.year)}
                  onMouseEnter={() => setHoveredYear(milestone.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  className={`relative w-6 h-6 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-4 focus:ring-[#FFD700]/30 ${
                    milestone.year === activeYear 
                      ? 'bg-[#FFD700] shadow-xl scale-125 ring-4 ring-[#FFD700]/30' 
                      : 'bg-white border-2 border-[#d1d5db] hover:border-[#FFD700] hover:bg-[#FFD700]/10'
                  }`}
                >
                  {milestone.year === activeYear && (
                    <div className="absolute inset-0 bg-[#FFD700] rounded-full animate-ping opacity-20"></div>
                  )}
                </button>
                
                <p className={`mt-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  milestone.year === activeYear 
                    ? 'text-[#00105A] scale-110 font-bold' 
                    : 'text-[#6b7280] hover:text-[#00105A]'
                }`}>
                  {milestone.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staggered Content Animation - Mobile responsive content */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <h3 className="text-2xl md:text-3xl font-montserrat font-bold text-[#00105A] mb-6 animate-slide-up">
          {activeMilestone.title}
        </h3>
        
        {/* Desktop: Keep existing behavior with expand/collapse */}
        <div className="hidden md:block">
          <p className="text-lg text-[#374151] mb-8 leading-relaxed animate-slide-up-delay">
            {activeMilestone.description}
          </p>
          
          {/* Enhanced Read More Button */}
          {activeMilestone.expandedContent && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center text-[#00105A] font-semibold hover:text-[#FFD700] transition-all duration-300 animate-slide-up-delay-2"
            >
              <span className="mr-2">{isExpanded ? 'Read less' : 'Read more'}</span>
              <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
                {isExpanded ? '↑' : '↓'}
              </span>
            </button>
          )}

          {/* Expanded Content with Smooth Animation */}
          <div className={`overflow-hidden transition-all duration-500 ease-out ${
            isExpanded ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-6 border-t border-[#e5e7eb] text-left">
              <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
                {activeMilestone.expandedContent?.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={index} className="leading-relaxed animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Show full content directly, no expand/collapse */}
        <div className="block md:hidden">
          <div className="text-left">
            <p className="text-lg text-[#374151] mb-6 leading-relaxed">
              {activeMilestone.description}
            </p>
            
            {/* Show expanded content directly on mobile */}
            {activeMilestone.expandedContent && (
              <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
                {activeMilestone.expandedContent?.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={index} className="leading-relaxed">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1.05) translateX(0px); }
          100% { transform: scale(1.1) translateX(-10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
