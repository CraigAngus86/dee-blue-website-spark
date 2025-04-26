
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';
import WhyPartnerSection from '@/components/commercial/WhyPartnerSection';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import MatchDayHospitalitySection from '@/components/commercial/hospitality/MatchDayHospitalitySection';
import UpcomingFixturesSection from '@/components/commercial/fixtures/UpcomingFixturesSection';
import ContactDownloadSection from '@/components/commercial/contact/ContactDownloadSection';

const CommercialOpportunitiesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Commercial Opportunities - Banks o' Dee FC</title>
        <meta 
          name="description" 
          content="Partner with Banks o' Dee FC and connect your brand with one of Aberdeen's most progressive football clubs." 
        />
      </Helmet>
      <Layout>
        <CommercialHeroSection />
        
        <div className="space-y-8 md:space-y-12">
          <WhyPartnerSection />
          <SponsorshipTiersSection />
          <MatchDayHospitalitySection />
          <UpcomingFixturesSection />
          <ContactDownloadSection />
        </div>
      </Layout>
    </>
  );
};

export default CommercialOpportunitiesPage;
