
import React from "react";
import Heading from "../ui/typography/Heading";
import Text from "../ui/typography/Text";
import Container from "../ui/layout/Container";
import Section from "../ui/layout/Section";
import { ButtonNew } from "../ui/ButtonNew";
import { Mail, ArrowRight, ChevronRight } from "lucide-react";

const ButtonDemo: React.FC = () => {
  return (
    <Section spacing="xl">
      <Container>
        <Heading level={1} className="mb-12">Button System</Heading>
        
        <div className="space-y-16">
          {/* Button Variants - Updated with correct brand colors */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Button Variants</Heading>
            <div className="flex flex-wrap gap-4 items-center">
              <ButtonNew variant="primary">Primary Button</ButtonNew>
              <ButtonNew variant="secondary">Secondary Button</ButtonNew>
              <ButtonNew variant="tertiary">Tertiary Button</ButtonNew>
              <ButtonNew variant="accent">Accent Button</ButtonNew>
              <ButtonNew variant="accent" className="bg-accent">Accent Hover</ButtonNew>
            </div>
            
            <Text className="mt-6">
              Each variant is designed for different levels of emphasis within the interface.
            </Text>
          </div>
          
          {/* Button Sizes */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Button Sizes</Heading>
            <div className="flex flex-wrap gap-4 items-center">
              <ButtonNew variant="primary" size="sm">Small Button</ButtonNew>
              <ButtonNew variant="primary" size="md">Medium Button</ButtonNew>
              <ButtonNew variant="primary" size="lg">Large Button</ButtonNew>
            </div>
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <ButtonNew variant="secondary" size="sm">Small Button</ButtonNew>
              <ButtonNew variant="secondary" size="md">Medium Button</ButtonNew>
              <ButtonNew variant="secondary" size="lg">Large Button</ButtonNew>
            </div>
          </div>
          
          {/* Buttons with Icons */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Buttons with Icons</Heading>
            <div className="flex flex-wrap gap-4 items-center">
              <ButtonNew variant="primary" iconLeft={<Mail />}>Email Us</ButtonNew>
              <ButtonNew variant="primary" iconRight={<ArrowRight />}>Learn More</ButtonNew>
              <ButtonNew variant="secondary" iconLeft={<Mail />}>Contact</ButtonNew>
              <ButtonNew variant="secondary" iconRight={<ArrowRight />}>View Details</ButtonNew>
              <ButtonNew variant="accent" iconRight={<ChevronRight />}>Buy Tickets</ButtonNew>
            </div>
          </div>
          
          {/* Button States */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Button States</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <Text weight="medium">Default</Text>
                <ButtonNew variant="primary">Primary Button</ButtonNew>
                <Text size="small" color="muted">Normal state</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Hover (simulated)</Text>
                <ButtonNew variant="primary" className="bg-secondary-dark">Primary Button</ButtonNew>
                <Text size="small" color="muted">When user hovers over button</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Focus (simulated)</Text>
                <ButtonNew variant="primary" className="ring-2 ring-secondary ring-offset-2">Primary Button</ButtonNew>
                <Text size="small" color="muted">When button receives keyboard focus</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Disabled</Text>
                <ButtonNew variant="primary" disabled>Primary Button</ButtonNew>
                <Text size="small" color="muted">When button is disabled</Text>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <div className="space-y-3">
                <Text weight="medium">Default</Text>
                <ButtonNew variant="accent">Accent Button</ButtonNew>
                <Text size="small" color="muted">White with gold border</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Hover (simulated)</Text>
                <ButtonNew variant="accent" className="bg-accent">Accent Button</ButtonNew>
                <Text size="small" color="muted">Gold fill on hover</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Active (simulated)</Text>
                <ButtonNew variant="accent" className="bg-accent-dark">Accent Button</ButtonNew>
                <Text size="small" color="muted">Darker gold when pressed</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Disabled</Text>
                <ButtonNew variant="accent" disabled>Accent Button</ButtonNew>
                <Text size="small" color="muted">When button is disabled</Text>
              </div>
            </div>
          </div>
          
          {/* Button Usage Guidelines - Updated with refined guidelines */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Button Usage Guidelines</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Heading level={3}>Primary Buttons</Heading>
                <Text>Primary buttons use light blue with navy text for standard actions and interactive elements.</Text>
                <div className="mt-2">
                  <ButtonNew variant="primary">Main Action</ButtonNew>
                </div>
              </div>
              <div className="space-y-4">
                <Heading level={3}>Secondary Buttons</Heading>
                <Text>Secondary buttons use white background with navy text and light blue border for less emphasized actions.</Text>
                <div className="mt-2">
                  <ButtonNew variant="secondary">Secondary Action</ButtonNew>
                </div>
              </div>
              <div className="space-y-4">
                <Heading level={3}>Tertiary Buttons</Heading>
                <Text>Tertiary buttons are text-only with navy color for subtle actions, space saving, and dense interfaces.</Text>
                <div className="mt-2">
                  <ButtonNew variant="tertiary">Subtle Action</ButtonNew>
                </div>
              </div>
              <div className="space-y-4">
                <Heading level={3}>Accent Buttons</Heading>
                <Text>Accent buttons use white with gold border (gold fill on hover) reserved for the most important call-to-action buttons only.</Text>
                <div className="mt-2 flex gap-4">
                  <ButtonNew variant="accent">Buy Tickets</ButtonNew>
                  <ButtonNew variant="accent" className="bg-accent">Hover State</ButtonNew>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-primary rounded-lg">
            <Heading level={3} color="white" className="mb-4">Buttons on Dark Backgrounds</Heading>
            <Text color="white" className="mb-4">Ensure proper contrast for buttons displayed on navy backgrounds.</Text>
            <div className="flex flex-wrap gap-4">
              <ButtonNew variant="secondary">Secondary Button</ButtonNew>
              <ButtonNew variant="accent">Accent Button</ButtonNew>
              <ButtonNew variant="accent" className="bg-accent">Hover State</ButtonNew>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ButtonDemo;
