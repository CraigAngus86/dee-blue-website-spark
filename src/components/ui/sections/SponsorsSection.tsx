
import React from "react";
import Section from "@/components/ui/layout/Section";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import { Button } from "@/components/ui/button";
import { getMainSponsor, getSponsorsByTier } from "@/data/SponsorsData";
import { ExternalLink } from "lucide-react";

const SponsorsCarousel: React.FC = () => {
  // Get all non-main sponsors
  const secondarySponsors = [
    ...getSponsorsByTier("platinum"),
    ...getSponsorsByTier("gold"),
    ...getSponsorsByTier("silver")
  ];

  return (
    <div className="mb-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 md:gap-16">
        {secondarySponsors.map((sponsor, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center"
          >
            <SponsorLogo 
              sponsor={sponsor}
              size="lg"
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const SponsorsSection: React.FC = () => {
  const mainSponsor = getMainSponsor();
  
  return (
    <Section 
      className="relative bg-[#1A1F2C] overflow-hidden"
      spacing="xl"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Partners</h2>
        </div>
        
        {/* Main Sponsor */}
        {mainSponsor && (
          <div className="mb-20">
            <div className="flex justify-center">
              <div 
                className="inline-flex items-center justify-center"
                style={{ maxWidth: "85%" }}
              >
                <SponsorLogo 
                  sponsor={mainSponsor} 
                  size="xl"
                  variant="light"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Secondary Sponsors Grid */}
        <SponsorsCarousel />
        
        {/* Partnership CTA */}
        <div className="text-center">
          <Button 
            className="bg-white text-[#1A1F2C] hover:bg-white/90 transition-all font-semibold text-base py-6 px-8"
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
