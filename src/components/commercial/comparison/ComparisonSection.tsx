import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import ComparisonTable from './ComparisonTable';
import ComparisonCards from './ComparisonCards';
import { comparisonData, packagePrices } from './comparisonData';

const ComparisonSection = () => {
  const isMobile = useIsMobile();

  return (
    <Section background="light" spacing="xl" id="package-comparison">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Heading level={2} color="primary" className="mb-6">
            Compare Hospitality Packages
          </Heading>
          <Text size="large" color="default">
            Find the perfect match day experience for your guests. Compare our packages 
            to find the one that best suits your needs.
          </Text>
        </div>

        {isMobile ? (
          <ComparisonCards 
            data={comparisonData} 
            prices={packagePrices}
          />
        ) : (
          <ComparisonTable 
            data={comparisonData} 
            prices={packagePrices}
          />
        )}
      </Container>
    </Section>
  );
};

export default ComparisonSection;
