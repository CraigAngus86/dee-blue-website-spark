
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import SponsorshipCard from '../sponsorship/SponsorshipCard';
import { premiumSponsorship, fanzoneSponsorship } from '../sponsorship/sponsorshipData';
import ComparisonTable from '../comparison/ComparisonTable';
import { comparisonData, packagePrices } from '../comparison/comparisonData';
import HoverEffect from '@/components/ui/animations/HoverEffect';

const MatchDayHospitalitySection = () => {
  return (
    <Section background="white" spacing="md" id="matchday-hospitality">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <Heading level={2} color="primary" className="mb-4">
            Match Day Hospitality
          </Heading>
          <Text color="muted" className="mb-6">
            Enhance your match day experience with our premium hospitality packages
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {premiumSponsorship.map((item) => (
            <HoverEffect key={item.title} effect="lift" duration="fast">
              <SponsorshipCard 
                key={item.title} 
                {...item} 
                hideViewDetails 
                compact
              />
            </HoverEffect>
          ))}
          <HoverEffect effect="lift" duration="fast">
            <SponsorshipCard 
              {...fanzoneSponsorship} 
              hideViewDetails 
              compact
            />
          </HoverEffect>
        </div>
      </Container>
      
      <div className="bg-primary/5 px-4 py-6 rounded-lg">
        <ComparisonTable data={comparisonData} prices={packagePrices} />
      </div>
    </Section>
  );
};

export default MatchDayHospitalitySection;
