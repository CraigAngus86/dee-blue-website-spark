
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
import { getUpcomingMatches } from "@/utils/cross-system/match";
import { Match } from "@/types/match";

export const metadata: Metadata = {
  title: "Commercial Opportunities | Banks o' Dee FC",
  description:
    "Discover commercial partnership opportunities with Banks o' Dee Football Club - sponsorships, advertising, and hospitality packages.",
};

export default async function CommercialPage() {
  // Fetch upcoming matches for the fixtures section
  let matches: Match[] = [];
  
  try {
    matches = await getUpcomingMatches(3);
  } catch (error) {
    console.error("Error fetching matches for commercial page:", error);
    // Continue with empty matches array
  }

  return (
    <main>
      <HeroSection
        title="Commercial Partnerships"
        imageSrc="/images/stadium/main-stand.jpg"
        imageAlt="Banks o' Dee Stadium"
        overlay="dark"
      />

      <CommercialCallToActionSection />
      
      <SponsorshipPackagesSection />
      
      <AdPackagesSection />
      
      <MatchDayHospitalitySection />
      
      {matches.length > 0 && (
        <UpcomingFixturesSection matches={matches} />
      )}
      
      <ComparisonSection />
      
      <ContactDownloadSection />
    </main>
  );
}
