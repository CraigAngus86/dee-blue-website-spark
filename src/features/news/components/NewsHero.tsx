import React from 'react';

interface NewsHeroProps {
  title?: string;
  subtitle?: string;
}

const NewsHero: React.FC<NewsHeroProps> = ({
  title = "Latest News",
  subtitle = "Stay up to date with all the latest from Banks o' Dee FC"
}) => {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full bg-[#00105A]">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0" 
        style={{ 
          backgroundImage: `url(/assets/images/news/news-hero.jpg)`,
          backgroundPosition: "center"
        }}
      />
      
      <div className="absolute inset-0 bg-[#00105A] opacity-60 z-10"></div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-inter">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default NewsHero;