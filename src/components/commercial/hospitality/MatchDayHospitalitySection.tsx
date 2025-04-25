
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {premiumSponsorship.map((item) => (
            <SponsorshipCard 
              key={item.title} 
              {...item} 
              hideViewDetails 
              compact
            />
          ))}
          <SponsorshipCard 
            {...fanzoneSponsorship} 
            hideViewDetails 
            compact
          />
        </div>
      </Container>
      
      <div className="bg-primary/5 px-4 py-6 rounded-lg">
        <ComparisonTable data={comparisonData} prices={packagePrices} />
      </div>
    </Section>
  );
};

export default MatchDayHospitalitySection;
