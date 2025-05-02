
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { HeroSlide } from "@/types/hero";
import FadeIn from "@/components/ui/animations/FadeIn";

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number; // Time in ms between auto transitions
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides, 
  autoPlayInterval = 6000 // Default to 6 seconds
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500); // Match this with CSS transition time
  }, []);

  const nextSlide = useCallback(() => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  }, [currentSlide, slides.length, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval <= 0 || slides.length <= 1) return;
    
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, slides.length]);

  // Format the published date as "X hrs ago" or "X days ago"
  const formatPublishedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: false }) + " ago";
    } catch (error) {
      return "";
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (!slides || slides.length === 0) {
    return (
      <div className="h-[80vh] min-h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">No slides available</p>
      </div>
    );
  }

  return (
    <div 
      className="relative h-[80vh] min-h-[500px] max-h-[800px] w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured news and matches"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide._id || index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 z-10 text-white">
            <div className="container mx-auto">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="font-semibold text-sm md:text-base uppercase tracking-wider">
                    {slide.category || "CLUB NEWS"}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white"></span>
                  <span className="text-sm md:text-base opacity-80">
                    {formatPublishedDate(slide.publishedAt)}
                  </span>
                </div>
                <FadeIn>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl font-light mb-8">
                    {slide.subtitle}
                  </h2>
                </FadeIn>
                <div className="flex items-center space-x-4 mt-4">
                  <Link href={`/news/${slide.slug?.current || '#'}`}>
                    <button className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all">
                      Read More
                    </button>
                  </Link>
                  <Link href="/news">
                    <button className="bg-transparent border-2 border-white text-white px-6 py-2.5 rounded-md font-semibold hover:bg-white hover:bg-opacity-20 transition-all">
                      All News
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Only show if more than one slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all"
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all"
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Navigation Dots - Only show if more than one slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
