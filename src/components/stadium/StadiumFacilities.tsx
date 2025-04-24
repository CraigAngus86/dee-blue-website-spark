
import React from 'react';
import { Football, Dumbbell, Users, Building2 } from 'lucide-react';

interface FacilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-lg font-bold font-montserrat text-primary mb-2">{title}</h3>
    <p className="text-dark-gray text-sm mb-4">{description}</p>
    <a href="/contact" className="text-sm text-primary hover:text-primary/80 font-medium">Contact for Booking →</a>
  </div>
);

const StadiumFacilities: React.FC = () => {
  const facilities = [
    {
      icon: <Football className="w-8 h-8" />,
      title: "Main Pitch",
      description: "State-of-the-art 3G synthetic surface, suitable for matches and training. Available for hire."
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Gym",
      description: "Modern equipment and facilities available to members and the public. Professional coaching available."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Hospitality Areas",
      description: "Corporate and fan hospitality spaces for matchday and private events."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Meeting Spaces",
      description: "Professional meeting rooms and conference facilities available for business use."
    }
  ];

  return (
    <section className="bg-[#F4F7FB] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center uppercase text-[#00105A] mb-3">Stadium Facilities</h2>
        <p className="text-center text-dark-gray mb-10 max-w-2xl mx-auto">
          Spain Park offers modern facilities for sports, events, and business use.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {facilities.map((facility, index) => (
            <FacilityCard key={index} {...facility} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StadiumFacilities;
