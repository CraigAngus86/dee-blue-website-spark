import React from 'react';
import HeroSection from '@/components/ui/hero/HeroSection';
import Container from '@/components/ui/layout/Container';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import SponsorshipPackagesSection from '@/components/commercial/sponsorship/SponsorshipPackagesSection';
import { Button } from '@/components/ui/button';

export default function CommercialPage() {
  return (
    <main>
      <HeroSection
        title="Commercial Partnerships"
        image="/assets/images/matchday/MatchDay1.jpg"
        imageAlt="Spain Park Stadium"
        overlay={true}
      >
        <p className="text-white mb-6">
          Partner with Banks o' Dee FC and connect your brand with our passionate community.
        </p>
        <Button size="lg">
          Become a Partner
        </Button>
      </HeroSection>
      
      <Container className="py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Sponsors</h2>
          <p className="text-gray-600">
            We're proud to be supported by these amazing businesses. Join them in partnering with Banks o' Dee FC.
          </p>
        </div>
        
        <SponsorshipTiersSection />
        <SponsorshipPackagesSection />
      </Container>
    </main>
  );
}
