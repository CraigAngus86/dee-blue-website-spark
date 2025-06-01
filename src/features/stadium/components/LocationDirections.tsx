import React from 'react';
import { MapPin, Car, Bus, ParkingCircle } from 'lucide-react';

export function LocationDirections() {
  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#00105A] mb-4">
          LOCATION & DIRECTIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Placeholder */}
        <div className="bg-[#e5e7eb] rounded-lg h-[400px] flex items-center justify-center">
          <p className="text-[#6b7280] text-lg">Mapbox Integration Area</p>
        </div>

        {/* Location Information */}
        <div className="space-y-8">
          {/* Address */}
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-[#00105A] mr-3" />
              <h3 className="text-xl font-montserrat font-semibold text-[#00105A]">
                Address
              </h3>
            </div>
            <div className="ml-9">
              <p className="text-[#374151] font-semibold">Spain Park Stadium</p>
              <p className="text-[#374151]">Abbotswell Road</p>
              <p className="text-[#374151]">Aberdeen</p>
              <p className="text-[#374151]">AB12 3AB</p>
            </div>
          </div>

          {/* Getting Here */}
          <div>
            <div className="flex items-center mb-4">
              <Car className="w-6 h-6 text-[#00105A] mr-3" />
              <h3 className="text-xl font-montserrat font-semibold text-[#00105A]">
                Getting Here
              </h3>
            </div>
            <div className="ml-9 space-y-4">
              <div>
                <p className="font-semibold text-[#374151]">By Car</p>
                <p className="text-[#6b7280]">
                  Located just off Abbotswell Road in Aberdeen. Free parking available on-site 
                  and in surrounding streets.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#374151]">🚌 Public Transport</p>
                <p className="text-[#6b7280]">
                  Multiple bus routes stop within walking distance of the stadium. 
                  The nearest bus stop is on Abbotswell Road.
                </p>
              </div>
            </div>
          </div>

          {/* Parking */}
          <div>
            <div className="flex items-center mb-4">
              <ParkingCircle className="w-6 h-6 text-[#00105A] mr-3" />
              <h3 className="text-xl font-montserrat font-semibold text-[#00105A]">
                Parking
              </h3>
            </div>
            <div className="ml-9">
              <p className="text-[#6b7280]">
                Free parking is available at the stadium with overflow parking 
                available on adjacent streets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
