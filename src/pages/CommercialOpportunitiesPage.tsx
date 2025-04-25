
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';
import IntroSection from '@/components/commercial/IntroSection';
import SponsorshipTiersSection from '@/components/commercial/sponsorship/SponsorshipTiersSection';
import ComparisonSection from '@/components/commercial/comparison/ComparisonSection';

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
        <ComparisonSection />
        <div id="contact" className="py-12">
          {/* Contact form will go here */}
        </div>
      </Layout>
    </>
  );
};

export default CommercialOpportunitiesPage;
