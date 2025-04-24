
import React from 'react';
import { Target, Dumbbell, Users, Building2 } from 'lucide-react';
import { ButtonNew } from '@/components/ui/ButtonNew';
import { CardNew, CardNewContent, CardNewTitle, CardNewDescription } from '@/components/ui/CardNew';

interface FacilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ icon, title, description }) => (
  <CardNew elevation="sm" hoverEffect className="flex-1 min-w-[220px]">
    <CardNewContent className="p-4 flex flex-col h-full">
      <div className="text-primary mb-2">{icon}</div>
      <CardNewTitle className="text-base mb-1">{title}</CardNewTitle>
      <CardNewDescription className="text-xs flex-grow">{description}</CardNewDescription>
      <a href="/contact" className="text-xs text-primary hover:text-primary/80 font-medium mt-2 inline-block">Contact for Booking →</a>
    </CardNewContent>
  </CardNew>
);

const StadiumFacilities: React.FC = () => {
  const facilities = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Main Pitch",
      description: "State-of-the-art 3G synthetic surface for matches and training."
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Gym",
      description: "Modern equipment and facilities available to members and public."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Hospitality Areas",
      description: "Corporate and fan hospitality spaces for matchdays and events."
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Meeting Spaces",
      description: "Professional meeting rooms and facilities for business use."
    }
  ];

  return (
    <section className="bg-[#F4F7FB] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center uppercase text-[#00105A] mb-3">Stadium Facilities</h2>
        <p className="text-center text-dark-gray mb-8 max-w-2xl mx-auto">
          Spain Park offers modern facilities for sports, events, and business use.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {facilities.map((facility, index) => (
            <FacilityCard key={index} {...facility} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <ButtonNew href="/contact" variant="accent" size="lg">
            Contact Us About Facilities
          </ButtonNew>
        </div>
      </div>
    </section>
  );
};

export default StadiumFacilities;
