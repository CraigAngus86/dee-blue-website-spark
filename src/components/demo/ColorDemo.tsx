
import React from "react";
import Heading from "../ui/typography/Heading";
import Text from "../ui/typography/Text";
import Container from "../ui/layout/Container";
import Section from "../ui/layout/Section";
import { ButtonNew } from "../ui/ButtonNew";

const ColorSwatchGroup: React.FC<{ title: string; colors: Array<{ name: string; hex: string; variable: string }> }> = ({ title, colors }) => {
  return (
    <div className="space-y-4">
      <Heading level={3}>{title}</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="space-y-2">
            <div 
              className="h-24 rounded-md shadow-inner" 
              style={{ backgroundColor: color.hex }}
            />
            <div>
              <Text weight="semibold">{color.name}</Text>
              <Text size="small" color="muted">{color.hex}</Text>
              <Text size="xs" color="muted" className="font-mono">{color.variable}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorDemo: React.FC = () => {
  // Updated brand colors to match the revised color palette
  const brandColors = [
    { name: "Primary", hex: "#00105A", variable: "--primary" },
    { name: "Primary Dark", hex: "#000C42", variable: "--primary-dark" },
    { name: "Primary Light", hex: "#001C8C", variable: "--primary-light" },
    { name: "Secondary", hex: "#C5E7FF", variable: "--secondary" },
    { name: "Secondary Dark", hex: "#9CCBEB", variable: "--secondary-dark" },
    { name: "Secondary Light", hex: "#E5F4FF", variable: "--secondary-light" },
    { name: "Accent", hex: "#FFD700", variable: "--accent" },
    { name: "Accent Dark", hex: "#E6C200", variable: "--accent-dark" },
    { name: "Accent Light", hex: "#FFDF33", variable: "--accent-light" },
  ];
  
  const neutralColors = [
    { name: "White", hex: "#FFFFFF", variable: "--white" },
    { name: "Light Gray", hex: "#F4F7FB", variable: "--light-gray" },
    { name: "Medium Gray", hex: "#E2E8F0", variable: "--medium-gray" },
    { name: "Gray", hex: "#94A3B8", variable: "--gray" },
    { name: "Dark Gray", hex: "#475569", variable: "--dark-gray" },
    { name: "Near Black", hex: "#1E293B", variable: "--near-black" },
    { name: "Black", hex: "#0F172A", variable: "--black" },
  ];
  
  const semanticColors = [
    { name: "Success", hex: "#10B981", variable: "--success" },
    { name: "Warning", hex: "#F59E0B", variable: "--warning" },
    { name: "Error", hex: "#EF4444", variable: "--error" },
    { name: "Info", hex: "#3B82F6", variable: "--info" },
  ];
  
  // Updated gradients to use the correct brand colors
  const gradients = [
    { 
      name: "Primary Gradient", 
      hex: "linear-gradient(to right, #00105A, #001C8C)", 
      variable: "from-primary to-primary-light" 
    },
    { 
      name: "Secondary Gradient", 
      hex: "linear-gradient(to right, #C5E7FF, #E5F4FF)", 
      variable: "from-secondary to-secondary-light" 
    },
    { 
      name: "Accent Gradient", 
      hex: "linear-gradient(to right, #FFD700, #FFDF33)", 
      variable: "from-accent to-accent-light" 
    },
    { 
      name: "Dark Overlay", 
      hex: "linear-gradient(to top, rgba(0,16,90,0.9), rgba(0,16,90,0.3), transparent)", 
      variable: "bg-gradient-to-t from-primary bg-opacity-90" 
    },
  ];
  
  return (
    <Section spacing="xl">
      <Container>
        <Heading level={1} className="mb-8">Banks o' Dee FC Color System</Heading>
        <Text size="large" className="mb-12">
          Our color system reflects the Banks o' Dee FC brand identity with a primary palette of Deep Navy, Light Blue, and Gold accent colors.
        </Text>
        <div className="space-y-12">
          <ColorSwatchGroup title="Brand Colors" colors={brandColors} />
          <ColorSwatchGroup title="Neutral Colors" colors={neutralColors} />
          <ColorSwatchGroup title="Semantic Colors" colors={semanticColors} />
          
          <div className="space-y-4">
            <Heading level={3}>Gradients</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gradients.map((gradient) => (
                <div key={gradient.name} className="space-y-2">
                  <div 
                    className="h-24 rounded-md shadow-inner" 
                    style={{ background: gradient.hex }}
                  />
                  <div>
                    <Text weight="semibold">{gradient.name}</Text>
                    <Text size="small" color="muted" className="font-mono">{gradient.variable}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Heading level={3}>Color Usage Guidelines</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-medium-gray rounded-lg">
                <Heading level={4} className="mb-4">Color Hierarchy</Heading>
                <ul className="space-y-3 list-disc pl-5">
                  <li><Text><span className="font-semibold">Primary (Navy)</span>: Main brand identity, backgrounds, headers</Text></li>
                  <li><Text><span className="font-semibold">Secondary (Light Blue)</span>: Interactive elements, highlights, buttons</Text></li>
                  <li><Text><span className="font-semibold">Accent (Gold)</span>: Special call-to-actions, important accents only</Text></li>
                </ul>
              </div>
              <div className="p-6 border border-medium-gray rounded-lg">
                <Heading level={4} className="mb-4">Contrast & Accessibility</Heading>
                <ul className="space-y-3 list-disc pl-5">
                  <li><Text>Use white text on navy backgrounds</Text></li>
                  <li><Text>Use light blue for highlights on navy backgrounds</Text></li>
                  <li><Text>Use navy text on light backgrounds</Text></li>
                  <li><Text>Ensure all text meets WCAG AA contrast requirements</Text></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Text on Dark Backgrounds section explicitly using white/light blue text */}
          <div className="p-8 bg-primary rounded-lg">
            <Heading level={3} color="white" className="mb-6">Text Colors on Dark Backgrounds</Heading>
            <div className="space-y-5">
              <Text color="white" size="large" className="mb-2">White Text (#FFFFFF) - Primary text on dark backgrounds</Text>
              <Text color="secondary" className="mb-2">Light Blue Text (#C5E7FF) - For highlighting text on dark backgrounds</Text>
              <Text color="accent" className="mb-2">Gold Text (#FFD700) - For special emphasis or CTAs on dark backgrounds</Text>
              <Text color="white" size="small" className="opacity-70 mb-2">Muted Light Gray (#94A3B8) - For secondary information on dark backgrounds</Text>
              
              <div className="flex gap-4 mt-6 flex-wrap">
                <ButtonNew 
                  variant="accent" 
                  className="bg-white text-primary border-accent hover:bg-accent hover:text-primary"
                >
                  Gold Border Button
                </ButtonNew>
                <ButtonNew 
                  variant="accent" 
                  className="bg-accent text-primary"
                >
                  Gold Fill Button (Hover)
                </ButtonNew>
              </div>
            </div>
          </div>

          {/* Match Cards Example with proper text contrast */}
          <div className="space-y-6">
            <Heading level={2} className="mb-4">Match Cards Example</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-medium-gray rounded-lg bg-primary">
                <Heading level={4} color="white" className="mb-4">Card Headers on Navy</Heading>
                <div className="bg-white p-4 rounded-md">
                  <Heading level={5} className="mb-2">Card Content</Heading>
                  <Text size="small" className="mb-4">This demonstrates proper text contrast on card headers.</Text>
                </div>
                <div className="mt-4">
                  <Text color="white" size="small">White text on navy background</Text>
                  <Text color="secondary" size="small" className="mt-2">Light blue text for highlights</Text>
                </div>
              </div>
              <div className="p-6 border border-medium-gray rounded-lg">
                <Heading level={4} className="mb-4">Text Sizing</Heading>
                <Text className="mb-2">Use smaller text sizes for longer team names to prevent wrapping:</Text>
                <div className="bg-primary text-white p-3 rounded-md mb-4">
                  <Text size="small" weight="semibold" color="white">Proper Text Sizing</Text>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-md mb-4 border border-medium-gray">
                  <div className="text-center w-1/3">
                    <Text weight="bold" size="small" className="mt-2">Inverness CT</Text>
                  </div>
                  <div className="text-center w-1/3">
                    <Text size="small">VS</Text>
                  </div>
                  <div className="text-center w-1/3">
                    <Text weight="bold" size="small" className="mt-2">Banks o' Dee</Text>
                  </div>
                </div>
                <Text size="small" color="muted">Use width constraints and smaller text to prevent wrapping in tight spaces</Text>
              </div>
            </div>
          </div>

          {/* Text on Dark Backgrounds Example - Explicitly using white/light colors */}
          <div className="p-8 bg-primary rounded-lg">
            <Heading level={3} color="white" className="mb-6">Text on Dark Backgrounds</Heading>
            <div className="space-y-4">
              <Text color="white" size="large">Large white text on navy background (Primary)</Text>
              <Text color="white">Regular white text on navy background (Primary)</Text>
              <Text color="secondary" size="small">Light blue text for highlights on navy (Secondary)</Text>
              <div className="flex gap-4 mt-4">
                <ButtonNew variant="accent" className="bg-white text-primary border-accent hover:bg-accent hover:text-primary">Gold Border Button</ButtonNew>
                <ButtonNew variant="accent" className="bg-accent text-primary">Gold Fill Button (Hover)</ButtonNew>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border border-medium-gray rounded-lg">
            <Heading level={3} className="mb-4">Text on Light Backgrounds</Heading>
            <div className="space-y-4">
              <Heading level={4} color="primary">Navy heading on white background</Heading>
              <Text color="default">Near black body text for readability</Text>
              <Text color="muted" size="small">Gray text for secondary information</Text>
              <div className="flex gap-4 mt-4 flex-wrap">
                <ButtonNew variant="primary">Primary Button</ButtonNew>
                <ButtonNew variant="secondary">Secondary Button</ButtonNew>
                <ButtonNew variant="tertiary">Tertiary Button</ButtonNew>
                <ButtonNew variant="accent">Accent Button</ButtonNew>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Heading level={3}>Button Color Guidelines</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-medium-gray rounded-lg">
                <Heading level={4} className="mb-4">Primary Button Usage</Heading>
                <Text className="mb-4">Light blue buttons with navy text for most interactive elements.</Text>
                <div className="flex gap-4">
                  <ButtonNew variant="primary">Default</ButtonNew>
                  <ButtonNew variant="primary" className="bg-secondary-dark">Hover</ButtonNew>
                  <ButtonNew variant="primary" className="bg-secondary-dark/90">Active</ButtonNew>
                </div>
              </div>
              <div className="p-6 border border-medium-gray rounded-lg">
                <Heading level={4} className="mb-4">Accent Button Usage</Heading>
                <Text className="mb-4">Gold accent buttons reserved for CTAs like "Buy Tickets" only.</Text>
                <div className="flex gap-4">
                  <ButtonNew variant="accent" className="bg-white text-primary border-accent">Default</ButtonNew>
                  <ButtonNew variant="accent" className="bg-accent text-primary">Hover</ButtonNew>
                  <ButtonNew variant="accent" className="bg-accent-dark text-primary">Active</ButtonNew>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ColorDemo;
