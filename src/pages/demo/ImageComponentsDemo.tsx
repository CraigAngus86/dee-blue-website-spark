import React from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/typography/Heading";
import SectionHero from "@/components/ui/hero/SectionHero";

import NewsCard from "@/components/ui/image/NewsCard";
import MatchCard from "@/components/ui/image/MatchCard";
import ImageGallery from "@/components/ui/image/ImageGallery";

import { getStadiumImage } from "@/lib/image";
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
          title="Advanced Image Components"
          subtitle="Showcasing news cards, match cards, and gallery components"
          breadcrumbs={[
            { label: "Demo", href: "/demo/components" },
            { label: "Advanced Components", href: "/demo/advanced-components" }
          ]}
        />
        
        <Container>
          {/* News Cards Section */}
          <Section>
            <Heading level={2} className="mb-6">News Cards</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.slice(0, 3).map(article => (
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
          </Section>
          
          {/* Match Cards Section */}
          <Section>
            <Heading level={2} className="mb-6">Match Cards</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Heading level={3} className="mb-4">Upcoming Matches</Heading>
                <div className="space-y-6">
                  {upcomingFixtures.map(match => (
                    <MatchCard
                      key={match.id}
                      homeTeam={match.homeTeam}
                      awayTeam={match.awayTeam}
                      competition={match.competition}
                      date={match.date}
                      time={match.time}
                      venue={match.venue}
                      status="upcoming"
                      ticketLink={match.ticketLink}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <Heading level={3} className="mb-4">Recent Results</Heading>
                <div className="space-y-6">
                  {recentResults.map(match => (
                    <MatchCard
                      key={match.id}
                      homeTeam={match.homeTeam}
                      awayTeam={match.awayTeam}
                      competition={match.competition}
                      date={match.date}
                      venue={match.venue}
                      status="finished"
                      result={match.result}
                      matchReportLink={match.matchReportLink}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Section>
          
          {/* Image Gallery Section */}
          <Section>
            <Heading level={2} className="mb-6">Image Gallery</Heading>
            <div className="mb-4">
              <Heading level={3} className="mb-4">Match Day Gallery</Heading>
              <ImageGallery 
                images={matchDayGallery}
                columns={3}
                gap="md"
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
