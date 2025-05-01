
import React from 'react';
import Container from '@/components/ui/layout/Container';
import { Users, CalendarDays, MapPin, Clock } from 'lucide-react'; 
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';

interface StadiumOverviewProps {
  capacity: string;
  established: string;
  pitch: string;
  location: string;
}

const StadiumOverview: React.FC<StadiumOverviewProps> = ({
  capacity,
  established,
  pitch,
  location
}) => {
  return (
    <Section background="white" spacing="lg">
      <Container>
        <div className="text-center mb-8">
          <Heading level={2} color="primary">Stadium Overview</Heading>
          <Text size="large" className="max-w-3xl mx-auto mt-4">
            Spain Park is the home of Banks o' Dee Football Club, offering state-of-the-art facilities for players
            and supporters alike. Located in the heart of Aberdeen, our stadium has been developed to provide an
            exceptional matchday experience.
          </Text>
        </div>

        {/* Stadium key information cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Capacity */}
          <div className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <Heading level={3} color="primary" className="mb-2">Capacity</Heading>
            <Text size="large" weight="semibold" color="primary">{capacity}</Text>
            <Text size="small" color="muted">Seated & Standing</Text>
          </div>

          {/* Year Established */}
          <div className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <CalendarDays className="h-8 w-8 text-primary" />
            </div>
            <Heading level={3} color="primary" className="mb-2">Established</Heading>
            <Text size="large" weight="semibold" color="primary">{established}</Text>
            <Text size="small" color="muted">Years of History</Text>
          </div>

          {/* Pitch */}
          <div className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <Heading level={3} color="primary" className="mb-2">Pitch</Heading>
            <Text size="large" weight="semibold" color="primary">3G Surface</Text>
            <Text size="small" color="muted">{pitch}</Text>
          </div>

          {/* Location */}
          <div className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <Heading level={3} color="primary" className="mb-2">Location</Heading>
            <Text size="large" weight="semibold" color="primary">{location}</Text>
            <Text size="small" color="muted">City Centre</Text>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default StadiumOverview;
