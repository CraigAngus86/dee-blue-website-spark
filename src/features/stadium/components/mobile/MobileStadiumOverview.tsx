import React from 'react';
import { Users, Calendar, MapPin, Zap } from 'lucide-react';

export function MobileStadiumOverview() {
  const stats = [
    {
      icon: Users,
      title: "Capacity",
      value: "876",
      subtitle: "Seated & Standing"
    },
    {
      icon: Calendar,
      title: "Established", 
      value: "1902",
      subtitle: "Years of History"
    },
    {
      icon: Zap,
      title: "Pitch",
      value: "3G Surface",
      subtitle: "Advanced artificial surface"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Aberdeen, Scotland",
      subtitle: "Abbotswell Road"
    }
  ];

  return (
    <section className="py-16">
      {/* Same header as desktop */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#00105A] mb-4">
          Stadium Overview
        </h2>
        <p className="text-lg text-[#374151] max-w-3xl mx-auto px-4">
          Spain Park is the home of Banks o' Dee Football Club, offering state-of-the-art facilities for 
          players and supporters alike. Located in the heart of Aberdeen, our stadium has been 
          developed to provide an exceptional matchday experience.
        </p>
      </div>

      {/* Mobile Carousel */}
      <div className="relative">
        {/* Horizontal scrolling container with hidden scrollbar */}
        <div className="overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex space-x-4 px-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex-none w-[280px] text-center bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Exact same card content as desktop */}
                <div className="w-16 h-16 bg-[#C5E7FF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#00105A]" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-[#00105A] mb-2">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-[#00105A] mb-1">
                  {stat.value}
                </p>
                <p className="text-[#6b7280] text-sm">
                  {stat.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {stats.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-[#e5e7eb] transition-colors duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
