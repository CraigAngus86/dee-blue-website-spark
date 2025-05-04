
import React from "react";
import { Metadata } from "next";
import HeroSection from "@/components/ui/hero/HeroSection";
import CommercialCallToActionSection from "@/components/commercial/CTA/CommercialCallToActionSection";
import AdPackagesSection from "@/components/commercial/advertising/AdPackagesSection";
import SponsorshipPackagesSection from "@/components/commercial/sponsorship/SponsorshipPackagesSection";
import MatchDayHospitalitySection from "@/components/commercial/hospitality/MatchDayHospitalitySection";
import ContactDownloadSection from "@/components/commercial/contact/ContactDownloadSection";
import UpcomingFixturesSection from "@/components/commercial/fixtures/UpcomingFixturesSection";
import ComparisonSection from "@/components/commercial/comparison/ComparisonSection";

export const metadata: Metadata = {
  title: "Commercial Opportunities | Banks o' Dee FC",
  description:
    "Discover commercial partnership opportunities with Banks o' Dee Football Club - sponsorships, advertising, and hospitality packages.",
};

export default async function CommercialPage() {
  // This would be fetched from your API in a real application
  const dummyMatches = [
    // Add dummy match data here if needed
  ];

  return (
    <main>
      <HeroSection
        title="Commercial Partnerships"
        subtitle="Sponsorship, advertising and hospitality opportunities"
        imageSrc="/images/stadium/main-stand.jpg"
        imageAlt="Banks o' Dee Stadium"
        overlay="dark"
      />

      <CommercialCallToActionSection />
      
      <SponsorshipPackagesSection />
      
      <AdPackagesSection />
      
      <MatchDayHospitalitySection />
      
      {dummyMatches.length > 0 && (
        <UpcomingFixturesSection matches={dummyMatches} />
      )}
      
      <ComparisonSection />
      
      <ContactDownloadSection />
    </main>
  );
}
