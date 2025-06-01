import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildSponsorLogoUrl } from '../utils/cloudinaryTransforms';

interface HeaderSponsorsBarProps {
  sponsors: any[];
}

export default function HeaderSponsorsBar({ sponsors }: HeaderSponsorsBarProps) {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="bg-[#C5E7FF]/60 py-2 border-b border-[#C5E7FF]/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end space-x-6">
          <span className="text-sm text-[#00105A] font-medium hidden sm:block">
            Proud Partners:
          </span>
          <div className="flex items-center space-x-4">
            {sponsors.map((sponsor) => (
              <Link
                key={sponsor._id}
                href={sponsor.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title={sponsor.name}
              >
                <Image
                  src={buildSponsorLogoUrl(sponsor.logo?.public_id, 'header')}
                  alt={sponsor.name}
                  width={80}
                  height={30}
                  className="object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
