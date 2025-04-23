
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import { newsArticles } from "@/mock-data/newsData";
import { useNavigate, useLocation } from 'react-router-dom';

const NewsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<typeof newsArticles[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const filters = [
    { id: 'all', label: 'All News' },
    { id: 'match-report', label: 'Match Reports' },
    { id: 'club-news', label: 'Club News' },
    { id: 'community', label: 'Community' }
  ];

  // Filter news based on selected category
  const filteredNews = newsArticles.filter(article => {
    if (activeFilter === 'all') return true;
    
    // Convert category to kebab-case for comparison
    const categorySlug = article.category?.toLowerCase().replace(/\s+/g, "-");
    return categorySlug === activeFilter;
  });

  // Sort news by date (more recent first)
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Handle opening article modal
  const openArticle = (articleId: number) => {
    const article = newsArticles.find(item => item.id === articleId);
    if (article) {
      setSelectedArticle(article);
      setIsModalOpen(true);
      // Update URL without page reload
      navigate(`/news?article=${articleId}`, { replace: true });
    }
  };
  
  // Handle closing article modal
  const closeArticle = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
    // Reset URL to just /news
    navigate('/news', { replace: true });
  };
  
  // Handle navigation between articles
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
      navigate(`/news?article=${newArticle.id}`, { replace: true });
    }
  };
  
  // Check for article in URL on component mount or URL change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const articleId = params.get('article');
    
    if (articleId) {
      const id = parseInt(articleId, 10);
      openArticle(id);
    }
  }, [location.search]);

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.id)}
            size="lg"
            className="font-medium"
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      {/* News Grid - CSS Grid with explicit placement for featured articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedNews.map((article) => (
          <div 
            key={article.id}
            className={article.isFeatured ? "md:col-span-2" : ""}
            onClick={() => openArticle(article.id)}
          >
            <NewsCard
              image={article.image}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              isFeatured={article.isFeatured}
              onClick={() => openArticle(article.id)}
            />
          </div>
        ))}
      </div>
      
      {/* Article Modal */}
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
