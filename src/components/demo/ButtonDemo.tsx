
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
          {/* Button Variants */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Button Variants</Heading>
            <div className="flex flex-wrap gap-4 items-center">
              <ButtonNew variant="primary">Primary Button</ButtonNew>
              <ButtonNew variant="secondary">Secondary Button</ButtonNew>
              <ButtonNew variant="tertiary">Tertiary Button</ButtonNew>
              <ButtonNew variant="accent">Accent Button</ButtonNew>
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
                <ButtonNew variant="primary" className="bg-primary-light">Primary Button</ButtonNew>
                <Text size="small" color="muted">When user hovers over button</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Focus (simulated)</Text>
                <ButtonNew variant="primary" className="ring-2 ring-primary ring-offset-2">Primary Button</ButtonNew>
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
                <ButtonNew variant="secondary">Secondary Button</ButtonNew>
                <Text size="small" color="muted">Normal state</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Hover (simulated)</Text>
                <ButtonNew variant="secondary" className="bg-light-gray">Secondary Button</ButtonNew>
                <Text size="small" color="muted">When user hovers over button</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Focus (simulated)</Text>
                <ButtonNew variant="secondary" className="ring-2 ring-primary ring-offset-2">Secondary Button</ButtonNew>
                <Text size="small" color="muted">When button receives keyboard focus</Text>
              </div>
              <div className="space-y-3">
                <Text weight="medium">Disabled</Text>
                <ButtonNew variant="secondary" disabled>Secondary Button</ButtonNew>
                <Text size="small" color="muted">When button is disabled</Text>
              </div>
            </div>
          </div>
          
          {/* Button Usage Guidelines */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Button Usage Guidelines</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Heading level={3}>Primary Buttons</Heading>
                <Text>Use for the main action on a page or in a section. There should typically be only one primary action per view.</Text>
                <div className="mt-2">
                  <ButtonNew variant="primary">Main Action</ButtonNew>
                </div>
              </div>
              <div className="space-y-4">
                <Heading level={3}>Secondary Buttons</Heading>
                <Text>Use for secondary actions that should be visible but not draw focus away from the primary action.</Text>
                <div className="mt-2">
                  <ButtonNew variant="secondary">Secondary Action</ButtonNew>
                </div>
              </div>
              <div className="space-y-4">
                <Heading level={3}>Tertiary Buttons</Heading>
                <Text>Use for less important actions or when space is limited, such as in dense interfaces or cards.</Text>
                <div className="mt-2">
                  <ButtonNew variant="tertiary">Subtle Action</ButtonNew>
                </div>
              </div>
              <div className="space-y-4">
                <Heading level={3}>Accent Buttons</Heading>
                <Text>Use for promotional actions, calls-to-action, or to draw special attention to an important action.</Text>
                <div className="mt-2">
                  <ButtonNew variant="accent">Promotional Action</ButtonNew>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ButtonDemo;
