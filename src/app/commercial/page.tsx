"use client";
import React, { useState } from "react";

import { CommercialHero } from "@/features/commercial/components/CommercialHero";
import { WhyPartnerWithUs } from "@/features/commercial/components/WhyPartnerWithUs";
import { SponsorshipOpportunities } from "@/features/commercial/components/SponsorshipOpportunities";
import { DigitalGrowthStory } from "@/features/commercial/components/DigitalGrowthStory";
import { SponsorTestimonials } from "@/features/commercial/components/SponsorTestimonials";
import { CommercialEnquiryModal } from "@/features/commercial/components/CommercialEnquiryModal";

export default function CommercialPage() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<{
    type?: string;
    package?: string;
    context?: string;
  }>({});

  const handleEnquiryClick = (type?: string, packageName?: string, context?: string) => {
    setModalContext({
      type: type || "general",
      package: packageName || "",
      context: context || "",
    });
    setEnquiryModalOpen(true);
  };

  const handleCloseModal = () => {
    setEnquiryModalOpen(false);
    setModalContext({});
  };

  return (
    <main className="min-h-screen">
      {/* 1) Hero */}
      <CommercialHero />

      {/* 2) Why Partner */}
      <WhyPartnerWithUs onPartnershipClick={() => handleEnquiryClick("partnership")} />

      {/* 3) Partnership Opportunities */}
      <SponsorshipOpportunities onDiscussOptions={() => handleEnquiryClick("sponsorship", "custom")} />

      {/* 4) Digital Growth */}
      <DigitalGrowthStory onPartnershipClick={() => handleEnquiryClick("digital")} />

      {/* 5) Testimonial */}
      <SponsorTestimonials onPartnershipClick={() => handleEnquiryClick("partnership")} />

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
