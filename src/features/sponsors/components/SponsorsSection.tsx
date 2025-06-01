import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildSponsorLogoUrl } from '../utils/cloudinaryTransforms';
import { SanitySponsors } from '../utils/sanityQueries';

interface SponsorsSectionProps {
  sponsors: SanitySponsors;
}

export default function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  const hasPrincipal = sponsors.principal.length > 0;
  const hasMain = sponsors.main.length > 0;
  const hasPartners = sponsors.partner.length > 0;

  if (!hasPrincipal && !hasMain && !hasPartners) {
    return (
      <div className="py-8 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#00105A] mb-4">Our Partners</h2>
        <p className="text-[#6b7280]">Partner with Banks o' Dee FC</p>
        <Link 
          href="/commercial" 
          className="inline-block mt-4 bg-[#00105A] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#FFD700] hover:text-[#00105A] transition-colors"
        >
          Become a Partner
        </Link>
      </div>
    );
  }

  return (
    <div className="py-2 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Tighter spacing to principal */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-[#00105A]">Our Partners</h2>
        </div>

        {/* Principal Partners - Even smaller container */}
        {hasPrincipal && (
          <div className="mb-2 flex justify-center">
            <div className="grid grid-cols-1 gap-2">
              {sponsors.principal.map((sponsor) => (
                <Link
                  key={sponsor._id}
                  href={sponsor.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                  title={sponsor.name}
                >
                  <div className="w-64 h-28 flex items-center justify-center">
                    <Image
                      src={buildSponsorLogoUrl(sponsor.logo?.public_id, 'principal')}
                      alt={sponsor.name}
                      width={400}
                      height={200}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Sponsors - Even smaller container */}
        {hasMain && (
          <div className="mb-2 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
              {sponsors.main.map((sponsor) => (
                <Link
                  key={sponsor._id}
                  href={sponsor.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                  title={sponsor.name}
                >
                  <div className="w-56 h-28 flex items-center justify-center">
                    <Image
                      src={buildSponsorLogoUrl(sponsor.logo?.public_id, 'main')}
                      alt={sponsor.name}
                      width={320}
                      height={160}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Official Partners - More generous spacing */}
        {hasPartners && (
          <div className="mb-4 flex justify-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 max-w-4xl">
              {sponsors.partner.map((sponsor) => (
                <Link
                  key={sponsor._id}
                  href={sponsor.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                  title={sponsor.name}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src={buildSponsorLogoUrl(sponsor.logo?.public_id, 'partner')}
                      alt={sponsor.name}
                      width={120}
                      height={120}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-4">
          <Link 
            href="/commercial" 
            className="inline-block bg-[#FFD700] text-[#00105A] px-8 py-3 rounded-md font-bold hover:bg-[#00105A] hover:text-white transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </div>
  );
}
