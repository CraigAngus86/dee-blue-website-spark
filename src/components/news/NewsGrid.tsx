
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import { newsArticles } from "@/mock-data/newsData";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const NewsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<typeof newsArticles[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const filters = [
    { id: 'all', label: 'All News' },
    { id: 'match-report', label: 'Match Reports' },
    { id: 'club-news', label: 'Club News' },
    { id: 'community', label: 'Community' }
  ];

  const filteredNews = newsArticles.filter(article => {
    if (activeFilter === 'all') return true;
    
    const categorySlug = article.category?.toLowerCase().replace(/\s+/g, "-");
    return categorySlug === activeFilter;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return dateB - dateA;
  });

  const openArticle = (articleId: string) => {
    const article = newsArticles.find(item => item.id === articleId);
    if (article) {
      setSelectedArticle(article);
      setIsModalOpen(true);
      
      // Update URL with article ID
      const params = new URLSearchParams(searchParams.toString());
      params.set("article", articleId);
      router.push(`${pathname}?${params.toString()}`);
    }
  };
  
  const closeArticle = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
    router.push(pathname);
  };
  
  const navigateArticle = (direction: 'prev' | 'next') => {
    if (!selectedArticle) return;
    
    const currentIndex = sortedNews.findIndex(article => article.id === selectedArticle.id);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : -1;
    } else {
      newIndex = currentIndex < sortedNews.length - 1 ? currentIndex + 1 : -1;
    }
    
    if (newIndex !== -1) {
      const newArticle = sortedNews[newIndex];
      setSelectedArticle(newArticle);
      
      // Update URL with new article ID
      const params = new URLSearchParams(searchParams.toString());
      params.set("article", newArticle.id);
      router.push(`${pathname}?${params.toString()}`);
    }
  };
  
  useEffect(() => {
    const articleId = searchParams.get('article');
    
    if (articleId) {
      const article = newsArticles.find(item => item.id === articleId);
      if (article) {
        setSelectedArticle(article);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.id)}
            size="lg"
            className={`font-medium ${
              activeFilter === filter.id 
                ? "text-white"
                : "text-primary"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedNews.map((article) => (
          <div 
            key={article.id}
            className={article.isFeatured ? "lg:col-span-2" : ""}
          >
            <NewsCard
              image={article.image}
              title={article.title}
              date={new Date(article.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              excerpt={article.isFeatured ? undefined : article.excerpt}
              isFeatured={article.isFeatured}
              onClick={() => openArticle(article.id)}
            />
          </div>
        ))}
      </div>
      
      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={closeArticle}
        onPrevious={() => navigateArticle('prev')}
        onNext={() => navigateArticle('next')}
        hasPrevious={selectedArticle ? sortedNews.findIndex(a => a.id === selectedArticle.id) > 0 : false}
        hasNext={selectedArticle ? sortedNews.findIndex(a => a.id === selectedArticle.id) < sortedNews.length - 1 : false}
      />
    </div>
  );
};

export default NewsGrid;
