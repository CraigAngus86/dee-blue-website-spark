
import React from 'react';
import { MapPin, Car, Bus, Phone } from 'lucide-react';
import { CardNew, CardNewContent } from '@/components/ui/CardNew';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Section from '@/components/ui/layout/Section';
import Container from '@/components/ui/layout/Container';

const StadiumLocation: React.FC = () => {
  return (
    <Section background="light" spacing="md">
      <Container>
        <h2 className="text-3xl font-bold text-center uppercase text-[#00105A] mb-8">Location & Directions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CardNew elevation="md" className="overflow-hidden h-full">
              <div className="relative w-full h-full min-h-[400px]">
                <img 
                  src="/lovable-uploads/e0c67a5a-0283-454f-befc-81d2b10a22cc.png"
                  alt="Spain Park Location Map"
                  className="w-full h-full object-cover"
                />
                {/* No pins added */}
              </div>
            </CardNew>
          </div>
          
          <div className="lg:col-span-1">
            <CardNew elevation="sm" className="h-full">
              <CardNewContent className="divide-y divide-gray-100">
                <div className="pb-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    <MapPin className="w-5 h-5 inline-block mr-2" />
                    Address
                  </h3>
                  <p className="text-dark-gray">
                    Spain Park Stadium<br />
                    Victoria Road<br />
                    Aberdeen<br />
                    AB11 9DB
                  </p>
                </div>
                
                <div className="py-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    <Car className="w-5 h-5 inline-block mr-2" />
                    Getting Here
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-dark-gray mb-2">By Car</h4>
                      <p className="text-sm text-dark-gray">Located just off Victoria Road in Aberdeen. Free parking available on-site and in surrounding streets.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-dark-gray mb-2">
                        <Bus className="w-4 h-4 inline-block mr-1" />
                        Public Transport
                      </h4>
                      <p className="text-sm text-dark-gray">Multiple bus routes stop within walking distance of the stadium. The nearest bus stop is on Victoria Road.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-dark-gray mb-2">Parking</h4>
                      <p className="text-sm text-dark-gray">Free parking is available at the stadium with overflow parking available on adjacent streets.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 text-center">
                  <h3 className="text-lg font-bold text-primary">
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Contact
                  </h3>
                  <p className="text-sm text-dark-gray mt-2">For inquiries about visiting or using Spain Park facilities, please call 01224 869010.</p>
                </div>
              </CardNewContent>
            </CardNew>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default StadiumLocation;
