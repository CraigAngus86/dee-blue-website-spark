
import React from 'react';
import { MapPin, Car, Bus, Phone } from 'lucide-react';
import { CardNew, CardNewContent } from '@/components/ui/CardNew';

const StadiumLocation: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center uppercase text-[#00105A] mb-8">Location & Directions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Full-width Map Placeholder */}
          <div className="lg:col-span-2">
            <CardNew elevation="md" className="overflow-hidden h-full">
              <div className="relative w-full h-full min-h-[300px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(/assets/images/stadium/Spain Park.jpg)` }}
                >
                  {/* Map overlay */}
                  <div className="absolute inset-0 bg-primary/20"></div>
                  
                  {/* Location marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-accent p-3 rounded-full shadow-lg animate-pulse">
                      <MapPin className="text-primary w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </CardNew>
          </div>
          
          {/* Directions Content */}
          <div className="lg:col-span-1">
            <CardNew elevation="sm" className="h-full">
              <CardNewContent className="divide-y divide-gray-100">
                <div className="pb-4">
                  <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Address
                  </h3>
                  <p className="text-dark-gray">
                    Spain Park Stadium<br />
                    Victoria Road<br />
                    Aberdeen<br />
                    AB11 9DB
                  </p>
                </div>
                
                <div className="py-4">
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <Car className="w-5 h-5 mr-2" />
                    Getting Here
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-dark-gray mb-1">By Car</h4>
                      <p className="text-sm text-dark-gray">Located just off Victoria Road in Aberdeen. Free parking available on-site and in surrounding streets.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-dark-gray mb-1 flex items-center">
                        <Bus className="w-4 h-4 mr-1" />
                        Public Transport
                      </h4>
                      <p className="text-sm text-dark-gray">Multiple bus routes stop within walking distance of the stadium. The nearest bus stop is on Victoria Road.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-dark-gray mb-1">Parking</h4>
                      <p className="text-sm text-dark-gray">Free parking is available at the stadium with overflow parking available on adjacent streets.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-primary flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </h3>
                  <p className="text-sm text-dark-gray mt-1">For inquiries about visiting or using Spain Park facilities, please call 01224 869010.</p>
                </div>
              </CardNewContent>
            </CardNew>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StadiumLocation;
