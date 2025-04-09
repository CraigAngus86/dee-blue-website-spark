
import React from "react";
import HeroSection from "@/components/ui/hero/HeroSection";
import OverlappingNewsCards from "@/components/ui/sections/OverlappingNewsCards";
import FeaturedMatch from "@/components/ui/sections/FeaturedMatch";
import LeagueTableWidget from "@/components/ui/sections/LeagueTableWidget";
import ImageGallery from "@/components/ui/image/ImageGallery";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import { getNewsImage } from "@/lib/imageUtils";
import { newsArticles } from "@/mock-data/newsData";
import { matchDayGallery } from "@/mock-data/galleryData";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Section from "@/components/ui/layout/Section";
import FanZoneSection from "@/components/ui/sections/FanZoneSection";
import SocialMediaSection from "@/components/ui/sections/SocialMediaSection";
import SponsorsSection from "@/components/ui/sections/SponsorsSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - Full width */}
        <HeroSection 
          title="BANKS O' DEE AIMING FOR LEAGUE GLORY" 
          category="CLUB NEWS" 
          timestamp="8 hrs ago"
          backgroundImage={getNewsImage(0)}
        />
        
        {/* Overlapping News Cards */}
        <OverlappingNewsCards articles={newsArticles} count={3} />
        
        {/* Featured Content Section - Improved gradient and texture */}
        <Section 
          className="relative overflow-hidden"
          spacing="lg"
        >
          {/* Rich texture overlay with dark navy gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-dark">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured Match */}
              <div className="lg:col-span-8">
                <FeaturedMatch maxMatches={3} />
              </div>
              
              {/* League Table */}
              <div className="lg:col-span-4">
                <LeagueTableWidget />
              </div>
            </div>
          </div>
        </Section>
        
        {/* Fan Zone Section */}
        <FanZoneSection />
        
        {/* Social Media Section */}
        <SocialMediaSection />

        {/* Sponsors Section */}
        <SponsorsSection />
        
        {/* Latest News Section - with improved texture */}
        <Section 
          className="relative overflow-hidden bg-light-gray"
          spacing="lg"
        >
          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Latest News</h2>
              <a href="/news" className="text-primary font-semibold hover:underline flex items-center">
                View All News
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.slice(0, 3).map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/9] overflow-hidden">
                    <ResponsiveImage
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-secondary text-primary text-xs font-semibold px-2 py-1 rounded mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{article.timestamp}</span>
                      <a href={`/news/${article.id}`} className="text-primary font-medium hover:underline flex items-center">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
        
        {/* Gallery Preview Section - with proper gradient (no bright yellow) */}
        <Section 
          className="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary"
          spacing="lg"
        >
          {/* Texture overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Match Day Gallery</h2>
              <a href="/gallery" className="text-white font-semibold hover:underline flex items-center">
                View Full Gallery
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </a>
            </div>
            
            <ImageGallery 
              images={matchDayGallery.slice(0, 4).map(img => ({
                ...img,
                isVideo: img.src.includes('match2') // Just for demo purposes
              }))}
              columns={4}
              gap="md"
              className="mb-8"
            />
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
