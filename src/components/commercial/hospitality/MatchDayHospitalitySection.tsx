
import React from 'react';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import SponsorshipCard from '../sponsorship/SponsorshipCard';
import { premiumSponsorship, fanzoneSponsorship } from '../sponsorship/sponsorshipData';
import ComparisonTable from '../comparison/ComparisonTable';
import { comparisonData, packagePrices } from '../comparison/comparisonData';
import HoverEffect from '@/components/ui/animations/HoverEffect';

const MatchDayHospitalitySection = () => {
  const allHospitalityOptions = [...premiumSponsorship, fanzoneSponsorship];

  return (
    <Section background="light" spacing="md" id="matchday-hospitality">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <Heading as="h2" size="2xl" className="mb-4">
            Match Day Hospitality
          </Heading>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {allHospitalityOptions.map((item) => (
            <HoverEffect key={item.title} effect="lift" duration="fast">
              <SponsorshipCard 
                key={item.title} 
                {...item} 
                hideViewDetails 
                compact
              />
            </HoverEffect>
          ))}
        </div>
      </Container>
      
      <div className="bg-primary/5 px-4 py-6 rounded-lg">
        <ComparisonTable data={comparisonData} prices={packagePrices} />
      </div>
    </Section>
  );
};

export default MatchDayHospitalitySection;
