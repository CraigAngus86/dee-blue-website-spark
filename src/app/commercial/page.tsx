
import { Metadata } from 'next';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';
import WhyPartnerSection from '@/components/commercial/WhyPartnerSection';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import MatchDayHospitalitySection from '@/components/commercial/hospitality/MatchDayHospitalitySection';
import ContactDownloadSection from '@/components/commercial/contact/ContactDownloadSection';

export const metadata: Metadata = {
  title: 'Commercial Opportunities | Banks o\' Dee FC',
  description: 'Partner with Banks o\' Dee FC and connect your brand with one of Aberdeen\'s most progressive football clubs.',
};

export default function CommercialPage() {
  return (
    <main className="flex-grow">
      <CommercialHeroSection />
      <div className="space-y-8 md:space-y-12">
        <WhyPartnerSection />
        <SponsorshipTiersSection />
        <MatchDayHospitalitySection />
        <ContactDownloadSection />
      </div>
    </main>
  );
}
