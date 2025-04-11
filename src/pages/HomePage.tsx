
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
import GradientSeparator from "@/components/ui/separators/GradientSeparator";
import FadeIn from "@/components/ui/animations/FadeIn";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";
import MatchCenter from "@/components/ui/sections/MatchCenter";
import PlayersSection from "@/components/ui/sections/PlayersSection";
import SocialCTA from "@/components/ui/social/SocialCTA";

const HomePage: React.FC = () => {
  // Consistent shadow treatment for all cards
  const cardShadowStyle = {
    "--card-shadow": "0 10px 25px -5px rgba(0, 16, 90, 0.1), 0 8px 10px -6px rgba(0, 16, 90, 0.05)",
    "--card-hover-shadow": "0 20px 25px -5px rgba(0, 16, 90, 0.15), 0 10px 10px -5px rgba(0, 16, 90, 0.1)"
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col" style={cardShadowStyle}>
      <Header />
      
      <main className="flex-grow pt-[90px]">
        {/* Hero Section - ensuring text is white and gradient is applied */}
        <HeroSection 
          title="BANKS O' DEE AIMING FOR LEAGUE GLORY" 
          category="CLUB NEWS" 
          timestamp="8 hrs ago"
          backgroundImage={getNewsImage(0)}
        />
        
        {/* News Cards Section with consistent spacing */}
        <div className="py-12">
          <FadeIn>
            <OverlappingNewsCards articles={newsArticles} count={6} />
          </FadeIn>
        </div>
        
        {/* Gradient Separator with consistent spacing */}
        <GradientSeparator />
        
        {/* Match Center Section with improved spacing */}
        <Section 
          background="light"
          spacing="lg"
        >
          <FadeIn>
            <MatchCenter />
          </FadeIn>
        </Section>
        
        {/* Gradient Separator with consistent spacing */}
        <GradientSeparator />
        
        {/* Fan Zone Section with improved spacing */}
        <div className="py-12">
          <FanZoneSection />
        </div>
        
        {/* Social CTA Section */}
        <Section background="white" spacing="md">
          <SocialCTA />
        </Section>
        
        {/* Gradient Separator before Players Section */}
        <GradientSeparator />
        
        {/* Players Section with improved spacing */}
        <PlayersSection />
        
        {/* Gradient Separator before Sponsors Section */}
        <GradientSeparator />
        
        {/* Sponsors Section with improved spacing */}
        <SponsorsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
