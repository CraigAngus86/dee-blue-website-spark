import React from 'react';
import { Target, Dumbbell, Users, FileText } from 'lucide-react';

export function StadiumFacilities() {
  const facilities = [
    {
      icon: Target,
      title: "Main Pitch",
      description: "State-of-the-art 3G synthetic surface for matches and training."
    },
    {
      icon: Dumbbell,
      title: "Gym",
      description: "Modern equipment and facilities available to members and public."
    },
    {
      icon: Users,
      title: "Hospitality Areas",
      description: "Corporate and fan hospitality spaces for matchdays and events."
    },
    {
      icon: FileText,
      title: "Meeting Spaces",
      description: "Professional meeting rooms and facilities for business use."
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#00105A] mb-4">
          Stadium Facilities
        </h2>
        <p className="text-lg text-[#374151] max-w-3xl mx-auto">
          Spain Park offers modern facilities for sports, events, and business use.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {facilities.map((facility, index) => (
          <div key={index} className="text-center bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-[#C5E7FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <facility.icon className="w-8 h-8 text-[#00105A]" />
            </div>
            <h3 className="text-xl font-montserrat font-semibold text-[#00105A] mb-4">
              {facility.title}
            </h3>
            <p className="text-[#6b7280]">
              {facility.description}
            </p>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <button className="bg-transparent border-2 border-[#FFD700] text-[#00105A] hover:bg-[#FFD700] hover:text-[#00105A] font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
          📞 Contact for Bookings
        </button>
      </div>
    </section>
  );
}
