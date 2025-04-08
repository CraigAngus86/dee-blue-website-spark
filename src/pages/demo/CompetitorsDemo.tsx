
import React from "react";
import Container from "../../components/ui/layout/Container";
import Section from "../../components/ui/layout/Section";
import Heading from "../../components/ui/typography/Heading";
import Text from "../../components/ui/typography/Text";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SectionHero from "../../components/ui/hero/SectionHero";
import CompetitorLogo from "../../components/ui/image/CompetitorLogo";
import { competitors } from "@/data/CompetitorsData";

const CompetitorsDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <SectionHero 
          backgroundSrc="https://placehold.co/1920x600/00105A/FFFFFF" 
          title="Our Competitors"
          subtitle="Highland League Clubs"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Demo", href: "/demo" },
            { label: "Competitors", href: "/demo/competitors" }
          ]}
        />
        
        <Section>
          <Container>
            <Heading level={2} className="mb-6 text-center">Highland League Clubs</Heading>
            <Text className="text-center mb-12 max-w-2xl mx-auto">
              Banks o' Dee FC competes against these clubs in the Highland Football League and various cup competitions.
            </Text>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {competitors.map((competitor) => (
                <div key={competitor.name} className="flex flex-col items-center">
                  <CompetitorLogo
                    name={competitor.name}
                    logoSrc={competitor.logo}
                    size="lg"
                    showName={true}
                    href={competitor.website}
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompetitorsDemo;
