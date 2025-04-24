
import React from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import { Button } from "@/components/ui/button";
import { getMainSponsor, getSponsorsByTier } from "@/data/SponsorsData";
import { ExternalLink } from "lucide-react";
import Grid from "@/components/ui/layout/Grid";

// Main Partner Component
const MainPartnerDisplay: React.FC = () => {
  const mainSponsor = getMainSponsor();
  
  if (!mainSponsor) return null;
  
  return (
    <Section 
      className="relative py-16"
      background="primary"
    >
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Container className="relative z-10 text-center">
        <div className="mb-8">
          <h3 className="relative inline-block text-lg font-semibold text-[#FFD700]">
            Official Main Partner
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFD700]"></span>
          </h3>
        </div>
        
        <div className="flex justify-center items-center">
          <div 
            className="bg-primary-dark/30 backdrop-blur-sm shadow-xl p-10 rounded-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <SponsorLogo 
              sponsor={mainSponsor} 
              variant="light"
              size="xl"
              className="max-w-xs mx-auto h-auto"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Club Partners Component with Grid Layout
const ClubPartnersDisplay: React.FC = () => {
  // Get secondary sponsors
  const platinumSponsors = getSponsorsByTier("platinum");
  const goldSponsors = getSponsorsByTier("gold");
  const silverSponsors = getSponsorsByTier("silver");
  const bronzeSponsors = getSponsorsByTier("bronze");
  
  const allPartners = [...platinumSponsors, ...goldSponsors, ...silverSponsors, ...bronzeSponsors];
  
  const partnersByTier = [
    { tier: "Platinum Partners", sponsors: platinumSponsors },
    { tier: "Gold Partners", sponsors: goldSponsors },
    { tier: "Silver Partners", sponsors: silverSponsors },
    { tier: "Bronze Partners", sponsors: bronzeSponsors }
  ].filter(group => group.sponsors.length > 0);
  
  return (
    <Section 
      className="relative bg-white py-16"
    >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Club Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to be supported by these fantastic organizations
          </p>
        </div>
        
        {/* Display partners by tier */}
        {partnersByTier.map((group, idx) => (
          <div key={group.tier} className={`mb-12 ${idx !== 0 ? 'pt-8' : ''}`}>
            <h3 className="text-lg font-semibold text-primary text-center mb-8 relative">
              <span className="relative inline-block">
                {group.tier}
                <span className="absolute -bottom-1 left-1/2 w-16 h-0.5 bg-[#FFD700] transform -translate-x-1/2"></span>
              </span>
            </h3>
            
            <Grid
              columns={{ default: 2, sm: 2, md: 3, lg: 4 }}
              gap="lg"
              className="items-center"
            >
              {group.sponsors.map((sponsor, index) => (
                <div key={index} className="flex justify-center">
                  <div className="bg-white p-6 rounded-md shadow-sm w-full h-full flex items-center justify-center transform transition-all duration-300 hover:shadow-md hover:scale-105">
                    <SponsorLogo 
                      sponsor={sponsor}
                      variant="dark"
                      size="md"
                    />
                  </div>
                </div>
              ))}
            </Grid>
          </div>
        ))}
        
        {/* Partnership CTA */}
        <div className="text-center mt-16">
          <Button 
            className="bg-[#FFD700] text-primary hover:bg-[#e6c200] transition-all font-semibold py-6 px-8 shadow-md"
          >
            Become A Partner
            <ExternalLink size={16} className="ml-2" />
          </Button>
        </div>
      </Container>
    </Section>
  );
};

const SponsorsSection: React.FC = () => {
  return (
    <>
      <MainPartnerDisplay />
      <ClubPartnersDisplay />
    </>
  );
};

export default SponsorsSection;
