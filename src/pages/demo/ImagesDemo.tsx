
import React from "react";
import Container from "@/components/ui/layout/Container";
import Section from "@/components/ui/layout/Section";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionHero from "@/components/ui/hero/SectionHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import all image components
import ClubLogo from "@/components/ui/image/ClubLogo";
import CompetitorLogo from "@/components/ui/image/CompetitorLogo";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import NewsImage from "@/components/ui/image/NewsImage";
import PlayerImage from "@/components/ui/image/PlayerImage";
import StadiumImage from "@/components/ui/image/StadiumImage";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";

// Import data
import { competitors } from "@/data/CompetitorsData";
import { sponsors } from "@/data/SponsorsData";

const ImagesDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <SectionHero 
          backgroundSrc="/assets/images/stadium/Spain Park.jpg"
          title="Images Demo"
          subtitle="Preview of all image assets in the new directory structure"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Demo", href: "/demo" },
            { label: "Images", href: "/demo/images" }
          ]}
        />
        
        <Section>
          <Container>
            <Heading level={2} className="mb-6 text-center">Image Assets Gallery</Heading>
            <Text className="text-center mb-12 max-w-2xl mx-auto">
              This page demonstrates all available images in the new directory structure.
            </Text>
            
            <Tabs defaultValue="logos" className="w-full mb-12">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
                <TabsTrigger value="logos">Club Logos</TabsTrigger>
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="teams">Team</TabsTrigger>
                <TabsTrigger value="stadium">Stadium</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="competitors">Competitors</TabsTrigger>
                <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              </TabsList>
              
              {/* Club Logos Tab */}
              <TabsContent value="logos" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white rounded-lg shadow">
                    <Heading level={3} className="mb-4 text-center">Dark Logo</Heading>
                    <div className="flex justify-center mb-4">
                      <ClubLogo background="dark" size="xl" />
                    </div>
                    <Text className="text-center text-sm text-gray-600">
                      Path: /assets/images/logos/BOD_Logo_Navy_square.png
                    </Text>
                  </div>
                  
                  <div className="p-8 bg-primary rounded-lg shadow">
                    <Heading level={3} className="mb-4 text-center text-white">Light Logo</Heading>
                    <div className="flex justify-center mb-4">
                      <ClubLogo background="light" size="xl" />
                    </div>
                    <Text className="text-center text-sm text-gray-200">
                      Path: /assets/images/logos/BOD_Logo_White_square.png
                    </Text>
                  </div>
                </div>
              </TabsContent>
              
              {/* Players Tab */}
              <TabsContent value="players" className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                      <PlayerImage 
                        playerId={`${i + 1}`} 
                        name={`Player ${i + 1}`} 
                        size="md" 
                      />
                      <Text className="mt-2 text-center text-sm">Player {i + 1}</Text>
                      <Text className="text-center text-xs text-gray-500">
                        ID: {i + 1}
                      </Text>
                    </div>
                  ))}
                  
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                    <ResponsiveImage 
                      src="/assets/images/players/headshot_dummy.jpg"
                      alt="Dummy headshot"
                      className="w-32"
                      aspectRatio="3/4"
                      rounded="md"
                    />
                    <Text className="mt-2 text-center text-sm">Dummy</Text>
                    <Text className="text-center text-xs text-gray-500">
                      Fallback image
                    </Text>
                  </div>
                </div>
              </TabsContent>
              
              {/* Team Tab */}
              <TabsContent value="teams" className="space-y-8">
                <Heading level={3} className="mb-4">Squad Photo</Heading>
                <ResponsiveImage 
                  src="/assets/images/team/Squad1.jpg"
                  alt="Team squad photo"
                  aspectRatio="16/9"
                  rounded="lg"
                  shadow="md"
                  className="w-full mb-8"
                />
                
                <Heading level={3} className="mb-4">Training Photos</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex flex-col">
                      <ResponsiveImage 
                        src={`/assets/images/team/Training${num}_Square.jpg`}
                        alt={`Training photo ${num}`}
                        aspectRatio="1/1"
                        rounded="md"
                        shadow="sm"
                      />
                      <Text className="mt-2 text-center text-sm">Training {num}</Text>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Stadium Tab */}
              <TabsContent value="stadium" className="space-y-8">
                <StadiumImage 
                  filename="Spain Park.jpg"
                  alt="Spain Park Stadium"
                  caption="Spain Park - Home of Banks o' Dee FC"
                  credit="Club Archive"
                />
              </TabsContent>
              
              {/* News Tab */}
              <TabsContent value="news" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex flex-col">
                      <NewsImage 
                        filename={`News${num}.jpg`}
                        alt={`News image ${num}`}
                        size="full"
                        caption={`News article ${num}`}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Competitors Tab */}
              <TabsContent value="competitors" className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {competitors.map((competitor, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <CompetitorLogo 
                        name={competitor.name}
                        logoSrc={competitor.logo}
                        size="md"
                        showName={true}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Sponsors Tab */}
              <TabsContent value="sponsors" className="space-y-8">
                <Heading level={3} className="mb-4">Main Sponsor</Heading>
                <div className="flex justify-center mb-8">
                  {sponsors.filter(s => s.tier === 'main').map((sponsor, i) => (
                    <SponsorLogo 
                      key={i}
                      sponsor={sponsor}
                      size="xl"
                      useContainer={true}
                      containerClassName="px-8 py-6 shadow-md"
                    />
                  ))}
                </div>
                
                <Heading level={3} className="mb-4">All Sponsors</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {sponsors.filter(s => s.tier !== 'main').map((sponsor, i) => (
                    <div key={i} className="flex justify-center">
                      <SponsorLogo 
                        sponsor={sponsor}
                        size="lg"
                        useContainer={true}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-16 text-center">
              <Text>
                This demo page shows all currently available images in the repository.
                Additional images can be added to the corresponding directories as needed.
              </Text>
            </div>
          </Container>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImagesDemo;
