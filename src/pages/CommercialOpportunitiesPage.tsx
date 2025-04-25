
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import CommercialHeroSection from '@/components/commercial/CommercialHeroSection';

const CommercialOpportunitiesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Commercial Opportunities - Banks o' Dee FC</title>
        <meta name="description" content="Partner with Banks o' Dee FC and connect your brand with one of Aberdeen's most progressive football clubs." />
      </Helmet>
      <Layout>
        <CommercialHeroSection />
        <div id="sponsorship-options" className="py-12">
          {/* Sponsorship options section will go here */}
        </div>
        <div id="contact" className="py-12">
          {/* Contact form will go here */}
        </div>
      </Layout>
    </>
  );
};

export default CommercialOpportunitiesPage;
