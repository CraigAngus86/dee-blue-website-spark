
import React from "react";
import { cn } from "@/lib/utils";
import { Sponsor } from "@/lib/types";
import SponsorLogo from "./SponsorLogo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SponsorsShowcaseProps {
  sponsors: Sponsor[];
  variant?: "dark" | "light";
  className?: string;
  layout?: "grid" | "carousel" | "featured";
}

const SponsorsShowcase: React.FC<SponsorsShowcaseProps> = ({
  sponsors,
  variant = "dark",
  className,
  layout = "grid",
}) => {
  // Group sponsors by tier
  const mainSponsors = sponsors.filter(s => s.tier === 'main');
  const platinumSponsors = sponsors.filter(s => s.tier === 'platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const bronzeSponsors = sponsors.filter(s => s.tier === 'bronze');
  const partnerSponsors = sponsors.filter(s => s.tier === 'partner');

  console.log("Sponsors showcase:", { 
    mainCount: mainSponsors.length,
    platinumCount: platinumSponsors.length,
    goldCount: goldSponsors.length,
    silverCount: silverSponsors.length
  });

  // Featured layout with main sponsor highlighted
  if (layout === "featured" && mainSponsors.length > 0) {
    return (
      <div className={cn("w-full py-8", className)}>
        {mainSponsors.length > 0 && (
          <div className="mb-8">
            <h3 className="text-center text-lg font-semibold mb-4">Main Sponsor</h3>
            <div className="flex justify-center">
              <SponsorLogo 
                sponsor={mainSponsors[0]} 
                variant={variant} 
                size="xl"
                useContainer={true} 
                containerClassName="px-8 py-6 shadow-md"
              />
            </div>
          </div>
        )}
        
        {platinumSponsors.length > 0 && (
          <div className="mb-6">
            <h4 className="text-center text-base font-medium mb-3">Platinum Sponsors</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {platinumSponsors.map((sponsor, idx) => (
                <SponsorLogo 
                  key={idx} 
                  sponsor={sponsor} 
                  variant={variant} 
                  size="lg"
                  useContainer={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {goldSponsors.length > 0 && (
          <div className="mb-6">
            <h4 className="text-center text-base font-medium mb-3">Gold Sponsors</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {goldSponsors.map((sponsor, idx) => (
                <SponsorLogo 
                  key={idx} 
                  sponsor={sponsor} 
                  variant={variant} 
                  size="md"
                  useContainer={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {(silverSponsors.length > 0 || bronzeSponsors.length > 0 || partnerSponsors.length > 0) && (
          <div>
            <h4 className="text-center text-base font-medium mb-3">Partners & Supporters</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {[...silverSponsors, ...bronzeSponsors, ...partnerSponsors].map((sponsor, idx) => (
                <SponsorLogo 
                  key={idx} 
                  sponsor={sponsor} 
                  variant={variant} 
                  size="sm"
                  useContainer={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Carousel layout for all sponsors
  if (layout === "carousel") {
    return (
      <div className={cn("w-full py-4", className)}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {sponsors.map((sponsor, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-2 h-full">
                  <div className="flex items-center justify-center h-full p-4 bg-white rounded-md">
                    <SponsorLogo sponsor={sponsor} variant={variant} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static transform-none mx-2" />
            <CarouselNext className="relative static transform-none mx-2" />
          </div>
        </Carousel>
      </div>
    );
  }
  
  // Default grid layout
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="flex items-center justify-center p-4 bg-white rounded-md shadow-sm">
            <SponsorLogo sponsor={sponsor} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsShowcase;
