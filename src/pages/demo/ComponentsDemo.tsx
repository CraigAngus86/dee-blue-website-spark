
import React from "react";
import Container from "../../components/ui/layout/Container";
import Section from "../../components/ui/layout/Section";
import Heading from "../../components/ui/typography/Heading";
import Text from "../../components/ui/typography/Text";
import { ButtonNew } from "../../components/ui/ButtonNew";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import MainHero from "../../components/ui/hero/MainHero";
import SectionHero from "../../components/ui/hero/SectionHero";
import ColorDemo from "../../components/demo/ColorDemo";
import TypographyDemo from "../../components/demo/TypographyDemo";
import ButtonDemo from "../../components/demo/ButtonDemo";
import CardDemo from "../../components/demo/CardDemo";
import { ArrowRight, ChevronRight } from "lucide-react";

const ComponentsDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <MainHero 
          backgroundSrc="https://placehold.co/1920x1080/00105A/FFFFFF"
          backgroundAlt="Banks o' Dee FC Stadium"
          overlayOpacity="light"
          contentPosition="center"
        >
          <div className="animate-fade-in">
            <Text color="white" size="small" weight="medium" className="uppercase tracking-wider mb-2">
              Banks o' Dee FC Design System
            </Text>
            <Heading level={1} color="white" className="text-display mb-6">
              Component Library
            </Heading>
            <Text color="white" size="large" className="max-w-xl mb-8">
              A comprehensive collection of UI components built for the Banks o' Dee FC premium website experience.
            </Text>
            <div className="flex flex-wrap gap-4">
              <ButtonNew 
                variant="accent" 
                size="lg" 
                iconRight={<ChevronRight />}
              >
                Explore Components
              </ButtonNew>
              <ButtonNew 
                variant="secondary" 
                size="lg"
              >
                Design Guidelines
              </ButtonNew>
            </div>
          </div>
        </MainHero>
        
        {/* Introduction */}
        <Section>
          <Container size="md">
            <div className="text-center">
              <Heading level={2} className="mb-4">
                Building Blocks for a Premium Experience
              </Heading>
              <Text size="large" className="mb-8">
                This component library showcases the core UI elements designed for Banks o' Dee FC's premium website. 
                Each component follows our design principles of visual impact, clarity, and sophistication.
              </Text>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 border border-medium-gray rounded-lg hover:border-primary transition-colors">
                <Heading level={4} className="mb-2">Design System</Heading>
                <Text size="small" className="mb-4">
                  Our comprehensive design tokens and system foundations.
                </Text>
                <ButtonNew variant="tertiary" size="sm" iconRight={<ArrowRight size={16} />}>
                  View Colors
                </ButtonNew>
              </div>
              
              <div className="p-6 border border-medium-gray rounded-lg hover:border-primary transition-colors">
                <Heading level={4} className="mb-2">Base Components</Heading>
                <Text size="small" className="mb-4">
                  Essential interface elements like buttons, cards, and typography.
                </Text>
                <ButtonNew variant="tertiary" size="sm" iconRight={<ArrowRight size={16} />}>
                  Explore Components
                </ButtonNew>
              </div>
              
              <div className="p-6 border border-medium-gray rounded-lg hover:border-primary transition-colors">
                <Heading level={4} className="mb-2">Layout Components</Heading>
                <Text size="small" className="mb-4">
                  Structural elements like headers, heroes, and sections.
                </Text>
                <ButtonNew variant="tertiary" size="sm" iconRight={<ArrowRight size={16} />}>
                  See Layouts
                </ButtonNew>
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Inner Page Hero Example */}
        <SectionHero 
          backgroundSrc="https://placehold.co/1920x600/00105A/FFFFFF" 
          title="Component Categories"
          subtitle="Explore the different component categories in our design system"
          breadcrumbs={[
            { label: "Design System", href: "/design-system" },
            { label: "Components", href: "/components" }
          ]}
        />
        
        {/* Component Categories */}
        <Section>
          <Container>
            <ColorDemo />
            <hr className="my-24 border-medium-gray" />
            <TypographyDemo />
            <hr className="my-24 border-medium-gray" />
            <ButtonDemo />
            <hr className="my-24 border-medium-gray" />
            <CardDemo />
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComponentsDemo;
