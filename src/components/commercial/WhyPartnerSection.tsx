
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { Eye, Building, Users, Globe } from 'lucide-react';

const WhyPartnerSection = () => {
  const benefitCards = [
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Local Visibility",
      description: "Connect with our passionate fanbase of over 1,000 match attendees and gain exposure in the Aberdeen community."
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: "Premium Facilities",
      description: "Showcase your brand at our state-of-the-art Spain Park stadium with modern hospitality spaces."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Engagement",
      description: "Associate with a club deeply rooted in the community, supporting local initiatives and youth development."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Digital Presence",
      description: "Reach over 5,000 weekly visitors through our website and active social media channels."
    },
  ];

  return (
    <Section background="white" spacing="md">
      <Container>
        <div className="text-center mb-6">
          <Heading level={2} color="primary">Why Partner With Banks o' Dee FC</Heading>
          <Text size="medium" className="max-w-3xl mx-auto mt-3">
            Partnering with Banks o' Dee FC offers excellent exposure for your business
            through one of Aberdeen's most progressive football clubs, connecting you with
            a passionate community of supporters.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {benefitCards.map((card, index) => (
            <div key={index} className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {card.icon}
              </div>
              <Heading level={3} color="primary" className="mb-2">{card.title}</Heading>
              <Text size="small" color="default">{card.description}</Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyPartnerSection;
