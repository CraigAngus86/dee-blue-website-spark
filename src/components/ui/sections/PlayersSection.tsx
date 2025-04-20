
import React, { useMemo } from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import PlayersCarousel from "@/components/ui/players/PlayersCarousel";
import PatternOverlay from "@/components/ui/backgrounds/PatternOverlay";
import { teamData } from "@/mock-data/team";
import { type Player } from "@/lib/types";
import { type TeamMember } from "@/mock-data/team";

const PlayersSection: React.FC = () => {
  // Convert TeamMember to Player type and get all players
  const allPlayers = useMemo(() => {
    const players: Player[] = [
      ...teamData.forwards,
      ...teamData.midfielders,
      ...teamData.defenders,
      ...teamData.goalkeepers
    ].map((member: TeamMember) => ({
      id: member.id.toString(),
      name: member.name,
      firstName: member.firstName,
      lastName: member.lastName,
      position: member.position,
      image: member.image,
      isAcademy: false
    }));

    // Shuffle the players array
    return players.sort(() => Math.random() - 0.5).slice(0, 6);
  }, []);

  return (
    <Section 
      className="relative overflow-hidden"
      spacing="lg"
    >
      {/* Background with navy blue */}
      <div className="absolute inset-0 bg-[#00105A]">
        <PatternOverlay pattern="dots" opacity={0.05} />
      </div>
      
      <Container className="relative z-10">
        <SectionHeader 
          title="Players" 
          textColor="white"
          viewAllLink="/team"
          viewAllText="View Squad"
        />
        
        <PlayersCarousel players={allPlayers} />
      </Container>
    </Section>
  );
};

export default PlayersSection;
