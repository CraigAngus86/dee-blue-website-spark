
import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import useCloudinaryImage from '@/hooks/useCloudinaryImage';
import Section from '@/components/ui/layout/Section';
import Container from '@/components/ui/layout/Container';
import { CardNew, CardNewContent } from '@/components/ui/CardNew';

const WhyPartnerSection = () => {
  return (
    <Section 
      id="why-partner" 
      background="primary" 
      spacing="lg"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
            Why Partner with Banks o' Dee FC?
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-inter">
            Unlock unparalleled opportunities by partnering with a club at the heart of the community.
          </p>
        </div>
        
        {/* Change "white" to "light" to fix the type error */}
        <Section background="light" spacing="md" className="rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardNew elevation="md" hoverEffect>
              <CardNewContent>
                <div className="flex items-center space-x-3 mb-3">
                  <Sparkles className="text-primary" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800 font-montserrat">
                    Community Engagement
                  </h3>
                </div>
                <p className="text-gray-600">
                  Connect with a passionate local fanbase and make a real impact in the community.
                </p>
              </CardNewContent>
            </CardNew>

            <CardNew elevation="md" hoverEffect>
              <CardNewContent>
                <div className="flex items-center space-x-3 mb-3">
                  <Sparkles className="text-primary" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800 font-montserrat">
                    Extensive Brand Exposure
                  </h3>
                </div>
                <p className="text-gray-600">
                  Showcase your brand to a wide audience through various channels and promotional activities.
                </p>
              </CardNewContent>
            </CardNew>

            <CardNew elevation="md" hoverEffect>
              <CardNewContent>
                <div className="flex items-center space-x-3 mb-3">
                  <Sparkles className="text-primary" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800 font-montserrat">
                    Bespoke Partnership Packages
                  </h3>
                </div>
                <p className="text-gray-600">
                  Tailored solutions to meet your specific business objectives and marketing goals.
                </p>
              </CardNewContent>
            </CardNew>
          </div>
        </Section>
      </Container>
    </Section>
  );
};

export default WhyPartnerSection;
