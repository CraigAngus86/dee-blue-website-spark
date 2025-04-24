
import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from 'react-helmet-async';
import StadiumHero from '@/components/stadium/StadiumHero';
import StadiumOverview from '@/components/stadium/StadiumOverview';
import StadiumTimeline from '@/components/stadium/StadiumTimeline';

// Section configuration type
interface SectionConfig {
  id: string;
  type: 'hero' | 'overview' | 'gallery' | 'timeline' | 'facilities' | 'location' | 'contact';
  visible: boolean;
  data?: any; // Section-specific data
}

// Timeline data type
interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

const SpainParkPage: React.FC = () => {
  // Timeline data
  const timelineData: TimelineEntry[] = [
    {
      id: '1',
      year: '1948',
      title: 'Stadium Founding',
      description: 'Spain Park was established as the home ground for Banks o\' Dee FC, providing a permanent base for the club.',
      imageUrl: '/placeholder.svg' // Use placeholder for now
    },
    {
      id: '2',
      year: '1976',
      title: 'First Major Renovation',
      description: 'The stadium underwent its first significant upgrade with improved seating and facilities for supporters.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      year: '1992',
      title: 'Floodlights Installation',
      description: 'Floodlights were added to the stadium, allowing for evening matches and expanding the club\'s fixture capabilities.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '4',
      year: '2005',
      title: 'Main Stand Development',
      description: 'A new main stand was constructed, increasing the seating capacity and providing improved views of the pitch.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '5',
      year: '2012',
      title: 'Synthetic Pitch Installation',
      description: 'The traditional grass surface was replaced with a state-of-the-art synthetic pitch, reducing maintenance and improving playability in all weather conditions.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '6',
      year: '2018',
      title: '3G Surface Upgrade',
      description: 'The pitch was upgraded to an advanced 3G synthetic surface, making Spain Park one of the most modern playing facilities in Scottish football.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '7',
      year: '2022',
      title: 'Hospitality Expansion',
      description: 'New hospitality areas were developed to enhance the matchday experience for sponsors and supporters.',
      imageUrl: '/placeholder.svg'
    }
  ];

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
    { 
      id: 'timeline', 
      type: 'timeline', 
      visible: true,
      data: {
        items: timelineData
      }
    },
    { id: 'gallery', type: 'gallery', visible: false },
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
      case 'timeline':
        return <StadiumTimeline key={section.id} {...section.data} />;
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
      
      <main className="flex-grow pt-20">
        {/* Render sections based on configuration */}
        {pageSections.map(section => renderSection(section))}
      </main>
      
      <Footer />
    </div>
  );
};

export default SpainParkPage;
