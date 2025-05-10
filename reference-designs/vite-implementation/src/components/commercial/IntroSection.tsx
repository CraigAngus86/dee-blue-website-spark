
import React from 'react';
import { Eye, Building2, Users, Globe } from 'lucide-react';
import Container from '@/components/ui/layout/Container';
import { CardNew } from '@/components/ui/CardNew';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import Section from '@/components/ui/layout/Section';

interface USPCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const USPCard = ({ icon, title, description }: USPCardProps) => (
  <CardNew elevation="sm" className="h-full">
    <div className="p-6 flex flex-col gap-4">
      <div className="text-primary">{icon}</div>
      <div>
        <Heading level={3} color="primary" className="mb-2">
          {title}
        </Heading>
        <Text color="default">
          {description}
        </Text>
      </div>
    </div>
  </CardNew>
);

const IntroSection = () => {
  const uspPoints = [
    {
      icon: <Eye size={32} />,
      title: "Local Visibility",
      description: "Connect with Aberdeen's oil & gas business community through matchday presence and networking opportunities."
    },
    {
      icon: <Building2 size={32} />,
      title: "Premium Facilities",
      description: "Showcase your brand at Spain Park's advanced facilities, including our premium hospitality offerings and modern spectator areas."
    },
    {
      icon: <Users size={32} />,
      title: "Community Engagement",
      description: "Support our youth academy and community initiatives, demonstrating your commitment to local development."
    },
    {
      icon: <Globe size={32} />,
      title: "Digital Presence",
      description: "Gain exposure through our growing digital and social media channels, reaching fans beyond matchdays."
    }
  ];

  return (
    <Section background="white" spacing="xl">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Heading level={2} color="primary" className="mb-6">
            Why Partner With Banks o' Dee FC?
          </Heading>
          <Text size="large" color="default" className="mb-4">
            As one of Aberdeen's most progressive football clubs, Banks o' Dee FC offers unique 
            partnership opportunities that connect your brand with a thriving sporting community.
          </Text>
          <Text color="default">
            Our Highland League matches draw crowds of up to 1,000 spectators, with select games 
            televised throughout the season. The Banks o' Dee Sports Club and Gym facility welcomes 
            over 5,000 visitors weekly, providing extensive exposure for our partners. Join us as we 
            continue our journey of growth and success in Scottish football.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uspPoints.map((point, index) => (
            <USPCard
              key={index}
              icon={point.icon}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default IntroSection;
