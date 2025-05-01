
"use client";

import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import { Button } from "@/components/ui/button";
import SponsorshipCard from './SponsorshipCard';
import { additionalSponsorship } from './sponsorshipData';

const SponsorshipTiersSection = () => {
  return (
    <Section background="light" spacing="sm" id="sponsorship-options">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-montserrat">
            Sponsorship Opportunities
          </h2>
          <p className="text-base text-gray-700">
            Connect your brand with Banks o' Dee FC through our range of non-matchday 
            sponsorship packages designed to provide year-round exposure and brand association.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalSponsorship.slice(0, 3).map((item) => (
            <SponsorshipCard key={item.title} {...item} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-base text-gray-700 mb-4">
            Looking to explore our sponsorship opportunities further? Our commercial team is here to help.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Discuss Sponsorship Options
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default SponsorshipTiersSection;
