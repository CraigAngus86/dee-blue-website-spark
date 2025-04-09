
import React from 'react';
import { useNavigate } from "react-router-dom";
import MainHero from '@/components/ui/hero/MainHero';
import FeaturedMatch from '@/components/ui/sections/FeaturedMatch';
import OverlappingNewsCards from '@/components/ui/sections/OverlappingNewsCards';
import LeagueTableWidget from '@/components/ui/sections/LeagueTableWidget';
import PhotoGallery from '@/components/ui/image/PhotoGallery';
import { galleryImages } from '@/mock-data/galleryData';
import FanZoneSection from '@/components/ui/fan/FanZoneSection';
import SocialMediaSection from '@/components/ui/sections/SocialMediaSection';
import NewsletterSection from '@/components/ui/sections/NewsletterSection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const heroConfig = {
    title: "Banks o' Dee FC",
    subtitle: "Scottish Highland Football League",
    ctaText: "View Upcoming Fixtures",
    ctaAction: () => navigate('/fixtures'),
    backgroundSrc: "/assets/images/stadium/Spain Park.jpg",
    overlayOpacity: 0.5,
  };

  return (
    <div className="min-h-screen bg-white">
      <MainHero {...heroConfig} />
      <FeaturedMatch />
      <OverlappingNewsCards />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12">
          <PhotoGallery images={galleryImages.slice(0, 5)} />
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
