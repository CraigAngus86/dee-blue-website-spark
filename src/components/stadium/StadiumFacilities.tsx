
import React from 'react';
import { Target, Dumbbell, Users, Building2 } from 'lucide-react';
import Section from '@/components/ui/layout/Section';
import Container from '@/components/ui/layout/Container';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';

interface FacilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ icon, title, description }) => (
  <div className="bg-light-gray rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
    <div className="bg-primary/10 p-4 rounded-full mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-primary" })}
    </div>
    <Heading level={3} color="primary" className="mb-2">{title}</Heading>
    <Text size="small" color="muted">{description}</Text>
  </div>
);

const StadiumFacilities: React.FC = () => {
  const facilities = [
    {
      icon: <Target />,
      title: "Main Pitch",
      description: "State-of-the-art 3G synthetic surface for matches and training."
    },
    {
      icon: <Dumbbell />,
      title: "Gym",
      description: "Modern equipment and facilities available to members and public."
    },
    {
      icon: <Users />,
      title: "Hospitality Areas",
      description: "Corporate and fan hospitality spaces for matchdays and events."
    },
    {
      icon: <Building2 />,
      title: "Meeting Spaces",
      description: "Professional meeting rooms and facilities for business use."
    }
  ];

  return (
    <Section background="white" spacing="sm">
      <Container>
        <div className="text-center mb-8">
          <Heading level={2} color="primary">Stadium Facilities</Heading>
          <Text size="large" className="max-w-3xl mx-auto mt-4">
            Spain Park offers modern facilities for sports, events, and business use.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <FacilityCard key={index} {...facility} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default StadiumFacilities;
