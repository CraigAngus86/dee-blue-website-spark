
import { Metadata } from 'next';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';
import { WhyPartnerSection } from '@/components/commercial/WhyPartnerSection';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import MatchDayHospitalitySection from '@/components/commercial/hospitality/MatchDayHospitalitySection';
import ContactDownloadSection from '@/components/commercial/contact/ContactDownloadSection';
import UpcomingFixturesSection from '@/components/commercial/fixtures/UpcomingFixturesSection';
import ComparisonSection from '@/components/commercial/comparison/ComparisonSection';

export const metadata: Metadata = {
  title: 'Commercial Partnerships | Banks o\' Dee FC',
  description: 'Partner with Banks o\' Dee FC and grow your brand through our range of commercial and sponsorship opportunities',
};

export default function CommercialPage() {
  return (
    <>
      <CommercialHeroSection />
      <WhyPartnerSection />
      <SponsorshipTiersSection />
      <MatchDayHospitalitySection />
      <UpcomingFixturesSection />
      <ComparisonSection />
      <ContactDownloadSection />
    </>
  );
}
