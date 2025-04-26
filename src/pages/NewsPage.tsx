
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";
import { newsArticles } from "@/mock-data/newsData";

const NewsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const articleId = params.get('article');
  
  const currentArticle = articleId ? newsArticles.find(article => article.id === parseInt(articleId, 10)) : null;

  return (
    <>
      <Helmet>
        <title>{currentArticle ? `${currentArticle.title} | Banks o' Dee News` : "News | Banks o' Dee"}</title>
        
        {currentArticle && (
          <>
            <meta name="description" content={currentArticle.excerpt || "Banks o' Dee FC news article"} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`${window.location.origin}/news?article=${currentArticle.id}`} />
            <meta property="og:title" content={currentArticle.title} />
            <meta property="og:description" content={currentArticle.excerpt || "Banks o' Dee FC news article"} />
            <meta property="og:image" content={`${window.location.origin}${currentArticle.image}`} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={currentArticle.title} />
            <meta name="twitter:description" content={currentArticle.excerpt || "Banks o' Dee FC news article"} />
            <meta name="twitter:image" content={`${window.location.origin}${currentArticle.image}`} />
          </>
        )}
      </Helmet>
      
      <NewsHero />
      <div className="container mx-auto px-4 py-12">
        <NewsGrid />
      </div>
    </>
  );
};

export default NewsPage;
