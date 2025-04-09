
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
      {/* Background with light blue gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D3E4FD] via-[#D3E4FD] to-[#E7F0FD]">
        <PatternOverlay pattern="dots" opacity={0.1} />
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
