
import React from 'react';
import HeroSection from '@/components/ui/hero/HeroSection';
import Container from '@/components/ui/layout/Container';
import SponsorshipTier from '@/components/commercial/sponsorship/SponsorshipTier';
import SponsorGrid from '@/components/commercial/sponsorship/SponsorGrid';
import SponsorshipPackage from '@/components/commercial/sponsorship/SponsorshipPackage';
import { Button } from '@/components/ui/button';

// Temporary sponsor data (to be replaced with actual data from CMS)
const sponsors = [
  { 
    id: '1', 
    name: 'Sponsor 1', 
    tier: 'platinum', 
    logo: '/assets/images/sponsors/placeholder.png' 
  },
  // ... more sponsors
];

const sponsorshipPackages = [
  {
    title: 'Platinum Sponsor',
    price: '£5,000',
    description: 'Premier sponsorship package with maximum exposure',
    features: [
      'Main stadium branding',
      'Front of shirt logo placement',
      'Full page program ads',
      'Social media promotion',
      'Hospitality packages'
    ]
  },
  // ... more packages
];

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
        
        <SponsorshipTier
          title="Platinum Sponsors"
          description="Our premier sponsors who make everything possible"
          className="mb-12"
        >
          <SponsorGrid
            sponsors={sponsors.filter(s => s.tier === 'platinum')}
            size="lg"
          />
        </SponsorshipTier>
        
        {/* Additional sponsorship tiers would go here */}
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Sponsorship Packages</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorshipPackages.map((pkg) => (
              <SponsorshipPackage
                key={pkg.title}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
