
import React from "react";
import Heading from "../ui/typography/Heading";
import Text from "../ui/typography/Text";
import Container from "../ui/layout/Container";
import Section from "../ui/layout/Section";

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
  
  const gradients = [
    { 
      name: "Primary Gradient", 
      hex: "linear-gradient(to right, #00105A, #001C8C)", 
      variable: "from-primary to-primary-light" 
    },
    { 
      name: "Accent Gradient", 
      hex: "linear-gradient(to right, #FFD700, #FFDF33)", 
      variable: "from-accent to-accent-light" 
    },
    { 
      name: "Dark Overlay", 
      hex: "linear-gradient(to top, rgba(0,16,90,0.9), rgba(0,16,90,0.3), transparent)", 
      variable: "bg-gradient-to-t from-primary bg-opacity-50" 
    },
  ];
  
  return (
    <Section spacing="xl">
      <Container>
        <Heading level={1} className="mb-8">Banks o' Dee FC Color System</Heading>
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
        </div>
      </Container>
    </Section>
  );
};

export default ColorDemo;
