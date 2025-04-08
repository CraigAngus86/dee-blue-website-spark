
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
          
          {/* Text Colors - Updated with correct brand color usage */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Text Colors</Heading>
            <div className="space-y-4">
              <Text color="default">Default Text - Near Black (#1E293B) - For main content on light backgrounds</Text>
              <Text color="primary">Primary Text - Deep Navy (#00105A) - For headings and important text on light backgrounds</Text>
              <Text color="secondary">Secondary Text - Dark Gray (#475569) - For secondary information, captions</Text>
              <Text color="muted">Muted Text - Medium Gray (#94A3B8) - For less important information, helper text</Text>
            </div>
            
            <div className="mt-8 p-6 bg-primary rounded-lg">
              <Heading level={3} color="white" className="mb-4">Text Colors on Dark Backgrounds</Heading>
              <div className="space-y-3">
                <Text color="white">White Text (#FFFFFF) - Primary text on dark backgrounds</Text>
                <Text color="secondary">Light Blue Text (#C5E7FF) - For highlighting text on dark backgrounds</Text>
                <Text color="accent">Gold Text (#FFD700) - For special emphasis or CTAs on dark backgrounds</Text>
                <Text color="muted">Muted Light Gray (#94A3B8) - For secondary information on dark backgrounds</Text>
              </div>
            </div>
            
            <div className="mt-8 p-6 border border-medium-gray rounded-lg">
              <Heading level={3} className="mb-4">Text Accessibility</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Heading level={4} className="mb-3">Good Contrast Examples</Heading>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary">
                      <Text color="white">White text on navy background ✓</Text>
                    </div>
                    <div className="p-3 bg-white border border-medium-gray">
                      <Text color="primary">Navy text on white background ✓</Text>
                    </div>
                    <div className="p-3 bg-primary">
                      <Text color="secondary">Light blue on navy background ✓</Text>
                    </div>
                    <div className="p-3 bg-secondary border border-medium-gray">
                      <Text color="primary">Navy on light blue background ✓</Text>
                    </div>
                  </div>
                </div>
                <div>
                  <Heading level={4} className="mb-3">Poor Contrast Examples (Avoid)</Heading>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary">
                      <Text color="primary" className="opacity-50">Navy text on navy background ✗</Text>
                    </div>
                    <div className="p-3 bg-secondary border border-medium-gray">
                      <Text color="white">White text on light blue background ✗</Text>
                    </div>
                    <div className="p-3 bg-light-gray border border-medium-gray">
                      <Text color="secondary" className="opacity-70">Light blue on light gray background ✗</Text>
                    </div>
                    <div className="p-3 bg-accent border border-medium-gray">
                      <Text color="white">White on gold background ✗</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default TypographyDemo;
