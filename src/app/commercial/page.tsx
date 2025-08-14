"use client";
import React, { useState } from 'react';
import { CommercialHero } from '@/features/commercial/components/CommercialHero';
import { WhyPartnerWithUs } from '@/features/commercial/components/WhyPartnerWithUs';
import { SponsorshipOpportunities } from '@/features/commercial/components/SponsorshipOpportunities';
import { AcademyPartnership } from '@/features/commercial/AcademyPartnership';
import { DigitalGrowthStory } from '@/features/commercial/DigitalGrowthStory';
import { HeritageValues } from '@/features/commercial/HeritageValues';
import { SponsorTestimonials } from '@/features/commercial/components/SponsorTestimonials';
import { CommercialEnquiryModal } from '@/features/commercial/components/CommercialEnquiryModal';

// Mobile Components
import { MobileWhyPartnerWithUs } from '@/features/commercial/components/mobile/MobileWhyPartnerWithUs';
import { MobileSponsorshipOpportunities } from '@/features/commercial/components/mobile/MobileSponsorshipOpportunities';

export default function CommercialPage() {
  // Simplified modal state management
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<{
    type?: string;
    package?: string;
    context?: string;
  }>({});

  // Modal handlers - simplified without complex hospitality matching
  const handleEnquiryClick = (type?: string, packageName?: string, context?: string) => {
    setModalContext({
      type: type || 'general',
      package: packageName || '',
      context: context || ''
    });
    setEnquiryModalOpen(true);
  };

  const handleCloseModal = () => {
    setEnquiryModalOpen(false);
    setModalContext({});
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - Always Full Width */}
      <CommercialHero />

      {/* Desktop Versions */}
      <div className="hidden md:block">
        <WhyPartnerWithUs 
          onPartnershipClick={() => handleEnquiryClick('partnership')} 
        />
        
        <SponsorshipOpportunities
          onDiscussOptions={() => handleEnquiryClick('sponsorship', 'custom')}
        />
        
        <AcademyPartnership
          onPartnershipClick={() => handleEnquiryClick('academy')}
        />
        
        <DigitalGrowthStory
          onPartnershipClick={() => handleEnquiryClick('digital')}
        />
        
        <HeritageValues
          onPartnershipClick={() => handleEnquiryClick('heritage')}
        />
        
        <SponsorTestimonials 
          onPartnershipClick={() => handleEnquiryClick('partnership')} 
        />
      </div>

      {/* Mobile Versions */}
      <div className="block md:hidden">
        <MobileWhyPartnerWithUs 
          onPartnershipClick={() => handleEnquiryClick('partnership')} 
        />
        
        <MobileSponsorshipOpportunities
          onSponsorshipClick={(type) => handleEnquiryClick('sponsorship', type)}
          onDiscussOptions={() => handleEnquiryClick('sponsorship', 'custom')}
        />
        
        {/* New components work well on mobile as designed */}
        <AcademyPartnership
          onPartnershipClick={() => handleEnquiryClick('academy')}
        />
        
        <DigitalGrowthStory
          onPartnershipClick={() => handleEnquiryClick('digital')}
        />
        
        <HeritageValues
          onPartnershipClick={() => handleEnquiryClick('heritage')}
        />
        
        <SponsorTestimonials 
          onPartnershipClick={() => handleEnquiryClick('partnership')} 
        />
      </div>

      {/* Enquiry Modal */}
      <CommercialEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={handleCloseModal}
        preSelectedType={modalContext.type}
        preSelectedPackage={modalContext.package}
        matchContext={modalContext.context}
      />
    </main>
  );
}