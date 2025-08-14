import React from 'react';

export function FacilitiesSection() {
  const facilities = [
    {
      name: "Sultan bin Zayed Stadium",
      location: "Abu Dhabi",
      features: ["Professional pitches", "Changing facilities", "Equipment storage", "Parent viewing areas"],
      image: "sultan-bin-zayed_placeholder.jpg"
    },
    {
      name: "Al Maryah Island",
      location: "Abu Dhabi",
      features: ["Modern facilities", "Indoor training", "Youth programs", "Community access"],
      image: "al-maryah-island_placeholder.jpg"
    }
  ];

  return (
    <section className="section section--warm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-head">
          <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            Our Facilities
          </h2>
          <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
            Professional training environments across Abu Dhabi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgb(var(--white))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-md)" }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={`https://res.cloudinary.com/dlkpaw2a0/image/upload/c_fill,g_center,ar_16:9,q_auto,f_auto/v1747398181/${facility.image}`}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-heading text-h4 mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                  {facility.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgb(var(--dark-gray))" }}>
                  {facility.location}
                </p>
                
                <ul className="space-y-2">
                  {facility.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <span className="text-brand-gold mr-2">✓</span>
                      <span style={{ color: "rgb(var(--brand-black))" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="rounded-2xl p-8" style={{ background: "rgb(var(--white))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-sm)" }}>
            <h3 className="font-heading text-h3 mb-6 text-center" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Training Schedule
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-heading text-base mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>
                  Weekday Sessions
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Ages 4-8:</span><span style={{ color: "rgb(var(--brand-black))" }}>4:00 PM - 5:00 PM</span></div>
                  <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Ages 9-12:</span><span style={{ color: "rgb(var(--brand-black))" }}>5:00 PM - 6:30 PM</span></div>
                  <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Ages 13+:</span><span style={{ color: "rgb(var(--brand-black))" }}>6:30 PM - 8:00 PM</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-heading text-base mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>
                  Weekend Programs
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Saturday:</span><span style={{ color: "rgb(var(--brand-black))" }}>9:00 AM - 12:00 PM</span></div>
                  <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Sunday:</span><span style={{ color: "rgb(var(--brand-black))" }}>9:00 AM - 12:00 PM</span></div>
                  <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Match Days:</span><span style={{ color: "rgb(var(--brand-black))" }}>As scheduled</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
