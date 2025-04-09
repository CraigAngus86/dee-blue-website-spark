
import React, { useState, useEffect } from "react";
import { getStadiumImage, getNewsImage, getTeamImage } from "@/lib/imageUtils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import Text from "@/components/ui/typography/Text";
import Heading from "@/components/ui/typography/Heading";

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
          {/* Enhanced gradient overlay with texture for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent">
            {/* Subtle texture overlay for depth */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 5v1H0V0h5z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '8px 8px',
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Content - Centered text with improved typography */}
      <div className="relative z-10 min-h-[70vh] md:min-h-[70vh] sm:min-h-[50vh] flex flex-col justify-end">
        <div className="container mx-auto px-4 md:px-6 pb-24 text-center">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <Heading 
                level={1}
                color="white"
                weight="extrabold"
                className="mb-4 mx-auto max-w-4xl shadow-text border-b-4 border-accent pb-2 inline-block"
              >
                {slide.title}
              </Heading>
              
              <div className="flex items-center justify-center text-white text-sm md:text-base space-x-4">
                <span className="bg-primary px-3 py-1.5 font-semibold shadow-md">{slide.category}</span>
                <Text size="medium" weight="medium" color="white" className="tracking-wide">
                  {slide.timestamp}
                </Text>
              </div>
            </div>
          ))}
          
          {/* Slide Indicators - Centered with improved styling */}
          {heroSlides.length > 1 && (
            <div className="flex justify-center space-x-3 mt-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all shadow-md ${
                    index === currentSlide 
                      ? "bg-white scale-110" 
                      : "bg-white/40 hover:bg-white/60"
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
