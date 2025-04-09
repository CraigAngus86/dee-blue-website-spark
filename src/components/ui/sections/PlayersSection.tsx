
import React from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import PlayersCarousel from "@/components/ui/players/PlayersCarousel";
import { players } from "@/mock-data/playersData";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";

const PlayersSection: React.FC = () => {
  return (
    <Section 
      className="relative overflow-hidden"
      spacing="lg"
    >
      {/* Background with light blue gradient instead of dark navy */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C5E7FF] via-[#E5F4FF] to-[#FFFFFF]">
        <PatternOverlay pattern="dots" opacity={0.05} />
      </div>
      
      <Container className="relative z-10">
        <SectionHeader 
          title="Players" 
          textColor="primary"
          viewAllLink="/players"
          viewAllText="View Squad"
        />
        
        <PlayersCarousel players={players} />
      </Container>
    </Section>
  );
};

export default PlayersSection;
