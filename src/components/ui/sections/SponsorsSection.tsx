
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { sponsors, getMainSponsor } from "@/data/SponsorsData";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Container from "@/components/ui/layout/Container";
import Section from "@/components/ui/layout/Section";

const SponsorsSection: React.FC = () => {
  const mainSponsor = getMainSponsor();
  const secondarySponsors = sponsors.filter(s => s.tier !== "main");

  return (
    <Section background="white" spacing="lg" className="border-t border-gray-100">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-primary mb-2">Club Partners & Sponsors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our success on and off the pitch is made possible through the generous support of our sponsors and partners.
          </p>
        </div>

        {/* Main Sponsor Display */}
        {mainSponsor && (
          <div className="mb-12">
            <div className="text-center mb-3">
              <span className="inline-block text-sm font-semibold text-primary px-4 py-1 bg-secondary rounded-full">
                Official Main Partner
              </span>
            </div>
            <div className="flex justify-center">
              <div 
                className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-102 duration-300 border border-gray-100"
                style={{ maxWidth: "400px" }}
              >
                <SponsorLogo 
                  sponsor={mainSponsor} 
                  size="xl"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        )}

        {/* Secondary Sponsors Carousel */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-primary mb-4 text-center">Our Valued Partners</h3>
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {secondarySponsors.map((sponsor, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div className="p-2">
                    <div className="bg-white rounded-lg h-full border border-gray-100 shadow-sm p-4 flex items-center justify-center">
                      <SponsorLogo
                        sponsor={sponsor}
                        size="md"
                        className="transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Partnership CTA */}
        <div className="bg-light-gray rounded-lg p-6 sm:p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-primary mb-2">Become a Club Partner</h3>
          <p className="mb-4 text-gray-600">
            Join our community of supporters and gain exposure to our passionate fanbase. 
            Partnership opportunities are available at various levels to suit your business.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            Contact Us About Partnerships
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default SponsorsSection;
