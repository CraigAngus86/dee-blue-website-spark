
import React from "react";
import Section from "@/components/ui/layout/Section";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import { Button } from "@/components/ui/button";
import { getMainSponsor, getSponsorsByTier } from "@/data/SponsorsData";
import { Sponsor } from "@/lib/types";
import { ExternalLink } from "lucide-react";

const SponsorsSection: React.FC = () => {
  // Get main sponsor and other sponsors
  const mainSponsor = getMainSponsor();
  const platinumSponsors = getSponsorsByTier("platinum");
  const goldSponsors = getSponsorsByTier("gold");
  const silverSponsors = getSponsorsByTier("silver");
  
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
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Club Partners & Sponsors</h2>
          <p className="text-gray max-w-2xl mx-auto">
            Banks o' Dee FC is supported by these outstanding local and regional businesses
          </p>
        </div>
        
        {/* Main Sponsor */}
        {mainSponsor && (
          <div className="mb-12">
            <h3 className="text-center text-lg font-semibold mb-4">Official Main Partner</h3>
            <div className="flex justify-center">
              <div 
                className="bg-white shadow-md rounded-md p-6 inline-flex items-center justify-center transition-transform duration-300 hover:scale-102"
              >
                <SponsorLogo 
                  sponsor={mainSponsor} 
                  size="xl"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Secondary Sponsors */}
        <div className="mb-12">
          <h3 className="text-center text-lg font-semibold mb-6">Club Partners</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[...platinumSponsors, ...goldSponsors, ...silverSponsors].map((sponsor: Sponsor, index) => (
              <div 
                key={index}
                className="bg-white shadow-sm rounded-md p-4 flex items-center justify-center transition-transform duration-300 hover:scale-102"
              >
                <SponsorLogo 
                  sponsor={sponsor} 
                  size="lg"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Partnership CTA */}
        <div className="text-center bg-light-gray rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-primary mb-3">Become a Club Partner</h3>
          <p className="mb-6 text-gray-600">
            Join our growing family of sponsors and gain visibility while supporting Banks o' Dee FC. 
            Our partnership packages offer excellent exposure to our engaged fanbase.
          </p>
          <Button 
            className="bg-secondary text-primary hover:bg-secondary-dark flex items-center gap-2"
          >
            Contact Us About Partnerships
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default SponsorsSection;
