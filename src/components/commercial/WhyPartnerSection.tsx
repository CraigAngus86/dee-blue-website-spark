
"use client";

import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-montserrat">
            Why Partner With Banks o' Dee FC
          </h2>
          <p className="text-base max-w-3xl mx-auto mt-3 text-gray-700">
            Partnering with Banks o' Dee FC offers excellent exposure for your business
            through one of Aberdeen's most progressive football clubs, connecting you with
            a passionate community of supporters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {benefitCards.map((card, index) => (
            <div key={index} className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-primary font-montserrat">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyPartnerSection;
