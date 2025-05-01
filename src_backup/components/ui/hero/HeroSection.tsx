
import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  category: string;
  timestamp: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  category,
  timestamp,
  backgroundImage,
}) => {
  return (
    <div className="relative h-[80vh] min-h-[500px] max-h-[800px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 z-10 text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-3">
              <span className="font-semibold text-sm md:text-base uppercase tracking-wider">
                {category}
              </span>
              <span className="h-1 w-1 rounded-full bg-white"></span>
              <span className="text-sm md:text-base opacity-80">{timestamp}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-6 leading-tight">
              {title}
            </h1>
            <div className="flex items-center space-x-4 mt-4">
              <button className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all">
                Read More
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-2.5 rounded-md font-semibold hover:bg-white hover:bg-opacity-20 transition-all">
                All News
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
