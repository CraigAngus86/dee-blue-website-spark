
import React, { useState, useEffect } from "react";
import { getStadiumImage, getNewsImage, getTeamImage } from "@/lib/imageUtils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";

interface HeroSectionProps {
  title: string;
  category: string;
  timestamp: string;
  backgroundImage?: string;
  slides?: { 
    image: string; 
    title: string;
    category: string;
    timestamp: string;
  }[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  category,
  timestamp,
  backgroundImage = getStadiumImage(),
  slides
}) => {
  // If slides are provided, use them; otherwise create a single slide from props
  const heroSlides = slides || [
    { image: backgroundImage, title, category, timestamp },
    { image: getTeamImage(0), title: "Squad Prepares for Highland League Cup", category: "TEAM NEWS", timestamp: "2 days ago" },
    { image: getNewsImage(1), title: "Youth Academy Announces New Intake", category: "ACADEMY", timestamp: "4 days ago" }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto rotate slides
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  
  return (
    <div className="relative">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <ResponsiveImage
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 min-h-[70vh] md:min-h-[70vh] sm:min-h-[50vh] flex flex-col justify-end">
        <div className="container mx-auto px-4 md:px-6 pb-24">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
                <span className="inline-block border-b-4 border-accent pb-2">{slide.title}</span>
              </h1>
              
              <div className="flex items-center text-white text-sm md:text-base">
                <span className="bg-primary px-2 py-1 mr-4 font-semibold">{slide.category}</span>
                <span>{slide.timestamp}</span>
              </div>
            </div>
          ))}
          
          {/* Slide Indicators */}
          {heroSlides.length > 1 && (
            <div className="flex space-x-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-white" : "bg-white/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
