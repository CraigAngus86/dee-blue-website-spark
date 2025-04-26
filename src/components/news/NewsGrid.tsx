
'use client';

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import LoadingState from '../ui/common/LoadingState';
import { newsArticles } from '@/mock-data/newsData';

const NewsGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchNews = async () => {
      try {
        // In a real app, we would fetch from an API endpoint
        // For now, use the mock data directly
        setArticles(newsArticles);
        
        // Simulate loading delay
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <LoadingState variant="skeleton" count={6} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          isFeatured={false}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
