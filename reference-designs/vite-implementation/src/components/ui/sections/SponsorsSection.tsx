/**
 * SponsorsSection component displays a carousel of sponsor logos and partnership information
 * @component
 * 
 * @description
 * Renders a section containing the main sponsor showcase and a carousel of secondary sponsors.
 * Also includes a call-to-action for potential new partners.
 * 
 * @requires Carousel from shadcn/ui
 * @requires SponsorLogo component
 * @requires sponsors data from SponsorsData
 * 
 * @example
 * ```tsx
 * <SponsorsSection />
 * ```
 * 
 * @limitation
 * - Carousel auto-play might need to be paused when the tab is not visible
 * - Mobile responsiveness may need adjustment for very small screens
 */

import React from "react";
import Section from "@/components/ui/layout/Section";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import { Button } from "@/components/ui/button";
import { sponsors } from "@/data/SponsorsData";
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SponsorsCarousel: React.FC = () => {
  // Get secondary sponsors
  const secondarySponsors = sponsors.filter(s => s.tier !== 'main');

  return (
    <div className="mb-10">
      <h3 className="text-center text-lg font-semibold mb-4">Club Partners</h3>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
          autoplay: true,
          delay: 5000
        }}
        className="w-full"
      >
        <CarouselContent>
          {secondarySponsors.map((sponsor, index) => (
            <CarouselItem 
              key={index} 
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1"
            >
              <div className="bg-white shadow-sm rounded-md p-4 h-24 flex items-center justify-center">
                <SponsorLogo 
                  sponsor={sponsor}
                  size="md"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static transform-none" />
          <CarouselNext className="relative static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

const SponsorsSection: React.FC = () => {
  // Get main sponsor
  const mainSponsor = sponsors.find(s => s.tier === 'main');
  
  return (
    <Section 
      className="relative bg-white overflow-hidden"
      spacing="lg"
    >
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300105A' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Club Partners & Sponsors</h2>
        </div>
        
        {/* Main Sponsor - 30% smaller */}
        {mainSponsor && (
          <div className="mb-10">
            <h3 className="text-center text-lg font-semibold text-primary mb-2">
              <span className="relative inline-block">
                <span className="text-[#FFD700]">Official</span> Main Partner
                <span className="absolute -bottom-1 left-1/2 w-16 h-0.5 bg-[#FFD700] transform -translate-x-1/2"></span>
              </span>
            </h3>
            <div className="flex justify-center">
              <div 
                className="bg-gradient-to-b from-white to-[#f8f9fa] shadow-md rounded-md p-4 inline-flex items-center justify-center transition-transform duration-300 hover:shadow-lg"
                style={{ maxWidth: "50%" }}
              >
                <SponsorLogo 
                  sponsor={mainSponsor} 
                  size="lg"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Secondary Sponsors Carousel */}
        <SponsorsCarousel />
        
        {/* Partnership CTA - Simplified button */}
        <div className="text-center mt-8 mb-4">
          <Button 
            className="bg-[#FFD700] text-primary hover:brightness-110 transition-all font-semibold text-base py-6 px-8 shadow-md"
          >
            Become Our Partner
            <ExternalLink size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default SponsorsSection;
