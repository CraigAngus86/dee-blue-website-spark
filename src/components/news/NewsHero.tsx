
import React from 'react';
import { getTeamImage } from '@/lib/image/teamImages';

const NewsHero = () => {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full bg-[#00105A]">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url(${getTeamImage(0)})`,
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-[#00105A]/60 z-10"></div>
      </div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
          News
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
          Stay up to date with the latest from Banks o' Dee FC on and off the pitch
        </p>
      </div>
    </div>
  );
};

export default NewsHero;
