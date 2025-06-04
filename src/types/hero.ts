// Hero slide type definitions for Banks o' Dee FC website
// Matches HeroSlider component expectations

export interface HeroSlide {
  id: string;
  _id?: string;  // Sanity document ID
  title: string;
  subtitle?: string;
  image: {
    asset: {
      public_id: string;
      url: string;
    };
    alt: string;
  };
  ctaText?: string;
  ctaLink?: string;
  isActive?: boolean;
}

export interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
}
