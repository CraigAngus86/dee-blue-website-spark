
import React from 'react';
import { Group, Building, Tv, Globe, ArrowRight, Phone } from 'lucide-react';
import { getStadiumImage } from '@/lib/image';
import WaveSeparator from '@/components/ui/separators/WaveSeparator';
import { ButtonNew } from '@/components/ui/ButtonNew';
import Container from '@/components/ui/layout/Container';
import FadeIn from '@/components/ui/animations/FadeIn';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4 transition-all hover:scale-[1.03] hover:shadow-md">
    <div className="flex items-center gap-3">
      <div className="text-accent">
        {icon}
      </div>
      <div>
        <p className="font-montserrat font-bold text-xl md:text-2xl text-white">{value}</p>
        <p className="font-inter text-xs md:text-sm text-secondary">{label}</p>
      </div>
    </div>
  </div>
);

const CommercialHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[600px] h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/70 z-10"></div>
        <img 
          src={getStadiumImage('Spain Park.jpg')}
          alt="Spain Park Stadium" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      {/* Content Container */}
      <Container className="relative z-20 h-full flex items-center">
        <div className="w-full lg:w-1/2 lg:ml-auto py-20">
          <FadeIn direction="up" delay={0.1}>
            <p className="text-accent font-montserrat text-sm tracking-wider uppercase mb-2 font-medium">
              COMMERCIAL OPPORTUNITIES
            </p>
            
            <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
              Partner with Banks o' Dee FC
            </h1>
            
            <p className="font-montserrat text-base md:text-lg text-secondary mb-8 max-w-2xl">
              Connect your brand with one of Aberdeen's most progressive football clubs with state-of-the-art
              facilities, a growing fanbase, and a rich heritage in the community.
            </p>
          </FadeIn>
          
          {/* Statistics Grid */}
          <FadeIn direction="up" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <StatCard 
                icon={<Group size={28} />} 
                value="1,000+" 
                label="Match Attendance" 
              />
              <StatCard 
                icon={<Building size={28} />} 
                value="5,000+ Weekly Visitors" 
                label="Spain Park Complex" 
              />
              <StatCard 
                icon={<Tv size={28} />} 
                value="Televised Matches" 
                label="Highland League" 
              />
              <StatCard 
                icon={<Globe size={28} />} 
                value="Growing Social Presence" 
                label="Digital Reach" 
              />
            </div>
          </FadeIn>
          
          {/* CTA Buttons */}
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonNew 
                variant="accent"
                size="lg"
                iconRight={<ArrowRight size={18} />}
                href="#sponsorship-options"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('sponsorship-options')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                Explore Opportunities
              </ButtonNew>
              
              <ButtonNew
                variant="secondary"
                size="lg"
                iconRight={<Phone size={18} />}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                Contact Us
              </ButtonNew>
            </div>
          </FadeIn>
        </div>
      </Container>
      
      {/* Wave Separator */}
      <div className="absolute bottom-[-1px] left-0 right-0 z-20">
        <WaveSeparator position="bottom" color="white" height="lg" />
      </div>
    </section>
  );
};

export default CommercialHeroSection;
