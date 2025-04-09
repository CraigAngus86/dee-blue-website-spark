
import React from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import Grid from "@/components/ui/layout/Grid";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import FanOfTheMonth from "@/components/ui/fan/FanOfTheMonth";
import InteractivePoll from "@/components/ui/fan/InteractivePoll";
import UserContentShowcase from "@/components/ui/fan/UserContentShowcase";

const FanZoneSection: React.FC = () => {
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
          title="Fan Zone" 
          viewAllLink="/fan-zone"
          viewAllText="View All"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-7">
            <FanOfTheMonth />
          </div>
          <div className="lg:col-span-5">
            <InteractivePoll />
          </div>
        </div>
        
        <UserContentShowcase />
      </Container>
    </Section>
  );
};

export default FanZoneSection;
