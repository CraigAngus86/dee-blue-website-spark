
import React from 'react';
import { useNavigate } from "react-router-dom";
import MainHero from '@/components/ui/hero/MainHero';
import FeaturedMatch from '@/components/ui/sections/FeaturedMatch';
import OverlappingNewsCards from '@/components/ui/sections/OverlappingNewsCards';
import LeagueTableWidget from '@/components/ui/sections/LeagueTableWidget';
import PhotoGallery from '@/components/ui/image/PhotoGallery';
import { matchDayGallery } from '@/mock-data/galleryData';
import FanZoneSection from '@/components/ui/fan/FanZoneSection';
import SocialMediaSection from '@/components/ui/sections/SocialMediaSection';
import NewsletterSection from '@/components/ui/sections/NewsletterSection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const heroConfig = {
    backgroundSrc: "/assets/images/stadium/Spain Park.jpg",
    backgroundAlt: "Spain Park Stadium",
    overlayOpacity: "medium" as "light" | "medium" | "heavy",
    contentPosition: "center" as "center" | "left" | "right",
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHero {...heroConfig}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4">
          Banks o&apos; Dee FC
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Scottish Highland Football League
        </p>
        <button 
          onClick={() => navigate('/fixtures')}
          className="bg-accent hover:bg-accent-dark text-primary font-semibold px-6 py-3 rounded-md transition-colors"
        >
          View Upcoming Fixtures
        </button>
      </MainHero>
      
      <FeaturedMatch />
      <OverlappingNewsCards />
      
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12">
          <PhotoGallery photos={matchDayGallery.slice(0, 5)} />
        </div>
        <div className="w-full lg:w-4/12">
          <LeagueTableWidget />
        </div>
      </div>
      
      <FanZoneSection />
      <SocialMediaSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
