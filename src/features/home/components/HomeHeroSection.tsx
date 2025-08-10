"use client";
import React from 'react';
import { format } from 'date-fns';
import { NewsArticle } from '@/features/news/types';
import { NewsModal } from '@/features/news/components';
import { MatchGalleryModal } from '@/features/galleries';
import { ArrowRight } from 'lucide-react';
import HeroImage from './HeroImage';
import Reveal from '@/components/ui/Reveal';

interface HomeHeroSectionProps {
  articles: (NewsArticle & { contentType?: string })[];
}

interface HomeHeroSectionState {
  currentIndex: number;
  previousIndex: number;
  isTransitioning: boolean;
  selectedArticle: NewsArticle | null;
  selectedGalleryId: string | null;
  isLoading: boolean;
  isMobile: boolean;
  touchStart: number;
  touchEnd: number;
  isUserInteracting: boolean;
}

class HomeHeroSection extends React.Component<HomeHeroSectionProps, HomeHeroSectionState> {
  rotationTimer: NodeJS.Timeout | null = null;
  interactionTimeout: NodeJS.Timeout | null = null;

  constructor(props: HomeHeroSectionProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      previousIndex: 0,
      isTransitioning: false,
      selectedArticle: null,
      selectedGalleryId: null,
      isLoading: false,
      isMobile: false,
      touchStart: 0,
      touchEnd: 0,
      isUserInteracting: false
    };
  }

  componentDidMount() {
    this.updateMobileState();
    window.addEventListener('resize', this.updateMobileState);
    if (this.props.articles.length > 1) this.startAutoRotation();
  }

  componentWillUnmount() {
    if (this.rotationTimer) clearInterval(this.rotationTimer);
    if (this.interactionTimeout) clearTimeout(this.interactionTimeout);
    window.removeEventListener('resize', this.updateMobileState);
  }

  startAutoRotation = () => {
    if (this.rotationTimer) clearInterval(this.rotationTimer);
    this.rotationTimer = setInterval(() => {
      if (!this.state.isUserInteracting) {
        this.goToSlide((this.state.currentIndex + 1) % this.getVisibleArticlesCount());
      }
    }, 6000);
  };

  pauseAutoRotation = () => {
    this.setState({ isUserInteracting: true });
    if (this.interactionTimeout) clearTimeout(this.interactionTimeout);
    this.interactionTimeout = setTimeout(() => {
      this.setState({ isUserInteracting: false });
    }, 10000);
  };

  updateMobileState = () => {
    const isMobile = window.innerWidth < 768;
    this.setState({ isMobile });
  };

  handleTouchStart = (e: React.TouchEvent) => {
    if (!this.state.isMobile) return;
    this.setState({ touchStart: e.targetTouches[0].clientX, touchEnd: 0 });
    this.pauseAutoRotation();
  };

  handleTouchMove = (e: React.TouchEvent) => {
    if (!this.state.isMobile) return;
    this.setState({ touchEnd: e.targetTouches[0].clientX });
  };

  handleTouchEnd = () => {
    const { isMobile, touchStart, touchEnd } = this.state;
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    const visibleCount = this.getVisibleArticlesCount();

    if (isLeftSwipe) this.goToSlide((this.state.currentIndex + 1) % visibleCount);
    else if (isRightSwipe) this.goToSlide(this.state.currentIndex === 0 ? visibleCount - 1 : this.state.currentIndex - 1);

    this.setState({ touchStart: 0, touchEnd: 0 });
  };

  getVisibleArticlesCount = () => (this.state.isMobile ? 5 : 3);

  getVisibleArticles = () => {
    const count = this.getVisibleArticlesCount();
    return this.props.articles.slice(0, count);
  };

  goToSlide(index: number) {
    if (this.state.isTransitioning) return;
    const visibleCount = this.getVisibleArticlesCount();
    if (index >= visibleCount) return;

    this.setState({ previousIndex: this.state.currentIndex, currentIndex: index, isTransitioning: true });
    setTimeout(() => this.setState({ isTransitioning: false }), 500);
  }

  handleContentClick = async (content: NewsArticle & { contentType?: string }) => {
    try {
      this.setState({ isLoading: true });
      if (content.contentType === 'gallery') {
        this.setState({ selectedGalleryId: content.id });
      } else {
        if (Array.isArray(content.body) && content.body.length > 0) {
          this.setState({ selectedArticle: content });
        } else {
          const response = await fetch(`/api/sanity-test/news?slug=${encodeURIComponent((content as any).slug)}`);
          if (!response.ok) throw new Error('Failed to fetch article');
          const data = await response.json();
          if (data.success && data.data) this.setState({ selectedArticle: data.data });
          else this.setState({ selectedArticle: content });
        }
      }
    } catch (e) {
      console.error('Error handling content click:', e);
      if (content.contentType === 'gallery') this.setState({ selectedGalleryId: content.id });
      else this.setState({ selectedArticle: content });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { articles } = this.props;
    const { currentIndex, selectedArticle, selectedGalleryId, isLoading, isMobile } = this.state;

    if (!articles || articles.length === 0) return null;

    const visibleArticles = this.getVisibleArticles();
    const content = visibleArticles[currentIndex];
    if (!content) return null;

    const formattedDate = content.publishedAt
      ? format(new Date(content.publishedAt), "d MMMM yyyy")
      : "";

    return (
      <div
        className="relative z-20 w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-black"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {/* Background images */}
        {visibleArticles.map((slideContent, i) => (
          <div
            key={slideContent.id}
            className={`absolute inset-0 transition-opacity duration-500 ${i === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
            aria-hidden={i !== currentIndex}
          >
            {slideContent.mainImage && (
              <HeroImage image={slideContent.mainImage} title={slideContent.title} category={slideContent.category} />
            )}
          </div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(ellipse_at_center,rgba(252,199,67,0)_45%,rgba(252,199,67,0.16)_70%,rgba(252,199,67,0.28)_85%,rgba(252,199,67,0.36)_100%)]
              mix-blend-overlay
              opacity-90
            "
          />
        </div>

        {/* Clickable overlay for content */}
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={() => this.handleContentClick(content)}
          aria-label={`View ${content.contentType === 'gallery' ? 'gallery' : 'article'}: ${content.title}`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Reveal delayMs={120}>
              <div className="mt-40 w-full text-center px-4">
                <div className="max-w-6xl mx-auto">
                  <h1 className="mb-4 text-white text-6xl md:text-8xl lg:text-10xl">
                    {content.title}
                  </h1>
                  <div className="w-24 h-[3px] bg-[#FCC743] mx-auto mb-4" />
                  <div className="flex items-center justify-center text-sm text-white/85 mb-4">
                    <span>{formattedDate}</span>
                    <span className="mx-2">|</span>
                    <span className="flex items-center hover:text-white transition-colors">
                      {content.contentType === 'gallery' ? 'View Photos' : 'Read More'}
                      <span className="inline-flex items-center justify-center w-5 h-5 ml-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </span>
                  </div>
                  {visibleArticles.length > 1 && (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex justify-center space-x-2">
                        {visibleArticles.map((_, i) => (
                          <button
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full transition-all mx-1 ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              this.goToSlide(i);
                              this.pauseAutoRotation();
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>
                      {isMobile && <p className="text-xs text-white/70 font-medium">Swipe to navigate</p>}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-black">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Loading {content?.contentType === 'gallery' ? 'gallery' : 'article'}...</span>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {selectedArticle && (
          <NewsModal article={selectedArticle} isOpen={!!selectedArticle} onClose={() => this.setState({ selectedArticle: null })} />
        )}
        {selectedGalleryId && (
          <MatchGalleryModal galleryId={selectedGalleryId} isOpen={!!selectedGalleryId} onClose={() => this.setState({ selectedGalleryId: null })} />
        )}
      </div>
    );
  }
}

export default HomeHeroSection;
