
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/layout/Container";
import Section from "@/components/ui/layout/Section";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import SectionHero from "@/components/ui/hero/SectionHero";
import ClubLogo from "@/components/ui/image/ClubLogo";
import CompetitorLogo from "@/components/ui/image/CompetitorLogo";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import SponsorsShowcase from "@/components/ui/image/SponsorsShowcase";
import PhotoGallery from "@/components/ui/image/PhotoGallery";
import { Sponsor, MatchPhoto } from "@/lib/types";

// Sample sponsors data
const sampleSponsors: Sponsor[] = [
  {
    name: "Main Sponsor Inc",
    logo: "https://placehold.co/400x200/FFFFFF/00105A?text=Main+Sponsor",
    website: "https://example.com",
    tier: "main"
  },
  {
    name: "Platinum Co",
    logo: "https://placehold.co/300x150/FFFFFF/00105A?text=Platinum+Co",
    website: "https://example.com",
    tier: "platinum"
  },
  {
    name: "Gold Partner",
    logo: "https://placehold.co/300x150/FFFFFF/00105A?text=Gold+Partner",
    website: "https://example.com",
    tier: "gold"
  },
  {
    name: "Silver Helper",
    logo: "https://placehold.co/300x150/FFFFFF/00105A?text=Silver+Helper",
    website: "https://example.com",
    tier: "silver"
  },
  {
    name: "Bronze Supporter",
    logo: "https://placehold.co/300x150/FFFFFF/00105A?text=Bronze+Supporter",
    website: "https://example.com",
    tier: "bronze"
  }
];

// Sample match photos
const samplePhotos: MatchPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
    alt: "Match action shot",
    caption: "Great save by goalkeeper",
    category: "action"
  },
  {
    src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600",
    alt: "Fans celebrating",
    caption: "Fans celebrating the winning goal",
    category: "fans"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    alt: "Team celebration",
    caption: "Team celebration after the win",
    category: "post-match"
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600",
    alt: "Pre-match preparations",
    caption: "Team warming up before the game",
    category: "pre-match"
  },
  {
    src: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    thumbnail: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=600",
    alt: "Match highlights",
    caption: "Key moment in the match",
    category: "highlights"
  }
];

const ImageDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <SectionHero 
          backgroundSrc="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
          title="Image Assets Demo"
          subtitle="Demonstration of image asset usage and components"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Image Demo", href: "/image-demo" }
          ]}
        />
        
        <Section>
          <Container size="lg">
            <Heading level={2} className="mb-6">Club Logo Variations</Heading>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-md mb-2">
                  <ClubLogo variant="rect" background="dark" size="lg" />
                </div>
                <Text size="small" color="muted">Rectangle - Dark</Text>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-primary p-4 rounded-md mb-2">
                  <ClubLogo variant="rect" background="light" size="lg" />
                </div>
                <Text size="small" color="muted">Rectangle - Light</Text>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-md mb-2">
                  <ClubLogo variant="square" background="dark" size="lg" />
                </div>
                <Text size="small" color="muted">Square - Dark</Text>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-primary p-4 rounded-md mb-2">
                  <ClubLogo variant="square" background="light" size="lg" />
                </div>
                <Text size="small" color="muted">Square - Light</Text>
              </div>
            </div>
            
            <hr className="my-12" />
            
            <Heading level={2} className="mb-6">Competitor Logos</Heading>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {["Formartine Utd", "Buckie Thistle", "Rangers FC", "Celtic FC", "Aberdeen FC"].map((team, index) => (
                <CompetitorLogo 
                  key={index}
                  name={team}
                  logoSrc={`https://placehold.co/200x200/FFFFFF/00105A?text=${team.split(' ')[0]}`}
                  size="md"
                  showName={true}
                />
              ))}
            </div>
            
            <hr className="my-12" />
            
            <Heading level={2} className="mb-6">Photo Gallery</Heading>
            
            <PhotoGallery 
              photos={samplePhotos}
              columns={{ default: 2, sm: 2, md: 3, lg: 4 }}
              aspectRatio="4/3"
              gap="md"
              categoryFilter={true}
            />
            
            <hr className="my-12" />
            
            <Heading level={2} className="mb-6">Sponsors Showcase</Heading>
            
            <div className="mb-12">
              <Heading level={3} className="mb-4">Featured Layout</Heading>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <SponsorsShowcase 
                  sponsors={sampleSponsors} 
                  layout="featured" 
                />
              </div>
            </div>
            
            <div className="mb-12">
              <Heading level={3} className="mb-4">Carousel Layout</Heading>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <SponsorsShowcase 
                  sponsors={sampleSponsors} 
                  layout="carousel" 
                />
              </div>
            </div>
            
            <div className="mb-12">
              <Heading level={3} className="mb-4">Grid Layout</Heading>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <SponsorsShowcase 
                  sponsors={sampleSponsors} 
                  layout="grid" 
                />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageDemo;
