"use client";
import React, { useState } from 'react';
import { CommercialHero } from '@/features/commercial/components/CommercialHero';
import { WhyPartnerWithUs } from '@/features/commercial/components/WhyPartnerWithUs';
import { SponsorshipOpportunities } from '@/features/commercial/components/SponsorshipOpportunities';
import { MatchDayHospitality } from '@/features/commercial/components/MatchDayHospitality';
import { UpcomingHospitality } from '@/features/commercial/components/UpcomingHospitality';
import { SponsorTestimonials } from '@/features/commercial/components/SponsorTestimonials';
import { CommercialEnquiryModal } from '@/features/commercial/components/CommercialEnquiryModal';

// Mobile Components
import { MobileWhyPartnerWithUs } from '@/features/commercial/components/mobile/MobileWhyPartnerWithUs';
import { MobileSponsorshipOpportunities } from '@/features/commercial/components/mobile/MobileSponsorshipOpportunities';
import { MobileMatchDayHospitality } from '@/features/commercial/components/mobile/MobileMatchDayHospitality';

export default function CommercialPage() {
  // Modal state management (following Fan Zone pattern)
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<{
    type?: string;
    package?: string;
    match?: string;
  }>({});

  // Modal handlers
  const handleEnquiryClick = (type?: string, packageName?: string, matchContext?: string) => {
    setModalContext({
      type: type || '',
      package: packageName || '',
      match: matchContext || ''
    });
    setEnquiryModalOpen(true);
  };

  const handleCloseModal = () => {
    setEnquiryModalOpen(false);
    setModalContext({});
  };

  return (
    <main className="min-h-screen">
      <CommercialHero />

      {/* Desktop Versions */}
      <div className="hidden md:block">
        <WhyPartnerWithUs onPartnershipClick={() => handleEnquiryClick()} />
        <SponsorshipOpportunities
          onSponsorshipClick={(type) => handleEnquiryClick('sponsorship', type)}
          onDiscussOptions={() => handleEnquiryClick('sponsorship')}
        />
        <MatchDayHospitality
          onPackageClick={(pkg) => handleEnquiryClick('hospitality', pkg)}
        />
      </div>

      {/* Mobile Versions */}
      <div className="block md:hidden">
        <MobileWhyPartnerWithUs onPartnershipClick={() => handleEnquiryClick()} />
        <MobileSponsorshipOpportunities
          onSponsorshipClick={(type) => handleEnquiryClick('sponsorship', type)}
          onDiscussOptions={() => handleEnquiryClick('sponsorship')}
        />
        <MobileMatchDayHospitality
          onPackageClick={(pkg) => handleEnquiryClick('hospitality', pkg)}
        />
      </div>

      {/* Unchanged Sections - Work on Both Desktop & Mobile */}
      <UpcomingHospitality
        onEnquireClick={(matchId, homeTeam, awayTeam) =>
          handleEnquiryClick('hospitality', '', `${homeTeam} vs ${awayTeam}`)
        }
      />
      <SponsorTestimonials onPartnershipClick={() => handleEnquiryClick()} />

      {/* Modal */}
      <CommercialEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={handleCloseModal}
        preSelectedType={modalContext.type}
        preSelectedPackage={modalContext.package}
        matchContext={modalContext.match}
      />
    </main>
  );
}
