
import React from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import SocialFeedGrid from "@/components/ui/social/SocialFeedGrid";
import SocialCTA from "@/components/ui/social/SocialCTA";

const SocialMediaSection: React.FC = () => {
  return (
    <Section
      className="relative overflow-hidden"
      spacing="lg"
      background="white"
    >
      <Container className="relative z-10">
        <SectionHeader 
          title="Follow Us" 
          viewAllLink="https://twitter.com/BanksODeeFC"
          viewAllText="See More"
        />
        
        <SocialFeedGrid />
        <SocialCTA />
      </Container>
    </Section>
  );
};

export default SocialMediaSection;
