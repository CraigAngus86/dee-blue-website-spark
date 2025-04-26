
import React from "react";
import Container from "../../components/ui/layout/Container";
import Section from "../../components/ui/layout/Section";
import Heading from "../../components/ui/typography/Heading";
import Text from "../../components/ui/typography/Text";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SponsorsShowcase from "../../components/ui/image/SponsorsShowcase";
import SponsorLogo from "../../components/ui/image/SponsorLogo";
import SectionHero from "../../components/ui/hero/SectionHero";
import { sponsors, getMainSponsor } from "../../data/SponsorsData";

const SponsorsDemo = () => {
  const mainSponsor = getMainSponsor();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <SectionHero 
          backgroundSrc="https://placehold.co/1920x600/00105A/FFFFFF" 
          title="Our Sponsors"
          subtitle="The partners who make success possible"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Club", href: "/club" },
            { label: "Sponsors", href: "/sponsors" }
          ]}
        />
        
        {/* Main Sponsor */}
        {mainSponsor && (
          <Section background="light">
            <Container size="md">
              <div className="text-center">
                <Heading level={2} className="mb-4">
                  Main Club Partner
                </Heading>
                <Text size="large" className="mb-8">
                  We're proud to partner with {mainSponsor.name} as our main club sponsor.
                </Text>
                <div className="flex justify-center">
                  <SponsorLogo 
                    sponsor={mainSponsor} 
                    size="xl"
                    useContainer={true} 
                    containerClassName="px-10 py-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
              </div>
            </Container>
          </Section>
        )}
        
        {/* Featured Layout */}
        <Section>
          <Container>
            <Heading level={2} className="mb-6 text-center">Our Sponsors</Heading>
            <Text className="text-center mb-12 max-w-2xl mx-auto">
              Banks o' Dee FC would like to thank all our sponsors for their continued support. 
              Their commitment helps us achieve our goals both on and off the pitch.
            </Text>
            
            <SponsorsShowcase 
              sponsors={sponsors} 
              layout="featured" 
              className="mb-16"
            />
          </Container>
        </Section>
        
        {/* Carousel Layout */}
        <Section background="light">
          <Container>
            <Heading level={3} className="mb-6 text-center">Our Supporters</Heading>
            <Text className="text-center mb-8">
              Browse through the businesses that support Banks o' Dee FC
            </Text>
            
            <SponsorsShowcase 
              sponsors={sponsors} 
              layout="carousel"
            />
          </Container>
        </Section>
        
        {/* Grid Layout */}
        <Section>
          <Container size="md">
            <Heading level={3} className="mb-6 text-center">All Partners</Heading>
            <SponsorsShowcase 
              sponsors={sponsors} 
              layout="grid"
            />
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SponsorsDemo;
