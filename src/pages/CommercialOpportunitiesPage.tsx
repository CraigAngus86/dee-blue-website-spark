
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';
import IntroSection from '@/components/commercial/IntroSection';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import ComparisonSection from '@/components/commercial/comparison/ComparisonSection';
import UpcomingFixturesSection from '@/components/commercial/fixtures/UpcomingFixturesSection';
import ContactDownloadSection from '@/components/commercial/contact/ContactDownloadSection';
import { Separator } from "@/components/ui/separator";

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
        <div className="space-y-24 md:space-y-32 mb-24">
          <IntroSection />
          <SponsorshipTiersSection />
          <div className="relative">
            <Separator className="absolute top-0 left-0 right-0 bg-gray-200" />
            <UpcomingFixturesSection />
          </div>
          <div className="relative">
            <Separator className="absolute top-0 left-0 right-0 bg-gray-200" />
            <ComparisonSection />
          </div>
          <div className="relative">
            <Separator className="absolute top-0 left-0 right-0 bg-gray-200" />
            <ContactDownloadSection />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommercialOpportunitiesPage;
