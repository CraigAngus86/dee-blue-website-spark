
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
      background="light"
    >
      {/* Subtle texture overlay pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003366' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Container className="relative z-10">
        <SectionHeader 
          title="Players" 
          textColor="primary"
          viewAllLink="/team"
          viewAllText="View Squad"
        />
        
        <PlayersCarousel players={allPlayers} />
      </Container>
    </Section>
  );
};

export default PlayersSection;
