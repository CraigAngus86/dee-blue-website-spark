
import React from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/typography/Heading";
import SectionHero from "@/components/ui/hero/SectionHero";

import ClubLogo from "@/components/ui/image/ClubLogo";
import CompetitorLogo from "@/components/ui/image/CompetitorLogo";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import SponsorLogo from "@/components/ui/image/SponsorLogo";
import NewsCard from "@/components/ui/image/NewsCard";
import MatchCard from "@/components/ui/image/MatchCard";
import ImageGallery from "@/components/ui/image/ImageGallery";

import { 
  getStadiumImage, 
  getNewsImage, 
  getPlayerImage, 
  getTeamImage,
  getSponsorLogo,
  getCompetitorLogo 
} from "@/lib/image";
import { newsArticles } from "@/mock-data/newsData";
import { getUpcomingFixtures, getResults } from "@/mock-data/fixturesData";
import { matchDayGallery } from "@/mock-data/galleryData";

const ImageComponentsDemo: React.FC = () => {
  const upcomingFixtures = getUpcomingFixtures();
  const recentResults = getResults();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <SectionHero
          backgroundSrc={getStadiumImage()}
          title="Image Components Demo"
          subtitle="Comprehensive showcase of all image components"
          breadcrumbs={[
            { label: "Demo", href: "/demo/components" },
            { label: "Image Components", href: "/demo/image-components" }
          ]}
        />
        
        <Container>
          {/* Basic Image Utilities Section */}
          <Section>
            <Heading level={2} className="mb-6">Basic Image Components</Heading>
            
            <div className="space-y-8">
              {/* ResponsiveImage Demo */}
              <div className="mb-10">
                <Heading level={3} className="mb-4">Responsive Image</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <ResponsiveImage
                        src={getNewsImage(index)}
                        alt={`News image ${index + 1}`}
                        aspectRatio="16/9"
                        className="w-full"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">Responsive Image Example {index + 1}</h4>
                        <p className="text-sm text-gray-600">
                          Demonstrates aspect ratio control and error handling.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Player Images */}
              <div className="mb-10">
                <Heading level={3} className="mb-4">Player Images</Heading>
                <div className="flex flex-wrap gap-8">
                  {["Ewen", "Gilly", "Hamish", "Jevan", "Luke"].map((player) => (
                    <div key={player} className="text-center">
                      <div className="w-32 h-40 overflow-hidden rounded-md mb-2">
                        <ResponsiveImage
                          src={getPlayerImage(player)}
                          alt={player}
                          className="w-full h-full"
                          objectFit="cover"
                        />
                      </div>
                      <p className="font-medium">{player}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
          
          {/* Logo Components Section */}
          <Section>
            <Heading level={2} className="mb-6">Logo Components</Heading>
            
            {/* Club Logo */}
            <div className="mb-10">
              <Heading level={3} className="mb-4">Club Logo</Heading>
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Dark Background</p>
                  <div className="inline-block bg-primary p-4 rounded">
                    <ClubLogo background="light" size="lg" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Light Background</p>
                  <ClubLogo background="dark" size="lg" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Extra Large</p>
                  <ClubLogo background="dark" size="xl" />
                </div>
              </div>
            </div>
            
            {/* Competitor Logos */}
            <div className="mb-10">
              <Heading level={3} className="mb-4">Competitor Logos</Heading>
              <div className="flex flex-wrap gap-8">
                {[
                  "Banks o' Dee", 
                  "Buckie Thistle", 
                  "Brora Rangers", 
                  "Formartine United", 
                  "Fraserburgh", 
                  "Huntly"
                ].map((team) => (
                  <CompetitorLogo
                    key={team}
                    name={team}
                    size="md"
                    showName={true}
                  />
                ))}
              </div>
            </div>
            
            {/* Sponsor Logos */}
            <div>
              <Heading level={3} className="mb-4">Sponsor Logos</Heading>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {["AD23", "BJK", "GDI", "Global", "Three60", "Saltire"].map((sponsor) => (
                  <div key={sponsor} className="p-4 border rounded flex items-center justify-center bg-white">
                    <ResponsiveImage
                      src={getSponsorLogo(sponsor)}
                      alt={`${sponsor} logo`}
                      className="max-h-16 w-auto"
                      objectFit="contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Section>
          
          {/* Advanced Components Section */}
          <Section>
            <Heading level={2} className="mb-6">Advanced Components</Heading>
            
            {/* News Cards */}
            <div className="mb-10">
              <Heading level={3} className="mb-6">News Cards</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.slice(0, 3).map((article) => (
                  <NewsCard
                    key={article.id}
                    image={article.image}
                    title={article.title}
                    excerpt={article.excerpt}
                    category={article.category}
                    timestamp={article.timestamp}
                  />
                ))}
              </div>
            </div>
            
            {/* Match Cards */}
            <div className="mb-10">
              <Heading level={3} className="mb-6">Match Cards</Heading>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Upcoming Match</h4>
                  <MatchCard
                    homeTeam={upcomingFixtures[0].homeTeam}
                    awayTeam={upcomingFixtures[0].awayTeam}
                    competition={upcomingFixtures[0].competition}
                    date={upcomingFixtures[0].date}
                    time={upcomingFixtures[0].time}
                    venue={upcomingFixtures[0].venue}
                    status="upcoming"
                    ticketLink={upcomingFixtures[0].ticketLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-4">Recent Result</h4>
                  <MatchCard
                    homeTeam={recentResults[0].homeTeam}
                    awayTeam={recentResults[0].awayTeam}
                    competition={recentResults[0].competition}
                    date={recentResults[0].date}
                    venue={recentResults[0].venue}
                    status="completed"
                    result={{
                      homeScore: recentResults[0].homeScore !== undefined ? recentResults[0].homeScore : 0,
                      awayScore: recentResults[0].awayScore !== undefined ? recentResults[0].awayScore : 0
                    }}
                    matchReportLink={recentResults[0].matchReportLink}
                  />
                </div>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div>
              <Heading level={3} className="mb-6">Image Gallery</Heading>
              <p className="mb-4 text-gray-600">Click on any image to open the lightbox view</p>
              <ImageGallery 
                images={matchDayGallery}
                columns={3}
                gap="md"
                className="mb-16"
              />
            </div>
          </Section>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageComponentsDemo;
