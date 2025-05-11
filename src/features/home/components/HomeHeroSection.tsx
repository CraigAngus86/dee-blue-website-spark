"use client";
import React from 'react';
import { NewsArticle } from '@/features/news/types';
import { NewsModal } from '@/features/news/components';
import { ArrowRight } from 'lucide-react';
import HeroImage from './HeroImage';

interface HomeHeroSectionProps {
  articles: NewsArticle[];
}

interface HomeHeroSectionState {
  currentIndex: number;
  previousIndex: number;
  isTransitioning: boolean;
  selectedArticle: NewsArticle | null;
}

class HomeHeroSection extends React.Component<HomeHeroSectionProps, HomeHeroSectionState> {
  constructor(props: HomeHeroSectionProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      previousIndex: 0,
      isTransitioning: false,
      selectedArticle: null
    };
  }
  
  componentDidMount() {
    // Auto-rotate slides every 6 seconds
    if (this.props.articles.length > 1) {
      this.rotationTimer = setInterval(() => {
        this.goToSlide((this.state.currentIndex + 1) % this.props.articles.length);
      }, 6000);
    }
  }
  
  componentWillUnmount() {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }
  
  rotationTimer: NodeJS.Timeout | null = null;
  
  goToSlide(index: number) {
    if (this.state.isTransitioning) return;
    
    this.setState({
      previousIndex: this.state.currentIndex,
      currentIndex: index,
      isTransitioning: true
    });
    
    // Reset transitioning flag after animation completes
    setTimeout(() => {
      this.setState({ isTransitioning: false });
    }, 500);
  }
  
  render() {
    const { articles } = this.props;
    const { currentIndex, selectedArticle } = this.state;
    
    if (!articles || articles.length === 0) {
      return null;
    }
    
    const article = articles[currentIndex];
    
    // Format date in a more concise format
    const formattedDate = article.publishedAt 
      ? new Date(article.publishedAt).toLocaleDateString('en-US', { 
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : '';
    
    return (
      <div className="relative h-[70vh] min-h-[450px] max-h-[700px] overflow-hidden bg-[#00105A]">
        {/* Background image and overlay */}
        {articles.map((slideArticle, i) => (
          <div key={slideArticle.id}
               className={`absolute inset-0 transition-opacity duration-500 ${
                 i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
               }`}
               aria-hidden={i !== currentIndex}>
            {slideArticle.mainImage && (
              <HeroImage 
                image={slideArticle.mainImage}
                title={slideArticle.title}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/80 via-[#00105A]/40 to-transparent" />
          </div>
        ))}
        
        {/* Clickable area for the entire hero */}
        <div 
          className="absolute inset-0 z-20 cursor-pointer" 
          onClick={() => this.setState({ selectedArticle: article })}
          aria-label={`Read more about ${article.title}`}
        >
          {/* Content - centered vertically */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-montserrat">
                {article.title}
              </h1>
              
              {/* Gold separator - keeping this as requested */}
              <div className="w-20 h-[2px] bg-[#FFD700] mx-auto mb-4"></div>
              
              {/* Date and Read More on the same line */}
              <div className="flex items-center justify-center text-sm text-white/80 mb-10">
                <span>{formattedDate}</span>
                <span className="mx-2">|</span>
                <span className="flex items-center hover:text-white transition-colors">
                  Read More 
                  <span className="inline-flex items-center justify-center w-5 h-5 ml-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </span>
              </div>
              
              {/* Navigation dots - moved up to just below date/read more */}
              {articles.length > 1 && (
                <div className="flex justify-center space-x-2">
                  {articles.map((_, i) => (
                    <button 
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all mx-1 ${
                        i === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the hero click from triggering
                        this.goToSlide(i);
                      }}
                      aria-label={`Go to slide ${i + 1}`}>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* News Modal */}
        {selectedArticle && (
          <NewsModal
            article={selectedArticle}
            isOpen={!!selectedArticle}
            onClose={() => this.setState({ selectedArticle: null })}
          />
        )}
      </div>
    );
  }
}

export default HomeHeroSection;
