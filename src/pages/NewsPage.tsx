
import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";

const NewsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <NewsHero />
        <div className="container mx-auto px-4 py-12">
          <NewsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
