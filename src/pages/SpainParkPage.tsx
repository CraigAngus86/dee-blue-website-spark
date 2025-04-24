
import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from 'react-helmet-async';
import StadiumHero from '@/components/stadium/StadiumHero';
import StadiumOverview from '@/components/stadium/StadiumOverview';

// Section configuration type
interface SectionConfig {
  id: string;
  type: 'hero' | 'overview' | 'gallery' | 'timeline' | 'facilities' | 'location' | 'contact';
  visible: boolean;
  data?: any; // Section-specific data
}

const SpainParkPage: React.FC = () => {
  // Section configuration - can be moved to a separate file or fetched from an API
  const pageSections: SectionConfig[] = [
    { 
      id: 'hero', 
      type: 'hero', 
      visible: true,
      data: {
        title: "Spain Park",
        subtitle: "Home of Banks o' Dee FC",
        imagePath: "/assets/images/stadium/Spain Park.jpg"
      }
    },
    { 
      id: 'overview', 
      type: 'overview', 
      visible: true,
      data: {
        capacity: "2,500",
        established: "1948",
        pitch: "Advanced 3G synthetic surface",
        location: "Aberdeen, Scotland"
      }
    },
    { id: 'gallery', type: 'gallery', visible: false },
    { id: 'timeline', type: 'timeline', visible: false },
    { id: 'facilities', type: 'facilities', visible: false },
    { id: 'location', type: 'location', visible: false },
    { id: 'contact', type: 'contact', visible: false }
  ];

  // Render a section based on its type
  const renderSection = (section: SectionConfig) => {
    if (!section.visible) return null;

    switch (section.type) {
      case 'hero':
        return <StadiumHero key={section.id} {...section.data} />;
      case 'overview':
        return <StadiumOverview key={section.id} {...section.data} />;
      // Additional section types will be added in future phases
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Spain Park | Banks o' Dee FC</title>
        <meta name="description" content="Explore Spain Park, the home ground of Banks o' Dee Football Club - a state-of-the-art facility in Aberdeen, Scotland." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Render sections based on configuration */}
        {pageSections.map(section => renderSection(section))}
      </main>
      
      <Footer />
    </div>
  );
};

export default SpainParkPage;
