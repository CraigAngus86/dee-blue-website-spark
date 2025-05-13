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
  isLoading: boolean;
}

class HomeHeroSection extends React.Component<HomeHeroSectionProps, HomeHeroSectionState> {
  constructor(props: HomeHeroSectionProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      previousIndex: 0,
      isTransitioning: false,
      selectedArticle: null,
      isLoading: false
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
  
  // Function to fetch the full article data when clicked
  handleArticleClick = async (article: NewsArticle) => {
    try {
      this.setState({ isLoading: true });
      
      // Only fetch complete article if we need to (if it doesn't have a body)
      if (Array.isArray(article.body) && article.body.length > 0) {
        // Article already has complete data
        this.setState({ selectedArticle: article });
      } else {
        // Fetch the complete article data by slug using the existing endpoint
        const response = await fetch(`/api/sanity-test/news?slug=${encodeURIComponent(article.slug)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Set the complete article
          this.setState({ selectedArticle: data.data });
        } else {
          // If fetch fails, use the original article data
          console.warn('Failed to fetch complete article, using limited data');
          this.setState({ selectedArticle: article });
        }
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      // If there's an error, still show the modal with original data
      this.setState({ selectedArticle: article });
    } finally {
      this.setState({ isLoading: false });
    }
  }
  
  render() {
    const { articles } = this.props;
    const { currentIndex, selectedArticle, isLoading } = this.state;
    
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
            {/* Slightly stronger gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/80 via-[#00105A]/35 via-55% to-transparent" />
          </div>
        ))}
        
        {/* Clickable area for the entire hero */}
        <div 
          className="absolute inset-0 z-20 cursor-pointer" 
          onClick={() => this.handleArticleClick(article)}
          aria-label={`Read more about ${article.title}`}
        >
          {/* Using margin-top approach instead of padding-bottom */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mt-40 w-full text-center px-4">
              <div className="max-w-6xl mx-auto">
                {/* Title - wider container to get text on 2 lines instead of 3 */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white font-montserrat">
                  {article.title}
                </h1>
                
                {/* Gold separator - keeping this as requested */}
                <div className="w-20 h-[2px] bg-[#FFD700] mx-auto mb-4"></div>
                
                {/* Date and Read More on the same line */}
                <div className="flex items-center justify-center text-sm text-white/80 mb-4">
                  <span>{formattedDate}</span>
                  <span className="mx-2">|</span>
                  <span className="flex items-center hover:text-white transition-colors">
                    Read More 
                    <span className="inline-flex items-center justify-center w-5 h-5 ml-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </span>
                </div>
                
                {/* Navigation dots - positioned much closer to the cards below */}
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
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-[#00105A]">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-[#00105A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading article...</span>
              </div>
            </div>
          </div>
        )}
        
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