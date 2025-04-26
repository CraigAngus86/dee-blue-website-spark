'use client';

import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import { ButtonNew } from '@/components/ui/ButtonNew';
import SponsorshipCard from './SponsorshipCard';
import { additionalSponsorship } from './sponsorshipData';

const SponsorshipTiersSection = () => {
  return (
    <Section background="light" spacing="sm" id="sponsorship-options">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-6">
          <Heading level={2} color="primary" className="mb-4">
            Sponsorship Opportunities
          </Heading>
          <Text size="medium" color="default">
            Connect your brand with Banks o' Dee FC through our range of non-matchday 
            sponsorship packages designed to provide year-round exposure and brand association.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalSponsorship.slice(0, 3).map((item) => (
            <SponsorshipCard key={item.title} {...item} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Text size="medium" color="default" className="mb-4">
            Looking to explore our sponsorship opportunities further? Our commercial team is here to help.
          </Text>
          <ButtonNew
            variant="primary"
            size="lg"
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Discuss Sponsorship Options
          </ButtonNew>
        </div>
      </Container>
    </Section>
  );
};

export default SponsorshipTiersSection;
