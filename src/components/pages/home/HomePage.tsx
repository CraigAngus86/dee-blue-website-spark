
import React from 'react';
import HeroSection from "@/components/ui/hero/HeroSection";
import OverlappingNewsCards from "@/components/ui/sections/OverlappingNewsCards";
import FanZoneSection from "@/components/ui/sections/FanZoneSection";
import SponsorsSection from "@/components/ui/sections/SponsorsSection";
import GradientSeparator from "@/components/ui/separators/GradientSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/components/ui/sections/PlayersSection";
import Section from "@/components/ui/layout/Section";
import { getNewsImage } from "@/lib/image";
import { newsArticles } from "@/mock-data/newsData";

const HomePage: React.FC = () => {
  const cardShadowStyle = {
    "--card-shadow": "0 10px 25px -5px rgba(0, 16, 90, 0.1), 0 8px 10px -6px rgba(0, 16, 90, 0.05)",
    "--card-hover-shadow": "0 20px 25px -5px rgba(0, 16, 90, 0.15), 0 10px 10px -5px rgba(0, 16, 90, 0.1)"
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      <main className="flex-grow pt-20 w-full">
        <HeroSection 
          title="BANKS O' DEE AIMING FOR LEAGUE GLORY" 
          category="CLUB NEWS" 
          timestamp="8 hrs ago"
          backgroundImage={getNewsImage(0)}
        />
        
        <div className="py-12">
          <FadeIn>
            <OverlappingNewsCards articles={newsArticles} count={6} />
          </FadeIn>
        </div>
        
        <GradientSeparator />
        
        <Section background="light" spacing="lg">
          <FadeIn>
            <MatchCenter />
          </FadeIn>
        </Section>
        
        <GradientSeparator />
        
        <div className="py-12">
          <FanZoneSection />
        </div>
        
        <GradientSeparator />
        
        <PlayersSection />
        
        <GradientSeparator />
        
        <SponsorsSection />
      </main>
    </div>
  );
};

export default HomePage;
