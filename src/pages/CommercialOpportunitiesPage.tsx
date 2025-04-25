
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';
import IntroSection from '@/components/commercial/IntroSection';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import ComparisonSection from '@/components/commercial/comparison/ComparisonSection';
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
        <IntroSection />
        <SponsorshipTiersSection />
        <UpcomingFixturesSection />
        <ComparisonSection />
        <ContactDownloadSection />
      </Layout>
    </>
  );
};

export default CommercialOpportunitiesPage;
