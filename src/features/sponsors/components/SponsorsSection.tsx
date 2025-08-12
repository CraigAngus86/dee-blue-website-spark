import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/sections/SectionHeader';
import { buildSponsorLogoUrl } from '../utils/cloudinaryTransforms';
import type { SanitySponsors } from '../utils/sanityQueries';

interface SponsorsSectionProps {
  sponsors: SanitySponsors;
}

export default function SponsorsSection({ sponsors }: SponsorsSectionProps) {
  const principal = sponsors?.principal ?? [];
  const main = sponsors?.main ?? [];
  const partner = sponsors?.partner ?? [];

  const hasPrincipal = principal.length > 0;
  const hasMain = main.length > 0;
  const hasPartners = partner.length > 0;

  const CardWrap: React.FC<{ href?: string; title: string; children: React.ReactNode }> = ({
    href,
    title,
    children,
  }) =>
    href ? (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="block transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={`Visit ${title}`}
        title={title}
      >
        {children}
      </Link>
    ) : (
      <div className="block" aria-label={title} title={title}>
        {children}
      </div>
    );

  // Empty state (centered header + centered CTA)
  if (!hasPrincipal && !hasMain && !hasPartners) {
    return (
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Our Partners"
          subtitle="Partner with Baynounah SC to elevate football in the Western Region."
          align="center"
          showAccentBar={false}
          className="justify-center"
          titleClassName="mb-0"
          subtitleClassName="max-w-2xl mx-auto"
        />
        <div className="mt-6 text-center">
          <Link
            href="/commercial"
            className="inline-block rounded-lg px-6 py-3 font-semibold text-black bg-brand-gold border-2 border-brand-gold hover:bg-brand-black hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Header centered, no accent */}
      <SectionHeader
        title="Our Partners"
        align="center"
        showAccentBar={false}
        className="justify-center"
        titleClassName="mb-0"
      />

      {/* Principal Partners */}
      {hasPrincipal && (
        <section aria-label="Principal Partners" className="mt-4 mb-3 flex justify-center">
          <div className="grid grid-cols-1 gap-3">
            {principal.map((s) => (
              <CardWrap key={s._id} href={s.website || undefined} title={s.name}>
                <div className="w-64 h-28 md:w-72 md:h-32 flex items-center justify-center">
                  <Image
                    src={buildSponsorLogoUrl(s.logo?.public_id, 'principal')}
                    alt={`Sponsor: ${s.name}`}
                    width={400}
                    height={200}
                    className="object-contain max-w-full max-h-full"
                    sizes="(min-width:1024px) 400px, 70vw"
                    priority
                    decoding="async"
                  />
                </div>
              </CardWrap>
            ))}
          </div>
        </section>
      )}

      {/* Main Sponsors */}
      {hasMain && (
        <section aria-label="Main Sponsors" className="mb-3 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl">
            {main.map((s) => (
              <CardWrap key={s._id} href={s.website || undefined} title={s.name}>
                <div className="w-56 h-28 md:w-64 md:h-28 flex items-center justify-center">
                  <Image
                    src={buildSponsorLogoUrl(s.logo?.public_id, 'main')}
                    alt={`Sponsor: ${s.name}`}
                    width={320}
                    height={160}
                    className="object-contain max-w-full max-h-full"
                    sizes="(min-width:1024px) 320px, 60vw"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </CardWrap>
            ))}
          </div>
        </section>
      )}

      {/* Official Partners */}
      {hasPartners && (
        <section aria-label="Official Partners" className="mb-4 flex justify-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4 md:gap-5 max-w-4xl">
            {partner.map((s) => (
              <CardWrap key={s._id} href={s.website || undefined} title={s.name}>
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <Image
                    src={buildSponsorLogoUrl(s.logo?.public_id, 'partner')}
                    alt={`Sponsor: ${s.name}`}
                    width={120}
                    height={120}
                    className="object-contain max-w-full max-h-full"
                    sizes="(min-width:1024px) 120px, 33vw"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              </CardWrap>
            ))}
          </div>
        </section>
      )}

      {/* CTA centered */}
      <div className="text-center mt-6">
        <Link
          href="/commercial"
          className="inline-block rounded-lg px-6 py-3 font-semibold text-black bg-brand-gold border-2 border-brand-gold hover:bg-brand-black hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Partner With Us
        </Link>
      </div>
    </div>
  );
}
