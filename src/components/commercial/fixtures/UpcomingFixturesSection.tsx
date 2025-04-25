
import React from 'react';
import { useMatchData } from './useMatchData';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import FixtureCard from './FixtureCard';
import Text from '@/components/ui/typography/Text';
import Heading from '@/components/ui/typography/Heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const UpcomingFixturesSection = () => {
  const { upcomingFixtures } = useMatchData();

  return (
    <Section background="light" spacing="xl" id="upcoming-fixtures">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Heading level={2} color="primary" className="mb-4">
            Upcoming Hospitality Opportunities
          </Heading>
          <Text size="large" color="default">
            Secure your place at our upcoming fixtures and experience the best matchday hospitality 
            at Spain Park.
          </Text>
        </div>

        <div className="relative">
          <div className="overflow-x-auto pb-6 -mx-4 px-4 md:pb-8 scrollbar-hide">
            <div className="flex space-x-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-x-0">
              {upcomingFixtures.slice(0, 6).map((fixture) => (
                <FixtureCard key={fixture.id} fixture={fixture} />
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild>
              <a href="/matches" className="inline-flex items-center">
                View All Fixtures
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default UpcomingFixturesSection;
