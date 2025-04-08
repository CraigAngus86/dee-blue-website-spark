
import React from "react";
import Heading from "../ui/typography/Heading";
import Text from "../ui/typography/Text";
import Container from "../ui/layout/Container";
import Section from "../ui/layout/Section";

const TypographyDemo: React.FC = () => {
  return (
    <Section spacing="xl">
      <Container>
        <Heading level={1} className="mb-12">Typography System</Heading>
        
        <div className="space-y-16">
          {/* Headings */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Headings</Heading>
            <div className="space-y-6">
              <div>
                <Heading level={1}>Heading 1 (2.25rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.2</Text>
              </div>
              <div>
                <Heading level={2}>Heading 2 (1.875rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.2</Text>
              </div>
              <div>
                <Heading level={3}>Heading 3 (1.5rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.2</Text>
              </div>
              <div>
                <Heading level={4}>Heading 4 (1.25rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.2</Text>
              </div>
              <div>
                <Heading level={5}>Heading 5 (1.125rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.2</Text>
              </div>
              <div>
                <Heading level={6}>Heading 6 (1rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.2</Text>
              </div>
              <div>
                <Heading level={1} className="text-display">Display Heading (3rem)</Heading>
                <Text size="small" color="muted" className="mt-2">Font: Montserrat, Weight: Bold, Line Height: 1.1</Text>
              </div>
            </div>
          </div>
          
          {/* Body Text */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Body Text</Heading>
            <div className="space-y-8">
              <div>
                <Text size="large">
                  Large Text (18px) - The quick brown fox jumps over the lazy dog. Banks o' Dee FC is Scotland's premier football club based in Aberdeen.
                </Text>
                <Text size="small" color="muted" className="mt-2">Font: Inter, Weight: Regular, Line Height: 1.6</Text>
              </div>
              <div>
                <Text size="medium">
                  Medium Text (16px) - The quick brown fox jumps over the lazy dog. Banks o' Dee FC is Scotland's premier football club based in Aberdeen. Established for excellence in football and community involvement since our foundation.
                </Text>
                <Text size="small" color="muted" className="mt-2">Font: Inter, Weight: Regular, Line Height: 1.6</Text>
              </div>
              <div>
                <Text size="small">
                  Small Text (14px) - The quick brown fox jumps over the lazy dog. Banks o' Dee FC is Scotland's premier football club based in Aberdeen. Established for excellence in football and community involvement since our foundation.
                </Text>
                <Text size="small" color="muted" className="mt-2">Font: Inter, Weight: Regular, Line Height: 1.4</Text>
              </div>
              <div>
                <Text size="xs">
                  Extra Small Text (12px) - The quick brown fox jumps over the lazy dog. Banks o' Dee FC is Scotland's premier football club based in Aberdeen.
                </Text>
                <Text size="small" color="muted" className="mt-2">Font: Inter, Weight: Regular, Line Height: 1.4</Text>
              </div>
            </div>
          </div>
          
          {/* Font Weights */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Font Weights</Heading>
            <div className="space-y-4">
              <Text weight="light">Light (300) - The quick brown fox jumps over the lazy dog.</Text>
              <Text weight="regular">Regular (400) - The quick brown fox jumps over the lazy dog.</Text>
              <Text weight="medium">Medium (500) - The quick brown fox jumps over the lazy dog.</Text>
              <Text weight="semibold">Semibold (600) - The quick brown fox jumps over the lazy dog.</Text>
              <Text weight="bold">Bold (700) - The quick brown fox jumps over the lazy dog.</Text>
            </div>
          </div>
          
          {/* Text Colors */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Text Colors</Heading>
            <div className="space-y-4">
              <Text color="default">Default Text - Near Black (#1E293B)</Text>
              <Text color="primary">Primary Text - Deep Navy (#00105A)</Text>
              <Text color="secondary">Secondary Text - Light Blue (#C5E7FF)</Text>
              <Text color="accent">Accent Text - Gold (#FFD700)</Text>
              <Text color="muted">Muted Text - Gray (#94A3B8)</Text>
              <div className="p-4 bg-primary rounded-md">
                <Text color="white">White Text - On dark background (#FFFFFF)</Text>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default TypographyDemo;
