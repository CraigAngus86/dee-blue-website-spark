"use client";
import React, { useState } from 'react';
import { Target, Dumbbell, Users, FileText } from 'lucide-react';
import { CommercialEnquiryModal } from '@/features/commercial/components/CommercialEnquiryModal';

export function MobileStadiumFacilities() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-16">
        {/* Same header as desktop */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#00105A] mb-4">
            Stadium Facilities
          </h2>
          <p className="text-lg text-[#374151] max-w-3xl mx-auto px-4">
            Spain Park offers modern facilities for sports, events, and business use.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="relative mb-12">
          {/* Horizontal scrolling container with hidden scrollbar */}
          <div className="overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex space-x-4 px-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
              {facilities.map((facility, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[280px] text-center bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Exact same card structure as desktop */}
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
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {facilities.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-[#e5e7eb] transition-colors duration-300"
              />
            ))}
          </div>
        </div>

        {/* Contact CTA - Same as desktop */}
        <div className="text-center">
          <button 
            onClick={handleContactClick}
            className="bg-transparent border-2 border-[#FFD700] text-[#00105A] hover:bg-[#FFD700] hover:text-[#00105A] font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            📞 Contact for Bookings
          </button>
        </div>
      </section>

      {/* Commercial Enquiry Modal */}
      <CommercialEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preSelectedType="other"
        preSelectedPackage=""
        matchContext="Stadium Facilities Enquiry"
      />
    </>
  );
}
