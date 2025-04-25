
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import SponsorshipCard from '../sponsorship/SponsorshipCard';
import { premiumSponsorship, fanzoneSponsorship } from '../sponsorship/sponsorshipData';
import ComparisonTable from '../comparison/ComparisonTable';
import { comparisonData, packagePrices } from '../comparison/comparisonData';

const MatchDayHospitalitySection = () => {
  return (
    <Section background="white" spacing="md" id="matchday-hospitality">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <Heading level={2} color="primary" className="mb-4">
            Match Day Hospitality
          </Heading>
          <Text size="medium" color="default" className="mb-4">
            Elevate your match day experience with our premium hospitality packages. 
            Perfect for entertaining clients, rewarding staff, or enjoying a special day with family and friends.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {premiumSponsorship.map((item) => (
            <SponsorshipCard 
              key={item.title} 
              {...item} 
              hideViewDetails 
            />
          ))}
          <SponsorshipCard 
            {...fanzoneSponsorship} 
            hideViewDetails 
          />
        </div>
        
        <div className="bg-light-gray p-4 rounded-lg">
          <ComparisonTable data={comparisonData} prices={packagePrices} />
        </div>
      </Container>
    </Section>
  );
};

export default MatchDayHospitalitySection;
