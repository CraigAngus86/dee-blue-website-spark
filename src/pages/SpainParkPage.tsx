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
  expandedContent: string;
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
      expandedContent: 'The decision to create Spain Park came after many years of the club playing at various locations around Aberdeen. The land was acquired through significant fundraising efforts by club supporters and the local community. The initial facilities were basic, with wooden stands and minimal amenities, but it represented a major milestone in establishing the club\'s identity and permanent home.',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027'
    },
    {
      id: '2',
      year: '1976',
      title: 'First Major Renovation',
      description: 'The stadium underwent its first significant upgrade with improved seating and facilities for supporters.',
      expandedContent: 'After nearly three decades with minimal changes, the 1976 renovations marked the first comprehensive upgrade to Spain Park. The wooden stands were replaced with more permanent structures, proper changing facilities were built for both home and away teams, and basic catering facilities were added. This renovation coincided with the club\'s increasing success in regional competitions and growing supporter base.',
      imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716'
    },
    {
      id: '3',
      year: '1992',
      title: 'Floodlights Installation',
      description: 'Floodlights were added to the stadium, allowing for evening matches and expanding the club\'s fixture capabilities.',
      expandedContent: 'The addition of floodlights in 1992 marked a significant advancement for Spain Park. This upgrade enabled the club to host evening matches and training sessions, greatly expanding the facility\'s utility and the club\'s ability to participate in various competitions. The modern lighting system improved visibility and enhanced the matchday experience for both players and spectators.',
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
    },
    {
      id: '4',
      year: '2005',
      title: 'Main Stand Development',
      description: 'A new main stand was constructed, increasing the seating capacity and providing improved views of the pitch.',
      expandedContent: 'The 2005 main stand development was a major milestone in Spain Park\'s history. The new structure not only increased seating capacity but also included modern facilities such as improved changing rooms, a medical room, and enhanced spectator amenities. This development reflected the club\'s growing ambitions and commitment to providing a better matchday experience.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    },
    {
      id: '5',
      year: '2012',
      title: 'Synthetic Pitch Installation',
      description: 'The traditional grass surface was replaced with a state-of-the-art synthetic pitch.',
      expandedContent: 'The installation of the synthetic pitch in 2012 was a forward-thinking decision that significantly improved the playing surface\'s reliability and reduced maintenance costs. This upgrade allowed for more consistent playing conditions throughout the year and increased the facility\'s usage capacity for both matches and training sessions.',
      imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843'
    },
    {
      id: '6',
      year: '2018',
      title: '3G Surface Upgrade',
      description: 'The pitch was upgraded to an advanced 3G synthetic surface, making Spain Park one of the most modern playing facilities in Scottish football.',
      expandedContent: 'The 2018 upgrade to a 3G surface represented a significant investment in Spain Park\'s facilities. The advanced synthetic turf provided improved player safety, better ball control, and enhanced durability. This upgrade also met higher standards for competitive play, allowing the club to host a wider range of competitions and events throughout the year.',
      imageUrl: '/assets/images/stadium/Spain Park.jpg'
    },
    {
      id: '7',
      year: '2022',
      title: 'Hospitality Expansion',
      description: 'New hospitality areas were developed to enhance the matchday experience for sponsors and supporters.',
      expandedContent: 'The hospitality expansion in 2022 marked the most recent major development at Spain Park. This project included the creation of premium seating areas, improved catering facilities, and dedicated spaces for sponsors and VIP guests. These enhancements have significantly improved the club\'s revenue generation capabilities while providing supporters with a more enjoyable matchday experience.',
      imageUrl: '/assets/images/stadium/Spain Park.jpg'
    }
  ];

  // Section configuration
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
    <>
      <Helmet>
        <title>Spain Park | Banks o' Dee FC</title>
        <meta name="description" content="Explore Spain Park, the home ground of Banks o' Dee Football Club - a state-of-the-art facility in Aberdeen, Scotland." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-16">
          {pageSections.map(section => renderSection(section))}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SpainParkPage;
