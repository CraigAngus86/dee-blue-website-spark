
import React from "react";
import HeroSection from "@/components/ui/hero/HeroSection";
import OverlappingNewsCards from "@/components/ui/sections/OverlappingNewsCards";
import { getNewsImage } from "@/lib/imageUtils";
import { newsArticles } from "@/mock-data/newsData";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Section from "@/components/ui/layout/Section";
import FanZoneSection from "@/components/ui/sections/FanZoneSection";
import SponsorsSection from "@/components/ui/sections/SponsorsSection";
import DiagonalSeparator from "@/components/ui/separators/DiagonalSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/components/ui/sections/PlayersSection";

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
      
      <main className="flex-grow pt-[72px]"> {/* Added padding to account for fixed header */}
        {/* Hero Section - ensuring text is white and gradient is applied */}
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
        
        {/* Diagonal Separator before Featured Content Section */}
        <DiagonalSeparator color="secondary" position="top" />
        
        {/* Featured Content Section - MatchCenter */}
        <Section 
          className="relative overflow-hidden"
          spacing="lg"
        >
          {/* Rich texture overlay with dark navy gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00105A] via-[#00105A]/95 to-[#000D42]">
            <PatternOverlay pattern="plus" opacity={0.1} />
          </div>
          
          <div className="relative z-10">
            <FadeIn>
              <MatchCenter />
            </FadeIn>
          </div>
        </Section>
        
        {/* Diagonal Separator after Featured Content */}
        <DiagonalSeparator color="white" position="top" />
        
        {/* Fan Zone Section */}
        <div className={sectionSpacing}>
          <FanZoneSection />
        </div>
        
        {/* Diagonal Separator before Players Section */}
        <DiagonalSeparator color="secondary" position="top" height="sm" />
        
        {/* NEW: Players Section (replacing SocialMediaSection) */}
        <PlayersSection />
        
        {/* Diagonal Separator after Players Section */}
        <DiagonalSeparator color="white" position="top" height="sm" />
        
        {/* Sponsors Section */}
        <SponsorsSection />
        
        {/* Diagonal Separator before Footer */}
        <DiagonalSeparator color="primary" position="bottom" />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
