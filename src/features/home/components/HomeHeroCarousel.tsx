"use client";

import React from 'react';
import { NewsArticle } from '@/features/news/types';

interface HomeHeroCarouselProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

class HomeHeroCarousel extends React.Component<HomeHeroCarouselProps> {
  state = {
    currentIndex: 0
  };
  
  render() {
    const { articles, onArticleClick } = this.props;
    const { currentIndex } = this.state;
    
    if (articles.length === 0) {
      return <div>No articles available</div>;
    }
    
    return (
      <div className="relative h-[600px] bg-blue-900">
        <h2 className="text-white p-8">Hero Carousel (Simplified)</h2>
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className={index === currentIndex ? 'block' : 'hidden'}
            onClick={() => onArticleClick(article)}
          >
            <h3 className="text-white text-2xl p-4">{article.title}</h3>
            <p className="text-white p-4">{article.category}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default HomeHeroCarousel;
