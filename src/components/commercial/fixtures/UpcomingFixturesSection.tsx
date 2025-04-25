
import React from 'react';
import { useMatchData } from './useMatchData';
import Container from '@/components/ui/layout/Container';
import Section from '@/components/ui/layout/Section';
import FixtureCard from './FixtureCard';
import Text from '@/components/ui/typography/Text';
import Heading from '@/components/ui/typography/Heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const UpcomingFixturesSection = () => {
  const { upcomingFixtures } = useMatchData();

  return (
    <Section background="light" spacing="md" id="upcoming-fixtures">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <Heading level={2} color="primary" className="mb-3">
            Upcoming Hospitality Opportunities
          </Heading>
          <Text size="medium" color="default">
            Secure your place at our upcoming fixtures and experience the best matchday hospitality 
            at Spain Park.
          </Text>
        </div>

        <div className="relative mb-8">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent>
              {upcomingFixtures.slice(0, 6).map((fixture) => (
                <CarouselItem key={fixture.id} className="sm:basis-1/2 lg:basis-1/3 pl-4">
                  <FixtureCard fixture={fixture} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-2 bg-white hover:bg-gray-100" />
            <CarouselNext className="hidden md:flex right-2 bg-white hover:bg-gray-100" />
          </Carousel>
          
          <div className="mt-6 text-center">
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
