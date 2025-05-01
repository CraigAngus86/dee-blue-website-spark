import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

interface SponsorsSectionProps {
  sponsors: any[];
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors = [] }) => {
  // Filter for featured sponsors first, then other sponsors
  const featuredSponsors = sponsors.filter(sponsor => sponsor.featured);
  const otherSponsors = sponsors.filter(sponsor => !sponsor.featured);

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Our Sponsors" 
          subtitle="Supporting Banks o' Dee FC" 
        />
        
        {/* Featured Sponsors */}
        {featuredSponsors.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">Featured Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {featuredSponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex flex-col items-center">
                  <div className="h-24 w-full relative mb-4">
                    <Link href={sponsor.website || '#'} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={sponsor.logo_url || "/placeholder.svg"}
                        alt={sponsor.name}
                        fill
                        className="object-contain"
                      />
                    </Link>
                  </div>
                  <h4 className="text-center font-medium">{sponsor.name}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Other Sponsors */}
        {otherSponsors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">Supporting Partners</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-items-center opacity-80">
              {otherSponsors.map((sponsor) => (
                <div key={sponsor.id} className="h-16 w-full relative">
                  <Link href={sponsor.website || '#'} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={sponsor.logo_url || "/placeholder.svg"}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link 
            href="/commercial" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
