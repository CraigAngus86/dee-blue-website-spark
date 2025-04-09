
import React from "react";
import HeroSection from "@/components/ui/hero/HeroSection";
import OverlappingNewsCards from "@/components/ui/sections/OverlappingNewsCards";
import FeaturedMatch from "@/components/ui/sections/FeaturedMatch";
import LeagueTableWidget from "@/components/ui/sections/LeagueTableWidget";
import { getNewsImage } from "@/lib/imageUtils";
import { newsArticles } from "@/mock-data/newsData";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Section from "@/components/ui/layout/Section";
import FanZoneSection from "@/components/ui/sections/FanZoneSection";
import SocialMediaSection from "@/components/ui/sections/SocialMediaSection";
import SponsorsSection from "@/components/ui/sections/SponsorsSection";
import WaveSeparator from "@/components/ui/separators/WaveSeparator";
import DiagonalSeparator from "@/components/ui/separators/DiagonalSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";

const HomePage: React.FC = () => {
  // Consistent shadow treatment for all cards
  const cardShadowStyle = {
    "--card-shadow": "0 10px 25px -5px rgba(0, 16, 90, 0.1), 0 8px 10px -6px rgba(0, 16, 90, 0.05)",
    "--card-hover-shadow": "0 20px 25px -5px rgba(0, 16, 90, 0.15), 0 10px 10px -5px rgba(0, 16, 90, 0.1)"
  } as React.CSSProperties;

  // Standard section spacing
  const sectionSpacing = "py-12"; // 48px top and bottom

  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection 
          title="BANKS O' DEE AIMING FOR LEAGUE GLORY" 
          category="CLUB NEWS" 
          timestamp="8 hrs ago"
          backgroundImage={getNewsImage(0)}
        />
        
        {/* News Cards Section - 6 cards in 3x2 grid */}
        <div className={sectionSpacing}>
          <FadeIn>
            <OverlappingNewsCards articles={newsArticles} count={6} />
          </FadeIn>
        </div>
        
        {/* Wave Separator before Featured Content Section */}
        <WaveSeparator color="secondary" position="top" />
        
        {/* Featured Content Section */}
        <Section 
          className="relative overflow-hidden"
          spacing="lg"
        >
          {/* Rich texture overlay with dark navy gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00105A] via-[#00105A]/95 to-[#000D42]">
            <PatternOverlay pattern="plus" opacity={0.1} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured Match */}
              <div className="lg:col-span-8">
                <FadeIn direction="left" delay={0.1}>
                  <FeaturedMatch maxMatches={3} />
                </FadeIn>
              </div>
              
              {/* League Table */}
              <div className="lg:col-span-4">
                <FadeIn direction="right" delay={0.2}>
                  <LeagueTableWidget />
                </FadeIn>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Diagonal Separator after Featured Content */}
        <DiagonalSeparator color="white" position="top" />
        
        {/* Fan Zone Section */}
        <div className={sectionSpacing}>
          <FanZoneSection />
        </div>
        
        {/* Wave Separator before Social Media Section */}
        <WaveSeparator color="secondary" position="top" height="sm" />
        
        {/* Social Media Section */}
        <SocialMediaSection />
        
        {/* Diagonal Separator after Social Media Section */}
        <DiagonalSeparator color="white" position="top" />

        {/* Sponsors Section */}
        <div className={sectionSpacing}>
          <SponsorsSection />
        </div>
        
        {/* Wave Separator before Footer */}
        <WaveSeparator color="primary" position="bottom" />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
