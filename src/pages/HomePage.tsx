
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

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header transparent />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection 
          title="BANKS O' DEE AIMING FOR LEAGUE GLORY" 
          category="CLUB NEWS" 
          timestamp="8 hrs ago"
          backgroundImage={getNewsImage(0)}
        />
        
        {/* Overlapping News Cards */}
        <OverlappingNewsCards articles={newsArticles} count={3} />
        
        {/* Featured Content Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Match */}
            <div className="lg:col-span-8">
              <FeaturedMatch />
            </div>
            
            {/* League Table */}
            <div className="lg:col-span-4">
              <LeagueTableWidget />
            </div>
          </div>
        </section>
        
        {/* Latest News Section */}
        <section className="container mx-auto px-4 mb-16">
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
        </section>
        
        {/* Gallery Preview Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Match Day Gallery</h2>
            <a href="/gallery" className="text-primary font-semibold hover:underline flex items-center">
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
